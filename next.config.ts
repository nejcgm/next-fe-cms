import type { NextConfig } from "next";
import path from "path";

const tenantId = process.env.TENANT_ID;
const analyze = process.env.ANALYZE === "true";

if (!tenantId) {
  throw new Error(
    "TENANT_ID env var is required. Set it to the tenant folder name, e.g. TENANT_ID=vukans-bike"
  );
}

/** Safe to embed in a path-to-regexp `source` negative-lookahead (tenant ids are slug-like). */
function tenantPathRegexSegment(id: string): string {
  return id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const nextConfig: NextConfig = {
  distDir: `.next-${tenantId}`,
  // Same mapping as middleware, but applied in Next's rewrite phase — more reliable on Vercel
  // if Edge middleware is skipped or mis-ordered for some requests.
  async rewrites() {
    const t = tenantId;
    const tr = tenantPathRegexSegment(t);
    return {
      beforeFiles: [
        { source: "/", destination: `/${t}/` },
        {
          source: `/:path((?!${tr}/|${tr}$|api/|api$|_next/|favicon\\.ico).*)`,
          destination: `/${t}/:path`,
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
  // Temporary: lint is enforced separately in CI; do not block tenant builds on legacy lint debt.
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  webpack(config, { isServer }) {
    // Tenant aliases for build-time resolution
    config.resolve ??= {};
    config.resolve.alias ??= {};
    const tenantPath = path.resolve(__dirname, `src/tenants/${tenantId}`);
    config.resolve.alias["@tenant"] = tenantPath;
    config.resolve.alias["@tenant/config"] = path.join(tenantPath, "config");
    // Mock data folder names may differ from tenantId (e.g. resort-example → resort)
    const mockDataFolder = tenantId === "resort-example" ? "resort" : tenantId;
    config.resolve.alias["@mock-data"] = path.resolve(
      __dirname,
      `src/core/mock-data.ts/${mockDataFolder}`
    );

    // Bundle analyzer for verification (only when ANALYZE=true)
    if (analyze) {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
      config.plugins ??= [];
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: "static",
          openAnalyzer: false,
          reportFilename: isServer
            ? `../analyze/server-${tenantId}.html`
            : `../analyze/client-${tenantId}.html`,
          generateStatsFile: true,
          statsFilename: isServer
            ? `../analyze/server-${tenantId}.json`
            : `../analyze/client-${tenantId}.json`,
        })
      );
    }

    return config;
  },
};

export default nextConfig;

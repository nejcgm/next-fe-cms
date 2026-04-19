import { notFound } from "next/navigation";
import tenantConfig from "@tenant/config";
import { getAdapter } from "@core/data/fetcher";
import { BlockRenderer } from "@core/blocks/renderer";
import { resolveTemplate } from "@core/routing/resolver";
import { buildMetadata } from "@core/seo/metadata";
import { logger } from "@shared/lib/logger";

interface PageProps {
  params: Promise<{ domain: string; slug?: string[] }>;
  searchParams: Promise<Record<string, string | undefined>>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const slugPath = slug ? `/${slug.join("/")}` : "/";

  const adapter = getAdapter(tenantConfig.id);
  const page = await adapter.getPage(tenantConfig.id, slugPath, tenantConfig.defaultLocale);

  if (!page) return {};
  return buildMetadata(page.seo, tenantConfig, { pathname: slugPath, locale: page.locale });
}

export default async function TenantPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const query = await searchParams;
  const slugPath = slug ? `/${slug.join("/")}` : "/";

  const adapter = getAdapter(tenantConfig.id);
  const page = await adapter.getPage(tenantConfig.id, slugPath, tenantConfig.defaultLocale);

  if (!page) {
    logger.warn(`Page not found: ${tenantConfig.id}${slugPath}`);
    notFound();
  }

  const Template = await resolveTemplate(tenantConfig.id, page.template);

  const blocksWithQuery = page.blocks.map((block) => ({
    ...block,
    props: {
      ...block.props,
      ...query,
    },
  }));

  return (
    <>
      {page.seo.jsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(page.seo.jsonLd) }}
        />
      ) : null}
      <Template page={page} tenant={tenantConfig}>
        <BlockRenderer
          blocks={blocksWithQuery}
          tenant={tenantConfig.id}
          locale={page.locale}
          slug={slugPath}
        />
      </Template>
    </>
  );
}

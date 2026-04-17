import type { Metadata } from "next";
import type { PageSeo } from "@core/types/page";
import type { TenantConfig } from "@core/types/tenant";

export function buildMetadata(seo: PageSeo, tenant: TenantConfig): Metadata {
  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.title,
      description: seo.description,
      images: seo.ogImage ? [{ url: seo.ogImage }] : [],
      siteName: tenant.name,
    },
    robots: seo.noIndex ? { index: false, follow: false } : undefined,
    alternates: seo.canonical ? { canonical: seo.canonical } : undefined,
  };
}

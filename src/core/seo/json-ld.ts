interface JsonLdOrganization {
  "@context": "https://schema.org";
  "@type": "Organization";
  name: string;
  url: string;
  logo?: string;
}

interface JsonLdWebPage {
  "@context": "https://schema.org";
  "@type": "WebPage";
  name: string;
  description: string;
  url: string;
}

export function buildOrganizationJsonLd(tenantName: string, url: string, logo?: string): JsonLdOrganization {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: tenantName,
    url,
    logo,
  };
}

export function buildWebPageJsonLd(title: string, description: string, url: string): JsonLdWebPage {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url,
  };
}

export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data);
}

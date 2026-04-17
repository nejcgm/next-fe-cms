import type { TenantConfig } from "@core/types/tenant";

export interface RedirectRule {
  source: string;
  destination: string;
  permanent?: boolean;
}

export function getTenantRedirects(tenant: TenantConfig): RedirectRule[] {
  // Tenant-specific redirects can be loaded from config or fetched from CMS
  return [];
}

export function matchRedirect(
  pathname: string,
  redirects: RedirectRule[]
): { destination: string; permanent: boolean } | null {
  const rule = redirects.find((r) => r.source === pathname);
  if (!rule) return null;

  return {
    destination: rule.destination,
    permanent: rule.permanent ?? true,
  };
}

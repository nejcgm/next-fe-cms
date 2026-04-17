/**
 * Strip `/{tenantId}` prefix when present (Next middleware rewrite exposes it in pathname).
 */
export function normalizeTenantPathname(pathname: string, tenantId: string): string {
  const prefix = `/${tenantId}`;
  if (pathname === prefix) return "/";
  if (pathname.startsWith(`${prefix}/`)) {
    const rest = pathname.slice(prefix.length);
    return rest || "/";
  }
  return pathname || "/";
}

/**
 * Active when pathname equals href, or pathname is under href (e.g. /bikes/x under /bikes).
 * Hash-only hrefs are never active.
 */
export function isNavItemActive(pathname: string, href: string): boolean {
  if (!href || href.startsWith("#")) return false;
  const h = href === "/" ? "/" : href.replace(/\/$/, "") || "/";
  const p = pathname.replace(/\/$/, "") || "/";
  if (p === h) return true;
  if (h !== "/" && p.startsWith(`${h}/`)) return true;
  return false;
}

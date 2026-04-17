export function buildUrl(path: string, params?: Record<string, string | number | undefined>): string {
  if (!params) return path;

  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) {
      searchParams.set(key, String(value));
    }
  }

  const queryString = searchParams.toString();
  return queryString ? `${path}?${queryString}` : path;
}

export function normalizeSlug(slug: string): string {
  if (slug === "/") return "/";
  return slug.replace(/^\//, "").replace(/\/$/, "");
}

export function isExternalHref(href: string): boolean {
  return /^(https?:)?\/\//i.test(href);
}

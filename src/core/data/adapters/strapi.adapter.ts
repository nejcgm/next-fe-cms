import type { CmsAdapter, CollectionParams } from "../contracts";
import type { PageData, NavigationData } from "@core/types/page";
import { apiClient } from "@shared/lib/api-client";
import { env } from "@/env";

export class StrapiAdapter implements CmsAdapter {
  private baseUrl = env.STRAPI_URL ?? "http://localhost:1337";
  private token = env.STRAPI_API_TOKEN ?? "";

  private headers() {
    return {
      Authorization: `Bearer ${this.token}`,
      "Content-Type": "application/json",
    };
  }

  async getPage(tenant: string, slug: string, locale: string): Promise<PageData | null> {
    const res = await apiClient<{ data: PageData[] }>(`${this.baseUrl}/api/pages`, {
      params: {
        "filters[tenant][$eq]": tenant,
        "filters[slug][$eq]": slug,
        locale,
        populate: "deep",
      },
      headers: this.headers(),
      next: { revalidate: 60, tags: [`page-${tenant}-${slug}`] },
    });

    return res.data?.[0] ?? null;
  }

  async getCollection<T>(tenant: string, collection: string, params?: CollectionParams): Promise<T[]> {
    const res = await apiClient<{ data: T[] }>(`${this.baseUrl}/api/${collection}`, {
      params: {
        "filters[tenant][$eq]": tenant,
        locale: params?.locale,
        "pagination[limit]": params?.limit,
        "pagination[start]": params?.offset,
        sort: params?.sort,
        ...params?.filters,
      },
      headers: this.headers(),
      next: { revalidate: 60, tags: [`collection-${tenant}-${collection}`] },
    });

    return res.data ?? [];
  }

  async getEntry<T>(tenant: string, collection: string, id: string): Promise<T | null> {
    const res = await apiClient<{ data: T | null }>(`${this.baseUrl}/api/${collection}/${id}`, {
      params: { populate: "deep" },
      headers: this.headers(),
      next: { revalidate: 60, tags: [`entry-${tenant}-${collection}-${id}`] },
    });

    return res.data ?? null;
  }

  async getNavigation(tenant: string, locale: string): Promise<NavigationData | null> {
    const res = await apiClient<{ data: NavigationData[] }>(`${this.baseUrl}/api/navigations`, {
      params: {
        "filters[tenant][$eq]": tenant,
        locale,
        populate: "deep",
      },
      headers: this.headers(),
      next: { revalidate: 300, tags: [`nav-${tenant}`] },
    });

    return res.data?.[0] ?? null;
  }
}

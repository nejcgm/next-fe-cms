import type { CmsAdapter, CollectionParams } from "../contracts";
import type { PageData, NavigationData } from "@core/types/page";
import { logger } from "@shared/lib/logger";

// Static import - both tenants have navigation.json
// @ts-ignore - resolved at build time by webpack alias
import nav from "@mock-data/navigation.json";

const navigation = nav as NavigationData;

function patternToRegex(pattern: string): RegExp {
  const escaped = pattern
    .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    .replace(/:[\w-]+/g, "([^/]+)");
  return new RegExp(`^${escaped}$`);
}

const pageContext = (require as unknown as { context: (d: string, b: boolean, r: RegExp) => { keys: () => string[] } }).context(
  "@mock-data/pages",
  false,
  /\.json$/
);

async function findPageByPattern(slug: string): Promise<PageData | null> {
  for (const key of pageContext.keys()) {
    const match = key.match(/^\.\/(.+)\.json$/);
    if (!match) continue;
    const pageName = match[1];
    try {
      const mod = await import(
        /* webpackInclude: /\.json$/ */
        /* webpackChunkName: "mock-page-[request]" */
        `@mock-data/pages/${pageName}.json`
      );
      const page = (mod.default ?? mod) as PageData;
      if (!page?.slug) continue;
      const pattern = page.slugPattern ?? page.slug;
      if (!pattern.includes(":")) continue;
      if (!patternToRegex(pattern).test(slug)) continue;
      return page;
    } catch {
      continue;
    }
  }
  return null;
}

export class MockAdapter implements CmsAdapter {
  async getPage(_tenant: string, slug: string, locale: string): Promise<PageData | null> {
    const normalized = slug === "/" ? "home" : slug.replace(/^\//, "").replace(/\//g, "--");

    logger.debug(`MockAdapter: Loading page for ${normalized}`);

    try {
      const mod = await import(
        /* webpackInclude: /\.json$/ */
        /* webpackChunkName: "mock-page-[request]" */
        `@mock-data/pages/${normalized}.json`
      );
      const page = mod.default as PageData;

      const cloned = { ...page };
      if (locale !== cloned.locale) {
        cloned.locale = locale;
      }
      return cloned;
    } catch {
      const page = await findPageByPattern(slug);
      if (!page) {
        logger.warn(`MockAdapter: Page not found: ${normalized}`);
        return null;
      }
      const cloned = { ...page };
      if (locale !== cloned.locale) {
        cloned.locale = locale;
      }
      return cloned;
    }
  }

  async getCollection<T>(_tenant: string, collection: string, params?: CollectionParams): Promise<T[]> {
    logger.debug(`MockAdapter: Loading collection ${collection}`);

    try {
      const mod = await import(
        /* webpackInclude: /\.json$/ */
        /* webpackChunkName: "mock-collection-[request]" */
        `@mock-data/collections/${collection}.json`
      );
      let data = mod.default as T[];

      if (params?.limit) {
        data = data.slice(0, params.limit);
      }
      return data;
    } catch {
      logger.warn(`MockAdapter: Collection not found: ${collection}`);
      return [];
    }
  }

  async getEntry<T>(_tenant: string, collection: string, id: string): Promise<T | null> {
    const items = await this.getCollection<T & { id: string }>("", collection);
    return items.find((item) => item.id === id) ?? null;
  }

  async getNavigation(_tenant: string, _locale: string): Promise<NavigationData | null> {
    return navigation;
  }
}

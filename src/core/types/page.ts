export interface PageData {
  slug: string;
  slugPattern?: string;
  locale: string;
  template: string;
  blocks: BlockInstance[];
  seo: PageSeo;
  navigation?: NavigationData;
  breadcrumbs?: Breadcrumb[];
}

export interface BlockInstance {
  id: string;
  type: string;
  props: Record<string, unknown>;
  dataContract?: string;
  visibility?: BlockVisibility;
}

export interface BlockVisibility {
  devices?: ("mobile" | "tablet" | "desktop")[];
  locales?: string[];
  dateRange?: { from?: string; to?: string };
}

export interface PageSeo {
  title: string;
  description: string;
  ogImage?: string;
  canonical?: string;
  noIndex?: boolean;
  jsonLd?: Record<string, unknown>;
}

export interface NavigationData {
  header: NavItem[];
  footer: NavItem[];
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  isExternal?: boolean;
}

export interface Breadcrumb {
  label: string;
  href: string;
}

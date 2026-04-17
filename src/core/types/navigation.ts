export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  isExternal?: boolean;
}

export interface NavigationData {
  header: NavItem[];
  footer: NavItem[];
}

export interface Breadcrumb {
  label: string;
  href: string;
}

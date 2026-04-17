export interface TenantContact {
  addressLine: string;
  phone: string;
  email: string;
}

export interface TenantConfig {
  id: string;
  name: string;
  /** Optional logo image URL for header (e.g. brand logo). When set, header shows image instead of name text. */
  logoUrl?: string;
  /** Optional contact info for footer */
  contact?: TenantContact;
  domains: string[];
  defaultLocale: string;
  locales: string[];
  features: TenantFeatures;
  theme: ThemeTokens;
  dataAdapter: "mock" | "strapi";
}

export interface TenantFeatures {
  blog: boolean;
  booking: boolean;
  reviews: boolean;
  search: boolean;
  newsletter: boolean;
  [key: string]: boolean;
}

export interface ThemeTokens {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    muted: string;
    border: string;
    textPrimary: string;
    [key: string]: string | undefined;
  };
  fonts: {
    heading: string;
    body: string;
  };
  borderRadius: string;
}

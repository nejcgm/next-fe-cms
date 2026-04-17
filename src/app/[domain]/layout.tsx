import type { Metadata } from "next";
import tenantConfig from "@tenant/config";
import { Header } from "@tenant/blocks/header/header";
import { getAdapter } from "@core/data/fetcher";
import { ThemeProvider } from "@core/theme/provider";
import { Footer } from "@shared/components/layout/footer";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ domain: string }>;
}

export async function generateMetadata(): Promise<Metadata> {
  if (!tenantConfig.logoUrl) return {};
  const icon = tenantConfig.logoUrl;
  return {
    icons: {
      icon,
      apple: icon,
      shortcut: icon,
    },
  };
}

export default async function TenantLayout({ children, params }: LayoutProps) {
  const { domain } = await params;

  const adapter = getAdapter(domain);
  const nav = await adapter.getNavigation(domain, tenantConfig.defaultLocale);

  return (
    <ThemeProvider tokens={tenantConfig.theme}>
      <div className="min-h-screen flex flex-col" suppressHydrationWarning>
        {nav?.header && (
          <Header
            tenantId={tenantConfig.id}
            tenantName={tenantConfig.name}
            navigation={nav.header}
            logoUrl={tenantConfig.logoUrl}
          />
        )}
        <main className="flex-1" suppressHydrationWarning>{children}</main>
        {nav?.footer && (
          <Footer tenantName={tenantConfig.name} navigation={nav.footer} contact={tenantConfig.contact} />
        )}
      </div>
    </ThemeProvider>
  );
}

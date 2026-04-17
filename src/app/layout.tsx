import type { Metadata } from "next";
import "./globals.css";

// Initialize core systems (registers blocks, etc.)
import "@core/init";

export const metadata: Metadata = {
  title: "Multi-Tenant CMS",
  description: "A fully dynamic, multi-tenant CMS frontend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>{children}</body>
    </html>
  );
}

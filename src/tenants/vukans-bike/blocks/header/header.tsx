"use client";

import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@shared/utils/cn";
import { isNavItemActive, normalizeTenantPathname } from "@shared/utils/nav-active";
import { isExternalHref } from "@shared/utils/url";
import type { NavItem } from "@core/types/navigation";

interface HeaderProps {
  tenantId: string;
  tenantName: string;
  navigation: NavItem[];
  logoUrl?: string;
}

export function Header({ tenantId, tenantName, navigation, logoUrl }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname() ?? "";
  const currentPath = normalizeTenantPathname(pathname, tenantId);

  return (
    <header className="bg-[var(--color-background)] border-b border-[var(--color-border)] sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="/" className="flex items-center min-w-0 shrink-0">
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt={tenantName}
                width={200}
                height={40}
                className="h-10 w-auto max-h-10 max-w-[min(200px,45vw)] object-contain object-left"
                priority
              />
            ) : (
              <span className="font-heading text-xl font-bold text-[var(--color-primary)]">
                {tenantName}
              </span>
            )}
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item) => {
              const active = isNavItemActive(currentPath, item.href);
              const external = isExternalHref(item.href);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className={cn(
                    "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    active
                      ? "text-[var(--color-primary)] bg-[var(--color-primary)]/15"
                      : "text-[var(--color-foreground)] hover:text-[var(--color-primary)] hover:bg-[var(--color-muted)]"
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-[var(--color-foreground)] hover:bg-[var(--color-muted)]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300",
            mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="py-2 space-y-1">
            {navigation.map((item) => {
              const active = isNavItemActive(currentPath, item.href);
              const external = isExternalHref(item.href);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className={cn(
                    "block px-3 py-2 text-base font-medium rounded-md transition-colors",
                    active
                      ? "text-[var(--color-primary)] bg-[var(--color-primary)]/15"
                      : "text-[var(--color-foreground)] hover:bg-[var(--color-muted)]"
                  )}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}

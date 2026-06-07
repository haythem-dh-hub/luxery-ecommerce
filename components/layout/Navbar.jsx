"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ShoppingBagOutlined from "@mui/icons-material/ShoppingBagOutlined";
import AutoAwesomeOutlined from "@mui/icons-material/AutoAwesomeOutlined";
import DashboardOutlined from "@mui/icons-material/DashboardOutlined";
import MenuRounded from "@mui/icons-material/MenuRounded";
import CloseRounded from "@mui/icons-material/CloseRounded";
import { useStore } from "@/components/shared/StoreProvider";

const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/admin", label: "Admin" },
];

export default function Navbar() {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { cartCount, setCartOpen } = useStore();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[rgba(8,6,5,0.78)] backdrop-blur-2xl">
      <div>
        <div className="navbar-shell flex w-full max-w-none items-center justify-between gap-4 rounded-none px-4 py-4 md:px-5">
          <Link href="/" className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white text-ink shadow-[0_10px_30px_rgba(255,255,255,0.08)]">
              TM
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-bronze/80">
                Luxury Commerce
              </p>
              <h1 className="font-display text-xl tracking-[-0.04em]">Toxic Man</h1>
            </div>
          </Link>

          <button
            type="button"
            className="navbar-icon-button grid h-11 w-11 place-items-center rounded-2xl md:hidden"
            onClick={() => setMenuOpen((current) => !current)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {menuOpen ? <CloseRounded /> : <MenuRounded />}
          </button>

          <nav className="hidden items-center gap-2 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link-luxury"
                onMouseEnter={() => setHoveredLink(link.href)}
                onMouseLeave={() => setHoveredLink((current) =>
                  current === link.href ? null : current,
                )}
              >
                <span
                  className={
                    hoveredLink === link.href
                      ? "nav-link-luxury__label is-active"
                      : "nav-link-luxury__label"
                  }
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex md:gap-3">
          
            <Link
              href="/admin"
              className="navbar-icon-button grid h-11 w-11 place-items-center rounded-2xl"
            >
              <DashboardOutlined fontSize="small" />
            </Link>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="navbar-cart-button rounded-2xl px-4 py-3 font-semibold text-ink"
            >
              <ShoppingBagOutlined fontSize="small" className="mr-2" />
              Cart
              <span className="ml-2 rounded-full bg-black/12 px-2 py-1 text-xs text-ink">
                {cartCount}
              </span>
            </button>
          </div>
        </div>

        <div className={menuOpen ? "mobile-nav-panel is-open md:hidden" : "mobile-nav-panel md:hidden"}>
          <div className="space-y-3 px-4 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={
                  pathname === link.href
                    ? "mobile-nav-link is-active"
                    : "mobile-nav-link"
                }
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-3 pt-2">
              <Link
                href="/admin"
                className="navbar-icon-button grid h-11 w-11 place-items-center rounded-2xl"
              >
                <DashboardOutlined fontSize="small" />
              </Link>
              <button
                type="button"
                onClick={() => setCartOpen(true)}
                className="navbar-cart-button flex-1 rounded-2xl px-4 py-3 text-sm font-semibold text-ink"
              >
                <ShoppingBagOutlined fontSize="small" className="mr-2" />
                Open cart
                <span className="ml-2 rounded-full bg-black/12 px-2 py-1 text-xs text-ink">
                  {cartCount}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

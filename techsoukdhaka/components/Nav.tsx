"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useStore } from "@/context/StoreContext";

const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const { itemCount, toggleCart } = useStore();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav>
      <Link href="/" className="nav-logo">
        TECH<span>SOUK</span> DHAKA
      </Link>
      <div className={`nav-links${mobileOpen ? " mobile-open" : ""}`}>
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={pathname === l.href ? "active" : ""}
            onClick={() => setMobileOpen(false)}
          >
            {l.label}
          </Link>
        ))}
      </div>
      <div className="nav-icons">
        <Link href="/account" className="nav-icon-btn" aria-label="Account">
          <i className="fa-regular fa-user" />
        </Link>
        <button
          className="nav-icon-btn"
          onClick={toggleCart}
          aria-label="Cart"
        >
          <i className="fa-solid fa-cart-shopping" />
          <span className={`cart-badge${itemCount === 0 ? " empty" : ""}`}>
            {itemCount}
          </span>
        </button>
        <button
          className="nav-mobile-btn"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Menu"
        >
          <i className="fa-solid fa-bars" />
        </button>
      </div>
    </nav>
  );
}
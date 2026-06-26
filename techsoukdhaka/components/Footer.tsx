"use client";

import Link from "next/link";
import { useStore } from "@/context/StoreContext";

export default function Footer() {
  const { notify } = useStore();

  const info: Record<string, string> = {
    delivery:
      "Delivery within 2-3 business days inside Dhaka, 3-5 days outside Dhaka. Free shipping on orders above ৳500.",
    returns:
      "Easy returns within 7 days. Contact our support team via WhatsApp for assistance.",
    faq: "Common questions answered in our FAQ section. For more help, reach out via WhatsApp or phone.",
  };

  return (
    <footer>
      <div className="footer-grid">
        <div>
          <div className="footer-brand-name">
            TECH<span>SOUK</span> DHAKA
          </div>
          <p className="footer-desc">
            Bangladesh&apos;s trusted supplier of certified fire safety products
            for homes and businesses. Delivering safety since 2009.
          </p>
        </div>
        <div className="footer-col">
          <h5>Shop</h5>
          <Link href="/shop">All Products</Link>
          <Link href="/shop?category=extinguisher">Fire Extinguishers</Link>
          <Link href="/shop?category=detector">Smoke Detectors</Link>
          <Link href="/shop?category=blanket">Fire Blankets</Link>
        </div>
        <div className="footer-col">
          <h5>Help</h5>
          <a onClick={() => notify(info.delivery)}>Delivery Info</a>
          <a onClick={() => notify(info.returns)}>Returns &amp; Refunds</a>
          <a onClick={() => notify(info.faq)}>FAQ</a>
          <Link href="/about">About Us</Link>
          <Link href="/contact">Contact Us</Link>
        </div>
        <div className="footer-col">
          <h5>Contact</h5>
          <a href="tel:01919292764">01919292764</a>
          <a href="tel:01733386767">01733386767</a>
          <a href="mailto:info@techsoukdhaka.com">info@techsoukdhaka.com</a>
          <a>Dhaka, Bangladesh</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2025 TechSouk Dhaka. All rights reserved.</span>
        <div className="social-links">
          <a href="#" aria-label="Facebook">
            <i className="fa-brands fa-facebook" />
          </a>
          <a href="#" aria-label="Instagram">
            <i className="fa-brands fa-instagram" />
          </a>
          <a href="#" aria-label="YouTube">
            <i className="fa-brands fa-youtube" />
          </a>
        </div>
      </div>
    </footer>
  );
}
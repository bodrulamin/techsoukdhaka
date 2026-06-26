"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import FireCanvas from "@/components/FireCanvas";
import ProductCard from "@/components/ProductCard";
import { filterProducts } from "@/lib/products";
import { Category } from "@/lib/types";

const filters: { value: Category | "all"; label: string }[] = [
  { value: "all", label: "All Products" },
  { value: "extinguisher", label: "Extinguishers" },
  { value: "detector", label: "Smoke Detectors" },
  { value: "blanket", label: "Fire Blankets" },
  { value: "emergency", label: "Emergency Lights" },
  { value: "valve", label: "Valves & Fittings" },
];

export default function ShopClient() {
  const searchParams = useSearchParams();
  const [active, setActive] = useState<Category | "all">("all");

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setActive(cat as Category);
    else setActive("all");
  }, [searchParams]);

  const visible = filterProducts(active);

  return (
    <section className="section shop-section">
      <div className="shop-fire-bg">
        <FireCanvas variant="shop" />
      </div>

      <div className="section-label">Our Products</div>
      <h2 className="section-title">Fire Safety Shop</h2>
      <p className="section-sub">
        Browse our complete range of certified fire safety products for your
        home.
      </p>

      <div
        style={{
          display: "flex",
          gap: "1rem",
          marginBottom: "2rem",
          flexWrap: "wrap",
        }}
      >
        {filters.map((f) => (
          <button
            key={f.value}
            className="btn-outline"
            style={{
              padding: "0.5rem 1rem",
              fontSize: "0.8rem",
              ...(active === f.value
                ? { borderColor: "var(--fire)", color: "var(--fire)" }
                : {}),
            }}
            onClick={() => setActive(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="products-grid">
        {visible.map((p) => (
          <ProductCard product={p} key={p.id} />
        ))}
      </div>
    </section>
  );
}
import Link from "next/link";

const categories = [
  { icon: "fa-shield-halved", label: "Fire Protection Valves & Fittings" },
  { icon: "fa-bell", label: "Fire Alarm Systems" },
  { icon: "fa-door-closed", label: "Fire Doors & Accessories" },
  { icon: "fa-water", label: "Fire Pumps" },
  { icon: "fa-fan", label: "HVAC Valves & Fittings" },
  { icon: "fa-wrench", label: "Plumbing Valves & Fittings" },
  { icon: "fa-house-flood-water", label: "Domestic Pumps" },
  { icon: "fa-industry", label: "Industrial Pumps" },
];

export default function AboutPage() {
  return (
    <section className="section">
      <div className="section-label">About Us</div>
      <h2 className="section-title">About TechSouk Dhaka</h2>
      <p className="section-sub">
        Your trusted partner for fire safety and industrial solutions in
        Bangladesh.
      </p>

      <div
        style={{
          maxWidth: "800px",
          background: "var(--panel)",
          padding: "2.5rem",
          borderRadius: "8px",
          border: "1px solid var(--border)",
        }}
      >
        <p
          style={{
            color: "var(--smoke)",
            lineHeight: 1.8,
            fontSize: "1rem",
            marginBottom: "1.5rem",
          }}
        >
          TechSouk Dhaka is a leading importer, stockholder, wholesaler and
          supplier for HVAC Valves &amp; Fittings, Plumbing Valves &amp;
          Fittings, Fire Protection Valves &amp; Fittings (UL Listed &amp; FM
          Approved), Fire Alarm System (UL Listed &amp; FM Approved), Fire Door
          &amp; Accessories (UL Listed), UL Listed &amp; FM Approved Fire Pump,
          Domestic Pump, Industrial Water &amp; Chemical Transfer Pump.
        </p>
        <p
          style={{
            color: "var(--steel)",
            lineHeight: 1.8,
            fontSize: "0.95rem",
            marginBottom: "2rem",
          }}
        >
          We are committed to providing high-quality, certified fire safety
          products that meet international standards including UL (Underwriters
          Laboratories) and FM (Factory Mutual) approvals. Our products are
          designed to protect lives and property in residential, commercial, and
          industrial settings.
        </p>

        <h3
          style={{
            fontFamily: "var(--font-rajdhani)",
            fontSize: "1.5rem",
            fontWeight: 600,
            color: "var(--fire)",
            marginBottom: "1rem",
          }}
        >
          Our Product Categories
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          {categories.map((c) => (
            <div
              key={c.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                color: "var(--smoke)",
                fontSize: "0.9rem",
              }}
            >
              <i className={`fa-solid ${c.icon}`} style={{ color: "var(--fire)" }} />
              <span>{c.label}</span>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
          {["UL Listed", "FM Approved", "BNBC Compliant"].map((tag) => (
            <span
              key={tag}
              style={{
                background: "rgba(255,69,0,0.15)",
                color: "var(--fire)",
                padding: "0.4rem 1rem",
                borderRadius: "20px",
                fontSize: "0.85rem",
                fontWeight: 500,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div style={{ marginTop: "3rem", textAlign: "center" }}>
        <Link className="btn-primary" href="/contact">
          <i className="fa-solid fa-envelope" />
          Contact Us
        </Link>
        <Link className="btn-outline" href="/shop" style={{ marginLeft: "1rem" }}>
          <i className="fa-solid fa-shopping-bag" />
          Browse Products
        </Link>
      </div>
    </section>
  );
}
const cardStyle: React.CSSProperties = {
  background: "var(--panel)",
  padding: "2rem",
  borderRadius: "8px",
  border: "1px solid var(--border)",
};

const iconCircle: React.CSSProperties = {
  width: "45px",
  height: "45px",
  background: "rgba(255,69,0,0.15)",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const headStyle: React.CSSProperties = {
  fontFamily: "var(--font-rajdhani)",
  fontSize: "1.2rem",
  fontWeight: 600,
};

export default function ContactPage() {
  return (
    <section className="section">
      <div className="section-label">Get In Touch</div>
      <h2 className="section-title">Contact Us</h2>
      <p className="section-sub">
        Have questions? We&apos;re here to help. Reach out to us through any of
        these channels.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
          maxWidth: "900px",
        }}
      >
        <div style={cardStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={iconCircle}>
              <i className="fa-solid fa-location-dot" style={{ color: "var(--fire)", fontSize: "1.2rem" }} />
            </div>
            <h3 style={headStyle}>Our Address</h3>
          </div>
          <p style={{ color: "var(--steel)", lineHeight: 1.7, fontSize: "0.95rem" }}>
            154, Mazed Sarder Tower, 1st Floor,
            <br />
            Osman Gani Road (Alubazar),
            <br />
            Nababpur, Dhaka
          </p>
        </div>

        <div style={cardStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={iconCircle}>
              <i className="fa-solid fa-phone" style={{ color: "var(--fire)", fontSize: "1.2rem" }} />
            </div>
            <h3 style={headStyle}>Call Us</h3>
          </div>
          <div style={{ color: "var(--steel)", lineHeight: 1.7 }}>
            <a
              href="tel:01919292764"
              style={{ color: "var(--smoke)", textDecoration: "none", display: "block", marginBottom: "0.5rem", fontSize: "0.95rem" }}
            >
              <i className="fa-solid fa-phone-flip" style={{ color: "var(--fire)", marginRight: "0.5rem", fontSize: "0.85rem" }} />
              01919292764
            </a>
            <a
              href="tel:01733386767"
              style={{ color: "var(--smoke)", textDecoration: "none", display: "block", fontSize: "0.95rem" }}
            >
              <i className="fa-solid fa-phone-flip" style={{ color: "var(--fire)", marginRight: "0.5rem", fontSize: "0.85rem" }} />
              01733386767
            </a>
          </div>
        </div>

        <div style={cardStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={iconCircle}>
              <i className="fa-solid fa-envelope" style={{ color: "var(--fire)", fontSize: "1.2rem" }} />
            </div>
            <h3 style={headStyle}>Email Us</h3>
          </div>
          <p style={{ color: "var(--steel)", lineHeight: 1.7, fontSize: "0.95rem" }}>
            <a href="mailto:info@techsoukdhaka.com" style={{ color: "var(--smoke)", textDecoration: "none" }}>
              <i className="fa-solid fa-paper-plane" style={{ color: "var(--fire)", marginRight: "0.5rem", fontSize: "0.85rem" }} />
              info@techsoukdhaka.com
            </a>
          </p>
        </div>
      </div>

      <div
        style={{
          marginTop: "3rem",
          textAlign: "center",
          padding: "2rem",
          background: "rgba(255,69,0,0.08)",
          borderRadius: "8px",
          border: "1px solid rgba(255,69,0,0.2)",
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-rajdhani)",
            fontSize: "1.3rem",
            fontWeight: 600,
            color: "var(--smoke)",
            marginBottom: "1rem",
          }}
        >
          Quick Connect
        </h3>
        <p style={{ color: "var(--steel)", fontSize: "0.9rem", marginBottom: "1.5rem" }}>
          Get instant support through WhatsApp
        </p>
        <a
          href="https://wa.me/8801919292764"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
        >
          <i className="fa-brands fa-whatsapp" />
          Chat on WhatsApp
        </a>
      </div>
    </section>
  );
}
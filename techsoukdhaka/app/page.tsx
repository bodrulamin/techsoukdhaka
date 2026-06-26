import Link from "next/link";
import FireCanvas from "@/components/FireCanvas";
import ProductCard from "@/components/ProductCard";
import StatCounter from "@/components/StatCounter";
import { products } from "@/lib/products";

const categories = [
  {
    slug: "extinguisher",
    name: "Fire Extinguishers",
    count: "6 Products",
    paths: (
      <>
        <path d="M16 16 L16 8 L32 8 L32 16" />
        <rect x="12" y="16" width="24" height="28" rx="2" />
        <path d="M20 8 L20 4 L28 4 L28 8" />
        <path d="M16 28 Q24 32 32 28" />
      </>
    ),
  },
  {
    slug: "detector",
    name: "Smoke Detectors",
    count: "3 Products",
    paths: (
      <>
        <circle cx="24" cy="24" r="10" />
        <path d="M24 8 L24 14" />
        <path d="M24 34 L24 40" />
        <path d="M8 24 L14 24" />
        <path d="M34 24 L40 24" />
        <circle cx="24" cy="24" r="4" fill="currentColor" />
      </>
    ),
  },
  {
    slug: "blanket",
    name: "Fire Blankets",
    count: "2 Products",
    paths: (
      <>
        <rect x="8" y="16" width="32" height="20" rx="2" />
        <path d="M16 12 L16 16 L32 16 L32 12" />
        <line x1="16" y1="20" x2="16" y2="32" />
        <line x1="24" y1="20" x2="24" y2="32" />
        <line x1="32" y1="20" x2="32" y2="32" />
      </>
    ),
  },
  {
    slug: "emergency",
    name: "Emergency Lights",
    count: "3 Products",
    paths: (
      <>
        <circle cx="24" cy="24" r="8" />
        <path d="M24 8 L24 16" />
        <path d="M24 32 L24 40" />
        <path d="M8 24 L16 24" />
        <path d="M32 24 L40 24" />
      </>
    ),
  },
  {
    slug: "firstaid",
    name: "First Aid Kits",
    count: "2 Products",
    paths: (
      <>
        <rect x="8" y="12" width="32" height="28" rx="2" />
        <rect x="22" y="8" width="4" height="8" />
        <path d="M24 18 L24 34" />
        <path d="M16 26 L32 26" />
      </>
    ),
  },
  {
    slug: "signs",
    name: "Safety Signs",
    count: "4 Products",
    paths: (
      <>
        <rect x="8" y="8" width="32" height="32" rx="2" />
        <path d="M16 16 L32 32" />
        <path d="M32 16 L16 32" />
      </>
    ),
  },
];


const testimonials = [
  {
    stars: "★★★★★",
    text: "Ordered 2 fire extinguishers for my home. Delivery was fast and products are genuine. Very satisfied with the service!",
    name: "Rahim Ahmed",
    location: "Dhanmondi, Dhaka",
  },
  {
    stars: "★★★★★",
    text: "The smoke detector I bought works perfectly. Installation guide was helpful. Thank you TechSouk for making home safety accessible.",
    name: "Fatema Begum",
    location: "Uttara, Dhaka",
  },
  {
    stars: "★★★★☆",
    text: "Good quality products at reasonable prices. The fire blanket came in handy during a small kitchen incident. Highly recommend!",
    name: "Karim Uddin",
    location: "Sylhet",
  },
];

const features = [
  {
    icon: "fa-certificate",
    title: "Certified Products",
    desc: "All products are UL Listed and BNBC compliant",
  },
  {
    icon: "fa-truck-fast",
    title: "Fast Delivery",
    desc: "Delivery within 2-3 days anywhere in Bangladesh",
  },
  {
    icon: "fa-headset",
    title: "Expert Support",
    desc: "Free consultation for home safety planning",
  },
  {
    icon: "fa-shield-halved",
    title: "Warranty",
    desc: "1-year warranty on all fire safety equipment",
  },
];

export default function Home() {
  const featured = products.slice(0, 8);

  return (
    <>
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <FireCanvas variant="hero" />

        <div className="hero-content">
          <div className="hero-eyebrow">
            UL Listed · BNBC Compliant · Home Delivery
          </div>
          <h1>
            FIRE SAFETY
            <br />
            <span className="accent">FOR YOUR HOME</span>
          </h1>
          <p className="hero-sub">
            Protect your family with certified fire safety equipment. Fire
            extinguishers, smoke detectors, and more — delivered to your door
            anywhere in Bangladesh.
          </p>
          <div className="hero-actions">
            <Link className="btn-primary" href="/shop">
              Shop Now <i className="fa-solid fa-arrow-right" />
            </Link>
            <Link className="btn-outline" href="/shop">
              View Products
            </Link>
          </div>
        </div>

        <div className="hero-stats">
          <div className="stat-item">
            <div className="stat-num">
              <StatCounter target={5000} />
              <span>+</span>
            </div>
            <div className="stat-label">Homes Protected</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">
              <StatCounter target={15} />
              <span>+</span>
            </div>
            <div className="stat-label">Years Experience</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">
              4.8<span>★</span>
            </div>
            <div className="stat-label">Customer Rating</div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="features-grid">
          {features.map((f) => (
            <div className="feature-card" key={f.title}>
              <div className="feature-icon">
                <i className={`fa-solid ${f.icon}`} />
              </div>
              <div className="feature-title">{f.title}</div>
              <div className="feature-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-label">Product Range</div>
        <h2 className="section-title">Shop by Category</h2>
        <p className="section-sub">
          Find the right fire safety equipment for your home.
        </p>

        <div className="categories-grid">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/shop?category=${c.slug}`}
              className="cat-card"
            >
              <svg
                className="cat-icon"
                viewBox="0 0 48 48"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                {c.paths}
              </svg>
              <div className="cat-name">{c.name}</div>
              <div className="cat-count">{c.count}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-label">Our Products</div>
        <h2 className="section-title">Featured Fire Safety Products</h2>
        <p className="section-sub">
          Browse our best-selling fire safety equipment for your home.
        </p>

        <div className="products-grid">
          {featured.map((p) => (
            <ProductCard product={p} key={p.id} />
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <Link className="btn-primary" href="/shop">
            View All Products <i className="fa-solid fa-arrow-right" />
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Customer Reviews</div>
        <h2 className="section-title">What Our Customers Say</h2>
        <p className="section-sub">
          Trusted by thousands of homeowners across Bangladesh.
        </p>

        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <div className="testimonial-card" key={t.name}>
              <div className="testimonial-stars">{t.stars}</div>
              <p className="testimonial-text">&quot;{t.text}&quot;</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar" />
                <div>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-location">{t.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
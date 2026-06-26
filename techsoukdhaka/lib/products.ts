import { Category, Product } from "./types";

export const products: Product[] = [
  {
    id: 14,
    name: "Gate Valve",
    category: "valve",
    price: 1200,
    oldPrice: null,
    rating: 4.6,
    reviews: 18,
    badge: null,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCMrgi40tkCUTXApDgNaej3ivmuktzXG1VkyhWoZ6neq_Ljqzz28YPHfkD&s=10",
    specs: "Brass construction · Full bore design · Threaded ends",
  },
  {
    id: 15,
    name: "Y Strainer - Stainless Steel",
    category: "valve",
    price: 1800,
    oldPrice: null,
    rating: 4.7,
    reviews: 25,
    badge: "new",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbuXkKKVY_2E8jrfodegaxMg3CohUmC0DjQSjh3Hek-5mGMSJZOHiDPsw&s=10",
    specs: "304 SS · Mesh filter · Easy cleaning",
  },
  {
    id: 16,
    name: "Butterfly Valve",
    category: "valve",
    price: 2500,
    oldPrice: null,
    rating: 4.8,
    reviews: 32,
    badge: "popular",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUX4n8jp6N-AYyvvqoJwlobkcyPPFmemsc3T8RiqQ78w&s=10",
    specs: "Cast iron body · EPDM seat · 150lb rating",
  },
  {
    id: 17,
    name: "Check Valve",
    category: "valve",
    price: 1600,
    oldPrice: null,
    rating: 4.5,
    reviews: 15,
    badge: null,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiLqsvysJXLMEgS3ZRNa0q9QUau1oPheSst-PnKhWfNIQPvc0dAcxSEd8&s=10",
    specs: "Prevents backflow · Brass body · Spring loaded",
  },
  {
    id: 1,
    name: "ABC Dry Powder Fire Extinguisher - 1kg",
    category: "extinguisher",
    price: 850,
    oldPrice: null,
    rating: 4.8,
    reviews: 124,
    badge: "bestseller",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8iShMzzmBsP3HYNaOKAtPuGcU8hW5yftcfGs1bVUrXezV47MZfYx2WfI&s=10",
    specs: "Suitable for: Class A, B, C fires · Easy to use · 1-year warranty",
  },
  {
    id: 2,
    name: "ABC Dry Powder Fire Extinguisher - 2kg",
    category: "extinguisher",
    price: 1200,
    oldPrice: null,
    rating: 4.9,
    reviews: 89,
    badge: "popular",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8iShMzzmBsP3HYNaOKAtPuGcU8hW5yftcfGs1bVUrXezV47MZfYx2WfI&s=10",
    specs: "Suitable for: Class A, B, C fires · Home & office use · Certified",
  },
  {
    id: 3,
    name: "ABC Dry Powder Fire Extinguisher - 4kg",
    category: "extinguisher",
    price: 1850,
    oldPrice: 2100,
    rating: 4.7,
    reviews: 156,
    badge: "sale",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8iShMzzmBsP3HYNaOKAtPuGcU8hW5yftcfGs1bVUrXezV47MZfYx2WfI&s=10",
    specs: "Heavy duty · Class A, B, C · Refillable",
  },
  {
    id: 4,
    name: "ABC Dry Powder Fire Extinguisher - 6kg",
    category: "extinguisher",
    price: 2400,
    oldPrice: null,
    rating: 4.8,
    reviews: 72,
    badge: null,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8iShMzzmBsP3HYNaOKAtPuGcU8hW5yftcfGs1bVUrXezV47MZfYx2WfI&s=10",
    specs: "Large spaces · Factory/warehouse · High capacity",
  },
  {
    id: 5,
    name: "CO2 Fire Extinguisher - 2kg",
    category: "extinguisher",
    price: 2800,
    oldPrice: null,
    rating: 4.6,
    reviews: 45,
    badge: "new",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQLHUeYqEI_AGbpTZLYwtH5Q5krf0IHCWpMwDA8k6XHQ&s=10",
    specs: "Class B & electrical fires · Clean agent · No residue",
  },
  {
    id: 6,
    name: "Photoelectric Smoke Detector",
    category: "detector",
    price: 1500,
    oldPrice: null,
    rating: 4.9,
    reviews: 203,
    badge: "bestseller",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA3ZB-qx5EWqis3rw0AhVSn67GRlShsm6uQ5TUaWrzfg&s=10",
    specs: "Early detection · Low battery alert · Easy install",
  },
  {
    id: 7,
    name: "Ionization Smoke Detector",
    category: "detector",
    price: 1350,
    oldPrice: null,
    rating: 4.7,
    reviews: 87,
    badge: null,
    image:
      "https://5.imimg.com/data5/SELLER/Default/2021/1/VE/CD/VT/16112517/smoke-detectors-500x500.jpg",
    specs: "Fast flaming fires · 10-year life · Test button",
  },
  {
    id: 8,
    name: "Heat Detector - Fixed Temperature 68°C",
    category: "detector",
    price: 1100,
    oldPrice: null,
    rating: 4.5,
    reviews: 34,
    badge: null,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlQDftgz2L2RO731WyleC9dtNQUyUOAQRszZ1-7dWT-FJh1QvtSrU6GtxP&s=10",
    specs: "Kitchen use · Dust resistant · Reliable",
  },
  {
    id: 9,
    name: "Fire Blanket - 1.2m x 1.2m",
    category: "blanket",
    price: 650,
    oldPrice: null,
    rating: 4.8,
    reviews: 167,
    badge: "bestseller",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzzT2ovUwvzRd-ss29VuxAGpbUx1ImfpDoS_gucx64xb3Ep8Dax2zLt-rI&s=10",
    specs: "Fiberglass · 550°C rating · Wall pouch included",
  },
  {
    id: 10,
    name: "Fire Blanket - 1.8m x 1.8m",
    category: "blanket",
    price: 950,
    oldPrice: null,
    rating: 4.7,
    reviews: 52,
    badge: null,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzzT2ovUwvzRd-ss29VuxAGpbUx1ImfpDoS_gucx64xb3Ep8Dax2zLt-rI&s=10",
    specs: "Large area coverage · Heavy duty · Quick release",
  },
  {
    id: 11,
    name: "LED Emergency Light - 3W",
    category: "emergency",
    price: 950,
    oldPrice: 1200,
    rating: 4.6,
    reviews: 78,
    badge: "sale",
    image:
      "https://lightforcecorp.com/cdn/shop/files/EmergencyLightC5033WBLACKNO_2048x.jpg?v=1688706939",
    specs: "3-hour backup · Auto on · Wall mountable",
  },
  {
    id: 12,
    name: "LED Emergency Light - Double Head",
    category: "emergency",
    price: 1350,
    oldPrice: null,
    rating: 4.7,
    reviews: 91,
    badge: "popular",
    image:
      "https://lightforcecorp.com/cdn/shop/files/EmergencyLightC5033WBLACKNO_2048x.jpg?v=1688706939",
    specs: "5-hour backup · Adjustable heads · Charging indicator",
  },
  {
    id: 13,
    name: "Exit Sign Board - LED",
    category: "emergency",
    price: 1100,
    oldPrice: null,
    rating: 4.5,
    reviews: 23,
    badge: null,
    image:
      "https://5.imimg.com/data5/SS/AW/RR/SELLER-81864289/led-exit-sign-board.jpg",
    specs: "Illuminated · Fire-rated · Arabic/English",
  },
];

const categoryNames: Record<string, string> = {
  extinguisher: "Fire Extinguisher",
  detector: "Smoke Detector",
  blanket: "Fire Blanket",
  emergency: "Emergency Light",
  firstaid: "First Aid Kit",
  signs: "Safety Sign",
  valve: "Valves & Fittings",
};

export function getCategoryName(category: string): string {
  return categoryNames[category] || "Safety Product";
}

export function getProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}

export const PRODUCT_FALLBACK_SVG =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48' fill='none' stroke='%23333' stroke-width='1'><rect x='16' y='16' width='16' height='28' rx='2'/><path d='M16 16 L16 8 L32 8 L32 16'/></svg>";

export function filterProducts(category: Category | "all"): Product[] {
  return category === "all"
    ? products
    : products.filter((p) => p.category === category);
}

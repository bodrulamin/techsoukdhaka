"use client";

import { Product } from "@/lib/types";
import { getCategoryName } from "@/lib/products";
import { useStore } from "@/context/StoreContext";
import ProductImage from "./ProductImage";

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  return (
    <>
      {"★".repeat(full)}
      {"☆".repeat(5 - full)}
    </>
  );
}

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useStore();

  return (
    <div className="product-card" onClick={() => addToCart(product)}>
      <div className="product-img">
        {product.badge && (
          <div
            className={`product-badge ${
              product.badge === "sale"
                ? "sale"
                : product.badge === "new"
                  ? "new"
                  : ""
            }`}
          >
            {product.badge}
          </div>
        )}
        <ProductImage src={product.image} alt={product.name} />
      </div>
      <div className="product-info">
        <div className="product-cat">{getCategoryName(product.category)}</div>
        <div className="product-name">{product.name}</div>
        <div className="product-rating">
          <Stars rating={product.rating} />
          <span>({product.reviews})</span>
        </div>
        <div className="product-footer">
          <div className="product-price">
            ৳{product.price.toLocaleString()}
            {product.oldPrice && (
              <span className="old">৳{product.oldPrice.toLocaleString()}</span>
            )}
          </div>
          <button
            className="btn-add-cart"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            aria-label="Add to cart"
          >
            <i className="fa-solid fa-plus" />
          </button>
        </div>
      </div>
    </div>
  );
}
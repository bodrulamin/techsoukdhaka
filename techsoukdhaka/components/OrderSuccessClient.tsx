"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function OrderSuccessClient() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order") || "TS-XXXXX";

  return (
    <div className="order-success">
      <div className="success-icon">
        <i className="fa-solid fa-check" />
      </div>
      <h2>Order Placed Successfully!</h2>
      <p>Thank you for your order. We&apos;ll send you updates via SMS and email.</p>
      <div className="order-number">
        Order Number: <span>{orderNumber}</span>
      </div>
      <p style={{ fontSize: "0.9rem" }}>
        Estimated Delivery: <strong>2-3 Business Days</strong>
      </p>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          marginTop: "2rem",
        }}
      >
        <Link className="btn-outline" href="/account">
          View Orders
        </Link>
        <Link className="btn-primary" href="/shop">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
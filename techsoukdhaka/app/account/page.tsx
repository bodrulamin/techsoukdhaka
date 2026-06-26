"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useStore } from "@/context/StoreContext";

export default function AccountPage() {
  const { user, orders, logout } = useStore();
  const router = useRouter();

  useEffect(() => {
    // Allow a tick for store hydration before redirecting guests
    const t = setTimeout(() => {
      if (!user) router.replace("/login");
    }, 50);
    return () => clearTimeout(t);
  }, [user, router]);

  if (!user) return <div className="account-container" />;

  const userOrders = orders.filter((o) => o.userId === user.email);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="account-container">
      <div className="account-header">
        <div className="account-avatar">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div className="account-info">
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
        <button
          className="btn-outline"
          onClick={handleLogout}
          style={{ marginLeft: "auto" }}
        >
          Sign Out
        </button>
      </div>

      <h3
        style={{
          fontFamily: "var(--font-rajdhani)",
          fontSize: "1.3rem",
          fontWeight: 700,
          marginBottom: "1.5rem",
        }}
      >
        Order History
      </h3>

      {userOrders.length === 0 ? (
        <div style={{ textAlign: "center", padding: "3rem", color: "var(--steel)" }}>
          <i
            className="fa-solid fa-box-open"
            style={{ fontSize: "3rem", marginBottom: "1rem", opacity: 0.3 }}
          />
          <p>No orders yet. Start shopping!</p>
          <Link className="btn-primary" href="/shop" style={{ marginTop: "1rem" }}>
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="orders-grid">
          {userOrders.map((order) => (
            <div className="order-card" key={order.orderNumber}>
              <div className="order-header">
                <span className="order-number">{order.orderNumber}</span>
                <span
                  className={`order-status ${
                    order.status === "Delivered" ? "delivered" : "processing"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <div className="order-items">
                {order.items.map((item, i) => (
                  <div className="order-item-thumb" key={i}>
                    {item.name.split("-")[0].trim().substring(0, 15)}...
                  </div>
                ))}
              </div>
              <div className="order-total">
                <span>Total</span>
                <span>৳{order.totals.total.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
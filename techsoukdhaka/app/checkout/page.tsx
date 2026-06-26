"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useStore } from "@/context/StoreContext";
import { ShippingInfo } from "@/lib/types";

const steps = ["Account", "Shipping", "Payment", "Confirm"];

const paymentMethods = [
  { value: "cod", label: "Cash on Delivery (COD)", icon: <i className="fa-solid fa-money-bill-wave" /> },
  { value: "bkash", label: "bKash", icon: "bKash" },
  { value: "nagad", label: "Nagad", icon: "Nagad" },
  { value: "card", label: "Card Payment", icon: <i className="fa-solid fa-credit-card" /> },
];

const paymentLabels: Record<string, string> = {
  cod: "Cash on Delivery",
  bkash: "bKash",
  nagad: "Nagad",
  card: "Card Payment",
};

function OrderSummary() {
  const { cart, totals } = useStore();
  return (
    <div className="order-summary">
      <h3>Order Summary</h3>
      <div>
        {cart.items.map((item) => (
          <div className="summary-item" key={item.id}>
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>৳{(item.price * item.quantity).toLocaleString()}</span>
          </div>
        ))}
      </div>
      <div className="summary-item">
        <span>Subtotal</span>
        <span>৳{totals.subtotal.toLocaleString()}</span>
      </div>
      <div className="summary-item">
        <span>Shipping</span>
        <span>
          {totals.shipping === 0 && totals.subtotal > 0
            ? "FREE"
            : "৳" + totals.shipping}
        </span>
      </div>
      <div className="summary-item total">
        <span>Total</span>
        <span>৳{totals.total.toLocaleString()}</span>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  const { login, placeOrder } = useStore();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("customer@demo.com");
  const [password, setPassword] = useState("demo123");
  const [payment, setPayment] = useState("cod");
  const [shipping, setShipping] = useState<ShippingInfo>({
    name: "",
    phone: "",
    email: "",
    division: "dhaka",
    city: "",
    address: "",
  });

  const updateShipping = (key: keyof ShippingInfo, value: string) =>
    setShipping((prev) => ({ ...prev, [key]: value }));

  const handleSignIn = () => {
    if (login(email, password)) setStep(2);
  };

  const handlePlaceOrder = () => {
    const orderNumber = placeOrder(shipping, payment);
    router.push(`/order-success?order=${orderNumber}`);
  };

  return (
    <div className="checkout-container">
      <div className="checkout-steps">
        {steps.map((label, i) => {
          const n = i + 1;
          const cls =
            n < step ? "completed" : n === step ? "active" : "";
          return (
            <div className={`checkout-step ${cls}`} key={label}>
              <div className="step-num">{n}</div>
              <span>{label}</span>
            </div>
          );
        })}
      </div>

      {step === 1 && (
        <div>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 className="section-title">Continue to Checkout</h2>
            <p className="section-sub" style={{ margin: "0 auto 2rem" }}>
              Already have an account? Sign in for faster checkout.
            </p>
          </div>
          <div className="checkout-grid">
            <div>
              <button
                className="btn-primary"
                onClick={() => setStep(2)}
                style={{ width: "100%", marginBottom: "1rem" }}
              >
                Continue as Guest
              </button>
              <div style={{ textAlign: "center", margin: "2rem 0", color: "var(--steel)" }}>
                or
              </div>
              <div className="login-box">
                <h2>Sign In</h2>
                <p>Use demo account for quick access</p>
                <span className="demo-badge">Demo Account Pre-filled</span>
                <div className="form-field">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button
                  className="btn-primary"
                  onClick={handleSignIn}
                  style={{ width: "100%", marginTop: "1rem" }}
                >
                  Sign In
                </button>
              </div>
            </div>
            <OrderSummary />
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="section-title">Shipping Information</h2>
          <p className="section-sub">Enter your delivery details.</p>
          <div className="checkout-grid">
            <div className="checkout-form">
              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Your full name"
                    value={shipping.name}
                    onChange={(e) => updateShipping("name", e.target.value)}
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Phone *</label>
                  <input
                    type="tel"
                    className="form-input"
                    placeholder="+880 1XXX-XXXXXX"
                    value={shipping.phone}
                    onChange={(e) => updateShipping("phone", e.target.value)}
                  />
                </div>
              </div>
              <div className="form-field">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-input"
                  placeholder="your@email.com"
                  value={shipping.email}
                  onChange={(e) => updateShipping("email", e.target.value)}
                />
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Division *</label>
                  <select
                    className="form-select"
                    value={shipping.division}
                    onChange={(e) => updateShipping("division", e.target.value)}
                  >
                    <option value="dhaka">Dhaka</option>
                    <option value="outside">Outside Dhaka</option>
                  </select>
                </div>
                <div className="form-field">
                  <label className="form-label">Area/City *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g., Gulshan, Dhanmondi"
                    value={shipping.city}
                    onChange={(e) => updateShipping("city", e.target.value)}
                  />
                </div>
              </div>
              <div className="form-field">
                <label className="form-label">Full Address *</label>
                <textarea
                  className="form-textarea"
                  placeholder="House number, street name, landmark..."
                  value={shipping.address}
                  onChange={(e) => updateShipping("address", e.target.value)}
                />
              </div>
              <div style={{ display: "flex", gap: "1rem" }}>
                <button className="btn-outline" onClick={() => setStep(1)}>
                  Back
                </button>
                <button
                  className="btn-primary"
                  onClick={() => setStep(3)}
                  style={{ flex: 1 }}
                >
                  Continue to Payment
                </button>
              </div>
            </div>
            <OrderSummary />
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="section-title">Payment Method</h2>
          <p className="section-sub">Choose your preferred payment option.</p>
          <div className="checkout-grid">
            <div>
              <div className="payment-options">
                {paymentMethods.map((m) => (
                  <label
                    key={m.value}
                    className={`payment-option${payment === m.value ? " selected" : ""}`}
                    onClick={() => setPayment(m.value)}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={m.value}
                      checked={payment === m.value}
                      onChange={() => setPayment(m.value)}
                    />
                    <div className="radio-circle" />
                    <div className="payment-icon">{m.icon}</div>
                    <div className="payment-label">{m.label}</div>
                    {payment === m.value && (
                      <i className="fa-solid fa-check" style={{ color: "var(--fire)" }} />
                    )}
                  </label>
                ))}
              </div>
              <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
                <button className="btn-outline" onClick={() => setStep(2)}>
                  Back
                </button>
                <button
                  className="btn-primary"
                  onClick={() => setStep(4)}
                  style={{ flex: 1 }}
                >
                  Review Order
                </button>
              </div>
            </div>
            <OrderSummary />
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <h2 className="section-title">Review Your Order</h2>
          <p className="section-sub">Please review your order before placing.</p>
          <div className="checkout-grid">
            <div>
              <div className="order-summary" style={{ marginBottom: "1.5rem" }}>
                <h3>Shipping Details</h3>
                <div style={{ fontSize: "0.9rem", lineHeight: 1.8 }}>
                  <div>{shipping.name || "—"}</div>
                  <div>{shipping.phone}</div>
                  <div>{shipping.email}</div>
                  <div>
                    {shipping.address}
                    {shipping.city ? `, ${shipping.city}` : ""}
                  </div>
                  <div style={{ textTransform: "capitalize" }}>
                    {shipping.division}
                  </div>
                </div>
              </div>
              <div className="order-summary" style={{ marginBottom: "1.5rem" }}>
                <h3>Payment Method</h3>
                <div style={{ fontSize: "0.9rem" }}>{paymentLabels[payment]}</div>
              </div>
              <div style={{ display: "flex", gap: "1rem" }}>
                <button className="btn-outline" onClick={() => setStep(3)}>
                  Back
                </button>
                <button
                  className="btn-primary"
                  onClick={handlePlaceOrder}
                  style={{ flex: 1 }}
                >
                  Place Order
                </button>
              </div>
            </div>
            <OrderSummary />
          </div>
        </div>
      )}
    </div>
  );
}
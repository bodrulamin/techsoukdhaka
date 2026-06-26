"use client";

import { useRouter } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import ProductImage from "./ProductImage";

export default function CartSidebar() {
  const {
    cart,
    cartOpen,
    totals,
    closeCart,
    updateQuantity,
    removeFromCart,
    notify,
  } = useStore();
  const router = useRouter();

  const proceedToCheckout = () => {
    if (cart.items.length === 0) {
      notify("Your cart is empty!");
      return;
    }
    closeCart();
    router.push("/checkout");
  };

  return (
    <>
      <div
        className={`cart-overlay${cartOpen ? " open" : ""}`}
        onClick={closeCart}
      />
      <div className={`cart-sidebar${cartOpen ? " open" : ""}`}>
        <div className="cart-header">
          <h3>Your Cart</h3>
          <button className="btn-close-cart" onClick={closeCart} aria-label="Close">
            <i className="fa-solid fa-xmark" />
          </button>
        </div>
        <div className="cart-items">
          {cart.items.length === 0 ? (
            <div className="cart-empty">
              <i className="fa-solid fa-cart-shopping" />
              <p>Your cart is empty</p>
            </div>
          ) : (
            cart.items.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-img">
                  <ProductImage src={item.image} alt={item.name} />
                </div>
                <div className="cart-item-details">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-price">
                    ৳{item.price.toLocaleString()}
                  </div>
                  <div className="cart-item-qty">
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      −
                    </button>
                    <span className="qty-value">{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div
                  className="cart-item-remove"
                  onClick={() => removeFromCart(item.id)}
                >
                  <i className="fa-solid fa-trash" />
                </div>
              </div>
            ))
          )}
        </div>
        <div className="cart-footer">
          <div className="cart-total">
            <span>Subtotal</span>
            <span>৳{totals.subtotal.toLocaleString()}</span>
          </div>
          <div className="cart-total">
            <span>Shipping</span>
            <span>
              {totals.shipping === 0 && totals.subtotal > 0
                ? "FREE"
                : "৳" + totals.shipping}
            </span>
          </div>
          <div className="cart-total final">
            <span>Total</span>
            <span>৳{totals.total.toLocaleString()}</span>
          </div>
          <button className="btn-checkout" onClick={proceedToCheckout}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
}
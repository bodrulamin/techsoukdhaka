"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useStore } from "@/context/StoreContext";

export default function LoginPage() {
  const { login } = useStore();
  const router = useRouter();
  const [email, setEmail] = useState("customer@demo.com");
  const [password, setPassword] = useState("demo123");

  const handleLogin = () => {
    if (login(email, password)) router.push("/account");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome Back</h2>
        <p>Sign in to access your account</p>
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
          onClick={handleLogin}
          style={{ width: "100%", marginTop: "1rem" }}
        >
          Sign In
        </button>
        <p style={{ marginTop: "1.5rem", marginBottom: 0 }}>
          Don&apos;t have an account?{" "}
          <Link href="/shop" style={{ color: "var(--fire)" }}>
            Continue as guest
          </Link>
        </p>
      </div>
    </div>
  );
}
"use client";

import { useStore } from "@/context/StoreContext";

export default function Toaster() {
  const { toasts } = useStore();
  return (
    <div>
      {toasts.map((t, i) => (
        <div
          key={t.id}
          className="toast"
          style={{ top: `${80 + i * 64}px` }}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}
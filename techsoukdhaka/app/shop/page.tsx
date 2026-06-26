import { Suspense } from "react";
import ShopClient from "@/components/ShopClient";

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="section" style={{ minHeight: "60vh" }} />}>
      <ShopClient />
    </Suspense>
  );
}
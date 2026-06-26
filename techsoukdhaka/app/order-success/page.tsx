import { Suspense } from "react";
import OrderSuccessClient from "@/components/OrderSuccessClient";

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="order-success" />}>
      <OrderSuccessClient />
    </Suspense>
  );
}
"use client";

import { useState } from "react";
import { PRODUCT_FALLBACK_SVG } from "@/lib/products";

interface Props {
  src: string;
  alt: string;
}

export default function ProductImage({ src, alt }: Props) {
  const [errored, setErrored] = useState(false);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={errored ? PRODUCT_FALLBACK_SVG : src}
      alt={alt}
      onError={() => setErrored(true)}
    />
  );
}

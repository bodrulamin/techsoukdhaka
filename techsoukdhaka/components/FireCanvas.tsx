"use client";

import { useEffect, useRef } from "react";

interface Props {
  variant: "hero" | "shop";
}

class FireParticle {
  x = 0;
  y = 0;
  size = 0;
  speedY = 0;
  speedX = 0;
  life = 1;
  decay = 0;
  hue = 0;

  constructor(
    private w: () => number,
    private h: () => number,
    private big: boolean,
    initialY: number | null = null,
  ) {
    this.reset(initialY);
  }

  reset(initialY: number | null = null) {
    const big = this.big;
    this.x = Math.random() * this.w();
    this.y =
      initialY !== null ? initialY : this.h() + (big ? 100 : 20);
    this.size = big ? Math.random() * 6 + 2 : Math.random() * 4 + 1;
    this.speedY = big ? Math.random() * 3 + 2 : Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * (big ? 1.2 : 0.8);
    this.life = 1;
    this.decay = big
      ? Math.random() * 0.002 + 0.0005
      : Math.random() * 0.008 + 0.004;
    this.hue = big ? Math.random() * 30 + 5 : Math.random() * 30;
  }

  update() {
    this.y -= this.speedY;
    this.x += this.speedX;
    this.life -= this.decay;
    this.size *= this.big ? 0.999 : 0.998;
    if (this.life <= 0 || (this.big && this.y < -100)) this.reset();
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.globalAlpha = this.life * (this.big ? 0.8 : 0.6);
    const gradient = ctx.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      this.size * 2,
    );
    gradient.addColorStop(0, `hsl(${this.hue}, 100%, 70%)`);
    gradient.addColorStop(this.big ? 0.3 : 0.5, `hsl(${this.hue + 10}, 100%, 50%)`);
    gradient.addColorStop(1, "transparent");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

export default function FireCanvas({ variant }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const big = variant === "shop";
    const w = () => canvas.width;
    const h = () => canvas.height;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    };
    resize();

    const count = big ? 200 : 120;
    const particles: FireParticle[] = [];
    for (let i = 0; i < count; i++) {
      const initialY = Math.random() * canvas.height;
      particles.push(new FireParticle(w, h, big, initialY));
    }

    let raf = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });
      raf = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [variant]);

  return <canvas ref={canvasRef} id={variant === "shop" ? "shopFireCanvas" : "fireCanvas"} />;
}
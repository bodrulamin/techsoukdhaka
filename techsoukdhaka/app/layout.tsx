import type { Metadata } from "next";
import { Rajdhani, Inter } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Toaster from "@/components/Toaster";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-rajdhani",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "TechSouk Dhaka — Fire Safety Products for Your Home",
  description:
    "Protect your family with certified fire safety equipment. Fire extinguishers, smoke detectors, and more — delivered to your door anywhere in Bangladesh.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${rajdhani.variable} ${inter.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body>
        <StoreProvider>
          <Nav />
          {children}
          <Footer />
          <CartSidebar />
          <WhatsAppFloat />
          <Toaster />
        </StoreProvider>
      </body>
    </html>
  );
}
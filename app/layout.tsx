import type { Metadata } from "next";
import {
  Poppins,
  Montserrat,
  Rouge_Script,
  Libre_Baskerville,
} from "next/font/google";

import "./globals.css";
import ResponsiveNav from "@/components/navbar/ResponsiveNav";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const libre = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-libre",
});

export const rouge = Rouge_Script({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-rouge",
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Traditional Food",
  description: "Authentic Sri Lankan Restaurant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${libre.variable} ${rouge.variable} ${montserrat.variable}`}
    >
      <body>
        <ResponsiveNav />
        {children}
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
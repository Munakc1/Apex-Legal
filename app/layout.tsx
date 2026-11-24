import type { Metadata } from "next";
// @ts-ignore — Next.js handles global CSS side-effect imports at build time.
import "./globals.css";
import { UIProvider } from "@/components/ui-provider";
import { Toaster } from "@/components/toaster";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FloatingWhatsApp } from "@/components/floating-whatsapp";
import { MobileBookBar } from "@/components/mobile-book-bar";
import { JsonLd } from "@/components/json-ld";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Apex Legal – Legal and Strategic Advisory",
  description:
    "A trusted partner in business advisory and legal solutions, empowering founders, financial-market participants, families, and institutions with strategic guidance and end-to-end support. From setting up advisory-led discount broking businesses to navigating complex legal matters and litigation, we deliver expertise across Legal & Regulatory Advisory, Transaction Advisory, Taxation, ESG, Start-up Support, and Risk Management. Connect with us to book a consultation, access expert advice, and make secure online payments.",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Apex Legal – Legal and Strategic Advisory",
    description:
      "A trusted partner in business advisory and legal solutions, empowering founders, financial-market participants, families, and institutions with strategic guidance and end-to-end support. From setting up advisory-led discount broking businesses to navigating complex legal matters and litigation, we deliver expertise across Legal & Regulatory Advisory, Transaction Advisory, Taxation, ESG, Start-up Support, and Risk Management. Connect with us to book a consultation, access expert advice, and make secure online payments.",
    url: siteUrl,
    siteName: "Apex Legal",
    images: [
      {
        url: "/logo.png",
        width: 440,
        height: 154,
        alt: "Apex Legal Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Apex Legal – Legal and Strategic Advisory",
    description:
      "A trusted partner in business advisory and legal solutions, empowering founders, financial-market participants, families, and institutions with strategic guidance and end-to-end support. From setting up advisory-led discount broking businesses to navigating complex legal matters and litigation, we deliver expertise across Legal & Regulatory Advisory, Transaction Advisory, Taxation, ESG, Start-up Support, and Risk Management. Connect with us to book a consultation, access expert advice, and make secure online payments.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <JsonLd />
      </head>
      <body><div></div>
        <UIProvider>
          <Toaster position="bottom-right" />
          <SiteHeader />
          {children}
          <SiteFooter />
          <FloatingWhatsApp />
          <MobileBookBar />
        </UIProvider>
      </body>
    </html>
  );
}

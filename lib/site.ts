import { defineSite } from "@lacspace/seo";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

export const site = defineSite({
  name: "Apex Legal",
  url: siteUrl,
  description:
    "A business advisory and law firm for founders, financial-market businesses, families and institutions, from advisory-led discount broking setup to litigation, across Legal, Regulatory, Transaction Advisory, Tax, ESG, Start-up Support and Risk Advisory. Book, consult and pay online.",
  ogImage: "/logo.png",
});

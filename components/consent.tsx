"use client";

import { ConsentBanner, useConsent } from "@lacspace/consent/react";
export { useConsent };

export function AppConsent() {
  return (
    <ConsentBanner
      accent="var(--rd)"
      categories={["preferences"]}
      title="Cookie Preferences"
      message="We use cookies strictly for site operations and remembering your theme preferences. No tracking or analytics cookies are loaded."
    />
  );
}

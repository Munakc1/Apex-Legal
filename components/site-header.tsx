"use client";

import Image from "next/image";

export function SiteHeader() {
  return (
    <header>
      <div className="w nav">
        <a className="brand" href="#top">
          <Image
            src="/logo.png"
            alt="Apex Legal logo"
            width={120}
            height={42}
            priority
            style={{ height: "42px", width: "auto" }}
          />
          <span>Apex Legal</span>
        </a>
        <nav className="links" aria-label="Main Navigation">
          <a href="#services">Services</a>
          <a href="#how">How it works</a>
          <a href="#founder">Founder</a>
          <a href="#pay">Pay online</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="btn" href="#enquiry" style={{ padding: "9px 16px" }}>
          Book consultation
        </a>
      </div>
    </header>
  );
}

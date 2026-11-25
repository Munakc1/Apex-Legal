"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  // Close menu on Escape and when the screen grows to desktop width
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 760) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <header>
      <div className="w nav">
        <a className="brand" href="#top" onClick={close}>
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

        <nav
          id="main-nav"
          className={"links" + (open ? " open" : "")}
          aria-label="Main Navigation"
        >
          <a href="#services" onClick={close}>Services</a>
          <a href="#how" onClick={close}>How it works</a>
          <a href="#founder" onClick={close}>Founder</a>
          <a href="#pay" onClick={close}>Pay online</a>
          <a href="#contact" onClick={close}>Contact</a>

          {/* Shown only inside the mobile menu */}
          <a className="btn nav-cta-mobile" href="#enquiry" onClick={close}>
            Book consultation
          </a>
        </nav>

        {/* Desktop button */}
        <a
          className="btn nav-cta"
          href="#enquiry"
          style={{ padding: "9px 16px" }}
        >
          Book consultation
        </a>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="menu-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>
      </div>
    </header>
  );
}
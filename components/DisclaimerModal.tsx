"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const KEY = "disclaimer-accepted";

export function DisclaimerModal() {
  const [open, setOpen] = useState(false);

  // Show the popup only if the visitor has not agreed before
  useEffect(() => {
    try {
      if (localStorage.getItem(KEY) !== "yes") setOpen(true);
    } catch {
      setOpen(true);
    }
  }, []);

  // Stop the page behind from scrolling while the popup is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const agree = () => {
    try {
      localStorage.setItem(KEY, "yes");
    } catch {}
    setOpen(false);
  };

  if (!open) return null;

  const pStyle = {
    margin: "0 0 12px",
    fontSize: "14px",
    lineHeight: 1.65,
    color: "#5b6b82",
  } as const;

  const linkStyle = { color: "#1f6feb", textDecoration: "underline" } as const;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="disc-title"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(11, 31, 58, 0.65)",
        display: "grid",
        placeItems: "center",
        padding: "16px",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          color: "#0b1f3a",
          borderRadius: "14px",
          maxWidth: "560px",
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          padding: "28px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
          fontFamily: '"Segoe UI", system-ui, sans-serif',
        }}
      >
        <h2
          id="disc-title"
          style={{ margin: "0 0 12px", fontSize: "22px", color: "#0b3a75" }}
        >
          Disclaimer
        </h2>

        <p style={pStyle}>
          The content of this website (www.theapexlegal.com) is for
          informational purposes only and should not be interpreted as
          soliciting or advertisement. No material/information provided on this
          website should be construed as legal advice. This website is not an
          attempt to advertise or solicit clients, and does not seek to create
          or invite any lawyer-client relationship.
        </p>

        <p style={pStyle}>
          Careful attention has been given to ensure that the information
          provided herein is accurate and up-to-date. However, apexlegal is not
          responsible for any reliance that a reader places on such information
          and shall not be liable for any loss or damage caused due to any
          inaccuracy in or exclusion of any information, or its interpretation
          thereof. Reader is advised to confirm the veracity of the same from
          independent and expert sources.
        </p>

        <p style={pStyle}>
          This website uses cookies on its website to improve its usability.
          This helps us in providing a good user experience and to also help in
          improving our website. By continuing to use our website without
          changing your privacy settings first, you agree to use our cookies.
        </p>

        <p style={{ ...pStyle, margin: "0 0 20px" }}>
          You can visit the{" "}
          <Link href="/terms-of-use" style={linkStyle}>
            Terms of Use
          </Link>{" "}
          and{" "}
          <Link href="/privacy-policy" style={linkStyle}>
            Privacy Policy
          </Link>
          .
        </p>

        <button
          type="button"
          onClick={agree}
          style={{
            background: "#1f6feb",
            color: "#ffffff",
            border: 0,
            borderRadius: "8px",
            padding: "11px 28px",
            fontSize: "15px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          I Agree
        </button>
      </div>
    </div>
  );
}
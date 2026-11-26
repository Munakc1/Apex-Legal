"use client";

import { useEffect, useState } from "react";

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
        <h2 id="disc-title" style={{ margin: "0 0 12px", fontSize: "22px", color: "#0b3a75" }}>
          Disclaimer &amp; Confirmation
        </h2>
        <p style={{ margin: "0 0 10px", fontSize: "14px", lineHeight: 1.65, color: "#5b6b82" }}>
          As per the rules of the Bar Council of India, we are not permitted to solicit work or
          advertise. By clicking the “I Agree” button below, you acknowledge the following:
        </p>
        <ul style={{ margin: "0 0 20px", paddingLeft: "18px", fontSize: "14px", lineHeight: 1.65, color: "#5b6b82" }}>
          <li>This website is for general information only and does not create a lawyer–client relationship.</li>
          <li>You have visited this website on your own, without any invitation or solicitation from us.</li>
          <li>For any legal issue, you must seek independent legal advice.</li>
        </ul>
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
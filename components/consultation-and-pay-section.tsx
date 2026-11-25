"use client";

import { useState, useEffect } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
import { useServicesStore } from "@/lib/store";
import { CFG } from "@/lib/config";
import { isValidPhone, formatPhone } from "@lacspace/phone";
import { isValidEmail } from "@lacspace/email-validate";
import { addTax } from "@lacspace/tax";
import { Money } from "@lacspace/money";
import { toast } from "@lacspace/notify/react";
import { Reveal } from "@lacspace/ui";

const PAYMENT_TYPES = [
  "Pay Online"
];

// Compact style for the enquiry inputs (Name, Phone, Email)
const compactInput: CSSProperties = {
  padding: "7px 10px",
  fontSize: "14px",
  minHeight: 0,
  height: "auto",
  width: "100%",
};

export function ConsultationAndPaySection() {
  const { selected, remove } = useServicesStore();

  // Enquiry form state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [enquiryError, setEnquiryError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    phone?: string;
    email?: string;
  }>({});

  // Payment form state
  const [paymentFor, setPaymentFor] = useState(PAYMENT_TYPES[0]);
  const [amountInput, setAmountInput] = useState<string>("");
  const [reference, setReference] = useState("");
  const [payMessage, setPayMessage] = useState("");
  const [copiedUpi, setCopiedUpi] = useState(false);

  // QR modal state
  const [showQr, setShowQr] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(/Android|iPhone|iPad|iPod/i.test(navigator.userAgent));
  }, []);

  // Close modal on Escape + lock background scroll
  useEffect(() => {
    if (!showQr) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowQr(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [showQr]);

  const validateEnquiry = (): boolean => {
    if (honeypot.trim() !== "") return false;

    const errors: { name?: string; phone?: string; email?: string } = {};

    if (!name.trim()) errors.name = "Please enter your name.";

    if (!phone.trim()) {
      errors.phone = "Please enter your phone number.";
    } else if (!isValidPhone(phone.trim(), "IN")) {
      errors.phone = "Please enter a valid phone number (e.g. +91 98915 20850).";
    }

    // Email is now compulsory
    if (!email.trim()) {
      errors.email = "Please enter your email address.";
    } else if (!isValidEmail(email.trim())) {
      errors.email = "Please enter a valid email address.";
    }

    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      setEnquiryError(
        errors.name || errors.phone || errors.email || "Please complete the required fields."
      );
      return false;
    }

    setEnquiryError("");
    return true;
  };

  const constructEnquiryBody = (): string => {
    const formattedPhone = formatPhone(phone.trim(), "international", "IN") || phone.trim();
    return (
      "Hello Apex Legal,\n" +
      "Name: " + name.trim() + "\n" +
      "Phone: " + formattedPhone + "\n" +
      "Email: " + email.trim() + "\n" +
      "Services: " + (selected.join(", ") || "General enquiry") + "\n" +
      "Message: " + message.trim()
    );
  };

  const handleSendWhatsApp = () => {
    if (!validateEnquiry()) return;
    toast.success("Opening WhatsApp with your enquiry...");
    const url = "https://wa.me/" + CFG.whatsapp + "?text=" + encodeURIComponent(constructEnquiryBody());
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleSendEmail = () => {
    if (!validateEnquiry()) return;
    toast.success("Opening your email client...");
    window.location.href =
      "mailto:" + CFG.email +
      "?subject=" + encodeURIComponent("Consultation request") +
      "&body=" + encodeURIComponent(constructEnquiryBody());
  };

  // Payment breakdown
  const numericAmount = parseFloat(amountInput);
  const isValidAmount = !isNaN(numericAmount) && numericAmount > 0;
  const amountMinor = isValidAmount ? Math.round(numericAmount * 100) : 0;
  const rateFraction = CFG.GST_RATE / 100;
  const taxResult = isValidAmount ? addTax(amountMinor, rateFraction) : null;

  const netFormatted = taxResult ? Money.fromMinor(taxResult.net, "INR").format() : "₹0.00";
  const taxFormatted = taxResult ? Money.fromMinor(taxResult.tax, "INR").format() : "₹0.00";
  const grossFormatted = taxResult ? Money.fromMinor(taxResult.gross, "INR").format() : "₹0.00";

  const paymentNote = paymentFor + (reference.trim() ? " - " + reference.trim() : "");

  // Click "Pay with UPI": show QR. On mobile, also open the UPI app.
  const handlePayUPI = () => {
    if (!isValidAmount || !taxResult) {
      setPayMessage("Please enter a valid amount.");
      return;
    }
    setPayMessage("");
    setShowQr(true);

    if (isMobile) {
      const upiUrl =
        "upi://pay?pa=" + encodeURIComponent(CFG.upi) +
        "&pn=" + encodeURIComponent(CFG.payee) +
        "&am=" + (taxResult.gross / 100).toFixed(2) +
        "&cu=INR&tn=" + encodeURIComponent(paymentNote);
      window.location.href = upiUrl;
    }
  };

  const handleCopyUpi = async () => {
    try {
      await navigator.clipboard.writeText(CFG.upi);
      setCopiedUpi(true);
      toast.success(`UPI ID copied: ${CFG.upi}`);
      setTimeout(() => setCopiedUpi(false), 2500);
    } catch {
      toast.error("Could not copy UPI ID. Please copy manually.");
    }
  };

  return (
    <section id="enquiry">
      <Reveal className="rv">
        <div className="w">
          <div className="two">
            {/* Request a Consultation Box */}
            <div className="box" style={{ display: "flex", flexDirection: "column" }}>
              <h2 style={{ fontSize: "22px", marginBottom: "4px" }}>Request a consultation</h2>

              {/* Selected services: gap collapses when nothing is selected */}
              <div
                className="sel"
                id="sel"
                role="list"
                aria-label="Selected services list"
                style={{
                  margin: selected.length > 0 ? "6px 0 8px" : "0",
                  minHeight: 0,
                }}
              >
                {selected.map((item) => (
                  <span
                    key={item}
                    role="button"
                    tabIndex={0}
                    onClick={() => remove(item)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        remove(item);
                      }
                    }}
                    title="Click to remove service"
                    data-r={item}
                  >
                    {item} ✕
                  </span>
                ))}
              </div>

              {/* Honeypot (hidden) */}
              <div style={{ display: "none" }} aria-hidden="true">
                <label htmlFor="company_code">Leave this field blank</label>
                <input
                  id="company_code"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              {/* Name */}
              <div style={{ marginTop: "8px" }}>
                <label htmlFor="n">
                  Name <span style={{ color: "var(--rd)" }}>*</span>
                </label>
                <input
                  id="n"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: undefined });
                  }}
                  placeholder="Your full name"
                  aria-required="true"
                  style={compactInput}
                />
                {fieldErrors.name && (
                  <div style={{ color: "var(--rd)", fontSize: "12px", marginTop: "3px" }}>
                    {fieldErrors.name}
                  </div>
                )}
              </div>

              {/* Phone */}
              <div style={{ marginTop: "10px" }}>
                <label htmlFor="p">
                  Phone <span style={{ color: "var(--rd)" }}>*</span>
                </label>
                <input
                  id="p"
                  type="tel"
                  inputMode="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (fieldErrors.phone) setFieldErrors({ ...fieldErrors, phone: undefined });
                  }}
                  placeholder="+91 98915 20850"
                  aria-required="true"
                  style={compactInput}
                />
                {fieldErrors.phone && (
                  <div style={{ color: "var(--rd)", fontSize: "12px", marginTop: "3px" }}>
                    {fieldErrors.phone}
                  </div>
                )}
              </div>

              {/* Email */}
              <div style={{ margin: "10px 0 12px" }}>
                <label htmlFor="e">
                  Email <span style={{ color: "var(--rd)" }}>*</span>
                </label>
                <input
                  id="e"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: undefined });
                  }}
                  placeholder="name@example.com"
                  aria-required="true"
                  style={compactInput}
                />
                {fieldErrors.email && (
                  <div style={{ color: "var(--rd)", fontSize: "12px", marginTop: "3px" }}>
                    {fieldErrors.email}
                  </div>
                )}
              </div>

              {/* Message (was missing before) */}
              {/* <div style={{ margin: "0 0 12px" }}>
                <label htmlFor="m">Message</label>
                <textarea
                  id="m"
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Briefly describe your matter"
                  style={compactInput}
                />
              </div> */}

              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <button type="button" className="btn" id="send" onClick={handleSendWhatsApp}>
                  Send on WhatsApp
                </button>
                <button type="button" className="btn o" id="mail" onClick={handleSendEmail}>
                  Send by email
                </button>
              </div>

              {enquiryError && (
                <div className="msg" id="em" role="alert">
                  {enquiryError}
                </div>
              )}
            </div>

            {/* Pay Online Box */}
            <div className="box" id="pay" style={{ display: "flex", flexDirection: "column" }}>
              <h2 style={{ fontSize: "22px" }}>Pay Fee online</h2>

              <div className="row">
                <div>
                  <label htmlFor="pf">Payment for</label>
                  <select
                    id="pf"
                    value={paymentFor}
                    onChange={(e) => setPaymentFor(e.target.value)}
                  >
                    {PAYMENT_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="am">Amount (₹)</label>
                  <input
                    id="am"
                    type="number"
                    min="1"
                    step="any"
                    value={amountInput}
                    onChange={(e) => {
                      setAmountInput(e.target.value);
                      setPayMessage("");
                    }}
                    placeholder="Enter amount"
                  />
                </div>
              </div>

              <div style={{ margin: "12px 0" }}>
                <label htmlFor="rf">Remarks</label>
                <input
                  id="rf"
                  type="text"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  placeholder=""
                  maxLength={50}
                />
              </div>

              {/* Fee and Tax Breakdown */}
              {isValidAmount && taxResult && (
                <div
                  style={{
                    background: "var(--bg)",
                    border: "1px solid var(--bd)",
                    borderRadius: "10px",
                    padding: "12px 14px",
                    margin: "14px 0",
                    fontSize: "13px",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <span style={{ color: "var(--mu)" }}>Base Amount:</span>
                    <span style={{ fontWeight: 600 }}>{netFormatted}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <span style={{ color: "var(--mu)" }}>GST ({CFG.GST_RATE}%):</span>
                    <span style={{ fontWeight: 600 }}>{taxFormatted}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      borderTop: "1px solid var(--bd)",
                      paddingTop: "6px",
                      marginTop: "6px",
                      fontWeight: 700,
                      fontSize: "14px",
                      color: "var(--ac)",
                    }}
                  >
                    <span>Total Payable:</span>
                    <span>{grossFormatted}</span>
                  </div>
                  <div style={{ fontSize: "11px", color: "var(--mu)", marginTop: "4px", fontStyle: "italic" }}>
                    estimated, final invoice may vary
                  </div>
                </div>
              )}

              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
                <button type="button" className="btn" id="up" onClick={handlePayUPI}>
                  Pay with UPI
                </button>
                <button
                  type="button"
                  className="btn o"
                  onClick={handleCopyUpi}
                  style={{ fontSize: "13px", padding: "10px 14px" }}
                  title="Copy UPI VPA ID"
                >
                  {copiedUpi ? "Copied ✓" : "Copy UPI ID"}
                </button>
              </div>

              <p className="note" style={{ marginTop: "10px" }}>
                GST is payable by you under the Reverse Charge Mechanism (RCM), as applicable to legal services
              </p>
              {payMessage && (
                <div className="msg" id="pm" role="alert">
                  {payMessage}
                </div>
              )}
            </div>
          </div>
        </div>
      </Reveal>

      {/* QR modal: opens when "Pay with UPI" is clicked */}
      {showQr && taxResult && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Pay with UPI QR code"
          onClick={() => setShowQr(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(0,0,0,.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              background: "var(--sf, #fff)",
              border: "1px solid var(--bd)",
              borderRadius: "16px",
              padding: "22px",
              width: "100%",
              maxWidth: "360px",
              maxHeight: "92vh",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
              boxShadow: "0 10px 40px rgba(0,0,0,.25)",
            }}
          >
            <button
              type="button"
              onClick={() => setShowQr(false)}
              aria-label="Close"
              style={{
                position: "absolute",
                top: "10px",
                right: "12px",
                background: "transparent",
                border: 0,
                fontSize: "20px",
                cursor: "pointer",
                color: "var(--mu)",
              }}
            >
              ✕
            </button>

            <h3 style={{ margin: 0, fontSize: "18px" }}>Scan to pay</h3>
            <div style={{ fontSize: "22px", fontWeight: 700, color: "var(--ac)" }}>{grossFormatted}</div>
            <div style={{ fontSize: "12px", color: "var(--mu)", textAlign: "center" }}>{paymentNote}</div>

            <div
              style={{
                background: "#fff",
                padding: "12px",
                borderRadius: "12px",
                lineHeight: 0,
                boxShadow: "0 2px 10px rgba(0,0,0,.08)",
              }}
            >
              <Image
                src="/Apex legal QR.png"
                alt={`UPI QR code for ${CFG.payee}`}
                width={600}
                height={600}
                unoptimized
                priority
                style={{ width: "100%", maxWidth: "260px", height: "auto" }}
              />
            </div>

            <div style={{ fontSize: "12px", color: "var(--mu)" }}>
              <b>UPI ID:</b>{" "}
              <code
                style={{
                  background: "var(--bg)",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  color: "var(--tx)",
                  fontWeight: 600,
                }}
              >
                {CFG.upi}
              </code>
            </div>

            <button
              type="button"
              className="btn o"
              onClick={handleCopyUpi}
              style={{ fontSize: "13px", padding: "10px 14px" }}
            >
              {copiedUpi ? "Copied ✓" : "Copy UPI ID"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
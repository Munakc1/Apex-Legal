"use client";

import { useState } from "react";
import Image from "next/image";
import { useServicesStore } from "@/lib/store";
import { CFG } from "@/lib/config";
import { isValidPhone, formatPhone } from "@lacspace/phone";
import { isValidEmail } from "@lacspace/email-validate";
import { addTax } from "@lacspace/tax";
import { Money } from "@lacspace/money";
import { toast } from "@lacspace/notify/react";
import { Reveal } from "@lacspace/ui";

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
  const [paymentFor, setPaymentFor] = useState("Consultation fee");
  const [amountInput, setAmountInput] = useState<string>("");
  const [reference, setReference] = useState("");
  const [payMessage, setPayMessage] = useState("");
  const [copiedUpi, setCopiedUpi] = useState(false);

  // Validation function
  const validateEnquiry = (): boolean => {
    if (honeypot.trim() !== "") {
      return false;
    }

    const errors: { name?: string; phone?: string; email?: string } = {};

    if (!name.trim()) {
      errors.name = "Please enter your name.";
    }

    if (!phone.trim()) {
      errors.phone = "Please enter your phone number.";
    } else if (!isValidPhone(phone.trim(), "IN")) {
      errors.phone = "Please enter a valid phone number (e.g. +91 98915 20850).";
    }

    if (email.trim() && !isValidEmail(email.trim())) {
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
      "Name: " +
      name.trim() +
      "\n" +
      "Phone: " +
      formattedPhone +
      "\n" +
      "Email: " +
      email.trim() +
      "\n" +
      "Services: " +
      (selected.join(", ") || "General enquiry") +
      "\n" +
      "Message: " +
      message.trim()
    );
  };

  const handleSendWhatsApp = () => {
    if (!validateEnquiry()) return;
    toast.success("Opening WhatsApp with your enquiry...");
    const url =
      "https://wa.me/" +
      CFG.whatsapp +
      "?text=" +
      encodeURIComponent(constructEnquiryBody());
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleSendEmail = () => {
    if (!validateEnquiry()) return;
    toast.success("Opening your email client...");
    const mailtoUrl =
      "mailto:" +
      CFG.email +
      "?subject=" +
      encodeURIComponent("Consultation request") +
      "&body=" +
      encodeURIComponent(constructEnquiryBody());
    window.location.href = mailtoUrl;
  };

  // Payment breakdown calculation using @lacspace/money and @lacspace/tax
  const numericAmount = parseFloat(amountInput);
  const isValidAmount = !isNaN(numericAmount) && numericAmount > 0;

  const amountMinor = isValidAmount ? Math.round(numericAmount * 100) : 0;
  const rateFraction = CFG.GST_RATE / 100;
  const taxResult = isValidAmount ? addTax(amountMinor, rateFraction) : null;

  const netFormatted = taxResult ? Money.fromMinor(taxResult.net, "INR").format() : "₹0.00";
  const taxFormatted = taxResult ? Money.fromMinor(taxResult.tax, "INR").format() : "₹0.00";
  const grossFormatted = taxResult ? Money.fromMinor(taxResult.gross, "INR").format() : "₹0.00";

  const handlePayUPI = () => {
    if (!isValidAmount || !taxResult) {
      setPayMessage("Please enter a valid amount.");
      return;
    }
    const totalMajor = (taxResult.gross / 100).toFixed(2);
    const note = paymentFor + (reference.trim() ? " – " + reference.trim() : "");
    setPayMessage("Opening your UPI app…");

    const upiUrl =
      "upi://pay?pa=" +
      encodeURIComponent(CFG.upi) +
      "&pn=" +
      encodeURIComponent(CFG.payee) +
      "&am=" +
      totalMajor +
      "&cu=INR&tn=" +
      encodeURIComponent(note);

    window.location.href = upiUrl;
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
              <h2 style={{ fontSize: "22px" }}>Request a consultation</h2>
              <p className="note">Selected services appear below. Tap one to remove it.</p>

              <div className="sel" id="sel" role="list" aria-label="Selected services list">
                {selected.length > 0 ? (
                  selected.map((item) => (
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
                  ))
                ) : (
                  <span className="note" style={{ border: 0, padding: "4px 0" }}>
                    No services selected yet.
                  </span>
                )}
              </div>

              {/* Honeypot field (hidden from genuine users) */}
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

              <div className="row">
                <div>
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
                  />
                  {fieldErrors.name && (
                    <div style={{ color: "var(--rd)", fontSize: "12px", marginTop: "3px" }}>
                      {fieldErrors.name}
                    </div>
                  )}
                </div>
                <div>
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
                  />
                  {fieldErrors.phone && (
                    <div style={{ color: "var(--rd)", fontSize: "12px", marginTop: "3px" }}>
                      {fieldErrors.phone}
                    </div>
                  )}
                </div>
              </div>

              <div style={{ margin: "12px 0" }}>
                <label htmlFor="e">Email (optional)</label>
                <input
                  id="e"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: undefined });
                  }}
                  placeholder="name@example.com"
                />
                {fieldErrors.email && (
                  <div style={{ color: "var(--rd)", fontSize: "12px", marginTop: "3px" }}>
                    {fieldErrors.email}
                  </div>
                )}
              </div>

              <div style={{ marginBottom: "16px", flex: 1, display: "flex", flexDirection: "column" }}>
                <label htmlFor="m">Message</label>
                <textarea
                  id="m"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Briefly describe your requirement"
                  style={{
                    flex: 1,
                    minHeight: "110px",
                    resize: "none",
                    width: "100%",
                    padding: "10px 12px",
                    font: "inherit",
                    color: "var(--tx)",
                    background: "var(--bg)",
                    border: "1px solid var(--bd)",
                    borderRadius: "10px",
                  }}
                />
              </div>

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
              <h2 style={{ fontSize: "22px" }}>Pay online</h2>
              <p className="note">Pay a consultation fee or an invoice using any UPI app.</p>

              <div className="row">
                <div>
                  <label htmlFor="pf">Payment for</label>
                  <select
                    id="pf"
                    value={paymentFor}
                    onChange={(e) => setPaymentFor(e.target.value)}
                  >
                    <option>Consultation fee</option>
                    <option>Invoice payment</option>
                    <option>Retainer fee</option>
                    <option>Filing or representation fee</option>
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
                <label htmlFor="rf">Invoice or reference number (optional)</label>
                <input
                  id="rf"
                  type="text"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  placeholder="e.g. INV-2026-001"
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
                  <div
                    style={{
                      fontSize: "11px",
                      color: "var(--mu)",
                      marginTop: "4px",
                      fontStyle: "italic",
                    }}
                  >
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

              {/* QR + UPI ID card */}
              <div
                style={{
                  marginTop: "16px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "10px",
                  padding: "18px",
                  background: "color-mix(in srgb, var(--sf) 60%, var(--bg))",
                  border: "1px solid var(--bd)",
                  borderRadius: "12px",
                }}
              >
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
                    style={{ width: "100%", maxWidth: "280px", height: "auto" }}
                  />
                </div>

                <div style={{ fontWeight: 600, fontSize: "14px", color: "var(--tx)" }}>
                  Scan to pay · {CFG.payee}
                </div>
                <div style={{ fontSize: "12px", color: "var(--mu)", textAlign: "center" }}>
                  Works with GPay, PhonePe, Paytm, BHIM and any UPI app
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
              </div>

              <p className="note" style={{ marginTop: "10px" }}>
                GST is added as applicable. Please share your payment confirmation with us for the receipt.
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
    </section>
  );
}
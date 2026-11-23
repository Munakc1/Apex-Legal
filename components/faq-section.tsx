"use client";

import { useState } from "react";
import { faqs } from "@/data/faq";
import { Reveal } from "@lacspace/ui";

// needs client review: FAQ entries written strictly from verified facts already present on this website.
export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq">
      <Reveal className="rv">
        <div className="w">
          <h2>Frequently asked questions</h2>
          <p className="sub">
            Clear answers about our practice, advisory scope, consultation process, and online payments.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "16px" }}>
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={faq.question}
                  style={{
                    background: "var(--sf)",
                    border: "1px solid var(--bd)",
                    borderRadius: "10px",
                    overflow: "hidden",
                    transition: "border-color 0.2s ease",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    aria-expanded={isOpen}
                    style={{
                      width: "100%",
                      padding: "16px 20px",
                      background: "none",
                      border: "none",
                      textAlign: "left",
                      color: "var(--ac)",
                      fontWeight: 700,
                      fontSize: "16px",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <span>{faq.question}</span>
                    <span
                      style={{
                        fontSize: "18px",
                        transform: isOpen ? "rotate(45deg)" : "none",
                        transition: "transform 0.2s ease",
                        color: "var(--rd)",
                        lineHeight: 1,
                      }}
                    >
                      +
                    </span>
                  </button>
                  {isOpen && (
                    <div
                      style={{
                        padding: "0 20px 18px",
                        color: "var(--mu)",
                        fontSize: "14.5px",
                        lineHeight: 1.6,
                        borderTop: "1px solid color-mix(in srgb, var(--bd) 60%, transparent)",
                        marginTop: "2px",
                        paddingTop: "14px",
                      }}
                    >
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

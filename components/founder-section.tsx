"use client";

import Image from "next/image";
import { Reveal } from "@lacspace/ui";
import { useState } from "react";

const extraQualifications = [
  "FCS (ICSI)",
  "Registered Valuer (Securities & Financial Assets)",
  "Social Impact Assessor",
  "Qualified Research Analyst",
  "Qualified Investment Adviser",
  "ACSI (London)",
  "NCMP",
  "CPFA",
  "Trade Mark Attorney",
];

const awards = [
  "Most Influential General Counsel of the Year, 2026 · Clause & Coffee",
  "10 Best CLOs in India, 2026 nomination · Business Prizm Magazine",
  "Great Indian Legal Eagle, 2024",
];

export function FounderSection() {
  const [qualsOpen, setQualsOpen] = useState(false);
  const [awardsOpen, setAwardsOpen] = useState(false);

  return (
    <section id="founder">
      <Reveal className="rv">
        <div className="w">
          <div className="box fd">
            <Image
              src="/Founder.png"
              alt="Umesh Kumar, Founder and Managing Partner"
              width={120}
              height={120}
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                objectFit: "cover",
                objectPosition: "top",
                boxShadow: "0 8px 20px rgba(11,58,117,.25)",
              }}
            />
            <div>
              <div className="kick">Founder</div>
              <h3 style={{ margin: "2px 0 0", font: "700 24px Georgia, serif", color: "var(--ac)" }}>
                Umesh Kumar
              </h3>
              <div className="role">Founder &amp; Managing Partner, Apex Legal</div>
              <p style={{ margin: 0, fontSize: "15px", lineHeight: 1.6 }}>
                Two decades of regulatory and legal advisory experience. Founder of the Association
                of Research Analysts and Investment Advisers, and former Founding Director of Univest
                Stock Broking.
              </p>

              {/* ── Qualifications ── */}
              <div className="kick" style={{ marginTop: "14px" }}>
                Qualifications
              </div>

              {/* Always-visible: two primary degrees */}
              <div className="cr" style={{ marginBottom: 0 }}>
                <span>B.Com, University of Kurukshetra</span>
                <span>LL.B., Rajasthan University</span>
              </div>

              {/* Collapsible: remaining qualifications */}
              {qualsOpen && (
                <div className="cr" style={{ marginTop: "8px" }}>
                  {extraQualifications.map((q) => (
                    <span key={q}>{q}</span>
                  ))}
                </div>
              )}

              <button
                className="founder-toggle-btn"
                onClick={() => setQualsOpen((o) => !o)}
                aria-expanded={qualsOpen}
                aria-controls="quals-extra"
              >
                {qualsOpen ? "▲ Show less" : "▾ Show more qualifications"}
              </button>

              {/* ── Awards & Recognitions ── */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "14px" }}>
                <div className="kick" style={{ margin: 0 }}>
                  Awards &amp; recognitions
                </div>
                <button
                  className="founder-toggle-btn"
                  onClick={() => setAwardsOpen((o) => !o)}
                  aria-expanded={awardsOpen}
                  aria-controls="awards-list"
                  style={{ marginTop: 0 }}
                >
                  {awardsOpen ? "▲" : "▾"}
                </button>
              </div>

              {awardsOpen && (
                <div className="aw" id="awards-list">
                  {awards.map((a) => (
                    <span key={a}>{a}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

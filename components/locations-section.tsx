"use client";

import { Reveal } from "@lacspace/ui";

export function LocationsSection() {
  return (
    <section id="contact">
      <Reveal className="rv">
        <div className="w">
          <h2>Our locations</h2>
          <p className="sub" style={{ fontFamily: '"Segoe UI", sans-serif', fontVariantNumeric: "tabular-nums" }}>
            Phone and WhatsApp: +91 98915 20850 · compliance.apexlegal@gmail.com
          </p>
          <div className="row">
            <div className="loc">
              <b>Noida</b>
              <span>
                Unit No. 14, First Floor, Street 76, Phase 1, Commercial Complex,
                Sector 76, Noida, Gautam Buddha Nagar – 201304
              </span>
            </div>
            <div className="loc">
              <b>Gurugram</b>
              <span>Sector 45, Gurugram, Haryana</span>
            </div>
            <div className="loc">
              <b>Delhi</b>
              <span>Dwarka, New Delhi</span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

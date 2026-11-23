"use client";

import { Reveal } from "@lacspace/ui";

export function WhySection() {
  return (
    <section id="why">
      <Reveal className="rv">
        <div className="w">
          <h2>Why Apex Legal</h2>
          <p className="sub">
            Independent, transparent, accurate and timely advice in India and
            across borders.
          </p>
          <div className="why">
            <div>
              <b>Legal and strategy under one roof</b>
              <span>
                Regulatory, transaction, tax, risk and ESG advice, from setup to
                litigation.
              </span>
            </div>
            <div>
              <b>Regulator-aware</b>
              <span>
                Policy inputs to SEBI and work with the Ministry of Corporate
                Affairs.
              </span>
            </div>
            <div>
              <b>Independent</b>
              <span>
                We offer only advice that is in the best interest of the client.
              </span>
            </div>
            <div>
              <b>Seamless and global</b>
              <span>
                One standard of service, with pan-India coverage and a global
                network.
              </span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

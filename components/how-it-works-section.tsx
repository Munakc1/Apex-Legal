"use client";

import { Reveal } from "@lacspace/ui";

export function HowItWorksSection() {
  return (
    <section id="how">
      <Reveal className="rv">
        <div className="w">
          <h2>How it works</h2>
          <p className="sub">A simple, online-first engagement.</p>
          <div className="steps">
            <div>
              <b>Tell us what you need</b>
              <span>Select services and send your enquiry.</span>
            </div>
            <div>
              <b>Consult with our team</b>
              <span>Discuss by call, video or in person.</span>
            </div>
            <div>
              <b>Engage and pay online</b>
              <span>Confirm scope and pay securely online with UPI.</span>
            </div>
            <div>
              <b>Execution and follow-up</b>
              <span>We deliver, represent and keep you updated.</span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

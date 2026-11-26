"use client";

import { useState } from "react";
import { Reveal } from "@lacspace/ui";
type IconProps = { size?: number };

const FaPhoneAlt = ({ size = 16 }: IconProps) => <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.2 11 11 0 0 0 3.4.5 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17.8 17.8 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11 11 0 0 0 .5 3.4 1 1 0 0 1-.2 1z" /></svg>;
const FaWhatsapp = ({ size = 16 }: IconProps) => <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.5 0 .2 5.3.2 11.9c0 2.1.6 4.2 1.6 6L0 24l6.3-1.7a12 12 0 0 0 5.8 1.5h.1c6.5 0 11.8-5.3 11.8-11.9a11.8 11.8 0 0 0-3.5-8.4ZM12.1 21.8a9.9 9.9 0 0 1-5.1-1.4l-.4-.2-3.8 1 1-3.7-.3-.4a9.9 9.9 0 1 1 8.6 4.7Zm5.4-7.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1a8.1 8.1 0 0 1-2.4-1.5 9 9 0 0 1-1.7-2.1c-.2-.3 0-.5.1-.6l.5-.6.3-.5c.1-.2 0-.4 0-.6l-.9-2.1c-.2-.5-.4-.4-.6-.4h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.7 1.1 2.9c.1.2 2 3.1 4.8 4.3.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 1.9-1.3.2-.6.2-1.1.2-1.3-.1-.1-.3-.2-.7-.4Z" /></svg>;
const FaMapMarkerAlt = ({ size = 16 }: IconProps) => <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" /></svg>;
const FaBuilding = ({ size = 16 }: IconProps) => <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M4 2h11a2 2 0 0 1 2 2v3h3v15H2V4a2 2 0 0 1 2-2Zm0 2v16h3v-3h3v3h8V9h-3V4Zm3 1h2v2H7Zm4 0h2v2h-2ZM7 9h2v2H7Zm4 0h2v2h-2Zm4 3h2v2h-2Zm-8 1h2v2H7Zm4 0h2v2h-2Z" /></svg>;
const FaDirections = ({ size = 16 }: IconProps) => <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="m21.7 11.3-9-9a1 1 0 0 0-1.4 0l-9 9a1 1 0 0 0 0 1.4l9 9a1 1 0 0 0 1.4 0l9-9a1 1 0 0 0 0-1.4ZM12 19.6 4.4 12 12 4.4l7.6 7.6Zm-1-12.1h2v2h2a2 2 0 0 1 2 2v3h-2v-3h-2v2h-2Z" /></svg>;
const FaEnvelope = ({ size = 16 }: IconProps) => <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M3 4h18a2 2 0 0 1 2 2v1l-11 7L1 7V6a2 2 0 0 1 2-2Zm-2 5 11 7 11-7v9a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2Z" /></svg>;

const PHONE_DISPLAY = "+91 98915 20850";
const PHONE_TEL = "+919891520850";
const WHATSAPP_NUMBER = "919891520850"; // digits only, with country code
const EMAIL = "compliance.apexlegal@gmail.com";

// Short text shown on the page
const MAIN_ADDRESS_SHORT = "Sector 76, Noida, Uttar Pradesh – 201304";
// Full address is only used for the Google Maps link
const MAIN_ADDRESS_FULL =
  "Unit No. 14, First Floor, Street 76, Phase 1, Commercial Complex, Sector 76, Noida, Gautam Buddha Nagar – 201304";

// Main cities shown on the map
const branchCities = [
  { city: "Mumbai", query: "Mumbai, Maharashtra, India" },
  { city: "Delhi", query: "New Delhi, India"},
  { city: "Hyderabad", query: "Hyderabad, Telangana, India" },
  { city: "Chennai", query: "Chennai, Tamil Nadu, India"}
];

const mapsUrl = (q: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

const embedUrl = (q: string) =>
  `https://www.google.com/maps?q=${encodeURIComponent(q)}&z=11&output=embed`;

export function LocationsSection() {
  const [active, setActive] = useState(branchCities[1]); // Delhi by default

  return (
    <section id="contact">
      <style>{`
        .ls-wrap { max-width: 1100px; margin: 0 auto; padding: 0 16px; font-family: "Segoe UI", system-ui, sans-serif; }
        .ls-wrap h2 { margin: 0 0 24px; }

        /* ---------- Main office (light theme) ---------- */
        .ls-main {
          position: relative;
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: 32px;
          padding: 36px;
          border-radius: 16px;
          color: #0b1f3a;
          background: #ffffff;
          border: 1px solid #e3e8ef;
          box-shadow: 0 10px 30px rgba(11, 31, 58, 0.08);
          overflow: hidden;
        }
        .ls-main::before {
          content: "";
          position: absolute; inset: 0 auto 0 0; width: 6px;
          background: linear-gradient(180deg, #14345e, #1f4d8f);
        }
        .ls-badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 6px 14px; border-radius: 999px;
          background: #eaf0f9;
          border: 1px solid #c9d8ee; color: #14345e;
          font-size: 12px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase;
        }
        .ls-main h3 { margin: 16px 0 12px; font-size: 30px; font-weight: 700; color: #0b1f3a; }
        .ls-main-addr { display: flex; gap: 12px; line-height: 1.6; color: #5b6b82; font-size: 15px; }
        .ls-main-addr svg { flex: none; margin-top: 4px; color: #14345e; }
        .ls-dir {
          display: inline-flex; align-items: center; gap: 8px; margin-top: 20px;
          padding: 10px 18px; border-radius: 8px;
          background: #1a73e8; color: #fff; font-weight: 600; font-size: 14px;
          text-decoration: none; transition: transform .15s, background .15s;
        }
        .ls-dir:hover { background: #1557b0; transform: translateY(-1px); }

        .ls-contact { display: flex; flex-direction: column; justify-content: center; gap: 12px; }
        .ls-contact a {
          display: flex; align-items: center; gap: 14px;
          padding: 14px 16px; border-radius: 10px;
          background: #f6f9fd;
          border: 1px solid #e3e8ef;
          color: #0b1f3a; text-decoration: none; font-size: 15px;
          font-variant-numeric: tabular-nums;
          transition: background .15s, border-color .15s, transform .15s;
        }
        .ls-contact a:hover { background: #eaf0f9; border-color: #c9d8ee; transform: translateX(3px); }
        .ls-ico {
          flex: none; width: 38px; height: 38px; border-radius: 50%;
          display: grid; place-items: center; color: #fff; font-size: 18px;
        }
        .ls-ico svg { display: block; flex: none; }
        .ls-ico-phone { background: #1a73e8; }
        .ls-ico-wa { background: #25d366; }
        .ls-ico-mail { background: #ea4335; }
        .ls-contact small { display: block; font-size: 11px; color: #5b6b82; text-transform: uppercase; letter-spacing: .8px; }
        .ls-contact span.ls-t { word-break: break-all; }

        /* ---------- Branch obligations ---------- */
        .ls-sub { margin: 36px 0 16px; font-size: 14px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: #5b6b82; }
        .ls-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; }
        .ls-card {
          display: flex; gap: 14px; align-items: flex-start; width: 100%; text-align: left;
          padding: 18px; border-radius: 12px; background: #fff; cursor: pointer;
          border: 1px solid #e3e8ef; border-top: 3px solid #14345e;
          box-shadow: 0 2px 8px rgba(0,0,0,.04); transition: box-shadow .2s, transform .2s, border-color .2s;
          font-family: inherit;
        }
        .ls-card:hover { box-shadow: 0 8px 20px rgba(0,0,0,.08); transform: translateY(-2px); }
        .ls-card.on { border-color: #1a73e8; border-top-color: #1a73e8; box-shadow: 0 8px 20px rgba(26,115,232,.18); }
        .ls-card:focus-visible { outline: 2px solid #1a73e8; outline-offset: 2px; }
        .ls-card .ls-pin { flex: none; width: 40px; height: 40px; border-radius: 10px; display: grid; place-items: center; background: #eaf0f9; color: #14345e; }
        .ls-card.on .ls-pin { background: #1a73e8; color: #fff; }
        .ls-card b { display: block; font-size: 17px; color: #0b1f3a; margin-bottom: 4px; }
        .ls-card span { color: #5b6b82; font-size: 13px; line-height: 1.5; }

        .ls-map { margin-top: 20px; border-radius: 14px; overflow: hidden; border: 1px solid #e3e8ef; box-shadow: 0 4px 14px rgba(11,31,58,.06); background: #fff; }
        .ls-map iframe { display: block; width: 100%; height: 360px; border: 0; }
        .ls-map-bar { display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; padding: 12px 16px; font-size: 14px; color: #0b1f3a; }
        .ls-map-bar a { font-weight: 600; font-size: 13px; color: #1a73e8; text-decoration: none; }
        .ls-map-bar a:hover { text-decoration: underline; }

        /* ---------- Disclaimer ---------- */
        .ls-disc {
          margin-top: 32px; padding: 20px 22px; border-radius: 12px;
          background: #f6f9fd; border: 1px solid #e3e8ef; border-left: 4px solid #14345e;
          color: #5b6b82; font-size: 13px; line-height: 1.65;
        }
        .ls-disc b { display: block; margin-bottom: 6px; color: #0b1f3a; font-size: 14px; letter-spacing: .4px; text-transform: uppercase; }
        .ls-disc p { margin: 0 0 8px; }
        .ls-disc p:last-child { margin-bottom: 0; }

        @media (max-width: 760px) {
          .ls-main { grid-template-columns: 1fr; padding: 28px 24px 28px 28px; }
          .ls-main h3 { font-size: 26px; }
          .ls-map iframe { height: 280px; }
        }
      `}</style>

      <Reveal className="rv">
        <div className="ls-wrap">
          <h2>Our offices</h2>

          {/* Main office */}
          <div className="ls-main">
            <div>
              <span className="ls-badge">
                <FaBuilding /> Main Office
              </span>
              <h3>Noida</h3>
              <div className="ls-main-addr">
                <FaMapMarkerAlt />
                <span>{MAIN_ADDRESS_SHORT}</span>
              </div>
              <a
                className="ls-dir"
                href={mapsUrl(MAIN_ADDRESS_FULL)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaDirections /> Get Directions
              </a>
            </div>

            <div className="ls-contact">
              <a href={`tel:${PHONE_TEL}`}>
                <span className="ls-ico ls-ico-phone"><FaPhoneAlt size={18} /></span>
                <span className="ls-t"><small>Phone</small>{PHONE_DISPLAY}</span>
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="ls-ico ls-ico-wa"><FaWhatsapp size={22} /></span>
                <span className="ls-t"><small>WhatsApp</small>{PHONE_DISPLAY}</span>
              </a>
              <a href={`mailto:${EMAIL}`}>
                <span className="ls-ico ls-ico-mail"><FaEnvelope size={20} /></span>
                <span className="ls-t"><small>Email</small>{EMAIL}</span>
              </a>
            </div>
          </div>

          {/* Branch obligations: main cities + map */}
          <p className="ls-sub">Branch Obligations</p>
          <div className="ls-grid" role="tablist" aria-label="Branch cities">
            {branchCities.map((c) => (
              <button
                type="button"
                role="tab"
                aria-selected={active.city === c.city}
                className={`ls-card${active.city === c.city ? " on" : ""}`}
                key={c.city}
                onClick={() => setActive(c)}
              >
                <div className="ls-pin"><FaMapMarkerAlt /></div>
                <div>
                  <b>{c.city}</b>
                </div>
              </button>
            ))}
          </div>

          <div className="ls-map">
            <iframe
              key={active.city}
              title={`Map of ${active.city}`}
              src={embedUrl(active.query)}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div className="ls-map-bar">
              <span><b>{active.city}</b></span>
              <a href={mapsUrl(active.query)} target="_blank" rel="noopener noreferrer">
                Open in Google Maps →
              </a>
            </div>
          </div>

          {/* Disclaimer */}
          {/* <div className="ls-disc" role="note" aria-label="Disclaimer">
            <b>Disclaimer</b>
            <p>
              As per the rules of the Bar Council of India, we are not permitted to solicit work
              or advertise. The information on this website is provided only for general
              informational purposes and does not create a lawyer–client relationship.
            </p>
            <p>
              If you have any legal issue, you must seek independent legal advice before taking
              any action.
            </p>
          </div> */}
        </div>
      </Reveal>
    </section>
  );
}
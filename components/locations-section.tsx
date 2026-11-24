"use client";

import { Reveal } from "@lacspace/ui";
import { FaPhoneAlt, FaWhatsapp, FaMapMarkerAlt, FaBuilding, FaDirections } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const PHONE_DISPLAY = "+91 98915 20850";
const PHONE_TEL = "+919891520850";
const WHATSAPP_NUMBER = "919891520850"; // digits only, with country code
const EMAIL = "compliance.apexlegal@gmail.com";

const MAIN_ADDRESS =
  "Unit No. 14, First Floor, Street 76, Phase 1, Commercial Complex, Sector 76, Noida, Gautam Buddha Nagar – 201304";

const otherOffices = [
  { city: "Gurugram", address: "Sector 45, Gurugram, Haryana" },
  { city: "Delhi", address: "Dwarka, New Delhi" },
];

const mapsUrl = (q: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

export function LocationsSection() {
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
          background: #14345e; color: #fff; font-weight: 600; font-size: 14px;
          text-decoration: none; transition: transform .15s, background .15s;
        }
        .ls-dir:hover { background: #0b1f3a; transform: translateY(-1px); }

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

        /* ---------- Other offices ---------- */
        .ls-sub { margin: 36px 0 16px; font-size: 14px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: #5b6b82; }
        .ls-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px; }
        .ls-card {
          display: flex; gap: 16px; align-items: flex-start;
          padding: 22px; border-radius: 12px; background: #fff;
          border: 1px solid #e3e8ef; border-top: 3px solid #14345e;
          box-shadow: 0 2px 8px rgba(0,0,0,.04); transition: box-shadow .2s, transform .2s;
        }
        .ls-card:hover { box-shadow: 0 8px 20px rgba(0,0,0,.08); transform: translateY(-2px); }
        .ls-card .ls-pin { flex: none; width: 40px; height: 40px; border-radius: 10px; display: grid; place-items: center; background: #eaf0f9; color: #14345e; }
        .ls-card b { display: block; font-size: 18px; color: #0b1f3a; margin-bottom: 4px; }
        .ls-card span { color: #5b6b82; font-size: 14px; line-height: 1.5; }
        .ls-card a { display: inline-block; margin-top: 8px; font-size: 13px; font-weight: 600; color: #14345e; text-decoration: none; }
        .ls-card a:hover { text-decoration: underline; }

        @media (max-width: 760px) {
          .ls-main { grid-template-columns: 1fr; padding: 28px 24px 28px 28px; }
          .ls-main h3 { font-size: 26px; }
        }
      `}</style>

      <Reveal className="rv">
        <div className="ls-wrap">
          <h2>Our locations</h2>

          {/* Main office */}
          <div className="ls-main">
            <div>
              <span className="ls-badge">
                <FaBuilding /> Main Office
              </span>
              <h3>Noida</h3>
              <div className="ls-main-addr">
                <FaMapMarkerAlt />
                <span>{MAIN_ADDRESS}</span>
              </div>
              <a
                className="ls-dir"
                href={mapsUrl(MAIN_ADDRESS)}
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
                <span className="ls-ico ls-ico-mail"><MdEmail size={20} /></span>
                <span className="ls-t"><small>Email</small>{EMAIL}</span>
              </a>
            </div>
          </div>

          {/* Other offices */}
          <p className="ls-sub">Other Offices</p>
          <div className="ls-grid">
            {otherOffices.map((o) => (
              <div className="ls-card" key={o.city}>
                <div className="ls-pin"><FaMapMarkerAlt /></div>
                <div>
                  <b>{o.city}</b>
                  <span>{o.address}</span>
                  <br />
                  <a href={mapsUrl(`${o.address}`)} target="_blank" rel="noopener noreferrer">
                    View on map →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
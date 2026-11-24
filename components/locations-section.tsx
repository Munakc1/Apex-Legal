"use client";

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
                <span className="ls-ico ls-ico-mail"><FaEnvelope size={20} /></span>
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
"use client";

import { useState, useMemo, useEffect } from "react";
import { services, serviceCategories } from "@/data/services";
import { useServicesStore } from "@/lib/store";
import { Reveal } from "@lacspace/ui";

export function ServicesSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { selected, toggle, init } = useServicesStore();

  useEffect(() => {
    init();
  }, [init]);

  const filteredServices = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return services.filter((s) => {
      const matchesCategory =
        activeCategory === "All" || s.category === activeCategory;
      const matchesSearch =
        !q ||
        (s.title + " " + s.description).toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const scrollToEnquiry = () => {
    const enquiryEl = document.getElementById("enquiry");
    if (enquiryEl) {
      enquiryEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="services">
      <Reveal className="rv">
        <div className="w">
          <h2>Our services</h2>
          <p className="sub">
            Search, filter, and add the services you need to your enquiry.
          </p>

          <div className="tools">
            <input
              id="q"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search, for example PMS, SEBI litigation, IPO, valuation…"
              aria-label="Search services"
            />
          </div>

          <div id="chips" role="tablist" aria-label="Service categories">
            {serviceCategories.map((cat) => {
              const isActive = cat === activeCategory;
              return (
                <button
                  key={cat}
                  type="button"
                  className={`chip${isActive ? " on" : ""}`}
                  onClick={() => setActiveCategory(cat)}
                  role="tab"
                  aria-selected={isActive}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="grid" id="grid">
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => {
                const isAdded = selected.includes(service.title);
                return (
                  <div key={service.title} className="card">
                    <div className="tag">{service.category}</div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <button
                      type="button"
                      className={`btn${isAdded ? " o" : ""}`}
                      onClick={() => toggle(service.title)}
                      aria-label={`${isAdded ? "Remove" : "Add"} ${service.title} to enquiry`}
                    >
                      {isAdded ? "Added ✓" : "Add to enquiry"}
                    </button>
                  </div>
                );
              })
            ) : (
              <div
                style={{
                  gridColumn: "1 / -1",
                  padding: "36px 12px",
                  textAlign: "center",
                }}
              >
                <p className="note" style={{ fontSize: "15px", margin: 0 }}>
                  No services match your search.
                </p>
              </div>
            )}
          </div>

          {/* Sticky selection bar when services are selected */}
          {selected.length > 0 && (
            <aside
              role="region"
              aria-label="Selected services notification"
              style={{
                position: "fixed",
                bottom: "22px",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 35,
                background: "var(--ac)",
                color: "#ffffff",
                padding: "10px 20px",
                borderRadius: "30px",
                boxShadow: "0 10px 30px rgba(11, 58, 117, 0.4)",
                display: "flex",
                alignItems: "center",
                gap: "14px",
                font: '600 14px "Segoe UI", sans-serif',
                maxWidth: "90vw",
              }}
            >
              <span>
                {selected.length} {selected.length === 1 ? "service" : "services"} selected
              </span>
              <button
                type="button"
                onClick={scrollToEnquiry}
                style={{
                  background: "#ffffff",
                  color: "var(--ac)",
                  border: "none",
                  borderRadius: "20px",
                  padding: "6px 14px",
                  fontSize: "13px",
                  fontWeight: 700,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "filter 0.15s ease",
                }}
              >
                Go to enquiry ↓
              </button>
            </aside>
          )}
        </div>
      </Reveal>
    </section>
  );
}


import { siteUrl } from "@/lib/site";
import { CFG } from "@/lib/config";
import { faqs } from "@/data/faq";

export function JsonLd() {
  const faqList = Array.isArray(faqs) ? faqs : [];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LegalService",
        "@id": `${siteUrl}/#organization`,
        name: "Apex Legal",
        url: siteUrl,
        logo: `${siteUrl}/logo.png`,
        image: `${siteUrl}/logo.png`,
        description:
          "A business advisory and law firm for founders, financial-market businesses, families and institutions, from advisory-led discount broking setup to litigation, across Legal, Regulatory, Transaction Advisory, Tax, ESG, Start-up Support and Risk Advisory.",
        telephone: `+${CFG.whatsapp}`,
        email: CFG.email,
        founder: {
          "@id": `${siteUrl}/#founder`,
        },
        address: [
          {
            "@type": "PostalAddress",
            streetAddress:
              "Unit No. 14, First Floor, Street 76, Phase 1, Commercial Complex, Sector 76",
            addressLocality: "Noida",
            addressRegion: "Uttar Pradesh",
            postalCode: "201304",
            addressCountry: "IN",
          },
          {
            "@type": "PostalAddress",
            streetAddress: "Sector 45",
            addressLocality: "Gurugram",
            addressRegion: "Haryana",
            addressCountry: "IN",
          },
          {
            "@type": "PostalAddress",
            streetAddress: "Dwarka",
            addressLocality: "New Delhi",
            addressRegion: "Delhi",
            addressCountry: "IN",
          },
        ],
      },
      {
        "@type": "Person",
        "@id": `${siteUrl}/#founder`,
        name: "Umesh Kumar",
        jobTitle: "Founder & Managing Partner",
        worksFor: {
          "@id": `${siteUrl}/#organization`,
        },
        description:
          "Two decades of regulatory and legal advisory experience. Founder of the Association of Research Analysts and Investment Advisers, and former Founding Director of Univest Stock Broking.",
        image: `${siteUrl}/Founder.png`,
        alumniOf: [
          {
            "@type": "EducationalOrganization",
            name: "University of Kurukshetra",
          },
          {
            "@type": "EducationalOrganization",
            name: "Rajasthan University",
          },
        ],
      },
      ...(faqList.length > 0
        ? [
            {
              "@type": "FAQPage",
              "@id": `${siteUrl}/#faq`,
              mainEntity: faqList.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}

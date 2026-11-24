export interface Service {
  category: string;
  title: string;
  description: string;
}

export const services: Service[] = [
  {
    category: "SEBI & Markets",
    title: "Advisory-Led Discount Broking Business Setup",
    description: "For entrepreneurs and finance professionals who want to start a discount broking firm. We handle entity structuring, exchange membership, technology setup and SEBI compliance from first plan to launch."
  },
  {
    category: "SEBI & Markets",
    title: "Algo Provider Empanelment",
    description: "Empanelment of algo providers with stock exchanges, with documentation, due diligence and ongoing compliance for retail algorithmic trading."
  },
{
    category: "SEBI & Markets",
    title: "Fully Automated (Black-Box) Algo Trading Setup",
    description: "Get your algo strategy or platform approved by the stock exchanges for retail traders, with documentation, due diligence and ongoing compliance support."
  },
  {
    category: "SEBI & Markets",
    title: "US Stock Advisory",
    description: "Structuring and compliance guidance for advisory on US-listed securities."
  },
  {
    category: "Litigation & Disputes",
    title: "SEBI & Other Litigation",
    description: "Settlement, compounding and adjudication before SEBI, appeals before the Securities Appellate Tribunal, and representation before RBI, IRDAI, RERA, NCLT, the Enforcement Directorate, tax authorities, High Courts and the Supreme Court."
  },
  {
    category: "IPO & Capital",
    title: "Valuation Services",
    description: "Registered Valuer services for securities, businesses and assets for regulatory, tax and transaction needs."
  },
  {
    category: "Strategy & Transactions",
    title: "Strategic & Business Advisory",
    description: "Business model, entry strategy and growth advisory for companies adapting to a new landscape."
  },
  {
    category: "Families & Individuals",
    title: "Digital Fraud Protection",
    description: "Advice and response support for online and financial fraud, including complaints and recovery steps."
  },
  {
    category: "Startups & Counsel",
    title: "Fractional / Virtual General Counsel",
    description: "On-demand legal leadership for growing and established businesses, on a retainer."
  },
  {
    category: "SEBI & Markets",
    title: "Portfolio Management Services (PMS)",
    description: "Licensing, structuring and compliance support for setting up and running a PMS business."
  },
  {
    category: "SEBI & Markets",
    title: "Research Analyst Registration",
    description: "SEBI registration, qualification guidance and compliance for research analysts."
  },
  {
    category: "SEBI & Markets",
    title: "Investment Adviser Registration",
    description: "Registration, client agreements, risk profiling and periodic audits for investment advisers."
  },
  {
    category: "SEBI & Markets",
    title: "SEBI SCORES Complaint Handling",
    description: "Drafting, filing and follow-up of complaints and replies on the SEBI SCORES platform."
  },

  // Litigation & Disputes
  {
    category: "Litigation & Disputes",
    title: "Conciliation & Arbitration",
    description: "Drafting and representation in conciliation, mediation and arbitration, including market disputes."
  },
  {
    category: "Litigation & Disputes",
    title: "Insolvency Professional Services",
    description: "CIRP assignments, restructuring and resolution support under the Insolvency and Bankruptcy Code."
  },
  {
    category: "Litigation & Disputes",
    title: "Forensic Advisory",
    description: "Investigations, fraud risk assessment, anti-bribery reviews, e-discovery and expert support in disputes."
  },

  // IPO & Capital
  {
    category: "IPO & Capital",
    title: "Main Board IPO",
    description: "End-to-end legal and regulatory support: readiness, due diligence, DRHP and listing."
  },
  {
    category: "IPO & Capital",
    title: "SME IPO",
    description: "Guidance for SME and MSME platform listings from structuring to listing."
  },
  {
    category: "IPO & Capital",
    title: "Fund-Raising Advisory",
    description: "Equity, debt, ECB, NCD, CCD and CCPS options, with investor management and documentation."
  },
  {
    category: "Strategy & Transactions",
    title: "Mergers, Acquisitions & Restructuring",
    description: "Lead advisory and project management from initiation to closure, including group restructuring and due diligence."
  },
  {
    category: "Strategy & Transactions",
    title: "Global Business Setup",
    description: "Cross-border structuring, FEMA and foreign investment compliance for inbound and outbound businesses."
  },
  {
    category: "Strategy & Transactions",
    title: "GIFT IFSC Business Setup",
    description: "Setup of broking, fund management and other financial entities in GIFT City."
  },
  {
    category: "Strategy & Transactions",
    title: "Tax, GST & Foreign Trade Policy",
    description: "Direct and indirect tax, GST, customs and DGFT advisory, compliance and representation."
  },

  // Families & Individuals
  {
    category: "Families & Individuals",
    title: "Succession & Private Client Services",
    description: "Wills, trusts, family arrangements and promoter-focused planning, including family office support."
  },
  {
    category: "Families & Individuals",
    title: "Unclaimed & Untraced Wealth",
    description: "Trace and claim dormant shares, dividends, mutual funds and deposits through IEPF and other channels."
  },

  // Risk & Data
  {
    category: "Risk & Data",
    title: "Data Protection & Cybersecurity",
    description: "Cyber risk assessment, incident response, security architecture and data protection."
  },
  {
    category: "Risk & Data",
    title: "DPDP Compliance",
    description: "Digital Personal Data Protection readiness: policies, consent frameworks and breach response."
  },

  // Startups & Counsel
  {
    category: "Startups & Counsel",
    title: "Startup Mentorship",
    description: "Mentorship on structuring, funding, governance and scale-up for early-stage founders."
  },

  // Impact & Public Sector
  {
    category: "Impact & Public Sector",
    title: "ESG & Sustainability Advisory",
    description: "ESG strategy, reporting, due diligence and climate advisory."
  },
  {
    category: "Impact & Public Sector",
    title: "SSE & Social Impact Assessor",
    description: "Registration, fundraising, reporting and impact assessment for social enterprises."
  },
  {
    category: "Impact & Public Sector",
    title: "Government & Public Sector Advisory",
    description: "Project structuring, socio-economic impact studies and monitoring for public agencies."
  }
];

export const serviceCategories = [
  "All",
  ...Array.from(new Set(services.map((s) => s.category)))
];

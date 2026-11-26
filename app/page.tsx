import { HeroSection } from "@/components/hero-section";
// import { EngagementsStrip } from "@/components/engagements-strip";
import { WhySection } from "@/components/why-section";
import { ServicesSection } from "@/components/services-section";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { FounderSection } from "@/components/founder-section";
import { ConsultationAndPaySection } from "@/components/consultation-and-pay-section";
import { LocationsSection } from "@/components/locations-section";
import { DisclaimerModal} from "@/components/DisclaimerModal";
// import { FaqSection } from "@/components/faq-section";

export default function HomePage() {
  return (
    <main id="top">
      <HeroSection />
      {/* <EngagementsStrip /> */}
      <WhySection />
      <ServicesSection />
      <HowItWorksSection />
      <FounderSection />
      <ConsultationAndPaySection />
      <LocationsSection />
      <DisclaimerModal />

      {/* <FaqSection /> */}
    </main>
  );
}

import { Hero } from "../components/Hero";
import { CoreServicesHome } from "../components/CoreServicesHome";
import { SignatureFleet } from "../components/SignatureFleet";
import { CuratedExperiences } from "../components/CuratedExperiences";
import { Testimonials } from "../components/Testimonials";
import { CTA } from "../components/CTA";

export function Home() {
  return (
    <>
      <Hero />
      <CoreServicesHome />
      <SignatureFleet />
      <CuratedExperiences />
      <Testimonials />
      <CTA />
    </>
  );
}

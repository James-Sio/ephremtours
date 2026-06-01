import { Hero } from "../components/Hero";
import { CarHirePromo } from "../components/CarHirePromo";
import { CoreServicesHome } from "../components/CoreServicesHome";
import { SignatureFleet } from "../components/SignatureFleet";
import { CuratedExperiences } from "../components/CuratedExperiences";
import { Testimonials } from "../components/Testimonials";
import { CTA } from "../components/CTA";

export function Home() {
  return (
    <>
      <Hero />
      <CarHirePromo />
      <CoreServicesHome />
      <SignatureFleet />
      <CuratedExperiences />
      <Testimonials />
      <CTA />
    </>
  );
}

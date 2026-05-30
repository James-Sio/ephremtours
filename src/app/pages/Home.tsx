import { Hero } from "../components/Hero";
import { Features } from "../components/Features";
import { Testimonials } from "../components/Testimonials";
import { CTA } from "../components/CTA";

export function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Testimonials />
      <CTA />
    </>
  );
}

import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { About } from "@/components/site/about";
import { Company } from "@/components/site/company";
import { Kits } from "@/components/site/kits";
import { Benefits } from "@/components/site/benefits";
import { Cta } from "@/components/site/cta";
import { Footer } from "@/components/site/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-forest focus:px-5 focus:py-2.5 focus:font-display focus:text-sm focus:font-bold focus:text-cream"
      >
        Перейти к содержимому
      </a>
      <Navbar />
      <main id="main" className="flex-1">
        <Hero />
        <About />
        <Company />
        <Kits />
        <Benefits />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Security from "@/components/Security";
import WhySaarthi from "@/components/WhySaarthi";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
export default function Home() {
  console.log("WhySaarthi =", WhySaarthi);

  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <Security />


      <WhySaarthi />

     <Testimonials />
     <Footer />
    </main>
  );
}
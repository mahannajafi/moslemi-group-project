import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import FeaturedProjects from "@/components/FeaturedProjects";
import JewelrySection from "@/components/JewelrySection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "صفحه اصلی",
  description: "گروه سرمایه گذاری مسعود مسلمی، پروژه‌های مشارکتی و فایل‌های ملکی ویژه.",
};

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Services />
      <FeaturedProjects />
      <JewelrySection />
      <Contact />
      <Footer />
    </div>
  );
};

export default HomePage;

import type { Metadata } from "next";
import PropertiesPageClient from "@/app/properties/PropertiesPageClient";

export const metadata: Metadata = {
  title: "فایل‌های ملکی",
  description: "فایل‌های ملکی برای خرید، فروش و مشارکت در ساخت.",
};

const PropertiesPage = () => {
  return <PropertiesPageClient />;
};

export default PropertiesPage;

import type { Metadata } from "next";
import PropertyDetailClient from "@/app/properties/[id]/PropertyDetailClient";

export const metadata: Metadata = {
  title: "جزئیات ملک",
  description: "جزئیات فایل ملکی انتخاب‌شده.",
};

const PropertyDetailPage = () => {
  return <PropertyDetailClient />;
};

export default PropertyDetailPage;

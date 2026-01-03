import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import Providers from "@/app/providers";
import "@/app/globals.css";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-vazir",
});

export const metadata: Metadata = {
  title: {
    default: "گروه سرمایه گذاری مسعود مسلمی",
    template: "%s | گروه سرمایه گذاری مسعود مسلمی",
  },
  description: "پروژه‌های ساختمانی، فایل‌های ملکی و مشارکت در ساخت در تهران و حومه.",
  openGraph: {
    title: "گروه سرمایه گذاری مسعود مسلمی",
    description: "پروژه‌های ساختمانی، فایل‌های ملکی و مشارکت در ساخت.",
    type: "website",
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <body className={vazirmatn.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;

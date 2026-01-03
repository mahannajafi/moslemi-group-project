import type { Metadata } from "next";
import AuthPageClient from "@/app/auth/AuthPageClient";

export const metadata: Metadata = {
  title: "ورود مدیریت",
  description: "ورود یا ثبت‌نام در پنل مدیریت گروه سرمایه گذاری مسعود مسلمی.",
};

const AuthPage = () => {
  return <AuthPageClient />;
};

export default AuthPage;

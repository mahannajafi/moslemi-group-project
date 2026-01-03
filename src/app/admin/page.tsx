import type { Metadata } from "next";
import AdminPageClient from "@/app/admin/AdminPageClient";

export const metadata: Metadata = {
  title: "پنل مدیریت",
  description: "مدیریت فایل‌های ملکی گروه سرمایه گذاری مسعود مسلمی.",
};

const AdminPage = () => {
  return <AdminPageClient />;
};

export default AdminPage;

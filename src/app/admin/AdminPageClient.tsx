"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { ApiUser } from "@/lib/api/auth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyForm from "@/components/admin/PropertyForm";
import PropertyList from "@/components/admin/PropertyList";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, List, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getStoredUser } from "@/lib/api/client";
import { signOut } from "@/lib/api/auth";

const AdminPageClient = () => {
  const [user, setUser] = useState<ApiUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const storedUser = getStoredUser<ApiUser>();
    setUser(storedUser ?? null);
    setLoading(false);
    if (!storedUser) {
      router.push("/auth");
    }
  }, [router]);

  const handleLogout = async () => {
    await signOut();
    toast({
      title: "خروج موفق",
      description: "با موفقیت از حساب خود خارج شدید",
    });
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">در حال بارگذاری...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-24">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">پنل مدیریت فایل‌ها</h1>
              <p className="text-muted-foreground">مدیریت فایل‌های ملکی گروه سرمایه گذاری</p>
            </div>
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut className="w-4 h-4" />
              خروج
            </Button>
          </div>

          <Tabs defaultValue="list" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="list" className="gap-2">
                <List className="w-4 h-4" />
                لیست فایل‌ها
              </TabsTrigger>
              <TabsTrigger value="add" className="gap-2">
                <Plus className="w-4 h-4" />
                افزودن فایل جدید
              </TabsTrigger>
            </TabsList>

            <TabsContent value="list">
              <PropertyList />
            </TabsContent>

            <TabsContent value="add">
              <PropertyForm />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminPageClient;

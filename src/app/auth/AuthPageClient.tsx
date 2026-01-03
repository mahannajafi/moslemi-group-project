"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Building2, Mail, Lock, ArrowLeft } from "lucide-react";
import { getStoredUser } from "@/lib/api/client";
import { signInWithPassword } from "@/lib/api/auth";

const authSchema = z.object({
  email: z.string().email("ایمیل معتبر وارد کنید"),
  password: z.string().min(5, "رمز عبور باید حداقل 5 کاراکتر باشد"),
});

type AuthFormValues = z.infer<typeof authSchema>;

const AuthPageClient = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const user = getStoredUser();
    if (user) {
      router.push("/admin");
    }
  }, [router]);

  const handleSubmit = async (values: AuthFormValues) => {
    setLoading(true);

    try {
      if (!isLogin) {
        toast({
          title: "ثبت‌نام غیرفعال است",
          description: "فعلاً ثبت‌نام از طریق این پنل انجام نمی‌شود.",
          variant: "destructive",
        });
        return;
      }

      await signInWithPassword(values.email, values.password);
      toast({
        title: "ورود موفق",
        description: "به پنل مدیریت خوش آمدید",
      });
      router.push("/admin");
    } catch (error: any) {
      toast({
        title: "خطا",
        description: error.message || "ورود ناموفق بود",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          بازگشت به سایت
        </Link>

        <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <Building2 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">پنل مدیریت</h1>
              <p className="text-sm text-muted-foreground">گروه سرمایه گذاری مسعود مسلمی</p>
            </div>
          </div>

          <h2 className="text-lg font-semibold mb-6 text-foreground">
            {isLogin ? "ورود به حساب" : "ثبت‌نام"}
          </h2>

          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">ایمیل</Label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  className="pr-10"
                  autoComplete="email"
                  {...form.register("email")}
                />
              </div>
              {form.formState.errors.email && (
                <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">رمز عبور</Label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pr-10"
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  {...form.register("password")}
                />
              </div>
              {form.formState.errors.password && (
                <p className="text-xs text-destructive">{form.formState.errors.password.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "لطفاً صبر کنید..." : isLogin ? "ورود" : "ثبت‌نام"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-primary hover:underline"
            >
              {isLogin ? "حساب ندارید؟ ثبت‌نام کنید" : "حساب دارید؟ وارد شوید"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPageClient;

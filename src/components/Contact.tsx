"use client";

import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const Contact = () => {
  const { toast } = useToast();

  const contactSchema = z.object({
    name: z.string().min(2, "نام را وارد کنید"),
    phone: z.string().min(7, "شماره تماس معتبر وارد کنید"),
    email: z.string().email("ایمیل معتبر وارد کنید").optional().or(z.literal("")),
    message: z.string().min(10, "پیام باید حداقل ۱۰ کاراکتر باشد"),
  });

  type ContactFormValues = z.infer<typeof contactSchema>;

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
    },
  });

  const contactInfo = [
    {
      icon: Phone,
      title: "تلفن تماس",
      value: "09111420068",
      subValue: "",
    },
    {
      icon: Mail,
      title: "ایمیل",
      value: "info@moslemi.ir",
      subValue: "sales@moslemi.ir",
    },
    {
      icon: MapPin,
      title: "آدرس دفتر مرکزی",
      value: "شهر توریستی چمخاله ، بعد از پل ، نبش ساحل ۶ ، املاک مسعود",
      subValue: "",
    },
    {
      icon: Clock,
      title: "ساعات کاری",
      value: "شنبه تا چهارشنبه: ۹ تا ۱۸",
      subValue: "پنجشنبه: ۹ تا ۱۳",
    },
  ];

  const handleSubmit = (values: ContactFormValues) => {
    toast({
      title: "پیام شما ارسال شد",
      description: "کارشناسان ما به زودی با شما تماس خواهند گرفت.",
    });
    form.reset();
  };

  return (
    <section id="contact" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <span className="text-primary font-medium text-sm">تماس با ما</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
              منتظر تماس شما هستیم
            </h2>
            <p className="text-muted-foreground mb-10 leading-relaxed">
              برای دریافت مشاوره رایگان، استعلام قیمت یا هرگونه سوال درباره خدمات و پروژه‌های ما،
              می‌توانید از طریق راه‌های زیر با ما در ارتباط باشید.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="bg-background p-6 rounded-xl border border-border hover:border-primary/30 transition-colors"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <info.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{info.title}</h3>
                  <p className="text-muted-foreground text-sm">{info.value}</p>
                  {info.subValue ? (
                    <p className="text-muted-foreground text-sm">{info.subValue}</p>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-background p-8 rounded-2xl border border-border shadow-lg">
            <h3 className="text-2xl font-bold text-foreground mb-6">فرم درخواست مشاوره</h3>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    نام و نام خانوادگی
                  </label>
                  <Input
                    placeholder="نام خود را وارد کنید"
                    required
                    className="bg-secondary/50 border-border"
                    {...form.register("name")}
                  />
                  {form.formState.errors.name && (
                    <p className="text-xs text-destructive mt-1">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    شماره تماس
                  </label>
                  <Input
                    placeholder="09111420068"
                    required
                    className="bg-secondary/50 border-border"
                    {...form.register("phone")}
                  />
                  {form.formState.errors.phone && (
                    <p className="text-xs text-destructive mt-1">
                      {form.formState.errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  ایمیل (اختیاری)
                </label>
                <Input
                  type="email"
                  placeholder="email@example.com"
                  className="bg-secondary/50 border-border"
                  {...form.register("email")}
                />
                {form.formState.errors.email && (
                  <p className="text-xs text-destructive mt-1">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">پیام شما</label>
                <Textarea
                  placeholder="توضیحات درخواست خود را بنویسید..."
                  rows={4}
                  required
                  className="bg-secondary/50 border-border resize-none"
                  {...form.register("message")}
                />
                {form.formState.errors.message && (
                  <p className="text-xs text-destructive mt-1">
                    {form.formState.errors.message.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary hover:bg-olive text-primary-foreground gap-2"
              >
                ارسال پیام
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

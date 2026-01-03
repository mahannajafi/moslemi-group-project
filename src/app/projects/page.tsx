import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MapPin, Building2, Calendar, Users, CheckCircle2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "پروژه‌ها",
  description: "پروژه‌های مشارکت در ساخت مسعود مسلمی در تهران و حومه.",
};

const ProjectsPage = () => {
  const projects = [
    {
      id: 1,
      title: "برج مسکونی آفتاب",
      location: "تهران، ونک",
      type: "مسکونی",
      units: "۲۴ واحد",
      floors: "۱۲ طبقه",
      area: "۴۸۰۰ متر مربع",
      year: "۱۴۰۲",
      status: "تکمیل شده",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=500&fit=crop",
      description: "برج مسکونی لوکس با امکانات کامل رفاهی شامل استخر، سالن ورزشی و روف گاردن",
      features: ["استخر", "سالن ورزشی", "روف گاردن", "پارکینگ طبقاتی"],
    },
    {
      id: 2,
      title: "مجتمع تجاری سپهر",
      location: "تهران، سعادت‌آباد",
      type: "تجاری",
      units: "۴۸ واحد",
      floors: "۸ طبقه",
      area: "۶۲۰۰ متر مربع",
      year: "۱۴۰۳",
      status: "در حال ساخت",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=500&fit=crop",
      description: "مجتمع تجاری-اداری مدرن با طراحی معماری منحصر به فرد و موقعیت مکانی عالی",
      features: ["پارکینگ عمومی", "آسانسور پانورامیک", "سیستم هوشمند", "فودکورت"],
    },
    {
      id: 3,
      title: "ویلاهای باغ بهشت",
      location: "لواسان",
      type: "ویلایی",
      units: "۱۲ ویلا",
      floors: "۲ طبقه",
      area: "۳۶۰۰ متر مربع",
      year: "۱۴۰۱",
      status: "تکمیل شده",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=500&fit=crop",
      description: "مجموعه ویلایی لوکس با معماری مدرن در دل طبیعت بکر لواسان",
      features: ["استخر اختصاصی", "باغ خصوصی", "سیستم امنیتی", "پارکینگ سرپوشیده"],
    },
    {
      id: 4,
      title: "برج مسکونی نگین",
      location: "تهران، شهرک غرب",
      type: "مسکونی",
      units: "۳۶ واحد",
      floors: "۱۵ طبقه",
      area: "۵۴۰۰ متر مربع",
      year: "۱۴۰۲",
      status: "تکمیل شده",
      image: "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=800&h=500&fit=crop",
      description: "برج مسکونی با نمای شیشه‌ای و امکانات رفاهی کامل در بهترین نقطه شهرک غرب",
      features: ["لابی مجلل", "نگهبانی ۲۴ ساعته", "سالن اجتماعات", "فضای سبز"],
    },
    {
      id: 5,
      title: "مجتمع اداری پارسیان",
      location: "تهران، میرداماد",
      type: "اداری",
      units: "۶۰ واحد",
      floors: "۱۰ طبقه",
      area: "۷۲۰۰ متر مربع",
      year: "۱۴۰۳",
      status: "در حال ساخت",
      image: "https://images.unsplash.com/photo-1464938050520-ef2571e0c6c7?w=800&h=500&fit=crop",
      description: "ساختمان اداری مدرن با استانداردهای بین‌المللی و موقعیت استراتژیک",
      features: ["اینترنت پرسرعت", "سیستم تهویه مطبوع", "کنفرانس روم", "کافی‌شاپ"],
    },
    {
      id: 6,
      title: "پروژه مسکونی گلستان",
      location: "کرج، مهرشهر",
      type: "مسکونی",
      units: "۷۲ واحد",
      floors: "۱۸ طبقه",
      area: "۸۶۰۰ متر مربع",
      year: "۱۴۰۴",
      status: "پیش‌فروش",
      image: "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800&h=500&fit=crop",
      description: "پروژه مسکونی بزرگ با امکان مشارکت در ساخت و شرایط ویژه پیش‌فروش",
      features: ["پرداخت اقساطی", "تحویل ۱۴۰۶", "وام بانکی", "امکانات کامل"],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "تکمیل شده":
        return "bg-primary text-primary-foreground";
      case "در حال ساخت":
        return "bg-gold text-foreground";
      case "پیش‌فروش":
        return "bg-accent text-accent-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen">
      <Header />

      <section className="pt-32 pb-16 hero-gradient">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-primary font-medium text-sm">پروژه‌های ما</span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mt-2 mb-6">
              پروژه‌های مشارکت در ساخت
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              مجموعه‌ای از پروژه‌های مسکونی، تجاری و اداری که با همکاری مالکین
              محترم اجرا شده یا در حال اجرا می‌باشند. اگر صاحب زمین هستید،
              می‌توانید با ما برای مشارکت در ساخت همکاری کنید.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
            مزایای مشارکت در ساخت با ما
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: CheckCircle2, title: "قرارداد شفاف", desc: "تنظیم قرارداد با وکلای مجرب" },
              { icon: Building2, title: "اجرای حرفه‌ای", desc: "استفاده از بهترین مصالح و نیروها" },
              { icon: Calendar, title: "تحویل به موقع", desc: "پایبندی به زمان‌بندی پروژه" },
              { icon: Users, title: "شراکت عادلانه", desc: "تقسیم منصفانه واحدها" },
            ].map((item, index) => (
              <div key={index} className="bg-background p-6 rounded-xl border border-border text-center">
                <item.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card
                key={project.id}
                className="overflow-hidden border-border hover:shadow-xl transition-shadow duration-300 animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                  <Badge className={`absolute top-4 right-4 ${getStatusColor(project.status)}`}>
                    {project.status}
                  </Badge>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{project.title}</h3>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm mt-1">
                        <MapPin className="w-4 h-4" />
                        {project.location}
                      </div>
                    </div>
                    <Badge variant="outline" className="border-primary text-primary">
                      {project.type}
                    </Badge>
                  </div>

                  <p className="text-muted-foreground mb-4 leading-relaxed">{project.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">تعداد: </span>
                      <span className="text-foreground">{project.units}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">متراژ: </span>
                      <span className="text-foreground">{project.area}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">طبقات: </span>
                      <span className="text-foreground">{project.floors}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">سال: </span>
                      <span className="text-foreground">{project.year}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.features.map((feature, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>

                  <Button className="w-full bg-primary hover:bg-olive text-primary-foreground gap-2">
                    اطلاعات بیشتر
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            صاحب زمین هستید؟
          </h2>
          <p className="text-primary-foreground/90 max-w-2xl mx-auto mb-8 text-lg">
            اگر صاحب زمین در تهران یا حومه هستید و به دنبال شریک ساختمانی معتبر
            می‌گردید، همین امروز با ما تماس بگیرید.
          </p>
          <Button size="lg" className="bg-background text-foreground hover:bg-secondary gap-2">
            درخواست مشاوره رایگان
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProjectsPage;

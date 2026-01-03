import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Building2, Award, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const stats = [
    { icon: Building2, value: "+۵۰", label: "پروژه موفق" },
    { icon: Award, value: "+۲۵", label: "سال تجربه" },
    { icon: Users, value: "+۱۰۰۰", label: "مشتری راضی" },
  ];

  return (
    <section className="relative min-h-screen flex items-center hero-gradient pt-20">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-sage-muted/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cream-dark/40 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-secondary/50 rounded-full px-4 py-2 text-sm text-muted-foreground">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              گروه سرمایه گذاری مسعود مسلمی
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight animate-fade-up">
              گروه سرمایه گذاری
              <span className="text-primary block mt-2">مسعود مسلمی</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed animate-fade-up" style={{ animationDelay: "0.2s" }}>
              ما از ۱۳۷۵ با تمرکز بر ملک و ساخت‌وساز قدم در مسیر سرمایه‌گذاری گذاشتیم و امروز
              به‌عنوان برند پیشرو و قدرتمند منطقه چاف و چمخاله شناخته می‌شویم. در ادامه این مسیر
              رو‌به‌رشد، از سال ۱۴۰۲ با ورود به حوزه طلا و جواهر، تعریف تازه‌ای از سرمایه‌گذاری
              هوشمند و ارزش‌محور ارائه داده‌ایم. اینجا جایی‌ست که تجربه، اعتماد و آینده‌نگری به هم
              می‌رسند
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: "0.4s" }}>
              <Button size="lg" className="bg-primary hover:bg-olive text-primary-foreground gap-2">
                درخواست مشاوره رایگان
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <Link href="/projects">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  مشاهده پروژه‌ها
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 animate-fade-up" style={{ animationDelay: "0.6s" }}>
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative hidden lg:block animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/10 rounded-3xl rotate-3" />
              <Image
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=700&fit=crop"
                alt="ساختمان مدرن"
                width={600}
                height={700}
                className="relative rounded-2xl shadow-2xl w-full h-[500px] object-cover"
                priority
              />
              
              {/* Floating Card */}
              <div className="absolute -bottom-6 -right-6 bg-background p-6 rounded-xl shadow-lg border border-border">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-bold text-foreground">نماد اعتماد</div>
                    <div className="text-sm text-muted-foreground">گواهینامه‌های معتبر</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

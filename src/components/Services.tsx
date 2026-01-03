import { Building, Handshake, Ruler, HardHat, Home, FileCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Services = () => {
  const services = [
    {
      icon: Handshake,
      title: "مشارکت در ساخت",
      description: "همکاری با مالکین زمین برای ساخت پروژه‌های مسکونی و تجاری با شرایط عادلانه و شفاف",
    },
    {
      icon: Building,
      title: "پیمانکاری عمومی",
      description: "اجرای کامل پروژه‌های ساختمانی از صفر تا صد با تضمین کیفیت و زمان‌بندی دقیق",
    },
    {
      icon: Ruler,
      title: "طراحی و معماری",
      description: "طراحی نقشه‌های معماری مدرن و کاربردی توسط تیم متخصص معماران",
    },
    {
      icon: HardHat,
      title: "نظارت فنی",
      description: "نظارت دقیق بر اجرای پروژه‌ها طبق استانداردهای روز مهندسی",
    },
    {
      icon: Home,
      title: "بازسازی ساختمان",
      description: "نوسازی و بازسازی ساختمان‌های قدیمی با حفظ سازه و بهبود کیفیت",
    },
    {
      icon: FileCheck,
      title: "مشاوره ساختمانی",
      description: "ارائه مشاوره تخصصی در زمینه ساخت و ساز، انتخاب مصالح و بودجه‌بندی",
    },
  ];

  return (
    <section id="services" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-medium text-sm">خدمات ما</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            خدمات تخصصی ساختمانی
          </h2>
          <p className="text-muted-foreground">
            مجموعه کاملی از خدمات ساختمانی را با بالاترین کیفیت و استانداردهای روز 
            به شما ارائه می‌دهیم.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group bg-background border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
            >
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <service.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

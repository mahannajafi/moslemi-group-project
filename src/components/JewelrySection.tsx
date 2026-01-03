import Image from "next/image";
import Link from "next/link";
import { Gem, MapPin, Clock, Phone, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const JewelrySection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-sage-muted/30 to-background relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-20 w-80 h-80 bg-sage-light/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 text-sm text-primary">
              <Gem className="w-4 h-4" />
              مجموعه طلا و جواهر
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              طلا فروشی
              <span className="text-primary block mt-2">الیزه</span>
            </h2>

            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              در ادامه این مسیر رو‌به‌رشد، از سال ۱۴۰۲ با ورود به حوزه طلا و جواهر، تعریف تازه‌ای
              از سرمایه‌گذاری هوشمند و ارزش‌محور ارائه داده‌ایم.
            </p>

            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>شهر توریستی چمخاله ، بعد از پل ، نبش ساحل ۶ ، املاک مسعود</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>۱۰ صبح تا ۱۰ شب</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <span>09111420068</span>
              </div>
            </div>

            <Link href="/jewelry">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 mt-4">
                مشاهده گالری و اطلاعات بیشتر
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Image */}
          <div className="relative order-1 lg:order-2">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-sage-light/30 rounded-3xl rotate-2" />
              <Image
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=500&fit=crop"
                alt="طلا و جواهر الیزه"
                width={600}
                height={500}
                className="relative rounded-2xl shadow-2xl w-full h-[400px] object-cover"
              />
              
              {/* Floating Badge */}
              <div className="absolute -bottom-4 -left-4 bg-background p-4 rounded-xl shadow-lg border border-primary/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Gem className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-bold text-foreground text-sm">ضمانت اصالت</div>
                    <div className="text-xs text-muted-foreground">طلای ۱۸ عیار</div>
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

export default JewelrySection;

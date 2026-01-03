import type { Metadata } from "next";
import Image from "next/image";
import {
  Gem,
  MapPin,
  Clock,
  Phone,
  Instagram,
  Star,
  Shield,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "جواهرات الیزه",
  description: "زیرمجموعه طلا و جواهرات گروه سرمایه گذاری مسعود مسلمی.",
};

const JewelryPage = () => {
  const features = [
    { icon: Shield, title: "ضمانت اصالت", description: "تمامی محصولات دارای ضمانت اصالت و فاکتور رسمی" },
    { icon: Star, title: "کیفیت برتر", description: "استفاده از بهترین مواد اولیه و طراحی‌های منحصر به فرد" },
    { icon: Award, title: "تجربه طولانی", description: "بیش از ۲۰ سال سابقه در صنعت طلا و جواهر" },
  ];

  const categories = [
    { name: "انگشتر", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=300&fit=crop" },
    { name: "گردنبند", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop" },
    { name: "دستبند", image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=300&fit=crop" },
    { name: "گوشواره", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=300&fit=crop" },
  ];

  return (
    <div className="min-h-screen">
      <Header />

      <section className="relative min-h-[60vh] flex items-center pt-20 bg-gradient-to-b from-sage-muted/20 to-background overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-10 w-96 h-96 bg-primary/15 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-72 h-72 bg-sage-light/25 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2 text-sm text-primary">
                <Gem className="w-4 h-4" />
                زیرمجموعه گروه سرمایه گذاری مسعود مسلمی
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                طلا فروشی
                <span className="text-primary block mt-2">الیزه</span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                با افتخار، جدیدترین و زیباترین طرح‌های طلا و جواهرات را با بهترین کیفیت
                و قیمت مناسب به شما عزیزان ارائه می‌دهیم. همراه شما در لحظات خاص زندگی.
              </p>

              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                <Phone className="w-4 h-4" />
                تماس با ما
              </Button>
            </div>

            <div className="relative hidden lg:block">
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-sage-light/30 rounded-3xl rotate-3" />
              <Image
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=500&fit=crop"
                alt="طلا و جواهر الیزه"
                width={600}
                height={500}
                className="relative rounded-2xl shadow-2xl w-full h-[450px] object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-primary/20 bg-primary/5 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">دسته‌بندی محصولات</h2>
            <p className="text-muted-foreground">مجموعه‌ای از زیباترین طرح‌ها</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div key={index} className="group relative rounded-2xl overflow-hidden cursor-pointer">
                <Image
                  src={category.image}
                  alt={category.name}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                  <span className="text-white font-bold text-lg">{category.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="rounded-2xl overflow-hidden h-[400px] bg-secondary/50 flex items-center justify-center">
              <div className="text-center p-8">
                <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">موقعیت فروشگاه</h3>
                <p className="text-muted-foreground">
                  شهر توریستی چمخاله ، بعد از پل ، نبش ساحل ۶ ، املاک مسعود
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-4">اطلاعات تماس</h2>
                <p className="text-muted-foreground">برای مشاوره و خرید با ما در تماس باشید</p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-primary/5 border border-primary/20">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">آدرس</h4>
                    <p className="text-muted-foreground">
                      شهر توریستی چمخاله ، بعد از پل ، نبش ساحل ۶ ، املاک مسعود
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-primary/5 border border-primary/20">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">تلفن</h4>
                    <p className="text-muted-foreground" dir="ltr">09111420068</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-primary/5 border border-primary/20">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">ساعات کاری</h4>
                    <p className="text-muted-foreground">شنبه تا پنجشنبه: ۱۰ صبح تا ۱۰ شب</p>
                    <p className="text-muted-foreground">جمعه: ۴ عصر تا ۱۰ شب</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-primary/5 border border-primary/20">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Instagram className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">شبکه‌های اجتماعی</h4>
                    <p className="text-muted-foreground">@elizeh_jewelry</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default JewelryPage;

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

const About = () => {
  const features = [
    "مهندسان مجرب و متخصص",
    "استفاده از مصالح درجه یک",
    "تحویل به موقع پروژه‌ها",
    "ضمانت کیفیت ساخت",
    "خدمات پس از فروش",
    "قیمت‌گذاری شفاف",
  ];

  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <Image
                  src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=300&h=400&fit=crop"
                  alt="پروژه ساختمانی"
                  width={300}
                  height={400}
                  className="rounded-xl w-full h-48 object-cover shadow-lg"
                />
                <Image
                  src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=300&h=300&fit=crop"
                  alt="عملیات ساختمانی"
                  width={300}
                  height={300}
                  className="rounded-xl w-full h-40 object-cover shadow-lg"
                />
              </div>
              <div className="pt-8 space-y-4">
                <Image
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300&h=300&fit=crop"
                  alt="تیم مهندسی"
                  width={300}
                  height={300}
                  className="rounded-xl w-full h-40 object-cover shadow-lg"
                />
                <Image
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&h=400&fit=crop"
                  alt="ساختمان مدرن"
                  width={300}
                  height={400}
                  className="rounded-xl w-full h-48 object-cover shadow-lg"
                />
              </div>
            </div>
            
            {/* Experience Badge */}
            <div className="absolute -bottom-4 right-1/2 translate-x-1/2 bg-primary text-primary-foreground px-8 py-4 rounded-xl shadow-xl">
              <div className="text-3xl font-bold text-center">+۲۵</div>
              <div className="text-sm opacity-90">سال تجربه</div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div>
              <span className="text-primary font-medium text-sm">درباره ما</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
                گروه سرمایه گذاری
                <span className="text-primary block">مسعود مسلمی</span>
              </h2>
            </div>

            <p className="text-muted-foreground leading-relaxed text-lg">
              ما از ۱۳۷۵ با تمرکز بر ملک و ساخت‌وساز قدم در مسیر سرمایه‌گذاری گذاشتیم و امروز
              به‌عنوان برند پیشرو و قدرتمند منطقه چاف و چمخاله شناخته می‌شویم.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              در ادامه این مسیر رو‌به‌رشد، از سال ۱۴۰۲ با ورود به حوزه طلا و جواهر، تعریف تازه‌ای
              از سرمایه‌گذاری هوشمند و ارزش‌محور ارائه داده‌ایم. اینجا جایی‌ست که تجربه، اعتماد و
              آینده‌نگری به هم می‌رسند
            </p>

            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

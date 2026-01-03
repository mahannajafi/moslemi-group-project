import Link from "next/link";
import { Instagram, Linkedin, Phone } from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { name: "صفحه اصلی", href: "/" },
    { name: "پروژه‌های مشارکتی", href: "/projects" },
    { name: "درباره ما", href: "/#about" },
    { name: "خدمات", href: "/#services" },
    { name: "تماس با ما", href: "/#contact" },
  ];

  const services = [
    "مشارکت در ساخت",
    "پیمانکاری عمومی",
    "طراحی و معماری",
    "نظارت فنی",
    "بازسازی ساختمان",
  ];

  return (
    <footer className="bg-foreground text-primary-foreground py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">م</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">گروه سرمایه گذاری مسعود مسلمی</h3>
                <p className="text-xs opacity-70">MasoudMoslemiInvesmentgroup</p>
              </div>
            </div>
            <p className="text-sm opacity-80 leading-relaxed mb-6">
              با بیش از ۲۵ سال تجربه در صنعت ساختمان، پیشرو در ارائه خدمات 
              مشارکت در ساخت و اجرای پروژه‌های مسکونی و تجاری.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="tel:09111420068" 
                className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6">دسترسی سریع</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm opacity-80 hover:opacity-100 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-6">خدمات</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <span className="text-sm opacity-80">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-6">اطلاعات تماس</h4>
            <ul className="space-y-4 text-sm">
              <li className="opacity-80">
                <strong className="block opacity-100 mb-1">آدرس:</strong>
                شهر توریستی چمخاله ، بعد از پل ، نبش ساحل ۶ ، املاک مسعود
              </li>
              <li className="opacity-80">
                <strong className="block opacity-100 mb-1">تلفن:</strong>
                09111420068
              </li>
              <li className="opacity-80">
                <strong className="block opacity-100 mb-1">ایمیل:</strong>
                info@moslemi.ir
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center">
          <p className="text-sm opacity-70">
            © ۱۴۰۳ گروه سرمایه گذاری مسعود مسلمی. تمامی حقوق محفوظ است.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

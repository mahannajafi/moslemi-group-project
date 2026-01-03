import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const FeaturedProjects = () => {
  const projects = [
    {
      id: 1,
      title: "برج مسکونی آفتاب",
      location: "تهران، ونک",
      type: "مسکونی",
      units: "۲۴ واحد",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop",
      status: "تکمیل شده",
    },
    {
      id: 2,
      title: "مجتمع تجاری سپهر",
      location: "تهران، سعادت‌آباد",
      type: "تجاری",
      units: "۴۸ واحد",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
      status: "در حال ساخت",
    },
    {
      id: 3,
      title: "ویلاهای باغ بهشت",
      location: "لواسان",
      type: "ویلایی",
      units: "۱۲ ویلا",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop",
      status: "تکمیل شده",
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-primary font-medium text-sm">پروژه‌های ما</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
              نمونه پروژه‌های اجرا شده
            </h2>
          </div>
          <Link href="/projects">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground gap-2">
              مشاهده همه پروژه‌ها
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group relative overflow-hidden rounded-2xl bg-card shadow-lg animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(min-width: 1024px) 33vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />
                
                {/* Status Badge */}
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${
                  project.status === "تکمیل شده" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-gold text-foreground"
                }`}>
                  {project.status}
                </div>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 right-0 left-0 p-6 text-primary-foreground">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <div className="flex items-center gap-4 text-sm opacity-90">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {project.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Building2 className="w-4 h-4" />
                    {project.units}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;

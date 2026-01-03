"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Ruler,
  BedDouble,
  Bath,
  Loader2,
  ArrowRight,
  Phone,
  Star,
  Check,
  X,
} from "lucide-react";
import { fetchPropertyById } from "@/lib/api/properties";

const propertyTypeLabels: Record<string, string> = {
  apartment: "آپارتمان",
  house: "خانه",
  villa: "ویلا",
  land: "زمین",
  commercial: "تجاری",
};

const listingTypeLabels: Record<string, string> = {
  sale: "فروش",
  rent: "اجاره",
  partnership: "مشارکت در ساخت",
};

const statusLabels: Record<string, string> = {
  available: "موجود",
  pending: "در انتظار",
  sold: "فروخته شده",
  off_market: "خارج از بازار",
};

const PropertyDetailClient = () => {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : params.id?.[0] ?? "";
  const [selectedImage, setSelectedImage] = useState(0);

  const { data: property, isLoading, error } = useQuery({
    queryKey: ["property", id],
    queryFn: () => fetchPropertyById(id),
    enabled: Boolean(id),
  });

  const formatPrice = (price: string | null | undefined) => {
    if (!price) return "توافقی";
    const numeric = Number(price);
    if (Number.isNaN(numeric)) return price;
    return new Intl.NumberFormat("fa-IR").format(numeric) + " تومان";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              فایل مورد نظر یافت نشد
            </h1>
            <Button asChild>
              <Link href="/properties">بازگشت به لیست فایل‌ها</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const images = property.images && property.images.length > 0
    ? property.images.map((image) => image.url)
    : [property.featured_image].filter(Boolean) as string[];

  const featuresData =
    property.features && typeof property.features === "object"
      ? property.features
      : {};
  const features = [
    { key: "has_elevator", label: "آسانسور", value: Boolean(featuresData.has_elevator) },
    { key: "has_storage", label: "انباری", value: Boolean(featuresData.has_storage) },
    { key: "has_balcony", label: "بالکن", value: Boolean(featuresData.has_balcony) },
    { key: "has_pool", label: "استخر", value: Boolean(featuresData.has_pool) },
    { key: "has_gym", label: "سالن ورزش", value: Boolean(featuresData.has_gym) },
    { key: "has_security", label: "نگهبانی", value: Boolean(featuresData.has_security) },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-24">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
              بازگشت به لیست فایل‌ها
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-muted">
                {images.length > 0 ? (
                  <Image
                    src={images[selectedImage]}
                    alt={property.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 66vw, 100vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    بدون تصویر
                  </div>
                )}

                {property.is_featured && (
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-yellow-500 text-white gap-1">
                      <Star className="w-3 h-3 fill-current" />
                      فایل ویژه
                    </Badge>
                  </div>
                )}
              </div>

              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {images.map((img: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index ? "border-primary" : "border-transparent"
                      }`}
                      aria-label={`انتخاب تصویر ${index + 1}`}
                    >
                      <Image
                        src={img}
                        alt={`تصویر ${index + 1}`}
                        width={96}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {property.description && (
                <div className="bg-card rounded-2xl p-6 border border-border">
                  <h2 className="text-xl font-bold text-foreground mb-4">توضیحات</h2>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {property.description}
                  </p>
                </div>
              )}

              <div className="bg-card rounded-2xl p-6 border border-border">
                <h2 className="text-xl font-bold text-foreground mb-4">امکانات</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {features.map((feature) => (
                    <div
                      key={feature.key}
                      className={`flex items-center gap-2 ${
                        feature.value ? "text-foreground" : "text-muted-foreground/50"
                      }`}
                    >
                      {feature.value ? (
                        <Check className="w-5 h-5 text-primary" />
                      ) : (
                        <X className="w-5 h-5" />
                      )}
                      <span>{feature.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-card rounded-2xl p-6 border border-border">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className="bg-primary text-primary-foreground">
                    {listingTypeLabels[property.listing_type]}
                  </Badge>
                  <Badge variant="secondary">
                    {propertyTypeLabels[property.property_type]}
                  </Badge>
                  <Badge variant={property.status === "available" ? "default" : "secondary"}>
                    {statusLabels[property.status]}
                  </Badge>
                </div>

                <h1 className="text-2xl font-bold text-foreground mb-4">
                  {property.title}
                </h1>

                <div className="flex items-center gap-2 text-muted-foreground mb-6">
                  <MapPin className="w-5 h-5" />
                  <span>
                    {property.address}
                    {property.district && ` - ${property.district}`}
                    {property.city && `، ${property.city}`}
                  </span>
                </div>

                <div className="text-3xl font-bold text-primary">
                  {formatPrice(property.price)}
                </div>
              </div>

              <div className="bg-card rounded-2xl p-6 border border-border">
                <h2 className="text-lg font-bold text-foreground mb-4">مشخصات</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Ruler className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">متراژ</div>
                      <div className="font-semibold">{property.area} متر</div>
                    </div>
                  </div>

                  {property.bedrooms && property.bedrooms > 0 && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                        <BedDouble className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">اتاق خواب</div>
                        <div className="font-semibold">{property.bedrooms}</div>
                      </div>
                    </div>
                  )}

                  {property.bathrooms && property.bathrooms > 0 && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                        <Bath className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">سرویس</div>
                        <div className="font-semibold">{property.bathrooms}</div>
                      </div>
                    </div>
                  )}

                </div>
              </div>

              <div className="bg-primary/5 rounded-2xl p-6 border border-primary/20">
                <h3 className="font-bold text-foreground mb-2">علاقه‌مند به این ملک هستید؟</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  برای کسب اطلاعات بیشتر و هماهنگی بازدید با ما تماس بگیرید
                </p>
                <Button className="w-full gap-2" size="lg">
                  <Phone className="w-5 h-5" />
                  تماس با مشاور
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PropertyDetailClient;

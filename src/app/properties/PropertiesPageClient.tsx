"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import PropertyFilters from "@/components/PropertyFilters";
import { Loader2 } from "lucide-react";
import { fetchProperties, type PropertyFilters } from "@/lib/api/properties";

const PropertiesPageClient = () => {
  const [filters, setFilters] = useState<PropertyFilters>({
    property_type: "all",
    listing_type: "all",
    city: "",
    min_area: "",
    max_area: "",
    min_price: "",
    max_price: "",
    bedrooms: "all",
  });

  const { data: properties, isLoading } = useQuery({
    queryKey: ["properties", filters],
    queryFn: () => fetchProperties(filters),
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              فایل‌های ملکی
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              مجموعه‌ای از بهترین فایل‌های ملکی برای خرید، فروش و مشارکت در ساخت
            </p>
          </div>

          <PropertyFilters filters={filters} setFilters={setFilters} />

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : properties?.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">
                فایلی با این مشخصات یافت نشد
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                فیلترها را تغییر دهید یا بعداً مراجعه کنید
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties?.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PropertiesPageClient;

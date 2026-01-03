"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { fetchAdminProperties, deleteProperty } from "@/lib/api/properties";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Eye, MapPin, Ruler, BedDouble } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const propertyTypeLabels: Record<string, string> = {
  apartment: "آپارتمان",
  house: "خانه",
  villa: "ویلا",
  land: "زمین",
  commercial: "تجاری",
};

const statusLabels: Record<string, string> = {
  available: "موجود",
  pending: "در انتظار",
  sold: "فروخته شده",
  off_market: "خارج از بازار",
};

const statusColors: Record<string, string> = {
  available: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  sold: "bg-red-100 text-red-800",
  off_market: "bg-gray-200 text-gray-800",
};

const PropertyList = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: properties, isLoading } = useQuery({
    queryKey: ["properties"],
    queryFn: fetchAdminProperties,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProperty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
      toast({
        title: "حذف موفق",
        description: "فایل با موفقیت حذف شد",
      });
    },
    onError: (error: any) => {
      toast({
        title: "خطا",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const formatPrice = (price: string | null | undefined) => {
    if (!price) return "توافقی";
    const numeric = Number(price);
    if (Number.isNaN(numeric)) return price;
    return new Intl.NumberFormat("fa-IR").format(numeric) + " تومان";
  };

  if (isLoading) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        در حال بارگذاری...
      </div>
    );
  }

  if (!properties?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">هنوز فایلی ثبت نشده است</p>
        <p className="text-sm text-muted-foreground">
          از تب "افزودن فایل جدید" برای ثبت فایل استفاده کنید
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground mb-4">
        {properties.length} فایل ثبت شده
      </div>

      <div className="grid gap-4">
        {properties.map((property) => (
          <div
            key={property.id}
            className="bg-card rounded-xl p-4 border border-border hover:shadow-md transition-shadow"
          >
            <div className="flex gap-4">
              {property.featured_image || property.images?.[0]?.url ? (
                <Image
                  src={property.featured_image || property.images?.[0]?.url || ""}
                  alt={property.title}
                  width={128}
                  height={96}
                  className="w-32 h-24 object-cover rounded-lg flex-shrink-0"
                />
              ) : (
                <div className="w-32 h-24 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-muted-foreground text-xs">بدون تصویر</span>
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-foreground truncate">
                    {property.title}
                  </h3>
                  <div className="flex gap-2 flex-shrink-0">
                    <Badge variant="secondary">
                      {propertyTypeLabels[property.property_type] || property.property_type}
                    </Badge>
                    <Badge className={statusColors[property.status]}>
                      {statusLabels[property.status] || property.status}
                    </Badge>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {property.district ? `${property.district}, ` : ""}{property.city}
                  </span>
                  <span className="flex items-center gap-1">
                    <Ruler className="w-4 h-4" />
                    {property.area} متر
                  </span>
                  {property.bedrooms > 0 && (
                    <span className="flex items-center gap-1">
                      <BedDouble className="w-4 h-4" />
                      {property.bedrooms} خواب
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-bold text-primary">
                    {formatPrice(property.price)}
                  </span>

                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/properties/${property.id}`}>
                        <Eye className="w-4 h-4" />
                      </Link>
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>آیا مطمئن هستید؟</AlertDialogTitle>
                          <AlertDialogDescription>
                            این عمل قابل بازگشت نیست. فایل "{property.title}" برای همیشه حذف خواهد شد.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>انصراف</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteMutation.mutate(property.id)}
                            className="bg-destructive text-destructive-foreground"
                          >
                            حذف
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyList;

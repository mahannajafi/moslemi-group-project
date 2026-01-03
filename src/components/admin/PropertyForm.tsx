"use client";

import { useState } from "react";
import { createProperty, uploadPropertyImage } from "@/lib/api/properties";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Upload, X, Loader2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const propertySchema = z.object({
  title: z.string().min(2, "عنوان را وارد کنید"),
  description: z.string().optional(),
  property_type: z.enum(["apartment", "house", "villa", "land", "commercial"]),
  status: z.enum(["available", "pending", "sold", "off_market"]),
  listing_type: z.enum(["sale", "rent", "partnership"]),
  address: z.string().min(2, "آدرس را وارد کنید"),
  city: z.string().min(1, "شهر را وارد کنید"),
  district: z.string().optional(),
  area: z.string().min(1, "متراژ الزامی است"),
  land_area: z.string().optional(),
  bedrooms: z.string().optional(),
  bathrooms: z.string().optional(),
  year_built: z.string().optional(),
  floor_number: z.string().optional(),
  total_floors: z.string().optional(),
  parking_spaces: z.string().optional(),
  price: z.string().min(1, "قیمت الزامی است"),
  price_per_meter: z.string().optional(),
  has_elevator: z.boolean(),
  has_storage: z.boolean(),
  has_balcony: z.boolean(),
  has_pool: z.boolean(),
  has_gym: z.boolean(),
  has_security: z.boolean(),
  is_featured: z.boolean(),
});

type PropertyFormValues = z.infer<typeof propertySchema>;

const PropertyForm = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: "",
      description: "",
      property_type: "apartment",
      status: "available",
      listing_type: "sale",
      address: "",
      city: "تهران",
      district: "",
      area: "",
      land_area: "",
      bedrooms: "0",
      bathrooms: "0",
      year_built: "",
      floor_number: "",
      total_floors: "",
      parking_spaces: "0",
      price: "",
      price_per_meter: "",
      has_elevator: false,
      has_storage: false,
      has_balcony: false,
      has_pool: false,
      has_gym: false,
      has_security: false,
      is_featured: false,
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setUploadingImages(true);
    const uploadedUrls: string[] = [];

    try {
      for (const file of Array.from(files)) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

        const { url } = await uploadPropertyImage(file, fileName);
        uploadedUrls.push(url);
      }

      setImages([...images, ...uploadedUrls]);
      toast({
        title: "آپلود موفق",
        description: `${uploadedUrls.length} تصویر آپلود شد`,
      });
    } catch (error: any) {
      toast({
        title: "خطا در آپلود",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploadingImages(false);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (values: PropertyFormValues) => {
    setLoading(true);

    try {
      await createProperty({
        title: values.title,
        description: values.description || null,
        property_type: values.property_type,
        status: values.status,
        listing_type: values.listing_type,
        address: values.address,
        city: values.city,
        district: values.district || null,
        area: values.area ? parseFloat(values.area) : null,
        bedrooms: values.bedrooms ? parseInt(values.bedrooms) : null,
        bathrooms: values.bathrooms ? parseInt(values.bathrooms) : null,
        price: values.price ? parseFloat(values.price) : null,
        features: {
          has_elevator: values.has_elevator,
          has_storage: values.has_storage,
          has_balcony: values.has_balcony,
          has_pool: values.has_pool,
          has_gym: values.has_gym,
          has_security: values.has_security,
        },
        images: images,
        featured_image: images[0] || null,
      });

      toast({
        title: "فایل اضافه شد",
        description: "فایل ملکی با موفقیت ثبت شد",
      });

      form.reset();
      setImages([]);
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    } catch (error: any) {
      toast({
        title: "خطا",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
      <div className="bg-card rounded-2xl p-6 border border-border">
        <h3 className="text-lg font-semibold mb-4">اطلاعات اصلی</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Label htmlFor="title">عنوان فایل *</Label>
            <Input
              id="title"
              placeholder="مثال: آپارتمان ۱۵۰ متری در فرمانیه"
              required
              {...form.register("title")}
            />
            {form.formState.errors.title && (
              <p className="text-xs text-destructive mt-1">{form.formState.errors.title.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="property_type">نوع ملک</Label>
            <Select
              value={form.watch("property_type")}
              onValueChange={(value) => form.setValue("property_type", value as PropertyFormValues["property_type"])}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apartment">آپارتمان</SelectItem>
                <SelectItem value="house">خانه</SelectItem>
                <SelectItem value="villa">ویلا</SelectItem>
                <SelectItem value="land">زمین</SelectItem>
                <SelectItem value="commercial">تجاری</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="listing_type">نوع معامله</Label>
            <Select
              value={form.watch("listing_type")}
              onValueChange={(value) => form.setValue("listing_type", value as PropertyFormValues["listing_type"])}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sale">فروش</SelectItem>
                <SelectItem value="rent">اجاره</SelectItem>
                <SelectItem value="partnership">مشارکت در ساخت</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="status">وضعیت</Label>
            <Select
              value={form.watch("status")}
              onValueChange={(value) => form.setValue("status", value as PropertyFormValues["status"])}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">موجود</SelectItem>
                <SelectItem value="pending">در انتظار</SelectItem>
                <SelectItem value="sold">فروخته شده</SelectItem>
                <SelectItem value="off_market">خارج از بازار</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="description">توضیحات</Label>
            <Textarea
              id="description"
              placeholder="توضیحات کامل ملک..."
              rows={4}
              {...form.register("description")}
            />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-2xl p-6 border border-border">
        <h3 className="text-lg font-semibold mb-4">موقعیت</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <Label htmlFor="address">آدرس *</Label>
            <Input
              id="address"
              placeholder="آدرس کامل ملک"
              required
              {...form.register("address")}
            />
            {form.formState.errors.address && (
              <p className="text-xs text-destructive mt-1">{form.formState.errors.address.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="city">شهر</Label>
            <Input id="city" placeholder="تهران" {...form.register("city")} />
          </div>

          <div>
            <Label htmlFor="district">محله/منطقه</Label>
            <Input id="district" placeholder="فرمانیه" {...form.register("district")} />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-2xl p-6 border border-border">
        <h3 className="text-lg font-semibold mb-4">مشخصات فنی</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="area">متراژ (متر مربع) *</Label>
            <Input id="area" type="number" placeholder="150" required {...form.register("area")} />
            {form.formState.errors.area && (
              <p className="text-xs text-destructive mt-1">{form.formState.errors.area.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="land_area">متراژ زمین</Label>
            <Input id="land_area" type="number" placeholder="500" {...form.register("land_area")} />
          </div>

          <div>
            <Label htmlFor="bedrooms">تعداد اتاق</Label>
            <Input id="bedrooms" type="number" placeholder="3" {...form.register("bedrooms")} />
          </div>

          <div>
            <Label htmlFor="bathrooms">تعداد سرویس</Label>
            <Input id="bathrooms" type="number" placeholder="2" {...form.register("bathrooms")} />
          </div>

          <div>
            <Label htmlFor="year_built">سال ساخت</Label>
            <Input id="year_built" type="number" placeholder="1402" {...form.register("year_built")} />
          </div>

          <div>
            <Label htmlFor="floor_number">طبقه</Label>
            <Input id="floor_number" type="number" placeholder="5" {...form.register("floor_number")} />
          </div>

          <div>
            <Label htmlFor="total_floors">تعداد طبقات</Label>
            <Input id="total_floors" type="number" placeholder="10" {...form.register("total_floors")} />
          </div>

          <div>
            <Label htmlFor="parking_spaces">پارکینگ</Label>
            <Input id="parking_spaces" type="number" placeholder="1" {...form.register("parking_spaces")} />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-2xl p-6 border border-border">
        <h3 className="text-lg font-semibold mb-4">امکانات</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { key: "has_elevator", label: "آسانسور" },
            { key: "has_storage", label: "انباری" },
            { key: "has_balcony", label: "بالکن" },
            { key: "has_pool", label: "استخر" },
            { key: "has_gym", label: "سالن ورزش" },
            { key: "has_security", label: "نگهبانی" },
          ].map((item) => (
            <div key={item.key} className="flex items-center gap-2">
              <Checkbox
                id={item.key}
                checked={Boolean(form.watch(item.key as keyof PropertyFormValues))}
                onCheckedChange={(checked) =>
                  form.setValue(item.key as keyof PropertyFormValues, Boolean(checked))
                }
              />
              <Label htmlFor={item.key} className="cursor-pointer">
                {item.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card rounded-2xl p-6 border border-border">
        <h3 className="text-lg font-semibold mb-4">قیمت</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="price">قیمت کل (تومان)</Label>
            <Input
              id="price"
              type="number"
              placeholder="15000000000"
              required
              {...form.register("price")}
            />
            {form.formState.errors.price && (
              <p className="text-xs text-destructive mt-1">
                {form.formState.errors.price.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="price_per_meter">قیمت هر متر (تومان)</Label>
            <Input id="price_per_meter" type="number" placeholder="100000000" {...form.register("price_per_meter")} />
          </div>
        </div>
      </div>

      <div className="bg-card rounded-2xl p-6 border border-border">
        <h3 className="text-lg font-semibold mb-4">تصاویر</h3>

        <div className="mb-4">
          <Label
            htmlFor="images"
            className="flex items-center justify-center gap-2 p-8 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary transition-colors"
          >
            {uploadingImages ? <Loader2 className="w-6 h-6 animate-spin" /> : <Upload className="w-6 h-6" />}
            <span>{uploadingImages ? "در حال آپلود..." : "انتخاب تصاویر"}</span>
          </Label>
          <Input
            id="images"
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            disabled={uploadingImages}
          />
        </div>

        {images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((url, index) => (
              <div key={index} className="relative group">
                <img src={url} alt={`تصویر ${index + 1}`} className="w-full h-32 object-cover rounded-lg" />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 left-2 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="حذف تصویر"
                >
                  <X className="w-4 h-4" />
                </button>
                {index === 0 && (
                  <span className="absolute bottom-2 right-2 text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                    تصویر اصلی
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Checkbox
            id="is_featured"
            checked={Boolean(form.watch("is_featured"))}
            onCheckedChange={(checked) => form.setValue("is_featured", Boolean(checked))}
          />
          <Label htmlFor="is_featured" className="cursor-pointer">
            نمایش در صفحه اصلی (ویژه)
          </Label>
        </div>
      </div>

      <Button type="submit" size="lg" disabled={loading} className="w-full md:w-auto">
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin ml-2" />
            در حال ثبت...
          </>
        ) : (
          "ثبت فایل"
        )}
      </Button>
    </form>
  );
};

export default PropertyForm;

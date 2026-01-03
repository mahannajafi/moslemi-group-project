"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { X, SlidersHorizontal } from "lucide-react";
import type { PropertyFilters } from "@/lib/api/properties";
import { useState, type Dispatch, type SetStateAction } from "react";

interface PropertyFiltersProps {
  filters: PropertyFilters;
  setFilters: Dispatch<SetStateAction<PropertyFilters>>;
}

const PropertyFilters = ({ filters, setFilters }: PropertyFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const resetFilters = () => {
    setFilters({
      property_type: "all",
      listing_type: "all",
      city: "",
      min_area: "",
      max_area: "",
      min_price: "",
      max_price: "",
      bedrooms: "all",
    });
  };

  const hasActiveFilters =
    filters.property_type !== "all" ||
    filters.listing_type !== "all" ||
    filters.city !== "" ||
    filters.min_area !== "" ||
    filters.max_area !== "" ||
    filters.min_price !== "" ||
    filters.max_price !== "" ||
    filters.bedrooms !== "all";

  const activeFilterCount = [
    filters.property_type !== "all",
    filters.listing_type !== "all",
    filters.city !== "",
    filters.min_area !== "" || filters.max_area !== "",
    filters.min_price !== "" || filters.max_price !== "",
    filters.bedrooms !== "all",
  ].filter(Boolean).length;

  return (
    <div className="mb-6">
      {/* Compact Filter Bar */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Quick Filters */}
        <Select
          value={filters.property_type}
          onValueChange={(value) =>
            setFilters({ ...filters, property_type: value })
          }
        >
          <SelectTrigger className="w-auto min-w-[100px] h-9 text-sm bg-card border-border/50 hover:border-primary/50 transition-colors">
            <SelectValue placeholder="نوع ملک" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">همه انواع</SelectItem>
            <SelectItem value="apartment">آپارتمان</SelectItem>
            <SelectItem value="house">خانه</SelectItem>
            <SelectItem value="villa">ویلا</SelectItem>
            <SelectItem value="land">زمین</SelectItem>
            <SelectItem value="commercial">تجاری</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.listing_type}
          onValueChange={(value) =>
            setFilters({ ...filters, listing_type: value })
          }
        >
          <SelectTrigger className="w-auto min-w-[90px] h-9 text-sm bg-card border-border/50 hover:border-primary/50 transition-colors">
            <SelectValue placeholder="معامله" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">همه</SelectItem>
            <SelectItem value="sale">فروش</SelectItem>
            <SelectItem value="rent">اجاره</SelectItem>
            <SelectItem value="partnership">مشارکت</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.bedrooms}
          onValueChange={(value) =>
            setFilters({ ...filters, bedrooms: value })
          }
        >
          <SelectTrigger className="w-auto min-w-[90px] h-9 text-sm bg-card border-border/50 hover:border-primary/50 transition-colors">
            <SelectValue placeholder="اتاق" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">همه</SelectItem>
            <SelectItem value="1">۱ خواب</SelectItem>
            <SelectItem value="2">۲ خواب</SelectItem>
            <SelectItem value="3">۳ خواب</SelectItem>
            <SelectItem value="4">۴ خواب</SelectItem>
            <SelectItem value="5">۵+ خواب</SelectItem>
          </SelectContent>
        </Select>

        {/* Advanced Filters Popover */}
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-9 gap-2 bg-card border-border/50 hover:border-primary/50 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">فیلترهای بیشتر</span>
              {activeFilterCount > 0 && (
                <span className="bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4" align="start">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-sm">فیلترهای پیشرفته</h4>
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetFilters}
                    className="h-7 text-xs text-muted-foreground hover:text-foreground"
                  >
                    پاک کردن همه
                  </Button>
                )}
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">
                    شهر
                  </label>
                  <Input
                    value={filters.city}
                    onChange={(e) =>
                      setFilters({ ...filters, city: e.target.value })
                    }
                    placeholder="مثال: تهران"
                    className="h-9 text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">
                    متراژ (متر مربع)
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      value={filters.min_area}
                      onChange={(e) =>
                        setFilters({ ...filters, min_area: e.target.value })
                      }
                      placeholder="از"
                      className="h-9 text-sm"
                    />
                    <Input
                      type="number"
                      value={filters.max_area}
                      onChange={(e) =>
                        setFilters({ ...filters, max_area: e.target.value })
                      }
                      placeholder="تا"
                      className="h-9 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">
                    قیمت (تومان)
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      value={filters.min_price}
                      onChange={(e) =>
                        setFilters({ ...filters, min_price: e.target.value })
                      }
                      placeholder="از"
                      className="h-9 text-sm"
                    />
                    <Input
                      type="number"
                      value={filters.max_price}
                      onChange={(e) =>
                        setFilters({ ...filters, max_price: e.target.value })
                      }
                      placeholder="تا"
                      className="h-9 text-sm"
                    />
                  </div>
                </div>
              </div>

              <Button
                onClick={() => setIsOpen(false)}
                className="w-full h-9 text-sm"
              >
                اعمال فیلترها
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        {/* Active Filter Tags */}
        {hasActiveFilters && (
          <div className="flex items-center gap-1.5 mr-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="h-7 px-2 text-xs text-muted-foreground hover:text-destructive"
            >
              <X className="w-3 h-3 ml-1" />
              پاک کردن
            </Button>
          </div>
        )}
      </div>

      {/* Active Filter Pills */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {filters.property_type !== "all" && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary/10 text-primary text-xs rounded-full">
              {propertyTypeLabels[filters.property_type]}
              <button
                onClick={() =>
                  setFilters({ ...filters, property_type: "all" })
                }
                className="hover:text-primary/70"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.listing_type !== "all" && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary/10 text-primary text-xs rounded-full">
              {listingTypeLabels[filters.listing_type]}
              <button
                onClick={() =>
                  setFilters({ ...filters, listing_type: "all" })
                }
                className="hover:text-primary/70"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.city && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary/10 text-primary text-xs rounded-full">
              {filters.city}
              <button
                onClick={() => setFilters({ ...filters, city: "" })}
                className="hover:text-primary/70"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.bedrooms !== "all" && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary/10 text-primary text-xs rounded-full">
              {bedroomLabels[filters.bedrooms]}
              <button
                onClick={() => setFilters({ ...filters, bedrooms: "all" })}
                className="hover:text-primary/70"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {(filters.min_area || filters.max_area) && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary/10 text-primary text-xs rounded-full">
              متراژ: {filters.min_area || "۰"} - {filters.max_area || "∞"}
              <button
                onClick={() =>
                  setFilters({ ...filters, min_area: "", max_area: "" })
                }
                className="hover:text-primary/70"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {(filters.min_price || filters.max_price) && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-primary/10 text-primary text-xs rounded-full">
              قیمت: {filters.min_price || "۰"} - {filters.max_price || "∞"}
              <button
                onClick={() =>
                  setFilters({ ...filters, min_price: "", max_price: "" })
                }
                className="hover:text-primary/70"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default PropertyFilters;

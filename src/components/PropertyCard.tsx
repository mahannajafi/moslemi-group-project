import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { MapPin, Ruler, BedDouble, Star } from "lucide-react";

interface Property {
  id: string;
  title: string;
  property_type: string;
  listing_type: string;
  status: string;
  address: string;
  city: string;
  district?: string | null;
  area?: string | null;
  bedrooms?: number | null;
  price?: string | null;
  featured_image?: string | null;
  is_featured?: boolean;
  images?: Array<{ url: string }>;
}

interface PropertyCardProps {
  property: Property;
}

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
  partnership: "مشارکت",
};

const PropertyCard = ({ property }: PropertyCardProps) => {
  const formatPrice = (price: string | null | undefined) => {
    if (!price) return "توافقی";
    const numeric = Number(price);
    if (Number.isNaN(numeric)) return price;
    if (numeric >= 1000000000) {
      return `${(numeric / 1000000000).toFixed(1)} میلیارد تومان`;
    }
    if (numeric >= 1000000) {
      return `${(numeric / 1000000).toFixed(0)} میلیون تومان`;
    }
    return new Intl.NumberFormat("fa-IR").format(numeric) + " تومان";
  };

  const featuredImage = property.featured_image || property.images?.[0]?.url;
  const areaLabel = property.area ? `${property.area} متر` : undefined;

  return (
    <Link
      href={`/properties/${property.id}`}
      className="group block bg-card rounded-2xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        {featuredImage ? (
          <Image
            src={featuredImage}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(min-width: 1024px) 33vw, 100vw"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <span className="text-muted-foreground">بدون تصویر</span>
          </div>
        )}
        
        {/* Badges */}
        <div className="absolute top-4 right-4 flex flex-wrap gap-2">
          <Badge className="bg-primary text-primary-foreground">
            {listingTypeLabels[property.listing_type] || property.listing_type}
          </Badge>
          <Badge variant="secondary">
            {propertyTypeLabels[property.property_type] || property.property_type}
          </Badge>
        </div>

        {property.is_featured && (
          <div className="absolute top-4 left-4">
            <Badge className="bg-yellow-500 text-white gap-1">
              <Star className="w-3 h-3 fill-current" />
              ویژه
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-bold text-lg text-foreground mb-3 line-clamp-1 group-hover:text-primary transition-colors">
          {property.title}
        </h3>

        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
          <MapPin className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">
            {property.district ? `${property.district}، ` : ""}
            {property.city}
          </span>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
          {areaLabel && (
            <span className="flex items-center gap-1">
              <Ruler className="w-4 h-4" />
              {areaLabel}
            </span>
          )}
          {property.bedrooms && property.bedrooms > 0 && (
            <span className="flex items-center gap-1">
              <BedDouble className="w-4 h-4" />
              {property.bedrooms} خواب
            </span>
          )}
        </div>

        <div className="pt-4 border-t border-border">
          <span className="text-lg font-bold text-primary">
            {formatPrice(property.price)}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;

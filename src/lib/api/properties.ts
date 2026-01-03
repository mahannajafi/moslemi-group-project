import { apiFetch, apiFetchForm } from "@/lib/api/client";

export type PropertyImage = {
  id: string;
  key: string;
  url: string;
  is_featured: boolean;
  created_at: string;
};

export type Property = {
  id: string;
  title: string;
  description?: string;
  property_type: string;
  status: "available" | "pending" | "sold" | "off_market";
  listing_type: "rent" | "sale";
  address: string;
  city: string;
  district?: string;
  area?: string | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
  price?: string;
  features?: Record<string, boolean>;
  featured_image?: string;
  is_featured?: boolean;
  created_at?: string;
  updated_at?: string;
  images?: PropertyImage[];
};

export type PaginatedResponse<T> = {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: T[];
};

export type PropertyFilters = {
  property_type: string;
  listing_type: string;
  city: string;
  min_area: string;
  max_area: string;
  min_price: string;
  max_price: string;
  bedrooms: string;
};

const mapListingType = (value: string) => {
  if (value === "partnership") return "sale";
  return value;
};

export const fetchProperties = async (filters: PropertyFilters) => {
  const params = new URLSearchParams();

  params.set("status", "available");

  if (filters.property_type !== "all") {
    params.set("property_type", filters.property_type);
  }
  if (filters.listing_type !== "all") {
    params.set("listing_type", mapListingType(filters.listing_type));
  }
  if (filters.city) {
    params.set("city", filters.city);
  }
  if (filters.min_area) {
    params.set("min_area", filters.min_area);
  }
  if (filters.max_area) {
    params.set("max_area", filters.max_area);
  }
  if (filters.min_price) {
    params.set("min_price", filters.min_price);
  }
  if (filters.max_price) {
    params.set("max_price", filters.max_price);
  }
  if (filters.bedrooms !== "all") {
    params.set("bedrooms", filters.bedrooms);
  }

  const response = await apiFetch<PaginatedResponse<Property>>(
    `/rest/v1/properties?${params.toString()}`,
  );

  return response.results;
};

export const fetchPropertyById = async (id: string) => {
  const response = await apiFetch<PaginatedResponse<Property> | Property>(
    `/rest/v1/properties?id=${encodeURIComponent(id)}`,
  );

  if ("results" in response) {
    return response.results?.[0];
  }

  return response;
};

export const fetchAdminProperties = async () => {
  const response = await apiFetch<PaginatedResponse<Property>>(
    "/rest/v1/properties",
    { auth: true },
  );

  return response.results;
};

export const createProperty = async (payload: {
  title: string;
  description?: string | null;
  property_type: string;
  status: string;
  listing_type: string;
  address: string;
  city: string;
  district?: string | null;
  area?: number | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
  price?: number | null;
  features?: Record<string, boolean>;
  images?: string[];
  featured_image?: string | null;
}) => {
  return apiFetch<Property>("/rest/v1/properties", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      ...payload,
      listing_type: mapListingType(payload.listing_type),
      area: payload.area ? String(payload.area) : null,
      price: payload.price ? String(payload.price) : "0",
    }),
    auth: true,
  });
};

export const deleteProperty = async (id: string) => {
  return apiFetch<void>(`/rest/v1/properties/${id}`, {
    method: "DELETE",
    auth: true,
  });
};

export const uploadPropertyImage = async (file: File, filename: string) => {
  const formData = new FormData();
  formData.append("file", file);

  return apiFetchForm<{ url: string }>(
    `/storage/v1/object/property-images/${encodeURIComponent(filename)}`,
    formData,
    { auth: true },
  );
};

-- Create properties table for real estate listings
CREATE TABLE public.properties (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  property_type TEXT NOT NULL DEFAULT 'apartment', -- apartment, villa, land, commercial
  status TEXT NOT NULL DEFAULT 'available', -- available, sold, rented, reserved
  listing_type TEXT NOT NULL DEFAULT 'sale', -- sale, rent, partnership
  
  -- Location
  address TEXT NOT NULL,
  city TEXT NOT NULL DEFAULT 'تهران',
  district TEXT,
  
  -- Specifications
  area NUMERIC NOT NULL, -- متراژ
  land_area NUMERIC, -- متراژ زمین (برای ویلا و زمین)
  bedrooms INTEGER DEFAULT 0,
  bathrooms INTEGER DEFAULT 0,
  year_built INTEGER,
  floor_number INTEGER,
  total_floors INTEGER,
  parking_spaces INTEGER DEFAULT 0,
  
  -- Features
  has_elevator BOOLEAN DEFAULT false,
  has_storage BOOLEAN DEFAULT false,
  has_balcony BOOLEAN DEFAULT false,
  has_pool BOOLEAN DEFAULT false,
  has_gym BOOLEAN DEFAULT false,
  has_security BOOLEAN DEFAULT false,
  
  -- Pricing
  price NUMERIC,
  price_per_meter NUMERIC,
  
  -- Images
  images TEXT[] DEFAULT '{}',
  featured_image TEXT,
  
  -- Metadata
  is_featured BOOLEAN DEFAULT false,
  views_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (everyone can view properties)
CREATE POLICY "Properties are viewable by everyone" 
ON public.properties 
FOR SELECT 
USING (true);

-- Create policy for authenticated users to manage properties (admin)
CREATE POLICY "Authenticated users can insert properties" 
ON public.properties 
FOR INSERT 
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update properties" 
ON public.properties 
FOR UPDATE 
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete properties" 
ON public.properties 
FOR DELETE 
TO authenticated
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_properties_updated_at
BEFORE UPDATE ON public.properties
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for property images
INSERT INTO storage.buckets (id, name, public) VALUES ('property-images', 'property-images', true);

-- Storage policies for property images
CREATE POLICY "Property images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'property-images');

CREATE POLICY "Authenticated users can upload property images" 
ON storage.objects 
FOR INSERT 
TO authenticated
WITH CHECK (bucket_id = 'property-images');

CREATE POLICY "Authenticated users can update property images" 
ON storage.objects 
FOR UPDATE 
TO authenticated
USING (bucket_id = 'property-images');

CREATE POLICY "Authenticated users can delete property images" 
ON storage.objects 
FOR DELETE 
TO authenticated
USING (bucket_id = 'property-images');
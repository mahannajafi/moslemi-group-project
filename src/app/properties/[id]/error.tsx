"use client";

const PropertyDetailError = ({ reset }: { reset: () => void }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">خطا در دریافت جزئیات ملک</h1>
      <p className="text-muted-foreground">لطفا دوباره تلاش کنید.</p>
      <button
        onClick={reset}
        className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
      >
        تلاش مجدد
      </button>
    </div>
  );
};

export default PropertyDetailError;

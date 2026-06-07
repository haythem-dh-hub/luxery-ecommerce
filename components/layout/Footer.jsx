export default function Footer() {
  return (
    <footer className="pb-10 pt-10">
      <div className="section-shell">
        <div className="space-tablet rounded-[2rem] px-6 py-7 md:px-8">
          <div className="flex flex-col gap-6 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <div className="tablet-label mb-4 w-fit text-[11px] uppercase tracking-[0.24em] text-bronze/90">
                Space Commerce System
              </div>
              <p className="font-display text-2xl text-white">Toxic Man</p>
              <p className="mt-2 leading-7">
                Perfumes, perfume oils, watches, accessories, and capsule
                streetwear with a cinematic luxury storefront.
              </p>
            </div>
            <div className="grid gap-3 text-white/72 md:text-right">
              <span>Free-tier ready automation</span>
              <span>OpenRouter-compatible AI chatbot</span>
              <span>MongoDB and Mongoose foundation</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

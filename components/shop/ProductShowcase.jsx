import Link from "next/link";
import Image from "next/image";

export default function ProductShowcase({ products }) {
  return (
    <section className="py-14">
      <div className="section-shell">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-bronze/70">
              Featured Assortment
            </p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">
              Signature products with high-margin storytelling.
            </h2>
          </div>
          <Link href="/shop" className="text-sm text-white/70 underline underline-offset-4">
            View full catalog
          </Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-4">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/shop/${product.slug}`}
              className="space-tablet group rounded-[2rem]"
            >
              <div className="relative h-80 overflow-hidden rounded-t-[2rem]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
                <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-white/90 px-3 py-1 text-xs font-semibold text-ink shadow-[0_8px_24px_rgba(0,0,0,0.28)]">
                  {product.badge}
                </span>
              </div>
              <div className="space-y-3 p-5">
                <div className="flex items-center justify-between text-sm text-white/60">
                  <span>{product.category}</span>
                  <span>{product.rating}/5</span>
                </div>
                <h3 className="font-display text-2xl">{product.name}</h3>
                <p className="text-sm leading-7 text-white/65">{product.summary}</p>
                <div className="flex items-center justify-between">
                  <span className="font-display text-2xl">${product.price}</span>
                  <span className="tablet-label px-3 py-2 text-xs uppercase tracking-[0.2em] text-bronze">
                    Explore
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

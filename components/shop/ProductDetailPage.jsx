 "use client";

import Image from "next/image";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import { useStore } from "@/components/shared/StoreProvider";

export default function ProductDetailPage({ product }) {
  const { addToCart } = useStore();

  return (
    <main className="min-h-screen pb-16">
      <section className="section-shell grid gap-8 py-8 md:py-12 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative min-h-[380px] overflow-hidden rounded-[2rem] border border-white/10 md:min-h-[580px] md:rounded-[2.4rem]">
          <Image src={product.image} alt={product.name} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.24em] text-bronze/80">
              {product.category}
            </p>
            <h1 className="font-display text-4xl md:text-5xl">{product.name}</h1>
            <p className="max-w-2xl text-base leading-7 text-white/70 md:text-lg md:leading-8">
              {product.summary}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {product.notes.map((note) => (
              <Chip key={note} label={note} />
            ))}
          </div>

          <div className="glass-panel rounded-[2rem] p-5 md:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <span className="font-display text-4xl">${product.price}</span>
              <span className="text-sm text-white/60">{product.stock} units in stock</span>
            </div>
            <p className="mt-4 text-sm leading-7 text-white/65">
              This product page is structured for future size selectors,
              fragrance concentration options, shipping rules, reviews, and real
              checkout integration.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button variant="contained" size="large" onClick={() => addToCart(product)}>
                Add to cart
              </Button>
              <Button variant="outlined" size="large" color="inherit">
                Buy now
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-tablet rounded-[1.5rem] p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-white/45">Scent Mood</p>
              <p className="mt-3 font-display text-2xl">{product.type}</p>
            </div>
            <div className="space-tablet rounded-[1.5rem] p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-white/45">Rating</p>
              <p className="mt-3 font-display text-2xl">{product.rating}/5</p>
            </div>
            <div className="space-tablet rounded-[1.5rem] p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-white/45">Automation</p>
              <p className="mt-3 font-display text-2xl">{product.automationTag}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

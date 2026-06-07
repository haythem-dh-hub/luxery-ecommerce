"use client";

import { useDeferredValue, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import { useStore } from "@/components/shared/StoreProvider";

export default function ShopCatalog({ products, categories }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const { addToCart } = useStore();

  const filteredProducts = useMemo(() => {
    const normalized = deferredQuery.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        activeCategory === "All" || product.category === activeCategory;
      const matchesQuery =
        normalized.length === 0 ||
        [product.name, product.category, product.type, ...product.notes].some((value) =>
          value.toLowerCase().includes(normalized),
        );

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, deferredQuery, products]);

  return (
    <main className="min-h-screen pb-16">
      <section className="section-shell py-12">
        <div className="mb-8 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.24em] text-bronze/80">Catalog</p>
          <h1 className="mt-3 font-display text-5xl">Shop Toxic Man</h1>
          <p className="mt-4 text-lg leading-8 text-white/70">
            Search across scent profiles, perfume oils, watches, accessories,
            and streetwear. This layer is ready for real products from MongoDB
            when you connect the database.
          </p>
        </div>

        <div className="space-tablet mb-8 flex flex-col gap-5 rounded-[2rem] p-5">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Chip
                key={category}
                label={category}
                color={activeCategory === category ? "primary" : "default"}
                onClick={() => setActiveCategory(category)}
                clickable
              />
            ))}
          </div>
          <TextField
            label="Search by scent, category, or style"
            variant="outlined"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            fullWidth
          />
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {filteredProducts.length === 0 ? (
            <div className="space-tablet rounded-[2rem] p-6 lg:col-span-3">
              <h2 className="font-display text-3xl">No products found.</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/64">
                Try another category or search term. You can search by scent,
                product type, or style keywords.
              </p>
            </div>
          ) : (
            filteredProducts.map((product) => (
            <article
              key={product.id}
              className="space-tablet rounded-[2rem]"
            >
              <div className="relative h-80 overflow-hidden rounded-t-[2rem]">
                <Image src={product.image} alt={product.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
              </div>
              <div className="space-y-4 p-5 md:p-6">
                <div className="flex items-center justify-between text-sm text-white/60">
                  <span>{product.category}</span>
                  <span>{product.stock} in stock</span>
                </div>
                <div>
                  <h2 className="font-display text-2xl md:text-3xl">{product.name}</h2>
                  <p className="mt-2 text-sm leading-7 text-white/65">{product.summary}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.notes.map((note) => (
                    <span
                      key={note}
                      className="tablet-label px-3 py-2 text-xs uppercase tracking-[0.18em] text-white/70"
                    >
                      {note}
                    </span>
                  ))}
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <span className="font-display text-3xl">${product.price}</span>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button
                      variant="outlined"
                      color="inherit"
                      onClick={() => addToCart(product)}
                    >
                      Add to cart
                    </Button>
                    <Button component={Link} href={`/shop/${product.slug}`} variant="contained">
                      View product
                    </Button>
                  </div>
                </div>
              </div>
            </article>
          )))}
        </div>
      </section>
    </main>
  );
}

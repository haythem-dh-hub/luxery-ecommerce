"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ChevronLeftRounded from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRounded from "@mui/icons-material/ChevronRightRounded";

export default function ProductCarousel({ products }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    if (!products.length) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % products.length);
    }, 4200);

    return () => window.clearInterval(interval);
  }, [products]);

  if (!products.length) {
    return null;
  }

  const activeProduct = products[activeIndex];

  const goPrev = () => {
    setActiveIndex((current) => (current - 1 + products.length) % products.length);
  };

  const goNext = () => {
    setActiveIndex((current) => (current + 1) % products.length);
  };

  const handleTouchStart = (event) => {
    touchStartX.current = event.changedTouches[0].clientX;
  };

  const handleTouchEnd = (event) => {
    touchEndX.current = event.changedTouches[0].clientX;
    const deltaX = touchStartX.current - touchEndX.current;

    if (Math.abs(deltaX) < 40) {
      return;
    }

    if (deltaX > 0) {
      goNext();
      return;
    }

    goPrev();
  };

  return (
    <section className="section-shell pt-3 md:pt-6">
      <div className="space-tablet relative overflow-hidden rounded-[2rem] border-white/12 shadow-haze">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_24%,rgba(216,166,109,0.22),transparent_0_28%),linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01)_42%,rgba(5,4,3,0.28)_100%)]" />

        <div className="relative grid min-h-[620px] gap-6 p-4 md:gap-8 md:p-8 lg:min-h-[640px] lg:grid-cols-[1.05fr_0.95fr] lg:p-10">
          <div className="order-2 flex flex-col justify-between gap-8 lg:order-1">
            <div className="space-y-5">
              <p className="tablet-label w-fit text-xs uppercase tracking-[0.24em] text-bronze/90">
                Main Collection Carousel
              </p>
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.24em] text-white/55">
                  {activeProduct.category} / {activeProduct.type}
                </p>
                <h2 className="max-w-[11ch] font-display text-[2.45rem] leading-[0.94] sm:text-5xl md:text-7xl">
                  {activeProduct.name}
                </h2>
                <p className="max-w-2xl text-base leading-7 text-white/68 md:text-lg md:leading-8">
                  {activeProduct.summary}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {activeProduct.notes.map((note) => (
                  <span
                    key={note}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/72"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-2 lg:pt-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href={`/shop/${activeProduct.slug}`}
                  className="rounded-full bg-white px-4 py-3 text-center text-sm font-semibold text-ink transition hover:-translate-y-0.5 sm:px-6 sm:py-4 sm:text-base"
                >
                  View product
                </Link>
                <Link
                  href="/shop"
                  className="tablet-label rounded-full px-4 py-3 text-center text-sm font-semibold text-white/88 transition hover:-translate-y-0.5 sm:px-6 sm:py-4"
                >
                  Browse all
                </Link>
              </div>
            </div>
          </div>

          <div className="order-1 flex flex-col justify-between gap-5 lg:order-2">
            <div
              className="relative min-h-[280px] flex-1 overflow-hidden rounded-[1.45rem] border border-white/10 bg-black/20 sm:min-h-[320px] md:min-h-[360px] lg:rounded-[1.8rem]"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <Image
                key={activeProduct.id}
                src={activeProduct.image}
                alt={activeProduct.name}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
              <div className="absolute left-5 top-5 rounded-full border border-white/15 bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-ink">
                {activeProduct.badge}
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 md:bottom-5 md:left-5 md:right-5">
                <div>
                  <p className="text-sm text-white/55">Stock</p>
                  <p className="font-display text-xl sm:text-2xl">
                    {activeProduct.stock} units
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-white/55">Rating</p>
                  <p className="font-display text-xl sm:text-2xl">
                    {activeProduct.rating}/5
                  </p>
                </div>
              </div>
            </div>

            <div className="space-tablet rounded-[1.5rem] p-4 md:p-5">
              <div className="mb-4 flex items-end justify-between gap-4 border-b border-white/10 pb-4">
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/45">
                    Price
                  </p>
                  <p className="font-display text-3xl text-bronze sm:text-4xl">
                    ${activeProduct.price}
                  </p>
                </div>
                <div className="text-sm text-white/45">
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(products.length).padStart(2, "0")}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={goPrev}
                    className="navbar-icon-button grid h-12 w-12 place-items-center rounded-2xl"
                    aria-label="Previous product"
                  >
                    <ChevronLeftRounded />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    className="navbar-icon-button grid h-12 w-12 place-items-center rounded-2xl"
                    aria-label="Next product"
                  >
                    <ChevronRightRounded />
                  </button>
                </div>
                <p className="text-sm text-white/55">Swipe or tap arrows</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

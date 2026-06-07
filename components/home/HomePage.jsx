import ProductCarousel from "@/components/home/ProductCarousel";
import ProductShowcase from "@/components/shop/ProductShowcase";
import ChatAssistant from "@/components/shared/ChatAssistant";
import Link from "next/link";
import AutoAwesomeOutlined from "@mui/icons-material/AutoAwesomeOutlined";
import LocalShippingOutlined from "@mui/icons-material/LocalShippingOutlined";
import InsightsOutlined from "@mui/icons-material/InsightsOutlined";

const editorialBlocks = [
  {
    title: "Scent architecture for attention after dark",
    text: "Lead with fragrances and oils that feel cinematic, layered, and confident.",
  },
  {
    title: "Accessories that complete the silhouette",
    text: "Watches and jewelry are merchandised as part of a look, not as isolated add-ons.",
  },
  {
    title: "Streetwear for daily retention",
    text: "Capsule tees create a softer price entry and improve repeat-purchase behavior.",
  },
];

export default function HomePage({ products, featuredProducts, stats }) {
  return (
    <div className="min-h-screen">
      <main className="pb-16">
        <ProductCarousel products={products} />

        <section className="luxury-grid overflow-hidden">
          <div className="section-shell grid gap-8 py-8 md:py-12 lg:grid-cols-[1.2fr_0.8fr] lg:py-20">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-bronze/30 bg-bronze/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-bronze">
                <AutoAwesomeOutlined fontSize="inherit" />
                Advanced modern e-commerce
              </div>

              <div className="space-y-5">
                <h2 className="max-w-[12ch] font-display text-[2.7rem] leading-[0.94] sm:text-5xl md:text-7xl">
                  Dark luxury commerce for scent, style, and status.
                </h2>
                <p className="max-w-2xl text-base leading-7 text-white/70 md:text-lg md:leading-8">
                  Toxic Man is designed as a premium storefront with a modern
                  Next.js foundation, AI-powered product guidance, admin-ready
                  inventory workflows, and free-tier automation options that can
                  scale with the brand.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/shop"
                  className="rounded-full bg-white px-6 py-4 text-center font-semibold text-ink transition hover:-translate-y-0.5"
                >
                  Shop the collection
                </Link>
                <Link
                  href="/admin"
                  className="glass-panel rounded-full px-6 py-4 text-center font-semibold text-white/90 transition hover:-translate-y-0.5"
                >
                  Open admin preview
                </Link>
              </div>

              <div className="carousel-mobile-strip md:grid md:grid-cols-3 md:gap-4">
                {stats.map((item) => (
                  <div
                    key={item.label}
                    className="carousel-mobile-card space-tablet rounded-3xl p-5 shadow-haze"
                  >
                    <p className="font-display text-3xl">{item.value}</p>
                    <p className="mt-2 text-sm text-white/60">{item.label}</p>
                  </div>
                ))}
              </div>

              <div className="mobile-story-strip md:hidden">
                <div className="space-tablet space-tablet-hero rounded-[1.6rem] p-5 shadow-haze">
                  <p className="tablet-label text-[11px] uppercase tracking-[0.22em] text-bronze/90">
                    Hero Collection
                  </p>
                  <h3 className="mt-3 max-w-[13ch] font-display text-2xl leading-tight">
                    Crafted for men who want their presence remembered.
                  </h3>
                  <div className="mt-6 grid gap-3 text-sm text-white/72">
                    <div className="flex items-start gap-3">
                      <LocalShippingOutlined fontSize="small" />
                      Express local delivery and reserve-online pickup
                    </div>
                    <div className="flex items-start gap-3">
                      <InsightsOutlined fontSize="small" />
                      AI-recommended bundles and product upsells
                    </div>
                  </div>
                </div>

                <div className="carousel-mobile-strip">
                  {editorialBlocks.map((block) => (
                    <article
                      key={block.title}
                      className="carousel-mobile-card space-tablet rounded-[1.5rem] p-5"
                    >
                      <h3 className="font-display text-lg leading-tight">{block.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-white/65">{block.text}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>

            <div className="hidden gap-5 md:grid">
              <div className="space-tablet space-tablet-hero rounded-[2rem] p-6 shadow-haze">
                <p className="tablet-label text-xs uppercase tracking-[0.24em] text-bronze/90">
                  Hero Collection
                </p>
                <h3 className="mt-3 max-w-[12ch] font-display text-3xl">
                  Crafted for men who want their presence remembered.
                </h3>
                <div className="mt-10 grid gap-4 text-sm text-white/72">
                  <div className="flex items-center gap-3">
                    <LocalShippingOutlined fontSize="small" />
                    Express local delivery and reserve-online pickup
                  </div>
                  <div className="flex items-center gap-3">
                    <InsightsOutlined fontSize="small" />
                    AI-recommended bundles and product upsells
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
                {editorialBlocks.map((block) => (
                  <article
                    key={block.title}
                    className="space-tablet rounded-[1.75rem] p-5"
                  >
                    <h3 className="font-display text-xl">{block.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-white/65">{block.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <ProductShowcase products={featuredProducts} />
        <ChatAssistant />
      </main>
    </div>
  );
}

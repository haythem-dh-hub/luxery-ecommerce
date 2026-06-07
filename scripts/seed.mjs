import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;

if (!MONGODB_URI) {
  console.error("Missing MONGODB_URI in the environment.");
  process.exit(1);
}

const seedProducts = [
  {
    id: "tm-noir-oud",
    slug: "noir-oud-elixir",
    name: "Noir Oud Elixir",
    category: "Perfume",
    type: "Signature scent",
    price: 145,
    stock: 16,
    rating: 4.9,
    badge: "Best Seller",
    image:
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=80",
    summary:
      "A dark amber fragrance with oud smoke, vanilla resin, and late-night spice.",
    notes: ["oud wood", "smoked vanilla", "saffron"],
    automationTag: "restock-watch",
  },
  {
    id: "tm-velvet-oil",
    slug: "velvet-amber-oil",
    name: "Velvet Amber Oil",
    category: "Perfume Oil",
    type: "Concentrated oil",
    price: 58,
    stock: 24,
    rating: 4.8,
    badge: "New",
    image:
      "https://images.unsplash.com/photo-1615634262417-0d6422f15439?auto=format&fit=crop&w=1200&q=80",
    summary:
      "Pocket-sized perfume oil with soft amber, cardamom warmth, and skin-close musk.",
    notes: ["amber", "cardamom", "musk"],
    automationTag: "bundle-upsell",
  },
  {
    id: "tm-steel-watch",
    slug: "obsidian-chrono-watch",
    name: "Obsidian Chrono Watch",
    category: "Watch",
    type: "Modern accessory",
    price: 220,
    stock: 7,
    rating: 4.7,
    badge: "Limited",
    image:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1200&q=80",
    summary:
      "Matte black chronograph with a textured dial, brushed steel casing, and quiet confidence.",
    notes: ["steel", "matte black", "precision"],
    automationTag: "low-stock-alert",
  },
  {
    id: "tm-ring",
    slug: "ember-signet-ring",
    name: "Ember Signet Ring",
    category: "Accessory",
    type: "Core accessory",
    price: 75,
    stock: 28,
    rating: 4.6,
    badge: "Gift Pick",
    image:
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1200&q=80",
    summary:
      "A compact statement ring with warm bronze plating and a brushed face finish.",
    notes: ["bronze", "minimal", "stackable"],
    automationTag: "gift-guide",
  },
  {
    id: "tm-tee",
    slug: "toxic-man-studio-tee",
    name: "Toxic Man Studio Tee",
    category: "T-Shirt",
    type: "Streetwear staple",
    price: 42,
    stock: 31,
    rating: 4.8,
    badge: "Capsule",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80",
    summary:
      "Heavyweight tee with a cropped street cut, soft cotton handfeel, and brand crest artwork.",
    notes: ["cotton", "oversized", "street"],
    automationTag: "cross-sell",
  },
  {
    id: "tm-night-veil",
    slug: "night-veil-parfum",
    name: "Night Veil Parfum",
    category: "Perfume",
    type: "Evening fragrance",
    price: 165,
    stock: 10,
    rating: 5,
    badge: "Collector",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1200&q=80",
    summary:
      "A richer evening parfum built around plum leather, black pepper, and cedar heat.",
    notes: ["plum", "leather", "cedar"],
    automationTag: "vip-launch",
  },
];

const ProductSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    type: String,
    price: Number,
    stock: Number,
    rating: Number,
    badge: String,
    image: String,
    summary: String,
    notes: [String],
    automationTag: String,
  },
  { timestamps: true },
);

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

async function seed() {
  await mongoose.connect(MONGODB_URI, {
    dbName: MONGODB_DB || undefined,
  });

  await Product.deleteMany({});
  await Product.insertMany(seedProducts);

  console.log(`Seeded ${seedProducts.length} products into MongoDB Atlas.`);
  await mongoose.disconnect();
}

seed().catch(async (error) => {
  console.error("Seed failed:", error);
  await mongoose.disconnect();
  process.exit(1);
});

import { products } from "@/data/products";
import { connectToDatabase } from "@/lib/db";
import Product from "@/models/Product";
import Order from "@/models/Order";

const adminSnapshot = {
  revenue: "$18.4k",
  ordersToday: 34,
  aiConversations: 128,
  lowStockCount: 2,
  automationProviders: [
    "GitHub Actions",
    "cron-job.org",
    "MongoDB Atlas Triggers",
  ],
  campaigns: [
    {
      name: "Restock digest",
      status: "Scheduled",
      detail: "Runs daily and emails low-stock product summaries.",
    },
    {
      name: "Abandoned cart nudges",
      status: "Planned",
      detail: "Prepared for free-tier email workflows with Resend or Brevo.",
    },
    {
      name: "VIP fragrance launch",
      status: "Draft",
      detail: "Targets returning perfume buyers with AI-written copy.",
    },
  ],
};

function serializeDocument(document) {
  return {
    ...document,
    id: document.id ?? document._id?.toString?.(),
    _id: document._id?.toString?.() ?? document._id,
    createdAt: document.createdAt?.toISOString?.() ?? document.createdAt,
    updatedAt: document.updatedAt?.toISOString?.() ?? document.updatedAt,
  };
}

async function loadProductsFromDatabase() {
  const connection = await connectToDatabase();

  if (!connection) {
    return null;
  }

  const dbProducts = await Product.find({}).sort({ createdAt: -1 }).lean();
  return dbProducts.map(serializeDocument);
}

export async function getAllProducts() {
  const dbProducts = await loadProductsFromDatabase();

  if (dbProducts && dbProducts.length > 0) {
    return dbProducts;
  }

  return products;
}

export async function getFeaturedProducts() {
  const allProducts = await getAllProducts();
  return allProducts.slice(0, 4);
}

export async function getCategories() {
  const allProducts = await getAllProducts();
  return ["All", ...new Set(allProducts.map((product) => product.category))];
}

export async function getProductBySlug(slug) {
  const connection = await connectToDatabase();

  if (connection) {
    const dbProduct = await Product.findOne({ slug }).lean();

    if (dbProduct) {
      return serializeDocument(dbProduct);
    }
  }

  return products.find((product) => product.slug === slug) ?? null;
}

export async function getStoreStats() {
  return [
    { label: "Skus curated", value: "48+" },
    { label: "Avg order uplift", value: "21%" },
    { label: "AI assistant resolution", value: "87%" },
  ];
}

export async function getAdminSnapshot() {
  const allProducts = await getAllProducts();
  const connection = await connectToDatabase();
  const lowStockCount = allProducts.filter((product) => product.stock <= 10).length;

  if (!connection) {
    return {
      ...adminSnapshot,
      lowStockCount,
    };
  }

  const ordersToday = await Order.countDocuments({
    createdAt: {
      $gte: new Date(new Date().setHours(0, 0, 0, 0)),
    },
  });

  return {
    ...adminSnapshot,
    ordersToday,
    lowStockCount,
  };
}

export async function createOrder(body = {}) {
  const connection = await connectToDatabase();

  if (connection) {
    const order = await Order.create({
      customer: body.customer ?? "Guest",
      email: body.email ?? "",
      items: body.items ?? [],
      total: body.total ?? 0,
      status: body.status ?? "pending",
    });

    return serializeDocument(order.toObject());
  }

  return {
    id: `demo-${Date.now()}`,
    status: "pending",
    customer: body.customer ?? "Guest",
    items: body.items ?? [],
    total: body.total ?? 0,
    createdAt: new Date().toISOString(),
  };
}

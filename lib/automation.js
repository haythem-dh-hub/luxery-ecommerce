import { getAllProducts } from "@/lib/store";

export async function runAutomationDigest() {
  const products = await getAllProducts();
  const lowStock = products.filter((product) => product.stock <= 10);

  return {
    ranAt: new Date().toISOString(),
    providerSuggestions: [
      "GitHub Actions cron",
      "cron-job.org webhook",
      "MongoDB Atlas Trigger",
    ],
    lowStock,
  };
}

import HomePage from "@/components/home/HomePage";
import { getAllProducts, getFeaturedProducts, getStoreStats } from "@/lib/store";

export default async function Page() {
  const products = await getAllProducts();
  const featuredProducts = await getFeaturedProducts();
  const stats = await getStoreStats();

  return (
    <HomePage
      products={products}
      featuredProducts={featuredProducts}
      stats={stats}
    />
  );
}

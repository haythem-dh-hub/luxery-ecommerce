import ShopCatalog from "@/components/shop/ShopCatalog";
import { getAllProducts, getCategories } from "@/lib/store";

export const metadata = {
  title: "Shop | Toxic Man",
};

export default async function ShopPage() {
  const products = await getAllProducts();
  const categories = await getCategories();

  return <ShopCatalog products={products} categories={categories} />;
}

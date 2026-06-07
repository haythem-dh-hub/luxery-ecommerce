import { notFound } from "next/navigation";
import ProductDetailPage from "@/components/shop/ProductDetailPage";
import { getAllProducts, getProductBySlug } from "@/lib/store";

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailPage product={product} />;
}

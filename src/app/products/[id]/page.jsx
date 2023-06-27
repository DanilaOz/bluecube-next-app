import ProductDescription from "@/components/ProductDescription/ProductDescription";
import ProductInfo from "@/components/ProductInfo/ProductInfo";
import { BASE_URL } from "@/utils/constants";

async function getProduct(id) {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function page({ params }) {
  const data = await getProduct(parseInt(params.id));

  return (
    <div className="product-container">
      <ProductInfo data={data} />
      <ProductDescription data={data} />
    </div>
  );
}

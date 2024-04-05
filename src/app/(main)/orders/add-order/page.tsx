import PageHeader from "@/components/page-header";
import Form from "../components/form";
import { getProducts } from "@/lib/data";

export default async function Page() {
  const products = await getProducts();
  return (
    <>
      <PageHeader title="Add Order" prevLink="/orders" />
      <div>
        <Form products={products} />
      </div>
    </>
  );
}

import PageHeader from "@/components/page-header";
import Form from "../components/form";
import { findProducts } from "../../products/api";

export default async function Page() {
  const products = await findProducts();
  return (
    <>
      <PageHeader title="Add Order" prevLink="/orders" />
      <div>
        <Form products={products} />
      </div>
    </>
  );
}

import PageHeader from "@/components/page-header";
import Form from "../form";

export default function Page() {
  return (
    <>
      <PageHeader title="Add Product" prevLink="/products" />
      <div>
        <Form />
      </div>
    </>
  );
}

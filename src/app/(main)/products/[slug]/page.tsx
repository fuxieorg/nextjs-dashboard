import AddForm from "../form";
import PageHeader from "@/components/page-header";
import { getProductById } from "@/lib/data";

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const product = await getProductById(Number(slug));
  return (
    <>
      <PageHeader title="Edit Product" prevLink="/products" />
      <div>
        <AddForm initialValues={product} />
      </div>
    </>
  );
}

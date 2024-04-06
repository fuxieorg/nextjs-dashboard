import AddForm from "../form";
import PageHeader from "@/components/page-header";
import { getProductById } from "@/lib/data";
import { findImages } from "../../media/api";

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const product = await getProductById(Number(slug));
  const images = await findImages();
  return (
    <>
      <PageHeader title="Edit Product" prevLink="/products" />
      <div>
        <AddForm initialValues={product} images={images} />
      </div>
    </>
  );
}

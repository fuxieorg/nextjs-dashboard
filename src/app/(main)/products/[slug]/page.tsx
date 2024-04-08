import AddForm from "../components/form";
import PageHeader from "@/components/page-header";
import { findImages } from "../../media/api";
import { findProduct } from "../api";
import { Media } from "../../media/media";

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const product = await findProduct(Number(slug));
  const images: Media[] = await findImages();
  return (
    <>
      <PageHeader title="Edit Product" prevLink="/products" />
      <div>
        <AddForm initialValues={product} images={images} />
      </div>
    </>
  );
}

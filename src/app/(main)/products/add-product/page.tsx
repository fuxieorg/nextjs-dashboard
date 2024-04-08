import PageHeader from "@/components/page-header";
import Form from "../components/form";
import { findImages } from "../../media/api";
import { Media } from "../../media/media";

export default async function Page() {
  const images: Media[] = await findImages();
  return (
    <>
      <PageHeader title="Add Product" prevLink="/products" />
      <div>
        <Form images={images} />
      </div>
    </>
  );
}

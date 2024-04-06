import PageHeader from "@/components/page-header";
import Form from "../form";
import { findImages } from "../../media/api";

export default async function Page() {
  const images = await findImages();
  return (
    <>
      <PageHeader title="Add Product" prevLink="/products" />
      <div>
        <Form images={images} />
      </div>
    </>
  );
}

import Form from "../form";
import PageHeader from "@/components/page-header";
import { getCustomerById } from "@/lib/data";

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const customer = await getCustomerById(Number(slug));
  return (
    <>
      <PageHeader title="Edit Customer" prevLink="/customers" />
      <div>
        <Form />
      </div>
    </>
  );
}

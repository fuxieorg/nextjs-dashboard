import { findCustomer } from "../api";
import Form from "../components/form";
import PageHeader from "@/components/page-header";

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const customer = await findCustomer(Number(slug));
  return (
    <>
      <PageHeader title="Edit Customer" prevLink="/customers" />
      <div>
        <Form initialValues={customer} />
      </div>
    </>
  );
}

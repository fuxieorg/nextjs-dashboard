import Form from "../components/form";
import PageHeader from "@/components/page-header";

export default function Page() {
  return (
    <>
      <PageHeader title="Add Customer" prevLink="/customers" />
      <div>
        <Form />
      </div>
    </>
  );
}

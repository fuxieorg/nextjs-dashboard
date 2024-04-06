import PageHeader from "@/components/page-header";
import { columns } from "./components/columns";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { findProducts } from "./api";

export default async function Page() {
  const products = await JSON.parse(JSON.stringify(await findProducts()));
  return (
    <>
      <PageHeader title="Products">
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" disabled>
            Import
          </Button>
          <Button variant="outline" disabled>
            Export
          </Button>
          <Link href="/products/add-product">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add products
            </Button>
          </Link>
        </div>
      </PageHeader>
      <DataTable columns={columns} data={products} filterField="title" />
    </>
  );
}

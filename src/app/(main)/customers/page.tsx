import { DataTable } from "@/components/data-table";
import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { getCustomers } from "@/lib/data";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { columns } from "./columns";

export default async function Page() {
  const customers = await getCustomers();

  return (
    <>
      <PageHeader title="Customers">
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" disabled>
            Import
          </Button>
          <Button variant="outline" disabled>
            Export
          </Button>
          <Link href="/customers/add-customer">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Customer
            </Button>
          </Link>
        </div>
      </PageHeader>
      <DataTable columns={columns} data={customers} filterField="firstName" />
    </>
  );
}

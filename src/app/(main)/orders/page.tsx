import PageHeader from "@/components/page-header";
import { DataTable } from "@/components/data-table";
import { columns } from "./components/columns";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import { findOrders } from "./api";

export default async function Page() {
  const orders = await JSON.parse(JSON.stringify(await findOrders()));

  return (
    <>
      <PageHeader title="Orders">
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" disabled>
            Import
          </Button>
          <Button variant="outline" disabled>
            Export
          </Button>
          <Link href="/orders/add-order">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Order
            </Button>
          </Link>
        </div>
      </PageHeader>
      <DataTable columns={columns} data={orders} filterField="orderSn" />
    </>
  );
}

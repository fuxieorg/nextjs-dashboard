import { DataTable } from "@/components/data-table";
import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { findImages } from "./api";
import { columns } from "./components/columns";

export default async function Page() {
  const media = await findImages();

  return (
    <>
      <PageHeader title="Media"></PageHeader>
      <DataTable columns={columns} data={media} filterField="title" />
    </>
  );
}

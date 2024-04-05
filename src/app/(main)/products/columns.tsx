"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { Product } from "@/types/product";
import { removeProducts } from "@/actions/products";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import DataTableDelete from "@/components/data-table-delete";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const columns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: "Product",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="flex items-center gap-4">
          <Image
            src="https://cdn1.epicgames.com/offer/611482b8586142cda48a0786eb8a127c/EGS_DeadbyDaylight_BehaviourInteractive_S2_1200x1600-a1c30209e3b9fb63144daa9b5670f503?h=480&quality=medium&resize=1&w=360"
            alt={product.title}
            width={64}
            height={64}
            className="h-10 w-10 rounded-md object-cover"
          />
          <div>{product.title}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    header: ({ table }) => {
      const rows = table.getFilteredSelectedRowModel().rows;
      const ids = rows.map((row) => row.original.id);
      if (ids.length > 0) {
        return (
          <DataTableDelete
            action={removeProducts.bind(null, ids)}
            table={table}
          >
            <Button variant="destructive" size="sm">
              Delete all
            </Button>
          </DataTableDelete>
        );
      }
      return "Actions";
    },
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="flex items-center gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={`/products/${product.id}`}>
                  <Button size="icon" variant="ghost">
                    <Edit className="h-4 w-4" />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>Edit product</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <DataTableDelete
                  action={removeProducts.bind(null, [product.id])}
                >
                  <Button size="icon" variant="ghost">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </DataTableDelete>
              </TooltipTrigger>
              <TooltipContent>Delete product</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },
];

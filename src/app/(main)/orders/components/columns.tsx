"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import DataTableActions from "@/components/data-table-actions";
import { removeProducts } from "@/actions/products";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { extractNameInitials, formatDate } from "@/lib/utils";
import { Order } from "@/types/order";
import { DataTableColumnHeader } from "@/components/data-table-column-header";

export const columns: ColumnDef<Order>[] = [
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
    cell: ({ row }) => {
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "orderSn",
    header: "Order id",
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);

      return <div>{formatted}</div>;
    },
  },
  {
    id: "name",
    header: "Customer",
    cell: ({ row }) => {
      const { firstName, lastName } = row.original.customer;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/02.png" alt="Avatar" />
            <AvatarFallback className="uppercase">
              {extractNameInitials(firstName, lastName)}
            </AvatarFallback>
          </Avatar>
          {firstName} {lastName}
        </div>
      );
    },
  },
  {
    accessorKey: "payStatus",
    header: "Pay Status",
  },
  {
    accessorKey: "orderStatus",
    header: "Order Status",
  },
  {
    accessorKey: "createdAt",
    header: "Created at",
    cell: ({ row }) => {
      return formatDate(row.getValue("createdAt"));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const customer = row.original;

      return (
        <DataTableActions
          editLink={`/orders/${customer.id}`}
          deleteActions={removeProducts.bind(null, [customer.id])}
        />
      );
    },
  },
];

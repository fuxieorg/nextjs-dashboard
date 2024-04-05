"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import DataTableActions from "@/components/data-table-actions";
import { Customer } from "@/types/customer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { extractNameInitials, formatDate } from "@/lib/utils";
import DataTableDeleteItems from "@/components/data-table-delete";
import { removeCustomers } from "@/actions/customers";
import DataTableDelete from "@/components/data-table-delete";
import { Button } from "@/components/ui/button";

export const columns: ColumnDef<Customer>[] = [
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
    accessorKey: "firstName",
    header: "Name",
    cell: ({ row }) => {
      const { firstName, lastName } = row.original;
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
    accessorKey: "email",
    header: "Email",
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
    header: ({ table }) => {
      const rows = table.getFilteredSelectedRowModel().rows;
      const ids = rows.map((row) => row.original.id);
      if (ids.length > 0) {
        return (
          <DataTableDelete action={removeCustomers.bind(null, ids)}>
            <Button variant="destructive" size="sm">
              Delete all
            </Button>
          </DataTableDelete>
        );
      }
      return "Actions";
    },
    cell: ({ row }) => {
      const customer = row.original;

      return (
        <DataTableActions
          editLink={`/customers/${customer.id}`}
          deleteAction={removeCustomers.bind(null, [customer.id])}
        />
      );
    },
  },
];

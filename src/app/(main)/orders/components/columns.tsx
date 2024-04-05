"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { extractNameInitials, formatDate } from "@/lib/utils";
import { Order } from "@/types/order";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const columns: ColumnDef<Order>[] = [
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
    header: "Actions",
    cell: ({ row }) => {
      const order = row.original;

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href={`/orders/${order.id}`}>
                <Button size="icon" variant="ghost">
                  <Eye className="h-4 w-4" />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>View order details</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
];

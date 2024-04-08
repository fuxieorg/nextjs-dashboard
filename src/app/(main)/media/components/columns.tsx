"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import DataTableDelete from "@/components/data-table-delete";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Edit, Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { removeImageAction } from "../actions";
import { Media } from "../media";
import Image from "next/image";

export const columns: ColumnDef<Media>[] = [
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
    header: "Media",
    cell: ({ row }) => {
      const media = row.original;
      return (
        <div className="flex items-center gap-4">
          <Image
            src={media.url}
            alt={media.title}
            width={64}
            height={64}
            className="h-10 w-10 rounded-md object-cover"
          />
          <div>{media.title}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Type",
  },

  {
    id: "actions",
    header: ({ table }) => {
      const rows = table.getFilteredSelectedRowModel().rows;
      const ids = rows.map((row) => row.original.id);
      if (ids.length > 0) {
        return (
          <DataTableDelete
            action={removeImageAction.bind(null, ids)}
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
      const media = row.original;

      return (
        <div className="flex items-center gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <DataTableDelete
                  action={removeImageAction.bind(null, [media.id])}
                >
                  <Button size="icon" variant="ghost">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </DataTableDelete>
              </TooltipTrigger>
              <TooltipContent>Delete media</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },
];

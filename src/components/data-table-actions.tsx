import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import DataTableDelete from "@/components/data-table-delete";

interface DataTableActionsProps {
  editLink?: string;
  deleteAction: any;
}

const DataTableActions: FC<DataTableActionsProps> = ({
  editLink = "",
  deleteAction,
}) => {
  return (
    <div className="flex items-center gap-1">
      <Link href={editLink}>
        <Button size="icon" variant="ghost">
          <Edit className="h-4 w-4" />
        </Button>
      </Link>

      <DataTableDelete action={deleteAction}>
        <Button size="icon" variant="ghost">
          <Trash2 className="h-4 w-4" />
        </Button>
      </DataTableDelete>
    </div>
  );
};

export default DataTableActions;

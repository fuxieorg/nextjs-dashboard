import { FC } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type Status = "success" | "warning" | "failure" | "default";

const STATUS_CLASSES: Record<Status, string> = {
  success:
    "bg-green-400/15 text-green-600 dark:bg-green-400/10 dark:text-green-300",
  warning:
    "bg-yellow-400/15 text-yellow-600 dark:bg-yellow-400/10 dark:text-yellow-300",
  failure: "bg-red-400/15 text-red-600 dark:bg-red-400/10 dark:text-red-300",
  default:
    "bg-zinc-400/15 text-zinc-600 dark:bg-zinc-400/10 dark:text-zinc-300",
};

interface Props {
  status: Status;
}

const StatusBadge: FC<Props> = ({ status }) => {
  return (
    <Badge className={cn(["pointer-events-none", STATUS_CLASSES[status]])}>
      {status}
    </Badge>
  );
};

export default StatusBadge;

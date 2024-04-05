import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronUp, LucideIcon } from "lucide-react";

interface Props {
  title: string;
  mainText: string;
  subText: string;
  badgeText: string;
  bageType: "up" | "down";
}

const Badge = ({ type, text }: { type: "up" | "down"; text: string }) => {
  if (type === "down") {
    return (
      <span className="flex items-center gap-1 rounded-md bg-red-400/15 px-2 py-0.5 text-xs text-red-700 dark:bg-red-400/10 dark:text-red-300">
        <ChevronDown className="h-4 w-4" />
        {text}
      </span>
    );
  }
  return (
    <span className="flex items-center gap-1 rounded-md bg-green-400/15 px-2 py-0.5 text-xs text-green-700 dark:bg-green-400/10 dark:text-green-300">
      <ChevronUp className="h-4 w-4" />
      {text}
    </span>
  );
};

const MetricCard: FC<Props> = ({
  title,
  mainText,
  subText,
  badgeText,
  bageType,
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Badge type={bageType} text={badgeText} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{mainText}</div>
        <p className="mt-1 text-xs text-muted-foreground">{subText}</p>
      </CardContent>
    </Card>
  );
};

export default MetricCard;

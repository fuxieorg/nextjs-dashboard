import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  IconComponent: LucideIcon;
  mainText: string;
  subText: string;
}

const DashboardMetricCard: FC<Props> = ({
  title,
  IconComponent,
  mainText,
  subText,
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <IconComponent className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{mainText}</div>
        <p className="text-xs text-muted-foreground">{subText}</p>
      </CardContent>
    </Card>
  );
};

export default DashboardMetricCard;

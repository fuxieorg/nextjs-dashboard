import PageHeader from "@/components/page-header";
import { DollarSign, Users, CreditCard, Activity } from "lucide-react";
import DashboardMetricCard from "@/components/dashboard-metric-card";
import DashboardTopSellers from "@/components/dashboard-top-sellers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Page() {
  return (
    <>
      <PageHeader title="Dashboard" />
      <div className="flex flex-1 flex-col gap-4 md:gap-8">
        {/*Metrics*/}
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <DashboardMetricCard
            title="Total Revenue"
            IconComponent={DollarSign}
            mainText="$45,231.89"
            subText="+20.1% from last month"
          />
          <DashboardMetricCard
            title="Subscriptions"
            IconComponent={Users}
            mainText="+2350"
            subText="+180.1% from last month"
          />
          <DashboardMetricCard
            title="Sales"
            IconComponent={CreditCard}
            mainText="+12,234"
            subText="+19% from last month"
          />
          <DashboardMetricCard
            title="Active Now"
            IconComponent={Activity}
            mainText="+573"
            subText="+201 since last hour"
          />
        </div>

        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <DashboardTopSellers />
          <DashboardTopSellers />
          <DashboardTopSellers />
          <DashboardTopSellers />
          <DashboardTopSellers />
          <DashboardTopSellers />
          <DashboardTopSellers />
          <DashboardTopSellers />
          <DashboardTopSellers />
          <DashboardTopSellers />
          <DashboardTopSellers />
          <DashboardTopSellers />
          <div className="overflow-hidden whitespace-nowrap xl:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>123</CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

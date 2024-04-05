import PageHeader from "@/components/page-header";
import MetricCard from "@/components/metric-card";
import DashboardTopSellers from "@/components/dashboard-top-sellers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/data-table";
import { columns } from "../orders/components/columns";
import { getOrders } from "@/lib/data";

export default async function Page() {
  const orders = await getOrders();
  return (
    <>
      <PageHeader title="Dashboard" />
      <div className="flex flex-1 flex-col gap-4 md:gap-8">
        {/*Metrics*/}
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <MetricCard
            title="Total Revenue"
            bageType="up"
            badgeText="12%"
            mainText="$45,231.89"
            subText="from last month"
          />
          <MetricCard
            title="Subscriptions"
            bageType="down"
            badgeText="5%"
            mainText="2350"
            subText="from last month"
          />
          <MetricCard
            title="Sales"
            bageType="up"
            badgeText="2%"
            mainText="12,234"
            subText="from last month"
          />
          <MetricCard
            title="Active Now"
            bageType="up"
            badgeText="2%"
            mainText="573"
            subText="since last hour"
          />
        </div>

        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <DashboardTopSellers />
          <div className="overflow-hidden whitespace-nowrap xl:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable
                  columns={columns}
                  data={orders}
                  filterField="orderSn"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

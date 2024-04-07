import PageHeader from "@/components/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { findOrder } from "../api";

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const order = await findOrder(Number(slug));

  return (
    <>
      <PageHeader title="Order Detail" prevLink="/orders" />
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 ">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 ">
          <div className="grid grid-cols-3 gap-4 ">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Detail</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="grid grid-cols-2 gap-4">
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">OrderSn</span>
                    <span>{order?.orderSn}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Amount</span>
                    <span>
                      {order?.amount &&
                        new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(order.amount)}
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">DateAdded</span>
                    <span>
                      {order?.createdAt && formatDate(String(order.createdAt))}
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">Num</span>
                    <span>{order?.quantity}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">PayStatus</span>
                    <span>{order?.payStatus}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">OrderStatus</span>
                    <span>{order?.orderStatus}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <div className=" grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Detail</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="grid gap-3">
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Name</span>
                      <span>
                        {order?.customer.firstName} {order?.customer.lastName}
                      </span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Mobile</span>
                      <span>457845444</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Address</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="grid gap-3">
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>45785455778444</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-muted-foreground">Address</span>
                      <span>457845444</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-2">
            <Card>
              <CardHeader className="px-7">
                <CardTitle>Product</CardTitle>
                <CardDescription>
                  Recent orders from your store.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Price
                      </TableHead>
                      <TableHead className="text-right">Num</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {order?.products &&
                      order.products.map((product: any) => {
                        return (
                          <TableRow
                            key={product.productId}
                            className="bg-accent"
                          >
                            <TableCell>
                              <div className="font-medium">{product.title}</div>
                              {/* <div className="hidden text-sm text-muted-foreground md:inline">
                            liam@example.com
                          </div> */}
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              {new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                              }).format(product.price)}
                            </TableCell>
                            <TableCell className="text-right">
                              {product.quantity}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}

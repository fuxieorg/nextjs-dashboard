"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { columns } from "./columns";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "@/app/(main)/products/product";

interface SelectProductsProps {
  products: any;
  onRowSelectionChange?: (selectedRows: any) => void;
}

const SelectProducts = ({
  products,
  onRowSelectionChange,
}: SelectProductsProps) => {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [selectedRowIndexes, setSelectedRowIndexes] = useState<any>({});

  const handleRowSelectionChange = (values: any) => setSelectedRows(values);

  useEffect(
    () => onRowSelectionChange && onRowSelectionChange(selectedProducts),
    [selectedProducts],
  );

  useEffect(() => {
    setSelectedProducts(selectedRows.map((row) => row.original));
    setSelectedRowIndexes(
      selectedRows.reduce((acc, item) => {
        acc[item.index] = true;
        return acc;
      }, {}),
    );
  }, [selectedRows]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Select Products</CardTitle>
          <Sheet>
            <SheetTrigger asChild>
              <Button type="button">Browse</Button>
            </SheetTrigger>
            <SheetContent side="bottom">
              <SheetHeader>
                <SheetTitle>Select Products</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <DataTable
                  columns={columns}
                  data={products}
                  filterField="title"
                  onRowSelectionChange={handleRowSelectionChange}
                  initialRowSelection={selectedRowIndexes}
                />
              </div>
              <SheetFooter className="mt-6">
                <SheetClose asChild>
                  <Button type="button">Save</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {selectedProducts.length > 0 ? (
              selectedProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.title}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      defaultValue="1"
                      value={product?.quantity}
                      onChange={(e) => {
                        selectedRows.find(
                          (row) => row.original.id === product.id,
                        ).original.quantity = e.target.value;
                      }}
                      className="w-24"
                    />
                  </TableCell>
                  <TableCell>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(product.price)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button type="button" variant="ghost" size="icon">
                      <Trash
                        className="h-4 w-4"
                        onClick={() => {
                          setSelectedRows(
                            selectedRows.filter(
                              (row) => row.original.id !== product.id,
                            ),
                          );
                          toast.success("Product removed successfully");
                        }}
                      />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default SelectProducts;

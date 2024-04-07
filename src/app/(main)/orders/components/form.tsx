"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FC, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SelectProducts from "./select-products";
import FormActions from "@/components/form-actions";
import { Product } from "../../products/product";
import { OrderProduct } from "../order";
import { addOrderAction } from "../actions";

const productSchema = z.object({
  productId: z.number(),
  title: z.string(),
  price: z.number(),
  quantity: z.number(),
});

const formSchema = z.object({
  amount: z.number().optional(),
  quantity: z.number().optional(),
  payStatus: z.enum(["not_paid", "paid", "refunded"]).optional(),
  orderStatus: z.enum(["pending", "processing"]).optional(),
  customerId: z.number().optional(),
  products: z.array(productSchema).optional(),
});

interface ProductFormProps {
  products: Product[];
}

const AddForm: FC<ProductFormProps> = ({ products }) => {
  const [selectedProducts, setSelectedProducts] = useState<OrderProduct[]>([]);
  const { ...form } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      payStatus: "not_paid",
      orderStatus: "pending",
      customerId: 1,
      products: [],
    },
  });

  const addOrderWithProducts = addOrderAction.bind(null, selectedProducts);
  const handleRowSelectionChange = (values: Product[]) => {
    setSelectedProducts(
      values.map((value: Product) => ({
        productId: value.id,
        title: value.title,
        price: value.price,
        quantity: 1,
      })),
    );
  };

  return (
    <Form {...form}>
      <form action={addOrderWithProducts} className="space-y-8">
        {/* {state.message && <FormAlert />} */}
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            <div className="col-span-1 w-full space-y-6">
              <SelectProducts
                products={products}
                onRowSelectionChange={handleRowSelectionChange}
              />
            </div>
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pay Status</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-6">
                <FormField
                  control={form.control}
                  name="payStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Base Status</FormLabel>
                      <FormControl>
                        <Select
                          {...field}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="not_paid" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="not_paid">not_paid</SelectItem>
                            <SelectItem value="paid">paid</SelectItem>
                            <SelectItem value="refunded">refunded</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription>Set the product status.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Order Status</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-6">
                <FormField
                  control={form.control}
                  name="orderStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Order Status</FormLabel>
                      <FormControl>
                        <Select
                          {...field}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="pending" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">pending</SelectItem>
                            <SelectItem value="processing">
                              processing
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription>Set the product status.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>
        </div>
        <FormActions
          isDisabled={!form.formState.isDirty || !form.formState.isValid}
          prevUrl="/orders"
        />
      </form>
    </Form>
  );
};

export default AddForm;

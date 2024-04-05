"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FC, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import FormAlert from "@/components/form-alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SelectProducts from "./select-products";
import { generateOrderSn } from "@/lib/utils";
import { addOrder } from "@/actions/orders";
import { setMaxIdleHTTPParsers } from "http";
import FormActions from "@/components/form-actions";

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
  initialValues?: any;
  products: any;
}
const orderSn = generateOrderSn();
const AddForm: FC<ProductFormProps> = ({ initialValues = {}, products }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const {
    formState: { isDirty, isValid },
    handleSubmit,
    ...form
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      payStatus: "not_paid",
      orderStatus: "pending",
      customerId: 1,
      products: [],
    },
  });

  const addOrderWithProducts = addOrder.bind(null, selectedProducts);
  // const [state, formAction] = useFormState(addOrder, {
  //   message: "",
  // });

  // useEffect(() => {
  //   const { message } = state;
  //   message && toast.success(message);
  // }, [state]);

  const handleRowSelectionChange = (values: any) => {
    setSelectedProducts(
      values.map((value) => ({
        productId: value.id,
        title: value.title,
        price: value.price,
        quantity: 1,
      })),
    );
  };

  useEffect(() => console.log(selectedProducts), [selectedProducts]);

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
        <FormActions isDisabled={!isDirty || !isValid} prevUrl="/orders" />
      </form>
    </Form>
  );
};

export default AddForm;

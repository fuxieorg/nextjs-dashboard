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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { FC, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import FormAlert from "@/components/form-alert";
import FormActions from "@/components/form-actions";
import SelectImages from "../../media/select";
import Image from "next/image";
import { updateProductAction } from "../actions";
import { ProductDetail } from "../product";
import { Media } from "../../media/Media";

const formSchema = z.object({
  id: z.number(),
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().optional(),
  imageIds: z.string().optional(),
  price: z.union([
    z.number().min(0.01, "Price must be greater than 0."),
    z.string().refine((value) => {
      const parsed = parseFloat(value);
      return !isNaN(parsed) && parsed > 0;
    }, "Price must be a positive number."),
  ]),
  status: z.enum(["active", "archived", "draft"]),
  content: z.string().optional(),
  image: z.array(z.any()).optional(),
});

interface ProductFormProps {
  initialValues?: ProductDetail;
  images: Media[];
}

const AddForm: FC<ProductFormProps> = ({
  initialValues = {
    id: 0,
    title: "",
    description: "",
    price: 0,
    status: "active",
    content: "",
    imageIds: "",
    image: [],
  },
  images,
}) => {
  const { ...form } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: initialValues,
  });

  const [state, formAction] = useFormState(updateProductAction, {
    message: "",
  });

  useEffect(() => {
    const { message } = state;
    message && toast.success(message);
  }, [state]);

  const [selectImages, setSelectImages] = useState<any>([]);
  useEffect(() => {
    if (initialValues && initialValues.image) {
      const initImages = initialValues.image.map((i: any) => {
        return {
          id: i.image.id,
          title: i.image.title,
          url: i.image.url,
        };
      });
      setSelectImages(initImages);
      form.setValue("imageIds", initImages.map((i: any) => i.id).join(","));
    }
  }, []);
  const handleRowSelectionChange = (values: number[]) => {
    setSelectImages(images.filter((image: any) => values.includes(image.id)));
    form.setValue("imageIds", values.join(","));
  };

  return (
    <Form {...form}>
      <form action={formAction} className="space-y-8">
        <div>{state.message && <FormAlert />}</div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="col-span-1 space-y-6 lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>General</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="hidden">
                  <FormField
                    control={form.control}
                    name="id"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="imageIds"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormDescription>
                        A product name is required and recommended to be unique.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Type your message here."
                        />
                      </FormControl>
                      <FormDescription>
                        Set a description to the product for better visibility.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Type your message here."
                        />
                      </FormControl>
                      <FormDescription>
                        Set a content to the product for better visibility.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Media</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-6">
                <ul className="flex flex-wrap items-center gap-2">
                  {selectImages?.map((file: any) => (
                    <li key={file.id}>
                      <Image
                        src={file.url}
                        alt={file.title}
                        width={100}
                        height={100}
                      />
                    </li>
                  ))}
                </ul>
                <SelectImages
                  images={images}
                  onRowSelectionChange={(imageIds: number[]) => {
                    handleRowSelectionChange(imageIds);
                  }}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-6">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Base Price</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0.00" {...field} />
                      </FormControl>
                      <FormDescription>Set the product price.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            {/* <Card>
              <CardHeader>
                <CardTitle>Inventory</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-6">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="0" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter the product quantity.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card> */}
          </div>
          <div className="col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Status</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-6">
                <FormField
                  control={form.control}
                  name="status"
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
                            <SelectValue placeholder="published" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="archived">Archived</SelectItem>
                            <SelectItem value="draft">Draft</SelectItem>
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
            {/* <Card>
              <CardHeader>
                <CardTitle>Details</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-6">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categories</FormLabel>
                      <FormControl>
                        <Select>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Theme" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription>Set the product status.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <Select>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Theme" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription>Set the product status.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card> */}
          </div>
        </div>
        <FormActions
          isDisabled={!form.formState.isDirty || !form.formState.isValid}
          prevUrl="/products"
        />
      </form>
    </Form>
  );
};

export default AddForm;

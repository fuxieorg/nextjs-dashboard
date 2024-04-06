"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FC, useEffect } from "react";
import { toast } from "sonner";
import FormAlert from "@/components/form-alert";
import FormActions from "@/components/form-actions";
import { updateCustomerAction } from "../actions";
import { CustomerFormData } from "../customer";
import { useFormState } from "react-dom";

const formSchema = z.object({
  id: z.number().optional(),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email format" }),
  phoneNumber: z.string().optional(),
});

interface CustomerFormProps {
  initialValues?: CustomerFormData;
}

const CustomerForm: FC<CustomerFormProps> = ({
  initialValues = {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  },
}) => {
  const { ...form } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: initialValues,
  });

  const [state, formAction] = useFormState(updateCustomerAction, {
    message: "",
  });

  useEffect(() => {
    const { message } = state;
    message && toast.success(message);
  }, [state]);

  return (
    <Form {...form}>
      <form action={formAction} className="space-y-8">
        <div className="w-full flex-1 space-y-6">
          {state.message && <FormAlert />}
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
              </div>
              <div className="grid grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First name</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last name</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone number</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </div>
        <FormActions
          isDisabled={!form.formState.isDirty || !form.formState.isValid}
          prevUrl="/customers"
        />
      </form>
    </Form>
  );
};

export default CustomerForm;

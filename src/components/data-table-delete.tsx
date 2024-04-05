"use client";

import React, { FC, useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";

interface DataTableDeleteItemsProps {
  action: any;
  children: React.ReactNode;
  table?: any;
}

const initialState = {
  message: "",
};

const DataTableDelete: FC<DataTableDeleteItemsProps> = ({
  action,
  children,
  table,
}) => {
  const [state, formAction] = useFormState(action, initialState);

  useEffect(() => {
    if (state) {
      const { message } = state;
      message && toast.success(message);
      message && table && table.toggleAllPageRowsSelected(false);
    }
  }, [state]);
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => toast.error("Cancelled!")}>
            Cancel
          </AlertDialogCancel>

          <form action={formAction}>
            <AlertDialogAction asChild>
              <Button type="submit">Delete</Button>
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DataTableDelete;

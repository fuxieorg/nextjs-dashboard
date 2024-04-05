"use client";

import React, { FC, useEffect, useState } from "react";
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
}

const initialState = {
  message: "",
};

const DataTableDeleteItems: FC<DataTableDeleteItemsProps> = ({
  action,
  children,
}) => {
  const [state, formAction] = useFormState(action, initialState);

  useEffect(() => {
    if (state) {
      const { message } = state;
      message && toast.success(message);
    }
  }, [state]);
  return (
    <AlertDialog>
      <AlertDialogTrigger>{children}</AlertDialogTrigger>
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

export default DataTableDeleteItems;

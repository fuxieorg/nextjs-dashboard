"use client";

"use client";

import { toast } from "sonner";

import { UploadButton } from "@/lib/uploadthing";
import { useEffect, useState } from "react";
import { ClientUploadedFileData } from "uploadthing/types";
import Image from "next/image";
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
import Upload from "@/components/upload";

interface SelectProductsProps {
  onRowSelectionChange?: (selectedRows: any) => void;
}

const SelectImages = ({ onRowSelectionChange }: SelectProductsProps) => {
  const [files, setFiles] = useState<
    ClientUploadedFileData<{ uploadedBy: string }>[]
  >([]);
  useEffect(() => {}, []);

  return (
    <>
      <ul className="flex flex-wrap items-center gap-2">
        {files.map((file) => (
          <li key={file.key}>
            <Image src={file.url} alt={file.name} width={100} height={100} />
          </li>
        ))}
      </ul>

      <Sheet>
        <SheetTrigger asChild>
          <Button type="button">Browse</Button>
        </SheetTrigger>
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle>Select Images</SheetTitle>
          </SheetHeader>
          <Upload />
          <SheetFooter className="mt-6">
            <SheetClose asChild>
              <Button
                type="button"
                className="text-sm ut-button:bg-primary ut-button:text-primary-foreground ut-button:transition-colors ut-button:hover:bg-primary/90 ut-button:ut-readying:bg-primary/50"
              >
                Save
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default SelectImages;

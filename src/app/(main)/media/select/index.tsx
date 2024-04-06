"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Upload from "@/components/upload";
import { CircleCheck, X } from "lucide-react";
import { DialogClose } from "@radix-ui/react-dialog";
import { removeImage } from "@/app/(main)/media/actions";

interface SelectProductsProps {
  onRowSelectionChange: (selectedRows: number[]) => void;
  images: any;
}

interface Image {
  id: number;
  title: string;
  url: string;
}

function SelectImages({ onRowSelectionChange, images }: SelectProductsProps) {
  const [selectedImages, setSelectedImages] = useState<number[]>([]);

  const handleClickImage = (id: number) => {
    setSelectedImages((prevSelectedImages) => {
      if (prevSelectedImages.includes(id)) {
        return prevSelectedImages.filter((imageId) => imageId !== id);
      } else {
        return [...prevSelectedImages, id];
      }
    });
  };

  const handleSave = () => {
    onRowSelectionChange && onRowSelectionChange(selectedImages);
  };

  const handleDelete = (id: number) => {
    removeImage(id);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button">Browse</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Images</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-6 gap-3">
          <Upload />
          {images?.map((file: Image) => (
            <div
              key={file.id}
              className="relative flex items-center justify-center rounded border p-1"
              onClick={() => handleClickImage(file.id)}
            >
              {selectedImages?.includes(file.id) && (
                <div className="absolute left-0 top-0 z-auto flex h-full w-full items-center justify-center bg-black/50">
                  <CircleCheck className="h-5 w-5 text-green-400" />
                </div>
              )}
              <div
                className="absolute -right-2 -top-2 z-50 flex cursor-pointer items-center justify-center rounded-full border bg-primary-foreground p-0.5"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(file.id);
                }}
              >
                <X className="h-3 w-3 text-primary" />
              </div>
              <Image src={file.url} alt={file.title} width={100} height={100} />
            </div>
          ))}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={() => handleSave()}>Save</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default SelectImages;

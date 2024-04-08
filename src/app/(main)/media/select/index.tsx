"use client";

import { useState } from "react";
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
import { Media } from "../media";

interface SelectProductsProps {
  onRowSelectionChange: (selectedRows: number[]) => void;
  images: Media[];
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
          {images?.map((file: Media) => (
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

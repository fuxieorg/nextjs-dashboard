"use client";

import { toast } from "sonner";

import { UploadButton } from "@/lib/uploadthing";
import { useEffect, useState } from "react";
import { ClientUploadedFileData } from "uploadthing/types";
import { addImages } from "@/app/(main)/media/actions";
import { Plus } from "lucide-react";

const Upload = () => {
  const [files, setFiles] = useState<
    ClientUploadedFileData<{ uploadedBy: string }>[]
  >([]);
  useEffect(() => {
    const addData =
      files &&
      files.map((file) => {
        return {
          title: file.name,
          url: file.url,
          type: file.type,
        };
      });
    addData && addImages(addData);
  }, [files]);
  return (
    <UploadButton
      content={{
        button() {
          return <Plus className="h-4 w-4" />;
        },
        allowedContent() {
          return "";
        },
      }}
      className="ut-label:h-full! ut-button:flex ut-button:w-full ut-button:items-center ut-button:justify-center ut-button:bg-transparent ut-button:hover:bg-transparent ut-label:w-full"
      endpoint="imageUploader"
      onClientUploadComplete={(
        res: ClientUploadedFileData<{ uploadedBy: string }>[],
      ) => {
        // Do something with the response
        console.log("Files: ", res);
        setFiles(res);
        toast.success("Upload Completed");
      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        toast.error(error.message);
      }}
    />
  );
};

export default Upload;

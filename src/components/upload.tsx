"use client";

import { toast } from "sonner";

import { UploadButton } from "@/lib/uploadthing";
import { useState } from "react";
import { ClientUploadedFileData } from "uploadthing/types";
import Image from "next/image";

const Upload = () => {
  const [files, setFiles] = useState<
    ClientUploadedFileData<{ uploadedBy: string }>[]
  >([]);
  return (
    <>
      <ul className="flex flex-wrap items-center gap-2">
        {files.map((file) => (
          <li key={file.key}>
            <Image src={file.url} alt={file.name} width={100} height={100} />
          </li>
        ))}
      </ul>
      <div>
        <UploadButton
          className="text-sm ut-button:bg-primary ut-button:text-primary-foreground ut-button:transition-colors ut-button:hover:bg-primary/90 ut-button:ut-readying:bg-primary/50"
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
      </div>
    </>
  );
};

export default Upload;

import { Button } from "./ui/button";
import { FC } from "react";
import Link from "next/link";

interface FormActionsProps {
  isDisabled: boolean;
  prevUrl: string;
}

const FormActions: FC<FormActionsProps> = ({
  isDisabled = false,
  prevUrl = "/",
}) => {
  return (
    <>
      <div className="flex items-center justify-end gap-4">
        <Link href={prevUrl}>
          <Button variant="outline">Discard</Button>
        </Link>
        <Button type="submit" disabled={isDisabled}>
          Save
        </Button>
      </div>
    </>
  );
};

export default FormActions;

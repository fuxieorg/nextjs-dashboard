import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Check } from "lucide-react";

const FormAlert = () => {
  return (
    <Alert className="border border-green-400/25 bg-green-400/15 text-green-600 dark:border-green-400/20 dark:bg-green-400/10 dark:text-green-300">
      <Check className="h-4 w-4 text-green-600 dark:text-green-300" />
      <AlertTitle>Successful</AlertTitle>
      <AlertDescription>
        Your changes have been saved successfully.
      </AlertDescription>
    </Alert>
  );
};

export default FormAlert;

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

interface Props {
  title: string;
  prevLink?: string;
  children?: React.ReactNode;
}

export default function PageHeader({ title, prevLink, children }: Props) {
  return (
    <header className="flex items-center justify-between gap-6">
      <div className="flex items-center gap-4">
        {prevLink && (
          <Link href={prevLink}>
            <Button variant="outline" size="icon" className="h-7 w-7">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
        )}
        <h1 className="text-lg font-semibold md:text-2xl">{title}</h1>
      </div>
      {children}
    </header>
  );
}

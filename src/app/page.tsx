import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import Footer from "@/components/footer";
import { Card } from "@/components/ui/card";
import Logo from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggle";

export default async function Home() {
  return (
    <div className="grid h-svh min-h-svh grid-rows-[auto,1fr,auto] gap-4">
      <header className="h-16 w-full border-b">
        <div className="container flex h-full items-center justify-between">
          <Logo />
          <nav></nav>
          <div>
            <ModeToggle />
          </div>
        </div>
      </header>
      <div>
        {/* Hero Sections */}
        <div className="flex flex-col items-center gap-2 py-24 text-center">
          <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
            A full-stack dashboard Next.js app
          </h1>
          <p className="max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl">
            The most popular tech stack, based on Next.js, shadcn/ui, and
            Tailwind CSS.
          </p>
          <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-10">
            <Link href="/dashboard">
              <Button>Preview</Button>
            </Link>
            <Link
              href="https://github.com/fuxieorg/nextjs-dashboard"
              target="_blank"
            >
              <Button variant="outline">
                <Icons.gitHub className="mr-2 h-4 w-4" />
                Source Code
              </Button>
            </Link>
          </div>
        </div>

        <Card>123</Card>
      </div>
      <Footer />
    </div>
  );
}

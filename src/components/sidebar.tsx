import Link from "next/link";

import Logo from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggle";
import SidebarNav from "./sidebar-nav";

export default function Sidebar() {
  return (
    <div className="sticky left-0 top-0 hidden h-svh border-r bg-zinc-50 dark:bg-zinc-900 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-16 items-center border-b px-4 lg:px-6">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <div className="flex-1 p-6">
          <SidebarNav />
        </div>
        <div className="mt-auto p-4">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}

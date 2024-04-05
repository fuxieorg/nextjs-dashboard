import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full">
      <div className="p-4 text-center text-sm text-muted-foreground md:p-6">
        &copy; {currentYear}{" "}
        <Link
          href="https://fuxie.org"
          target="_blank"
          rel="noreferrer"
          className="font-medium underline underline-offset-4"
        >
          Fu Xie
        </Link>
        . The source code is available on{" "}
        <Link
          href="https://github.com/fuxieorg/nextjs-dashboard"
          target="_blank"
          rel="noreferrer"
          className="font-medium underline underline-offset-4"
        >
          GitHub
        </Link>
        .
      </div>
    </footer>
  );
}

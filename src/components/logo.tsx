import { Asterisk } from "lucide-react";

export default function Logo() {
  return (
    <h1 className="flex items-center gap-1">
      <Asterisk className="h-7 w-7" />
      <span className="font-semibold">Next Dashboard</span>
    </h1>
  );
}

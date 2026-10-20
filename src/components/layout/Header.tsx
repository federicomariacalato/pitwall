import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Link } from "react-router-dom";
import { Navbar } from "./Navbar";

export function Header() {
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex h-15 max-w-310 items-center justify-between gap-x-6 px-4 md:h-17 md:px-10">
        <Link to="/" className="flex items-center gap-2.5 py-3">
          <img src="/favicon.svg" alt="" className="size-8" />
          <span className="font-heading text-[28px] leading-none font-bold tracking-[0.08em] uppercase">
            Pitwall
          </span>
        </Link>
        <Navbar />

        <Select defaultValue="2026">
          <SelectTrigger className="h-9 border-0 bg-secondary px-3.5 font-medium hover:bg-secondary/80 dark:bg-secondary dark:hover:bg-secondary/80">
            <SelectValue>{(value) => `Season ${value}`}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2026">Season 2026</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </header>
  );
}

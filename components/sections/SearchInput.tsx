"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function SearchInput({
  placeholder = "Search…",
  onValueChange,
  delay = 250,
}: {
  placeholder?: string;
  onValueChange: (value: string) => void;
  delay?: number;
}) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => onValueChange(value), delay);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, delay]);

  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        aria-label="Search"
        className="pl-9"
      />
    </div>
  );
}

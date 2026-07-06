"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";

export function TagsInput({
  value,
  onChange,
  placeholder,
}: {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}) {
  const valueKey = value.join("|");
  const [text, setText] = useState(value.join(", "));
  const [syncedKey, setSyncedKey] = useState(valueKey);

  // Resync local text only when the field's value changes from outside
  // (e.g. the dialog loads a different item, or the form resets) — not
  // on every keystroke, so a trailing comma isn't reformatted away.
  if (valueKey !== syncedKey) {
    setSyncedKey(valueKey);
    setText(value.join(", "));
  }

  return (
    <Input
      value={text}
      placeholder={placeholder}
      onChange={(e) => {
        const next = e.target.value;
        const parsed = next
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
        setText(next);
        setSyncedKey(parsed.join("|"));
        onChange(parsed);
      }}
    />
  );
}

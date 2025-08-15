"use client";

import { cn } from "@/app/lib/utils/cn/cn";
import { X, Plus } from "lucide-react";
import { useState, useRef } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import useSWR from "swr";
import { Suggestion } from "@/app/types/shared/suggestion/suggestion";

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((data: Suggestion[]) => data.map((d) => d.name));


type ChipsInputProps = {
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  className?: string;
};

export default function ChipsInput({
  values,
  onChange,
  placeholder,
  className,
}: ChipsInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { data: suggestions = [] } = useSWR(
    inputValue.trim().length >= 2
      ? `${
          process.env.NEXT_PUBLIC_API_URL
        }/suggestions?query=${encodeURIComponent(inputValue)}`
      : null, // don't fetch if input is too short
    fetcher,
    { revalidateOnFocus: false, dedupingInterval: 300 }
  );

  const filteredSuggestions = suggestions.filter(
    (s) =>
      !values.includes(s) && s.toLowerCase().includes(inputValue.toLowerCase())
  );

  const isSuggestionOpen = filteredSuggestions.length > 0;

  const handleAdd = (value: string) => {
    const trimmed = value.trim();
    if (trimmed && !values.includes(trimmed)) {
      onChange([...values, trimmed]);
    }
    setInputValue("");
    setHighlightIndex(-1);
  };

  const handleRemove = (index: number) => {
    const updated = [...values];
    updated.splice(index, 1);
    onChange(updated);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev < filteredSuggestions.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev > 0 ? prev - 1 : filteredSuggestions.length - 1
      );
    } else if (e.key === "Enter") {
      if (highlightIndex >= 0) {
        e.preventDefault();
        e.stopPropagation(); // prevent parent Enter
        handleAdd(filteredSuggestions[highlightIndex]);
      }
    } else if (e.key === "Escape") {
      setHighlightIndex(-1);
    }
  };

  return (
    <div
      ref={wrapperRef}
      className={cn("flex flex-col items-start gap-3 rounded-md", className)}
    >
      <div className="relative flex w-full gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-grow focus:ring-0 focus-visible:ring-0"
          autoComplete="off"
          aria-autocomplete="list"
          aria-expanded={isSuggestionOpen}
          aria-haspopup="listbox"
        />

        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => handleAdd(inputValue)}
          disabled={!inputValue.trim()}
          className="flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
        </Button>

        {isSuggestionOpen && (
          <ul
            role="listbox"
            className="absolute top-full left-0 right-0 z-50 mt-1 max-h-40 overflow-auto rounded-md border bg-background p-1 shadow-lg"
          >
            {filteredSuggestions.map((suggestion, idx) => (
              <li
                key={idx}
                role="option"
                tabIndex={0}
                className={cn(
                  "cursor-pointer rounded px-3 py-1",
                  highlightIndex === idx
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-primary hover:text-primary-foreground"
                )}
                onClick={() => handleAdd(suggestion)}
                onMouseEnter={() => setHighlightIndex(idx)}
              >
                {suggestion}
              </li>
            ))}
            {filteredSuggestions.length === 0 && (
              <li className="px-3 py-1 text-muted-foreground">No matches</li>
            )}
          </ul>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2 w-full">
        {values.map((tech, idx) => (
          <div
            key={idx}
            className="flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-sm"
          >
            {tech}
            <button
              onClick={() => handleRemove(idx)}
              className="ml-1 text-muted-foreground hover:text-foreground"
              type="button"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

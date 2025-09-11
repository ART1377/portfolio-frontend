"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Badge } from "@/app/components/ui/badge";
import { X } from "lucide-react";

export function SortableItem({
  id,
  onRemove,
}: {
  id: string;
  onRemove: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="inline-block">
      <Badge variant="secondary" className="flex items-center gap-1">
        <span className="cursor-grab" {...attributes} {...listeners}>
          {id}
        </span>
        <button
          type="button"
          onClick={onRemove}
          className="ml-1 "
        >
          <X className="h-3 w-3" />
        </button>
      </Badge>
    </div>
  );
}

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { ReactNode } from "react";

interface SortableTileProps {
  id: string;
  children: ReactNode;
}

export function SortableTile({ id, children }: SortableTileProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={isDragging ? "sortable-tile is-dragging" : "sortable-tile"}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  );
}

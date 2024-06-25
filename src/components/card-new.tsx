"use client"
import { Plus, X } from "lucide-react";
import { Button } from "./ui/button"
import { ElementRef, KeyboardEventHandler, forwardRef, useRef } from "react";
import { FormTextarea } from "./form-textarea";
import { useBoardsStorage } from "@/zustand/boards";
import { BoardNameType } from "@/utils/types";

interface CardNewProps {
  board: BoardNameType;
  enableEditing: () => void;
  disableEditing: () => void;
  isEditing: boolean;
}

export const CardNew = forwardRef<HTMLTextAreaElement, CardNewProps>(
  ({ enableEditing, disableEditing, isEditing, board }, ref) => {
    const { addCard } = useBoardsStorage()
    const formRef = useRef<ElementRef<"form">>(null);

    const onTextareakeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (
      e,
    ) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        formRef.current?.requestSubmit();
      }
    };

    const onSubmit = (formData: FormData) => {
      addCard(board, formData.get("title") as string)
      formRef.current?.reset();
    };

    if (isEditing) {
      return (
        <form
          ref={formRef}
          action={onSubmit}
          className="m-1 space-y-4 px-1 py-0.5"
        >
          <FormTextarea
            id="title"
            onKeyDown={onTextareakeyDown}
            ref={ref}
            placeholder="Enter a title for this card..."
          />
          <div className="flex items-center gap-x-1">
            <Button
              type="submit"
              variant="default"
              size="sm"
            >
              Añadir tarjeta
            </Button>
            <Button onClick={disableEditing} size="sm" variant="ghost">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </form>
      );
    }

  return (
    <div className="px-2 pt-2">
      <Button
        onClick={enableEditing}
        className="h-auto w-full justify-start px-2 py-1.5 text-sm text-muted-foreground"
        size="sm"
        variant="ghost"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add a card
      </Button>
    </div>
  )
})

CardNew.displayName = "CardNew";

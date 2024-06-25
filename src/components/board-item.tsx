"use client";
import { cn } from "@/utils/utils";
import { CardItem } from "./card-item";
import { CardNew } from "./card-new";
import { ElementRef, useRef, useState } from "react";
import { useBoardsStorage } from "@/zustand/boards";
import { Droppable } from "@hello-pangea/dnd";
import { CardInterface } from "@/utils/interface";

interface BoardItemProps {
  id: "pendiente" | "enProgreso" | "terminado";
  name: string;
  data: CardInterface[];
}
export const BoardItem = ({ name, id, data }: BoardItemProps) => {
  const boards = useBoardsStorage();
  const textareaRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState(false);

  const disableEditing = () => {
    setIsEditing(false);
  };

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };

  return (
    <li className="h-full w-[272px] shrink-0 select-none">
      <div className="w-full rounded-md bg-[#f1f2f4] pb-2 shadow-md">
        <div className="items-start- flex justify-between gap-x-2 px-2 pt-2 text-sm font-semibold">
          <div className="h-7 w-full border-transparent px-2.5 py-1 text-sm font-medium">
            {name}
          </div>
        </div>
        <Droppable droppableId={id}>
          {(provided) => (
            <ol
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={cn(
                "mx-1 flex flex-col gap-y-2 px-1 py-0.5",
                data.length > 0 ? "mt-2" : "mt-0"
              )}
            >
              {data.map((card, index) => (
                <CardItem key={card.id} index={index} {...card} />
              ))}
              {provided.placeholder}
            </ol>
          )}
        </Droppable>
        <CardNew
          enableEditing={enableEditing}
          disableEditing={disableEditing}
          isEditing={isEditing}
          ref={textareaRef}
          board={id}
        />
      </div>
    </li>
  );
};

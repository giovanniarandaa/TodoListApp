import { CardInterface } from "@/utils/interface";
import { BoardNameType } from "@/utils/types";
import { cn } from "@/utils/utils";
import { useBoardsStorage } from "@/zustand/boards";
import { Draggable } from "@hello-pangea/dnd";
import { CircleCheckIcon, CircleIcon, Trash } from "lucide-react";

interface CardItemProps extends CardInterface {
  index: number;
  board: BoardNameType;
}

export const CardItem = ({
  name,
  index,
  id,
  completed,
  board,
}: CardItemProps) => {
  const { completedCard, uncompletedCard, deletedCard } = useBoardsStorage();

  const onToggle = () => {
    if (completed) {
      uncompletedCard(board, id);
    } else {
      completedCard(board, id);
    }
  };

  const onCompleted = () => {
    completedCard(board, id);
  };

  const onUncompleted = () => {
    uncompletedCard(board, id);
  };

  const onDeleted = (event: React.MouseEvent<SVGElement>) => {
    event.stopPropagation();
    deletedCard(board, id);
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onClick={onToggle}
          className={cn(
            "group truncate flex items-center justify-between rounded-md border-2 border-transparent bg-white px-3 py-2 text-sm shadow-sm hover:border-black",
            completed && "border-green-600 hover:border-green-600",
          )}
        >
          <div className="flex items-center">
            {completed ? (
              <CircleCheckIcon
                onClick={onUncompleted}
                className="w-6 h-6 mr-2 text-green-600"
              />
            ) : (
              <CircleIcon
                onClick={onCompleted}
                className="w-6 h-6 mr-2"
              />
            )}
            <span className={cn(completed && "line-through")}>{name}</span>
          </div>
          <Trash onClick={onDeleted} className="hidden w-4 h-4 cursor-pointer text-gray-500/50 group-hover:block hover:text-gray-500"/>
        </div>
      )}
    </Draggable>
  );
};

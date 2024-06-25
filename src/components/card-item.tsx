import { CardInterface } from "@/utils/interface";
import { Draggable } from "@hello-pangea/dnd";

interface CardItemProps extends CardInterface {
  index: number;
}

export const CardItem = ({ name, index, id }: CardItemProps) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="truncate rounded-md border-2 border-transparent bg-white px-3 py-2 text-sm shadow-sm hover:border-black"
        >
          {name}
        </div>
      )}
    </Draggable>
  );
};

"use client";

import { DragDropContext } from "@hello-pangea/dnd";
import { BoardItem } from "./board-item";
import { useBoardsStorage } from "@/zustand/boards";
import { BoardNameType } from "@/utils/types";

const Boards = [
  {
    id: "pendiente",
    name: "Pendiente",
  },
  {
    id: "enProgreso",
    name: "En progreso",
  },
  {
    id: "terminado",
    name: "Terminado",
  },
];

export const BoardList = () => {
  const boardStorage = useBoardsStorage()
  const onDragEnd = (result: any) => {
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }


    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    boardStorage.moveCard(
      source.droppableId as BoardNameType,
      destination.droppableId as BoardNameType,
      source.index,
      destination.index
    );

    console.log({ type })
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ol className="flex h-full gap-x-3">
        {Boards.map((board, index) => (
          <BoardItem
            key={board.id}
            id={board.id as BoardNameType}
            name={board.name}
            data={boardStorage[board.id as BoardNameType]}
          />
        ))}
        <div className="w-1 flex-shrink-0" />
      </ol>
    </DragDropContext>
  );
};

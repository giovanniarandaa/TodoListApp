import { CardInterface } from "@/utils/interface";
import { create } from "zustand";
import { v4 as uuidv4 } from 'uuid';

interface BoardsStorageProps {
  pendiente: CardInterface[],
  enProgreso: CardInterface[],
  terminado: CardInterface[],
  addCard: (board: "pendiente" | "enProgreso" | "terminado", cardName: string) => void,
  removeCard: (board: "pendiente" | "enProgreso" | "terminado", cardId: string) => void,
  moveCard: (
    sourceBoard: "pendiente" | "enProgreso" | "terminado",
    destinationBoard: "pendiente" | "enProgreso" | "terminado",
    sourceIndex: number,
    destinationIndex: number
  ) => void;
}

export const useBoardsStorage = create<BoardsStorageProps>((set) => ({
  pendiente: [],
  enProgreso: [],
  terminado: [],
  addCard: (board, cardName ) => {
    const newCard:CardInterface = { id: uuidv4(), name: cardName };
    set((state) => ({
      [board]: [...state[board], newCard]
    }));
  },
  removeCard: (board, cardId) => {
    set((state) => ({
      [board]: state[board].filter((c) => c.id !== cardId)
    }));
  },
  moveCard: (sourceBoard, destinationBoard, sourceIndex, destinationIndex) => {
    set((state) => {
      const sourceItems = Array.from(state[sourceBoard]);
      const destinationItems = sourceBoard === destinationBoard ? sourceItems : Array.from(state[destinationBoard]);
      const [movedItem] = sourceItems.splice(sourceIndex, 1);
      destinationItems.splice(destinationIndex, 0, movedItem);

      return {
        ...state,
        [sourceBoard]: sourceItems,
        [destinationBoard]: destinationItems,
      };
    });
  },
}));
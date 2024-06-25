import { CardInterface } from "@/utils/interface";
import { create } from "zustand";
import { v4 as uuidv4 } from 'uuid';
import { BoardNameType } from "@/utils/types";

interface BoardsStorageProps {
  pendiente: CardInterface[],
  enProgreso: CardInterface[],
  terminado: CardInterface[],
  addCard: (board: BoardNameType, cardName: string) => void,
  removeCard: (board: BoardNameType, cardId: string) => void,
  moveCard: (
    sourceBoard: BoardNameType,
    destinationBoard: BoardNameType,
    sourceIndex: number,
    destinationIndex: number
  ) => void;
  completedCard: (board: BoardNameType, cardId: string) => void;
  deletedCard: (board: BoardNameType, cardId: string) => void;
  uncompletedCard: (board: BoardNameType, cardId: string) => void;
}

export const useBoardsStorage = create<BoardsStorageProps>((set) => ({
  pendiente: [],
  enProgreso: [],
  terminado: [],
  addCard: (board, cardName ) => {
    const newCard:CardInterface = { id: uuidv4(), name: cardName, completed: false};
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
  completedCard: (board, cardId) => {
    set((state) => ({
      [board]: state[board].map((c) => {
        if (c.id === cardId) {
          return { ...c, completed: true };
        }
        return c;
      })
    }));
  },
  deletedCard: (board, cardId) => {
    set((state) => ({
      [board]: state[board].filter((c) => c.id !== cardId)
    }));
  },
  uncompletedCard: (board, cardId) => {
    set((state) => ({
      [board]: state[board].map((c) => {
        if (c.id === cardId) {
          return { ...c, completed: false };
        }
        return c;
      })
    }));
  }
}));
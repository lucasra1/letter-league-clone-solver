import { createContext, useCallback, useContext, useState } from "react";
import { FieldInfo } from "./gameField";
import { initialPlayField } from "./playfield";
import { letterValues } from "./letter";

interface GameSate {
  playField: FieldInfo[][];
  availableStones: string[];
  playFieldSetFieldAtPos: (
    rowNumber: number,
    colNumber: number,
    letter: string,
  ) => void;
  addAvailableStone: (stone: string) => void;
}

export const GameStateContext = createContext<GameSate | null>(null);

export function useGameStateContext() {
  return useContext(GameStateContext);
}

export function useGameState(): GameSate {
  const [playField, setPlayField] = useState(initialPlayField);
  const [availableStones, setAvailableStones] = useState<string[]>([]);

  const playFieldSetFieldAtPos = useCallback(
    (rowNumber: number, colNumber: number, letter: string) => {
      setPlayField((prevPlayfield) =>
        prevPlayfield.map((rowObject, rowIndex) => {
          if (rowIndex === rowNumber) {
            return rowObject.map((colObject, colIndex) => {
              if (colIndex === colNumber) {
                return {
                  ...colObject,
                  letter: {
                    letter: letter,
                    value: letterValues[letter],
                  },
                };
              } else {
                return { ...colObject };
              }
            });
          } else {
            return [...rowObject];
          }
        }),
      );
    },
    [setPlayField],
  );

  const addAvailableStone = useCallback(
    (stone: string) => {
      setAvailableStones((prevStones) => [...prevStones, stone]);
    },
    [setAvailableStones],
  );

  return {
    playField,
    availableStones,
    playFieldSetFieldAtPos,
    addAvailableStone,
  };
}

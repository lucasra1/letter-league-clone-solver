import { Playfield } from "./Playfield";
import React, { useCallback, useState } from "react";
import { initialPlayField } from "../types/playfield";
import {
  AddAvailableStoneContext,
  PlayFieldSetFieldAtPosContext,
} from "../types/Game";
import { findBestWord } from "../types/solver";
import AvailableStonesHolder from "./AvailableStonesHolder";
import { letterValues } from "../types/letter";

export function GameState() {
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

  return (
    <PlayFieldSetFieldAtPosContext.Provider value={playFieldSetFieldAtPos}>
      <AddAvailableStoneContext.Provider value={addAvailableStone}>
        <div className="relative">
          <Playfield fields={playField} />
          <AvailableStonesHolder availableStones={availableStones} />
          <button
            className="absolute top-0 left-1/2"
            onClick={() => findBestWord(playField, availableStones)}
          >
            Search
          </button>
        </div>
      </AddAvailableStoneContext.Provider>
    </PlayFieldSetFieldAtPosContext.Provider>
  );
}

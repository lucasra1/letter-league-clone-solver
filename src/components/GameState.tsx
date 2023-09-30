import { Playfield } from "./Playfield";
import React, { useCallback, useState } from "react";
import { initialPlayField } from "../types/playfield";
import {
  createPlayFieldSetFieldAtPosFunction,
  PlayFieldSetFieldAtPosContext,
} from "../types/Game";
import { findBestWord } from "../types/solver";

export function GameState() {
  const [playField, setPlayField] = useState(initialPlayField);

  const playFieldSetFieldAtPos = useCallback(
    createPlayFieldSetFieldAtPosFunction(setPlayField),
    [setPlayField],
  );

  return (
    <PlayFieldSetFieldAtPosContext.Provider value={playFieldSetFieldAtPos}>
      <div className="relative">
        <Playfield fields={playField} />
        <button
          className="absolute top-0 left-1/2"
          onClick={() =>
            findBestWord(playField, ["A", "B", "K", "J", "Q", "T"])
          }
        >
          Search
        </button>
      </div>
    </PlayFieldSetFieldAtPosContext.Provider>
  );
}

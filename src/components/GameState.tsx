import { Playfield } from "./Playfield";
import React from "react";
import { findBestWord } from "../types/solver";
import AvailableStonesHolder from "./AvailableStonesHolder";
import { GameStateContext, useGameState } from "../types/Game";

export function GameState() {
  const gameState = useGameState();

  return (
    <GameStateContext.Provider value={gameState}>
      <div className="relative">
        <Playfield fields={gameState.playField} />
        <AvailableStonesHolder availableStones={gameState.availableStones} />
        <button
          className="absolute top-0 left-1/2"
          onClick={() =>
            findBestWord(gameState.playField, gameState.availableStones)
          }
        >
          Search
        </button>
      </div>
    </GameStateContext.Provider>
  );
}

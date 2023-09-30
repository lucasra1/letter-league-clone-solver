import React from "react";
import { GameState } from "./components/GameState";
import { loadWordArray } from "./types/solver";

function App() {
  loadWordArray();
  return <GameState />;
}

export default App;

import React, { useEffect } from "react";
import { GameState } from "./components/GameState";
import { loadWordArray } from "./types/solver";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  useEffect(() => {
    loadWordArray().catch((e) => console.error(e));
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <GameState />
    </DndProvider>
  );
}

export default App;

import React, { useContext } from "react";

// ### Set new Field in playfield
type PlayFieldSetFieldAtPosFunction = (
  row: number,
  col: number,
  letter: string,
) => void;

export const PlayFieldSetFieldAtPosContext =
  React.createContext<PlayFieldSetFieldAtPosFunction | null>(null);

export const usePlayFieldSetFieldAtPos = () => {
  return useContext(PlayFieldSetFieldAtPosContext);
};

// ### Add to Available Stones

type AddAvailableStoneFunction = (stone: string) => void;

export const AddAvailableStoneContext =
  React.createContext<AddAvailableStoneFunction | null>(null);

export const useAddAvailableStone = () => {
  return useContext(AddAvailableStoneContext);
};

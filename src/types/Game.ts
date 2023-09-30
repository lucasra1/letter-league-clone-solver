import React, { Dispatch, SetStateAction, useContext } from "react";
import { letterValues } from "./letter";
import { FieldInfo } from "./gameField";

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

export const createPlayFieldSetFieldAtPosFunction = (
  setPlayField: Dispatch<SetStateAction<FieldInfo[][]>>,
): PlayFieldSetFieldAtPosFunction => {
  return (rowNumber: number, colNumber: number, letter: string) => {
    setPlayField((prevPlayfield) => {
      return prevPlayfield.map((rowObject, rowIndex) => {
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
      });
    });
  };
};

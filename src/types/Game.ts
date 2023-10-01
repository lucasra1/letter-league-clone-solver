import { createContext, useCallback, useContext, useState } from "react";
import { FieldInfo } from "./gameField";
import { initialPlayField } from "./playfield";
import { LetterInfo, letterValues, StonePrePlacement } from "./letter";
import { PlayfieldCoordinate } from "./common";
import { v4 as uuid4v } from "uuid";

interface GameSate {
  playField: FieldInfo[][];
  availableStones: string[];
  canPrePlacementBePlaced: boolean;
  playFieldSetFieldAtPos: (
    rowNumber: number,
    colNumber: number,
    letter: string,
  ) => void;
  addAvailableStone: (stone: string) => void;
  removeAvailableStone: (index: number) => void;
  placeStonePrePlacement: (
    stone: LetterInfo,
    isAvailableStone: boolean,
    location: PlayfieldCoordinate,
    existingId?: string,
  ) => void;
  revokeStones: () => void;
}

export const GameStateContext = createContext<GameSate | null>(null);

export function useGameStateContext() {
  return useContext(GameStateContext);
}

export function useGameState(): GameSate {
  const [playField, setPlayField] = useState(initialPlayField);
  const [availableStones, setAvailableStones] = useState<string[]>([]);
  const [canPrePlacementBePlaced, setCanPrePlacementBePlaced] = useState(false);

  const playFieldSetFieldAtPos = useCallback(
    (row: number, col: number, letter: string) => {
      setPlayField((prevPlayfield) =>
        prevPlayfield.map(
          mapPlayfieldAndInsertAtCoordinates(
            { row, col },
            { letter: { letter, value: letterValues[letter] } },
          ),
        ),
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

  const removeAvailableStone = useCallback(
    (index: number) => {
      setAvailableStones((prevStones) => {
        const newArray = [...prevStones];
        newArray.splice(index, 1);
        return newArray;
      });
    },
    [setAvailableStones],
  );

  const placeStonePrePlacement = useCallback(
    (
      stone: LetterInfo,
      isAvailableStone: boolean,
      location: PlayfieldCoordinate,
      existingId?: string,
    ) => {
      if (existingId) {
        let stonePrePlacement: StonePrePlacement | undefined = undefined;
        setPlayField((prevState) =>
          prevState
            .map((rowObject) =>
              rowObject.map((colObject) => {
                if (
                  existingId &&
                  colObject.stonePrePlacement?.id === existingId
                ) {
                  stonePrePlacement = colObject.stonePrePlacement;
                  return {
                    ...colObject,
                    stonePrePlacement: undefined,
                  };
                } else {
                  return colObject;
                }
              }),
            )
            .map(
              mapPlayfieldAndInsertAtCoordinates(location, {
                stonePrePlacement,
              }),
            ),
        );
      } else {
        setPlayField((prevState) =>
          prevState.map(
            mapPlayfieldAndInsertAtCoordinates(location, {
              stonePrePlacement: {
                id: uuid4v(),
                letterInfo: stone,
                isAvailableStone,
              },
            }),
          ),
        );
      }
    },
    [setPlayField],
  );

  const revokeStones = useCallback(() => {
    const addToAvailableStones: string[] = [...availableStones];
    setPlayField(
      playField.map((rowObject) =>
        rowObject.map((colObject) => {
          if (colObject.stonePrePlacement !== undefined) {
            if (colObject.stonePrePlacement.isAvailableStone) {
              addToAvailableStones.push(
                colObject.stonePrePlacement.letterInfo.letter,
              );
            }
            return {
              ...colObject,
              stonePrePlacement: undefined,
            };
          } else {
            return colObject;
          }
        }),
      ),
    );
    setAvailableStones(addToAvailableStones);
  }, [playField, availableStones]);

  return {
    playField,
    availableStones,
    canPrePlacementBePlaced,
    playFieldSetFieldAtPos,
    addAvailableStone,
    removeAvailableStone,
    placeStonePrePlacement,
    revokeStones,
  };
}

function mapPlayfieldAndInsertAtCoordinates(
  location: PlayfieldCoordinate,
  insertObj: Partial<FieldInfo>,
) {
  return (rowObject: FieldInfo[], rowIndex: number) => {
    if (rowIndex === location.row) {
      return rowObject.map((colObject, colIndex) => {
        if (colIndex === location.col) {
          return {
            ...colObject,
            ...insertObj,
          };
        } else {
          return { ...colObject };
        }
      });
    } else {
      return [...rowObject];
    }
  };
}

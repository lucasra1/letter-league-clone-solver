import { LetterInfo } from "./letter";
import { Modifier } from "./modifier";
import { PlayfieldCoordinate } from "./common";

export interface FieldInfo {
  letter: LetterInfo | undefined;
  modifier: Modifier | undefined;
  location: PlayfieldCoordinate;
}

export function getFieldInfoOrUndefined(
  playfield: FieldInfo[][],
  rowIndex: number,
  colIndex: number,
): FieldInfo | undefined {
  if (
    rowIndex >= 0 &&
    rowIndex < playfield.length &&
    colIndex >= 0 &&
    colIndex < playfield[0].length
  ) {
    return playfield[rowIndex][colIndex];
  } else {
    return undefined;
  }
}

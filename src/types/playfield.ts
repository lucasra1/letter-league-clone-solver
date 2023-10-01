import { initialModifiers } from "./modifier";
import { FieldInfo } from "./gameField";

export const initialPlayField: FieldInfo[][] = (() => {
  const playfield: FieldInfo[][] = new Array(19);

  for (let i = 0; i < 19; i++) {
    playfield[i] = new Array(27);
  }

  for (let row = 0; row < 19; row++) {
    for (let col = 0; col < 27; col++) {
      playfield[row][col] = {
        location: {
          row: row,
          col: col,
        },
      } as FieldInfo;
    }
  }

  for (let i = 0; i < initialModifiers.length; i++) {
    const modifier = initialModifiers[i];
    playfield[modifier.location.row][modifier.location.col].modifier =
      modifier.modifier;
  }

  return playfield;
})();

import { ConnectingWord, englishWordsArray } from "./solver";
import { Direction, PlayfieldCoordinate } from "./common";
import { FieldInfo, getFieldInfoOrUndefined } from "./gameField";
import { Modifier } from "./modifier";
import { LetterInfo, letterValues } from "./letter";

export interface PlacementOption {
  word: string;
  start: PlayfieldCoordinate;
  end: PlayfieldCoordinate;
  connectingWord: ConnectingWord;
  points: number;
}

interface PartWordPlacementResolution {
  points: number;
  sideEffectPoints: number;
  wordmultiplier: number;
  borderLocation: PlayfieldCoordinate;
}

interface WordPlacementResolution {
  points: number;
  startLocation: PlayfieldCoordinate;
  endLocation: PlayfieldCoordinate;
}

interface LetterPlacementResolution {
  points: number;
  sideEffectPoints: number;
  wordmultiplier: number;
}

interface SideEffectPlacementResolution {
  points: number;
}

enum Level {
  HORIZONTAL,
  VERTICAL,
}

enum FieldFindingCondition {
  LETTERS,
  PRE_PLACEMENT_LETTERS,
  LETTERS_AND_PRE_PLACEMENT_LETTERS,
}

export async function getPlacementOptions(
  playfield: FieldInfo[][],
  connectingWords: ConnectingWord[],
  viableEnglishWords: Map<string, string[]>,
): Promise<PlacementOption[]> {
  let allPlacementOptions: PlacementOption[] = [];
  connectingWords.forEach((connectingWord) => {
    const viableEnglishWordsForConnectingWord = viableEnglishWords.get(
      connectingWord.word,
    );
    if (!viableEnglishWordsForConnectingWord) {
      return;
    }

    viableEnglishWordsForConnectingWord.forEach((englishWord) => {
      const foundOption = getPlacementOptionFromEnglishWord(
        playfield,
        connectingWord,
        englishWord,
      );
      if (foundOption) {
        allPlacementOptions = allPlacementOptions.concat(foundOption);
      }
    });
  });

  return allPlacementOptions;
}

function getPlacementOptionFromEnglishWord(
  playfield: FieldInfo[][],
  connectingWord: ConnectingWord,
  englishWord: string,
): PlacementOption[] | undefined {
  const placementOptions: PlacementOption[] = [];
  let startSearchingAtIndex = 0;
  while (startSearchingAtIndex < englishWord.length) {
    const indexOfConnectingWord = englishWord.indexOf(
      connectingWord.word,
      startSearchingAtIndex,
    );
    if (indexOfConnectingWord === -1) {
      break;
    }
    startSearchingAtIndex = indexOfConnectingWord + connectingWord.word.length;
    const beforeWord = englishWord.slice(0, indexOfConnectingWord);
    const afterWord = englishWord.slice(
      indexOfConnectingWord + connectingWord.word.length,
      englishWord.length,
    );

    const resolutionOfWord = wordPlacementResolutionOnPlayfield(
      playfield,
      connectingWord,
      beforeWord,
      afterWord,
    );
    if (resolutionOfWord) {
      placementOptions.push({
        points: resolutionOfWord.points,
        word: englishWord,
        connectingWord: connectingWord,
        start: resolutionOfWord.startLocation,
        end: resolutionOfWord.endLocation,
      });
    }
  }
  return placementOptions;
}

function wordPlacementResolutionOnPlayfield(
  playfield: FieldInfo[][],
  connectingWord: ConnectingWord,
  wordPlacedBefore: string,
  wordPlacedAfter: string,
): WordPlacementResolution | undefined {
  let beforeWordResolution: PartWordPlacementResolution | undefined = undefined;
  let afterWordResolution: PartWordPlacementResolution | undefined = undefined;
  if (connectingWord.word.length === 1) {
    // Connection Word is single letter

    const rowOfLetter = connectingWord.locationStart.row;
    const colOfLetter = connectingWord.locationStart.col;

    const topField = getFieldInfoOrUndefined(
      playfield,
      rowOfLetter - 1,
      colOfLetter,
    );
    const bottomField = getFieldInfoOrUndefined(
      playfield,
      rowOfLetter + 1,
      colOfLetter,
    );
    const leftField = getFieldInfoOrUndefined(
      playfield,
      rowOfLetter,
      colOfLetter - 1,
    );
    const rightField = getFieldInfoOrUndefined(
      playfield,
      rowOfLetter,
      colOfLetter + 1,
    );

    if (!topField?.letter && !bottomField?.letter) {
      // Vertical placement
      beforeWordResolution = canWordPartBePlacedInDirection(
        playfield,
        wordPlacedBefore,
        connectingWord.locationStart,
        Direction.UP,
      );
      afterWordResolution = canWordPartBePlacedInDirection(
        playfield,
        wordPlacedAfter,
        connectingWord.locationStart,
        Direction.DOWN,
      );
    } else if (!leftField?.letter && !rightField?.letter) {
      // Horizontal placement
      beforeWordResolution = canWordPartBePlacedInDirection(
        playfield,
        wordPlacedBefore,
        connectingWord.locationStart,
        Direction.LEFT,
      );
      afterWordResolution = canWordPartBePlacedInDirection(
        playfield,
        wordPlacedAfter,
        connectingWord.locationStart,
        Direction.RIGHT,
      );
    } else {
      // Something is wrong
      console.error(
        "Connection Word seems wrong? Cant place horizontally or vertically",
        connectingWord,
      );
    }
  } else {
    // Connection Word is longer
    if (connectingWord.locationStart.row === connectingWord.locationEnd.row) {
      // Connection Word is horizontal
      beforeWordResolution = canWordPartBePlacedInDirection(
        playfield,
        wordPlacedBefore,
        connectingWord.locationStart,
        Direction.LEFT,
      );
      afterWordResolution = canWordPartBePlacedInDirection(
        playfield,
        wordPlacedAfter,
        connectingWord.locationEnd,
        Direction.RIGHT,
      );
    } else {
      // Connection Word is vertical
      beforeWordResolution = canWordPartBePlacedInDirection(
        playfield,
        wordPlacedBefore,
        connectingWord.locationStart,
        Direction.UP,
      );
      afterWordResolution = canWordPartBePlacedInDirection(
        playfield,
        wordPlacedAfter,
        connectingWord.locationEnd,
        Direction.DOWN,
      );
    }
  }

  if (beforeWordResolution === undefined || afterWordResolution === undefined) {
    return undefined;
  }

  const sideEffectPoints =
    beforeWordResolution.sideEffectPoints +
    afterWordResolution.sideEffectPoints;
  const sumWordMultiplier =
    beforeWordResolution.wordmultiplier * afterWordResolution.wordmultiplier;
  const sumWordPoints =
    beforeWordResolution.points + afterWordResolution.points;
  return {
    points: sumWordPoints * sumWordMultiplier + sideEffectPoints,
    startLocation: beforeWordResolution.borderLocation,
    endLocation: afterWordResolution.borderLocation,
  };
}

function canWordPartBePlacedInDirection(
  playfield: FieldInfo[][],
  wordPart: string,
  locationStart: PlayfieldCoordinate,
  direction: Direction,
): PartWordPlacementResolution | undefined {
  const lettersOfWord = wordPart.split("");

  if (lettersOfWord.length === 0) {
    return {
      borderLocation: locationStart,
      points: 0,
      sideEffectPoints: 0,
      wordmultiplier: 1,
    };
  }

  let nextLetter = "";
  let nextLocation = locationStart;
  let nextWord: string = "";
  switch (direction) {
    case Direction.UP:
      nextLetter = lettersOfWord[lettersOfWord.length - 1];
      nextLocation = { row: locationStart.row - 1, col: locationStart.col };
      nextWord = wordPart.slice(0, wordPart.length - 1);
      break;
    case Direction.LEFT:
      nextLetter = lettersOfWord[lettersOfWord.length - 1];
      nextLocation = { row: locationStart.row, col: locationStart.col - 1 };
      nextWord = wordPart.slice(0, wordPart.length - 1);
      break;
    case Direction.DOWN:
      nextLetter = lettersOfWord[0];
      nextLocation = { row: locationStart.row + 1, col: locationStart.col };
      nextWord = wordPart.slice(1);
      break;
    case Direction.RIGHT:
      nextLetter = lettersOfWord[0];
      nextLocation = { row: locationStart.row, col: locationStart.col + 1 };
      nextWord = wordPart.slice(1);
      break;
  }

  const letterResolution = letterPlacementResolution(
    playfield,
    nextLetter,
    nextLocation,
    direction,
  );
  if (!letterResolution) {
    // Letter can't be placed
    return undefined;
  }

  const nextIteration = canWordPartBePlacedInDirection(
    playfield,
    nextWord,
    nextLocation,
    direction,
  );

  if (!nextIteration) {
    // Other words can't be placed
    return undefined;
  }

  return {
    borderLocation: nextIteration.borderLocation,
    points: nextIteration.points + letterResolution.points,
    sideEffectPoints:
      nextIteration.sideEffectPoints + letterResolution.sideEffectPoints,
    wordmultiplier:
      nextIteration.wordmultiplier * letterResolution.wordmultiplier,
  };
}

function letterPlacementResolution(
  playfield: FieldInfo[][],
  letter: string,
  location: PlayfieldCoordinate,
  direction: Direction,
): LetterPlacementResolution | undefined {
  const currentField = getFieldInfoOrUndefined(
    playfield,
    location.row,
    location.col,
  );
  if (!currentField || currentField.letter !== undefined) {
    // Field does not exist or letter is already present -> our letter can't be placed. so it is invalid
    return undefined;
  }

  let sideEffectResolution: SideEffectPlacementResolution | undefined;
  if (direction === Direction.UP || direction === Direction.DOWN) {
    // Check left and right
    sideEffectResolution = checkPlacementSideEffectCreatedWords(
      playfield,
      letter,
      location,
      Level.HORIZONTAL,
    );
  } else {
    // Check up and Down
    sideEffectResolution = checkPlacementSideEffectCreatedWords(
      playfield,
      letter,
      location,
      Level.VERTICAL,
    );
  }

  if (sideEffectResolution === undefined) {
    // SideEffect causes invalid word
    return undefined;
  }

  const letterValue = letterValues[letter];

  let letterMultiplier = 1;
  let wordmultiplier = 1;
  switch (currentField.modifier) {
    case Modifier.Word2:
      wordmultiplier = 2;
      break;
    case Modifier.Word3:
      wordmultiplier = 3;
      break;
    case Modifier.Letter2:
      letterMultiplier = 2;
      break;
    case Modifier.Letter3:
      letterMultiplier = 3;
      break;
  }
  return {
    points: letterMultiplier * letterValue,
    sideEffectPoints: sideEffectResolution.points,
    wordmultiplier,
  };
}

function checkPlacementSideEffectCreatedWords(
  playfield: FieldInfo[][],
  letter: string,
  location: PlayfieldCoordinate,
  level: Level,
): SideEffectPlacementResolution | undefined {
  let precedingField: FieldInfo | undefined;
  let succeedingField: FieldInfo | undefined;

  if (level === Level.HORIZONTAL) {
    precedingField = getFieldInfoOrUndefined(
      playfield,
      location.row,
      location.col - 1,
    );
    succeedingField = getFieldInfoOrUndefined(
      playfield,
      location.row,
      location.col + 1,
    );
  } else {
    precedingField = getFieldInfoOrUndefined(
      playfield,
      location.row - 1,
      location.col,
    );
    succeedingField = getFieldInfoOrUndefined(
      playfield,
      location.row + 1,
      location.col,
    );
  }

  if (!precedingField?.letter && !succeedingField?.letter) {
    // Preceding and Succeeding is clear of letters
    return {
      points: 0,
    };
  }

  return sideEffectWordResolution(playfield, letter, location, level);
}

function sideEffectWordResolution(
  playfield: FieldInfo[][],
  letter: string,
  location: PlayfieldCoordinate,
  level: Level,
): SideEffectPlacementResolution | undefined {
  let precedingFields: FieldInfo[];
  let succeedingFields: FieldInfo[];
  if (level === Level.HORIZONTAL) {
    precedingFields = getFieldInDirectionRecursively(
      playfield,
      { row: location.row, col: location.col - 1 },
      Direction.LEFT,
      FieldFindingCondition.LETTERS,
    );
    succeedingFields = getFieldInDirectionRecursively(
      playfield,
      { row: location.row, col: location.col + 1 },
      Direction.RIGHT,
      FieldFindingCondition.LETTERS,
    );
  } else {
    precedingFields = getFieldInDirectionRecursively(
      playfield,
      { row: location.row - 1, col: location.col },
      Direction.UP,
      FieldFindingCondition.LETTERS,
    );
    succeedingFields = getFieldInDirectionRecursively(
      playfield,
      { row: location.row + 1, col: location.col },
      Direction.DOWN,
      FieldFindingCondition.LETTERS,
    );
  }

  const precedingWord = precedingFields
    .reverse()
    .map((field) => field.letter?.letter)
    .join("");
  const succeedingWord = succeedingFields
    .map((field) => field.letter?.letter)
    .join("");

  const wholeWord = precedingWord + letter + succeedingWord;

  if (doesEnglishWordExist(wholeWord)) {
    const precedingWordValue = precedingFields.reduce(
      (prevVal, currentField) => prevVal + (currentField.letter?.value ?? 0),
      0,
    );
    const succeedingWordValue = succeedingFields.reduce(
      (prevVal, currentField) => prevVal + (currentField.letter?.value ?? 0),
      0,
    );
    return {
      points: precedingWordValue + succeedingWordValue,
    };
  } else {
    return undefined;
  }
}

function getFieldInDirectionRecursively(
  playfield: FieldInfo[][],
  location: PlayfieldCoordinate,
  direction: Direction,
  fieldFindingCondition: FieldFindingCondition,
): FieldInfo[] {
  const field = getFieldInfoOrUndefined(playfield, location.row, location.col);

  if (!field) {
    return [];
  }

  switch (fieldFindingCondition) {
    case FieldFindingCondition.LETTERS:
      if (field.letter === undefined) {
        return [];
      }
      break;
    case FieldFindingCondition.PRE_PLACEMENT_LETTERS:
      if (field.stonePrePlacement === undefined) {
        return [];
      }
      break;
    case FieldFindingCondition.LETTERS_AND_PRE_PLACEMENT_LETTERS:
      if (field.letter === undefined && field.stonePrePlacement === undefined) {
        return [];
      }
      break;
  }

  let newLocation: PlayfieldCoordinate | undefined = undefined;
  switch (direction) {
    case Direction.UP:
      newLocation = {
        row: location.row - 1,
        col: location.col,
      };
      break;
    case Direction.DOWN:
      newLocation = {
        row: location.row + 1,
        col: location.col,
      };
      break;
    case Direction.LEFT:
      newLocation = {
        row: location.row,
        col: location.col - 1,
      };
      break;
    case Direction.RIGHT:
      newLocation = {
        row: location.row,
        col: location.col + 1,
      };
      break;
  }

  return [
    field,
    ...getFieldInDirectionRecursively(
      playfield,
      newLocation,
      direction,
      fieldFindingCondition,
    ),
  ];
}

function doesEnglishWordExist(englishWord: string): boolean {
  return englishWordsArray.includes(englishWord);
}

function getLetterInfoFromField(
  field: FieldInfo,
  fieldFindingCondition: FieldFindingCondition,
): LetterInfo | undefined {
  switch (fieldFindingCondition) {
    case FieldFindingCondition.LETTERS:
      return field.letter;
    case FieldFindingCondition.PRE_PLACEMENT_LETTERS:
      return field.stonePrePlacement?.letterInfo;
    case FieldFindingCondition.LETTERS_AND_PRE_PLACEMENT_LETTERS:
      return field.letter || field.stonePrePlacement?.letterInfo;
  }
}

function getLetterInfoFromPlayfield(
  playField: FieldInfo[][],
  location: PlayfieldCoordinate,
  fieldFindingCondition: FieldFindingCondition,
): LetterInfo | undefined {
  const field = getFieldInfoOrUndefined(playField, location.row, location.col);
  if (!field) {
    return undefined;
  }
  return getLetterInfoFromField(field, fieldFindingCondition);
}

export function checkIfPrePlacementCanBePlacedOnPlayfield(
  playfield: FieldInfo[][],
): number | undefined {
  if (!arePrePlacementAllConnected(playfield)) {
    return undefined;
  }

  if (!areAllWordsOnBoardEnglishWords(playfield)) {
    return undefined;
  }
  // TODO check points for placement
  return 0;
}

function areAllWordsOnBoardEnglishWords(playfield: FieldInfo[][]): boolean {
  for (let rowIndex = 0; rowIndex < playfield.length; rowIndex++) {
    for (let colIndex = 0; colIndex < playfield[rowIndex].length; colIndex++) {
      const letter = getLetterInfoFromPlayfield(
        playfield,
        {
          row: rowIndex,
          col: colIndex,
        },
        FieldFindingCondition.LETTERS_AND_PRE_PLACEMENT_LETTERS,
      );
      if (letter !== undefined) {
        const leftLetter = getLetterInfoFromPlayfield(
          playfield,
          { row: rowIndex, col: colIndex - 1 },
          FieldFindingCondition.LETTERS_AND_PRE_PLACEMENT_LETTERS,
        );
        const rightLetter = getLetterInfoFromPlayfield(
          playfield,
          { row: rowIndex, col: colIndex + 1 },
          FieldFindingCondition.LETTERS_AND_PRE_PLACEMENT_LETTERS,
        );
        const topLetter = getLetterInfoFromPlayfield(
          playfield,
          { row: rowIndex - 1, col: colIndex },
          FieldFindingCondition.LETTERS_AND_PRE_PLACEMENT_LETTERS,
        );
        const bottomLetter = getLetterInfoFromPlayfield(
          playfield,
          { row: rowIndex + 1, col: colIndex },
          FieldFindingCondition.LETTERS_AND_PRE_PLACEMENT_LETTERS,
        );
        let allFieldsForWord: FieldInfo[] = [];
        if (leftLetter === undefined && rightLetter !== undefined) {
          allFieldsForWord = getFieldInDirectionRecursively(
            playfield,
            { row: rowIndex, col: colIndex },
            Direction.RIGHT,
            FieldFindingCondition.LETTERS_AND_PRE_PLACEMENT_LETTERS,
          );
        } else if (topLetter === undefined && bottomLetter !== undefined) {
          allFieldsForWord = getFieldInDirectionRecursively(
            playfield,
            { row: rowIndex, col: colIndex },
            Direction.DOWN,
            FieldFindingCondition.LETTERS_AND_PRE_PLACEMENT_LETTERS,
          );
        } else {
          continue;
        }
        const potentialEnglishWord = allFieldsForWord
          .map(
            (field) =>
              getLetterInfoFromField(
                field,
                FieldFindingCondition.LETTERS_AND_PRE_PLACEMENT_LETTERS,
              )?.letter,
          )
          .join("");
        if (!doesEnglishWordExist(potentialEnglishWord)) {
          return false;
        }
      }
    }
  }
  return true;
}

function arePrePlacementAllConnected(playfield: FieldInfo[][]): boolean {
  const fieldInfoOfAllPrePlacements: FieldInfo[] = [];
  playfield.forEach((rowObject) => {
    rowObject.forEach((colObject) => {
      if (colObject.stonePrePlacement !== undefined) {
        fieldInfoOfAllPrePlacements.push(colObject);
      }
    });
  });

  if (fieldInfoOfAllPrePlacements.length === 0) {
    return true;
  }

  let startingLocation = fieldInfoOfAllPrePlacements[0].location;
  let endingLocation = fieldInfoOfAllPrePlacements[0].location;
  fieldInfoOfAllPrePlacements.splice(0, 1);

  let remainingStones = fieldInfoOfAllPrePlacements.length;

  while (remainingStones > 0) {
    let foundStone = false;
    for (let i = 0; i < fieldInfoOfAllPrePlacements.length; i++) {
      const locationOfField = fieldInfoOfAllPrePlacements[i].location;
      if (
        !isLocationInLine(startingLocation, endingLocation, locationOfField)
      ) {
        return false;
      }
      if (isLocationNextTo(startingLocation, locationOfField)) {
        startingLocation = locationOfField;
        fieldInfoOfAllPrePlacements.splice(i, 1);
        remainingStones -= 1;
        foundStone = true;
      } else if (isLocationNextTo(endingLocation, locationOfField)) {
        endingLocation = locationOfField;
        fieldInfoOfAllPrePlacements.splice(i, 1);
        remainingStones -= 1;
        foundStone = true;
      }
    }
    if (!foundStone) {
      return false;
    }
  }
  return true;
}

function isLocationNextTo(
  locationA: PlayfieldCoordinate,
  locationB: PlayfieldCoordinate,
): boolean {
  if (
    locationA.row === locationB.row &&
    Math.abs(locationA.col - locationB.col) === 1
  ) {
    return true;
  } else if (
    locationA.col === locationB.col &&
    Math.abs(locationA.row - locationB.row) === 1
  ) {
    return true;
  }

  return false;
}

/**
 * Check if new location is in line. Does not check if next to
 *
 * @param startLocation
 * @param endLocation
 * @param newLocation
 */
function isLocationInLine(
  startLocation: PlayfieldCoordinate,
  endLocation: PlayfieldCoordinate,
  newLocation: PlayfieldCoordinate,
): boolean {
  if (
    startLocation.row === endLocation.row &&
    startLocation.col === endLocation.col
  ) {
    return (
      newLocation.row === startLocation.row ||
      newLocation.col === startLocation.col
    );
  }
  if (startLocation.row === endLocation.row) {
    // Horizontal
    return newLocation.row === startLocation.row;
  } else if (startLocation.col === endLocation.col) {
    // Vertical
    return newLocation.col === startLocation.col;
  } else {
    return false;
  }
}

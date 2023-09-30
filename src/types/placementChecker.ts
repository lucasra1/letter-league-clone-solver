import { ConnectingWord, englishWordsArray } from "./solver";
import { Direction, PlayfieldCoordinate } from "./common";
import { FieldInfo, getFieldInfoOrUndefined } from "./gameField";
import { Modifier } from "./modifier";
import { letterValues } from "./letter";

export interface PlacementOption {
  word: string;
  start: PlayfieldCoordinate;
  end: PlayfieldCoordinate;
  connectingWord: ConnectingWord;
  points: number;
}

interface PlacementResolution {
  points: number;
  wordmultiplier: number;
}

enum Level {
  HORIZONTAL,
  VERTICAL,
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
        points: resolutionOfWord.points * resolutionOfWord.wordmultiplier, // Todo probably not correct, because side effects should'nt be multiplied
        word: englishWord,
        connectingWord: connectingWord,
        start: {
          row: 0, // TODO correct location
          col: 0,
        },
        end: {
          row: 0,
          col: 0,
        },
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
): PlacementResolution | undefined {
  let beforeWordResolution: PlacementResolution | undefined = undefined;
  let afterWordResolution: PlacementResolution | undefined = undefined;
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

  return {
    points: beforeWordResolution.points + afterWordResolution.points,
    wordmultiplier:
      beforeWordResolution.wordmultiplier * afterWordResolution.wordmultiplier,
  };
}

function canWordPartBePlacedInDirection(
  playfield: FieldInfo[][],
  wordPart: string,
  locationStart: PlayfieldCoordinate,
  direction: Direction,
): PlacementResolution | undefined {
  const lettersOfWord = wordPart.split("");

  if (lettersOfWord.length === 0) {
    return {
      points: 0,
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
    points: nextIteration.points + letterResolution.points,
    wordmultiplier:
      nextIteration.wordmultiplier * letterResolution.wordmultiplier,
  };
}

function letterPlacementResolution(
  playfield: FieldInfo[][],
  letter: string,
  location: PlayfieldCoordinate,
  direction: Direction,
): PlacementResolution | undefined {
  const currentField = getFieldInfoOrUndefined(
    playfield,
    location.row,
    location.col,
  );
  if (!currentField || currentField.letter !== undefined) {
    // Field does not exist or letter is already present -> our letter can't be placed. so it is invalid
    return undefined;
  }

  let sideEffectResolution: PlacementResolution | undefined;
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
    points: sideEffectResolution.points + letterMultiplier * letterValue,
    wordmultiplier,
  };
}

function checkPlacementSideEffectCreatedWords(
  playfield: FieldInfo[][],
  letter: string,
  location: PlayfieldCoordinate,
  level: Level,
): PlacementResolution | undefined {
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
      wordmultiplier: 1,
    };
  }

  return sideEffectWordResolution(playfield, letter, location, level);
}

function sideEffectWordResolution(
  playfield: FieldInfo[][],
  letter: string,
  location: PlayfieldCoordinate,
  level: Level,
): PlacementResolution | undefined {
  let precedingFields: FieldInfo[];
  let succeedingFields: FieldInfo[];
  if (level === Level.HORIZONTAL) {
    precedingFields = getFieldInDirectionRecursively(
      playfield,
      location,
      Direction.LEFT,
    );
    succeedingFields = getFieldInDirectionRecursively(
      playfield,
      location,
      Direction.RIGHT,
    );
  } else {
    precedingFields = getFieldInDirectionRecursively(
      playfield,
      location,
      Direction.UP,
    );
    succeedingFields = getFieldInDirectionRecursively(
      playfield,
      location,
      Direction.DOWN,
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
      wordmultiplier: 1,
    };
  } else {
    return undefined;
  }
}

function getFieldInDirectionRecursively(
  playfield: FieldInfo[][],
  location: PlayfieldCoordinate,
  direction: Direction,
): FieldInfo[] {
  let nextField: FieldInfo | undefined = undefined;
  switch (direction) {
    case Direction.UP:
      nextField = getFieldInfoOrUndefined(
        playfield,
        location.row - 1,
        location.col,
      );
      break;
    case Direction.DOWN:
      nextField = getFieldInfoOrUndefined(
        playfield,
        location.row + 1,
        location.col,
      );
      break;
    case Direction.LEFT:
      nextField = getFieldInfoOrUndefined(
        playfield,
        location.row,
        location.col - 1,
      );
      break;
    case Direction.RIGHT:
      nextField = getFieldInfoOrUndefined(
        playfield,
        location.row,
        location.col + 1,
      );
      break;
  }

  if (!nextField) {
    return [];
  }

  return [
    nextField,
    ...getFieldInDirectionRecursively(playfield, nextField.location, direction),
  ];
}

function doesEnglishWordExist(englishWord: string): boolean {
  return englishWordsArray.includes(englishWord);
}

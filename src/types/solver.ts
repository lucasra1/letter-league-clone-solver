import { Direction, PlayfieldCoordinate } from "./common";
import { getPlacementOptions } from "./placementChecker";
import { FieldInfo, getFieldInfoOrUndefined } from "./gameField";

export let englishWordsArray: string[] = [];

export async function loadWordArray() {
  const response = await fetch(process.env.PUBLIC_URL + "/words_alpha.txt");
  const responseText = await response.text();
  englishWordsArray = responseText.split("\n").map((w) => w.toUpperCase());
}

export async function findBestWord(
  playfield: FieldInfo[][],
  availableStones: string[],
) {
  const connectingWords = await getConnectingWords(playfield);
  console.log(connectingWords);

  const connectingWordsDistinct = connectingWords.filter(
    (connectingWord, index, allConnectingWordsArray) =>
      allConnectingWordsArray.findIndex(
        (cW) => cW.word === connectingWord.word,
      ) === index,
  );

  console.log(connectingWordsDistinct);
  let englishWordsThatAreViable = new Map<string, string[]>();

  englishWordsArray.forEach((englishWord) => {
    connectingWordsDistinct.forEach((connectingWord) => {
      if (
        englishWord.includes(connectingWord.word) &&
        englishWord.length > connectingWord.word.length &&
        canWordBeFullfilledWithAvailableStones(
          englishWord,
          connectingWord.word,
          availableStones,
        )
      ) {
        if (englishWordsThatAreViable.has(connectingWord.word)) {
          englishWordsThatAreViable.get(connectingWord.word)?.push(englishWord);
        } else {
          englishWordsThatAreViable.set(connectingWord.word, [englishWord]);
        }
      }
    });
  });

  console.log(englishWordsThatAreViable);

  const allPlacementOptions = await getPlacementOptions(
    playfield,
    connectingWords,
    englishWordsThatAreViable,
  );

  allPlacementOptions.sort((a, b) => b.points - a.points);
  console.log(allPlacementOptions);
}

export interface ConnectingWord {
  word: string;
  locationStart: PlayfieldCoordinate;
  locationEnd: PlayfieldCoordinate;
}

/**
 * Get array of words where the new word will connect to
 *
 * @param playfield
 */
async function getConnectingWords(
  playfield: FieldInfo[][],
): Promise<ConnectingWord[]> {
  let allConnectingWords: ConnectingWord[] = [];
  for (let rowIndex = 0; rowIndex < playfield.length; rowIndex++) {
    for (let colIndex = 0; colIndex < playfield[rowIndex].length; colIndex++) {
      let currentField = playfield[rowIndex][colIndex];
      if (currentField.letter) {
        const left = getFieldInfoOrUndefined(playfield, rowIndex, colIndex - 1);
        const top = getFieldInfoOrUndefined(playfield, rowIndex - 1, colIndex);
        const right = getFieldInfoOrUndefined(
          playfield,
          rowIndex,
          colIndex + 1,
        );
        const bottom = getFieldInfoOrUndefined(
          playfield,
          rowIndex + 1,
          colIndex,
        );

        if (!left?.letter && right?.letter) {
          const rightConnectingWord = getConnectingWordInDirection(
            playfield,
            rowIndex,
            colIndex,
            Direction.RIGHT,
          );

          allConnectingWords.push(rightConnectingWord);
        }

        if (!top?.letter && bottom?.letter) {
          const bottomConnectingWord = getConnectingWordInDirection(
            playfield,
            rowIndex,
            colIndex,
            Direction.DOWN,
          );

          allConnectingWords.push(bottomConnectingWord);
        }

        if (!left?.letter && !right?.letter) {
          allConnectingWords.push({
            word: currentField.letter.letter,
            locationStart: {
              row: rowIndex,
              col: colIndex,
            },
            locationEnd: {
              row: rowIndex,
              col: colIndex,
            },
          });
        }

        if (!top?.letter && !bottom?.letter) {
          allConnectingWords.push({
            word: currentField.letter.letter,
            locationStart: {
              row: rowIndex,
              col: colIndex,
            },
            locationEnd: {
              row: rowIndex,
              col: colIndex,
            },
          });
        }
      }
    }
  }
  return allConnectingWords;
}

function getConnectingWordInDirection(
  playfield: FieldInfo[][],
  rowIndexStart: number,
  colIndexStart: number,
  direction: Direction,
): ConnectingWord {
  return connectWordInDirectionRecursively(
    playfield,
    {
      word: playfield[rowIndexStart][colIndexStart].letter?.letter ?? "",
      locationStart: {
        row: rowIndexStart,
        col: colIndexStart,
      },
      locationEnd: {
        row: rowIndexStart,
        col: colIndexStart,
      },
    },
    direction,
  );
}

function connectWordInDirectionRecursively(
  playfield: FieldInfo[][],
  currentWord: ConnectingWord,
  direction: Direction,
): ConnectingWord {
  switch (direction) {
    case Direction.DOWN:
      const nextFieldDown = getFieldInfoOrUndefined(
        playfield,
        currentWord.locationEnd.row + 1,
        currentWord.locationEnd.col,
      );
      if (nextFieldDown?.letter) {
        return connectWordInDirectionRecursively(
          playfield,
          {
            ...currentWord,
            word: (currentWord.word += nextFieldDown.letter.letter),
            locationEnd: nextFieldDown.location,
          },
          direction,
        );
      }
      break;
    case Direction.RIGHT:
      const nextFieldRight = getFieldInfoOrUndefined(
        playfield,
        currentWord.locationEnd.row,
        currentWord.locationEnd.col + 1,
      );
      if (nextFieldRight?.letter) {
        return connectWordInDirectionRecursively(
          playfield,
          {
            ...currentWord,
            word: (currentWord.word += nextFieldRight.letter.letter),
            locationEnd: nextFieldRight.location,
          },
          direction,
        );
      }
      break;
  }
  return currentWord;
}

function canWordBeFullfilledWithAvailableStones(
  englishWord: string,
  connectingWord: string,
  availableStones: string[],
): boolean {
  const englishWordWithoutConnectingWord = englishWord.replace(
    connectingWord,
    "",
  );
  const remainingStones = [...availableStones];

  const charArray = englishWordWithoutConnectingWord.split("");

  for (let i = 0; i < charArray.length; i++) {
    const char = charArray[i];
    const indexOfChar = remainingStones.indexOf(char);
    if (indexOfChar === -1) {
      return false;
    }
    remainingStones.splice(indexOfChar, 1);
  }

  return true;
}

import { PlayfieldCoordinate } from "./common";

interface InitialModifierLocation {
  location: PlayfieldCoordinate;
  modifier: Modifier;
}

export enum Modifier {
  Letter2,
  Letter3,
  Word2,
  Word3,
}

export const initialModifiers: InitialModifierLocation[] = [
  // ### Row 0
  {
    location: {
      row: 0,
      col: 3,
    },
    modifier: Modifier.Letter2,
  },
  {
    location: {
      row: 0,
      col: 6,
    },
    modifier: Modifier.Letter2,
  },
  {
    location: {
      row: 0,
      col: 8,
    },
    modifier: Modifier.Letter2,
  },
  {
    location: {
      row: 0,
      col: 11,
    },
    modifier: Modifier.Letter2,
  },
  {
    location: {
      row: 0,
      col: 15,
    },
    modifier: Modifier.Letter2,
  },
  {
    location: {
      row: 0,
      col: 18,
    },
    modifier: Modifier.Letter2,
  },
  {
    location: {
      row: 0,
      col: 20,
    },
    modifier: Modifier.Letter2,
  },
  {
    location: {
      row: 0,
      col: 23,
    },
    modifier: Modifier.Letter2,
  },
  // ### Row 1
  {
    location: {
      row: 1,
      col: 1,
    },
    modifier: Modifier.Letter2,
  },
  {
    location: {
      row: 1,
      col: 5,
    },
    modifier: Modifier.Word2,
  },
  {
    location: {
      row: 1,
      col: 9,
    },
    modifier: Modifier.Word2,
  },
  {
    location: {
      row: 1,
      col: 13,
    },
    modifier: Modifier.Letter2,
  },
  {
    location: {
      row: 1,
      col: 17,
    },
    modifier: Modifier.Word2,
  },
  {
    location: {
      row: 1,
      col: 21,
    },
    modifier: Modifier.Word2,
  },
  {
    location: {
      row: 1,
      col: 25,
    },
    modifier: Modifier.Letter2,
  },
  // #### Row 2
  {
    location: {
      row: 2,
      col: 4,
    },
    modifier: Modifier.Letter2,
  },
  {
    location: {
      row: 2,
      col: 6,
    },
    modifier: Modifier.Letter3,
  },
  {
    location: {
      row: 2,
      col: 8,
    },
    modifier: Modifier.Letter3,
  },
  {
    location: {
      row: 2,
      col: 10,
    },
    modifier: Modifier.Letter2,
  },
  {
    location: {
      row: 2,
      col: 16,
    },
    modifier: Modifier.Letter2,
  },
  {
    location: {
      row: 2,
      col: 18,
    },
    modifier: Modifier.Letter3,
  },
  {
    location: {
      row: 2,
      col: 20,
    },
    modifier: Modifier.Letter3,
  },
  {
    location: {
      row: 2,
      col: 22,
    },
    modifier: Modifier.Letter2,
  },
  // #### Row 3
  {
    location: {
      row: 3,
      col: 0,
    },
    modifier: Modifier.Letter2,
  },
  {
    location: {
      row: 3,
      col: 1,
    },
    modifier: Modifier.Word2,
  },
  {
    location: {
      row: 3,
      col: 2,
    },
    modifier: Modifier.Letter2,
  },
  {
    location: {
      row: 3,
      col: 7,
    },
    modifier: Modifier.Word3,
  },
  {
    location: {
      row: 3,
      col: 12,
    },
    modifier: Modifier.Letter2,
  },
  {
    location: {
      row: 3,
      col: 13,
    },
    modifier: Modifier.Word2,
  },
  {
    location: {
      row: 3,
      col: 14,
    },
    modifier: Modifier.Letter2,
  },
  {
    location: {
      row: 3,
      col: 19,
    },
    modifier: Modifier.Word3,
  },
  {
    location: {
      row: 3,
      col: 24,
    },
    modifier: Modifier.Letter2,
  },
  {
    location: {
      row: 3,
      col: 25,
    },
    modifier: Modifier.Word2,
  },
  {
    location: {
      row: 3,
      col: 26,
    },
    modifier: Modifier.Letter2,
  },
  // ### Row 4
  {
    location: {
      row: 4,
      col: 4,
    },
    modifier: Modifier.Letter2,
  },
  {
    location: {
      row: 4,
      col: 6,
    },
    modifier: Modifier.Letter3,
  },
  {
    location: {
      row: 4,
      col: 8,
    },
    modifier: Modifier.Letter3,
  },
  {
    location: {
      row: 4,
      col: 10,
    },
    modifier: Modifier.Letter2,
  },
  {
    location: {
      row: 4,
      col: 16,
    },
    modifier: Modifier.Letter2,
  },
  {
    location: {
      row: 4,
      col: 18,
    },
    modifier: Modifier.Letter3,
  },
  {
    location: {
      row: 4,
      col: 20,
    },
    modifier: Modifier.Letter3,
  },
  {
    location: {
      row: 4,
      col: 22,
    },
    modifier: Modifier.Letter2,
  },
  // #### Row 5
  {
    location: {
      row: 5,
      col: 1,
    },
    modifier: Modifier.Letter2,
  },
  {
    location: {
      row: 5,
      col: 5,
    },
    modifier: Modifier.Word2,
  },
  {
    location: {
      row: 5,
      col: 9,
    },
    modifier: Modifier.Word2,
  },
  {
    location: {
      row: 5,
      col: 13,
    },
    modifier: Modifier.Letter2,
  },
  {
    location: {
      row: 5,
      col: 17,
    },
    modifier: Modifier.Word2,
  },
  {
    location: {
      row: 5,
      col: 21,
    },
    modifier: Modifier.Word2,
  },
  {
    location: {
      row: 5,
      col: 25,
    },
    modifier: Modifier.Letter2,
  },
  // #### Row 6
  {
    location: {
      row: 6,
      col: 3,
    },
    modifier: Modifier.Letter2,
  },
  {
    location: {
      row: 6,
      col: 6,
    },
    modifier: Modifier.Letter2,
  },
  {
    location: {
      row: 6,
      col: 8,
    },
    modifier: Modifier.Letter2,
  },
  {
    location: {
      row: 6,
      col: 11,
    },
    modifier: Modifier.Letter2,
  },
  {
    location: {
      row: 6,
      col: 15,
    },
    modifier: Modifier.Letter2,
  },
  {
    location: {
      row: 6,
      col: 18,
    },
    modifier: Modifier.Letter2,
  },
  {
    location: {
      row: 6,
      col: 20,
    },
    modifier: Modifier.Letter2,
  },
  {
    location: {
      row: 6,
      col: 23,
    },
    modifier: Modifier.Letter2,
  },
  // #### Row 7
  {
    location: {
      row: 7,
      col: 4,
    },
    modifier: Modifier.Word2,
  },
  {
    location: {
      row: 7,
      col: 10,
    },
    modifier: Modifier.Word2,
  },
  {
    location: {
      row: 7,
      col: 16,
    },
    modifier: Modifier.Word2,
  },
  {
    location: {
      row: 7,
      col: 22,
    },
    modifier: Modifier.Word2,
  },
  // ### Row 8
  {
    location: {
      row: 8,
      col: 0,
    },
    modifier: Modifier.Letter3,
  },
  {
    location: {
      row: 8,
      col: 2,
    },
    modifier: Modifier.Letter3,
  },
  {
    location: {
      row: 8,
      col: 7,
    },
    modifier: Modifier.Letter2,
  },
  {
    location: {
      row: 8,
      col: 12,
    },
    modifier: Modifier.Letter3,
  },
  {
    location: {
      row: 8,
      col: 14,
    },
    modifier: Modifier.Letter3,
  },
  {
    location: {
      row: 8,
      col: 19,
    },
    modifier: Modifier.Letter2,
  },
  {
    location: {
      row: 8,
      col: 24,
    },
    modifier: Modifier.Letter3,
  },
  {
    location: {
      row: 8,
      col: 26,
    },
    modifier: Modifier.Letter3,
  },
  // #### Row 9
  {
    location: {
      row: 9,
      col: 3,
    },
    modifier: Modifier.Word2,
  },
  {
    location: {
      row: 9,
      col: 7,
    },
    modifier: Modifier.Word2,
  },
  {
    location: {
      row: 9,
      col: 11,
    },
    modifier: Modifier.Word2,
  },
  {
    location: {
      row: 9,
      col: 15,
    },
    modifier: Modifier.Word2,
  },
  {
    location: {
      row: 9,
      col: 19,
    },
    modifier: Modifier.Word2,
  },
  {
    location: {
      row: 9,
      col: 23,
    },
    modifier: Modifier.Word2,
  },
  // #### Row 10
  {
    location: {
      row: 10,
      col: 0,
    },
    modifier: Modifier.Letter3,
  },
  {
    location: {
      row: 10,
      col: 2,
    },
    modifier: Modifier.Letter3,
  },
  {
    location: {
      row: 10,
      col: 7,
    },
    modifier: Modifier.Letter2,
  },
  {
    location: {
      row: 10,
      col: 12,
    },
    modifier: Modifier.Letter3,
  },
  {
    location: {
      row: 10,
      col: 14,
    },
    modifier: Modifier.Letter3,
  },
  {
    location: {
      row: 10,
      col: 19,
    },
    modifier: Modifier.Letter2,
  },
  {
    location: {
      row: 10,
      col: 24,
    },
    modifier: Modifier.Letter3,
  },
  {
    location: {
      row: 10,
      col: 26,
    },
    modifier: Modifier.Letter3,
  },
  // #### Row 11
  {
    location: {
      row: 11,
      col: 4,
    },
    modifier: Modifier.Word2,
  },
  {
    location: {
      row: 11,
      col: 10,
    },
    modifier: Modifier.Word2,
  },
  {
    location: {
      row: 11,
      col: 16,
    },
    modifier: Modifier.Word2,
  },
  {
    location: {
      row: 11,
      col: 22,
    },
    modifier: Modifier.Word2,
  },
  // #### Row 12
  {
    location: {
      row: 12,
      col: 3,
    },
    modifier: Modifier.Letter2,
  },
  {
    location: {
      row: 12,
      col: 6,
    },
    modifier: Modifier.Letter2,
  },
  {
    location: {
      row: 12,
      col: 8,
    },
    modifier: Modifier.Letter2,
  },
  {
    location: {
      row: 12,
      col: 11,
    },
    modifier: Modifier.Letter2,
  },
  {
    location: {
      row: 12,
      col: 15,
    },
    modifier: Modifier.Letter2,
  },
  {
    location: {
      row: 12,
      col: 18,
    },
    modifier: Modifier.Letter2,
  },
  {
    location: {
      row: 12,
      col: 20,
    },
    modifier: Modifier.Letter2,
  },
  {
    location: {
      row: 12,
      col: 23,
    },
    modifier: Modifier.Letter2,
  },
  // ### Row 13
  {
    location: {
      row: 13,
      col: 1,
    },
    modifier: Modifier.Letter2,
  },
  {
    location: {
      row: 13,
      col: 5,
    },
    modifier: Modifier.Word2,
  },
  {
    location: {
      row: 13,
      col: 9,
    },
    modifier: Modifier.Word2,
  },
  {
    location: {
      row: 13,
      col: 13,
    },
    modifier: Modifier.Letter2,
  },
  {
    location: {
      row: 13,
      col: 17,
    },
    modifier: Modifier.Word2,
  },
  {
    location: {
      row: 13,
      col: 21,
    },
    modifier: Modifier.Word2,
  },
  {
    location: {
      row: 13,
      col: 25,
    },
    modifier: Modifier.Letter2,
  },
  // ### Row 14
  {
    location: {
      row: 14,
      col: 4,
    },
    modifier: Modifier.Letter2,
  },
  {
    location: {
      row: 14,
      col: 6,
    },
    modifier: Modifier.Letter3,
  },
  {
    location: {
      row: 14,
      col: 8,
    },
    modifier: Modifier.Letter3,
  },
  {
    location: {
      row: 14,
      col: 10,
    },
    modifier: Modifier.Letter2,
  },
  {
    location: {
      row: 14,
      col: 16,
    },
    modifier: Modifier.Letter2,
  },
  {
    location: {
      row: 14,
      col: 18,
    },
    modifier: Modifier.Letter3,
  },
  {
    location: {
      row: 14,
      col: 20,
    },
    modifier: Modifier.Letter3,
  },
  {
    location: {
      row: 14,
      col: 22,
    },
    modifier: Modifier.Letter2,
  },
  // ### Row 15
  {
    location: {
      row: 15,
      col: 0,
    },
    modifier: Modifier.Letter2,
  },
  {
    location: {
      row: 15,
      col: 1,
    },
    modifier: Modifier.Word2,
  },
  {
    location: {
      row: 15,
      col: 2,
    },
    modifier: Modifier.Letter2,
  },
  {
    location: {
      row: 15,
      col: 7,
    },
    modifier: Modifier.Word3,
  },
  {
    location: {
      row: 15,
      col: 12,
    },
    modifier: Modifier.Letter2,
  },
  {
    location: {
      row: 15,
      col: 13,
    },
    modifier: Modifier.Word2,
  },
  {
    location: {
      row: 15,
      col: 14,
    },
    modifier: Modifier.Letter2,
  },
  {
    location: {
      row: 15,
      col: 19,
    },
    modifier: Modifier.Word3,
  },
  {
    location: {
      row: 15,
      col: 24,
    },
    modifier: Modifier.Letter2,
  },
  {
    location: {
      row: 15,
      col: 25,
    },
    modifier: Modifier.Word2,
  },
  {
    location: {
      row: 15,
      col: 26,
    },
    modifier: Modifier.Letter2,
  },
  // ### Row 16
  {
    location: {
      row: 16,
      col: 4,
    },
    modifier: Modifier.Letter2,
  },
  {
    location: {
      row: 16,
      col: 6,
    },
    modifier: Modifier.Letter3,
  },
  {
    location: {
      row: 16,
      col: 8,
    },
    modifier: Modifier.Letter3,
  },
  {
    location: {
      row: 16,
      col: 10,
    },
    modifier: Modifier.Letter2,
  },
  {
    location: {
      row: 16,
      col: 16,
    },
    modifier: Modifier.Letter2,
  },
  {
    location: {
      row: 16,
      col: 18,
    },
    modifier: Modifier.Letter3,
  },
  {
    location: {
      row: 16,
      col: 20,
    },
    modifier: Modifier.Letter3,
  },
  {
    location: {
      row: 16,
      col: 22,
    },
    modifier: Modifier.Letter2,
  },
  // #### Row 17
  {
    location: {
      row: 17,
      col: 1,
    },
    modifier: Modifier.Letter2,
  },
  {
    location: {
      row: 17,
      col: 5,
    },
    modifier: Modifier.Word2,
  },
  {
    location: {
      row: 17,
      col: 9,
    },
    modifier: Modifier.Word2,
  },
  {
    location: {
      row: 17,
      col: 13,
    },
    modifier: Modifier.Letter2,
  },
  {
    location: {
      row: 17,
      col: 17,
    },
    modifier: Modifier.Word2,
  },
  {
    location: {
      row: 17,
      col: 21,
    },
    modifier: Modifier.Word2,
  },
  {
    location: {
      row: 17,
      col: 25,
    },
    modifier: Modifier.Letter2,
  },
  // #### Row 18
  {
    location: {
      row: 18,
      col: 3,
    },
    modifier: Modifier.Letter2,
  },
  {
    location: {
      row: 18,
      col: 6,
    },
    modifier: Modifier.Letter2,
  },
  {
    location: {
      row: 18,
      col: 8,
    },
    modifier: Modifier.Letter2,
  },
  {
    location: {
      row: 18,
      col: 11,
    },
    modifier: Modifier.Letter2,
  },
  {
    location: {
      row: 18,
      col: 15,
    },
    modifier: Modifier.Letter2,
  },
  {
    location: {
      row: 18,
      col: 18,
    },
    modifier: Modifier.Letter2,
  },
  {
    location: {
      row: 18,
      col: 20,
    },
    modifier: Modifier.Letter2,
  },
  {
    location: {
      row: 18,
      col: 23,
    },
    modifier: Modifier.Letter2,
  },
];

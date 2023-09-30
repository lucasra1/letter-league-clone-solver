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
  {
    location: {
      row: 1,
      col: 1,
    },
    modifier: Modifier.Letter2,
  },
];

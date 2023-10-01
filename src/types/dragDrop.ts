import { LetterInfo } from "./letter";

export const DndItemTypes = {
  AVAILABLE_STONE: "available_stone",
};

export type DndAvailableStoneType = {
  letterInfo: LetterInfo;
  id?: string;
  indexInHolder?: number;
};

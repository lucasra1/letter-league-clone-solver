import { ModifierField } from "./ModifierField";
import LetterStone from "./letterStones/LetterStone";
import { FieldInfo } from "../types/gameField";
import { useDrop } from "react-dnd";
import { DndAvailableStoneType, DndItemTypes } from "../types/dragDrop";
import { useGameStateContext } from "../types/Game";
import PrePlacementLetterStone from "./letterStones/PrePlacementLetterStone";

interface Props {
  fieldInfo: FieldInfo;
}

export function GameField({ fieldInfo }: Props) {
  const gameState = useGameStateContext();
  const [{ isOver }, drop] = useDrop(() => ({
    accept: DndItemTypes.AVAILABLE_STONE,
    drop: (item: DndAvailableStoneType, monitor) => {
      console.log(item);
      if (item.indexInHolder !== undefined) {
        gameState?.removeAvailableStone(item.indexInHolder);
      }
      gameState?.placeStonePrePlacement(
        item.letterInfo,
        fieldInfo.location,
        item.id,
      );
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <>
      <div
        className={`relative w-12 h-12 bg-amber-200`}
        ref={(refElement) => {
          drop(refElement);
        }}
      >
        {fieldInfo.modifier !== undefined && (
          <div className="absolute w-full h-full">
            <ModifierField modifier={fieldInfo.modifier} />
          </div>
        )}
        {fieldInfo.letter && <LetterStone letterInfo={fieldInfo.letter} />}
        {fieldInfo.stonePrePlacement && (
          <PrePlacementLetterStone
            letterInfo={fieldInfo.stonePrePlacement.letterInfo}
            id={fieldInfo.stonePrePlacement.id}
          />
        )}
        {isOver && (
          <div className="absolute w-full h-full bg-black bg-opacity-60 top-0 left-0" />
        )}
      </div>
    </>
  );
}

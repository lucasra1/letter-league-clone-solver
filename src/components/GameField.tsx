import { ModifierField } from "./ModifierField";
import LetterStone from "./letterStones/LetterStone";
import { FieldInfo } from "../types/gameField";
import { useDrop } from "react-dnd";
import { DndItemTypes } from "../types/dragDrop";

interface Props {
  fieldInfo: FieldInfo;
}

export function GameField({ fieldInfo }: Props) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: DndItemTypes.AVAILABLE_STONE,
    drop: (item) => {},
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
        {isOver && (
          <div className="absolute w-full h-full bg-black bg-opacity-60 top-0 left-0" />
        )}
      </div>
    </>
  );
}

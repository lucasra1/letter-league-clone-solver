import StoneChooserPopup from "./StoneChooserPopup";
import { useState } from "react";
import { useGameStateContext } from "../types/Game";
import { letterValues } from "../types/letter";
import AvailableLetterStone from "./letterStones/AvailableLetterStone";
import { useDrop } from "react-dnd";
import { DndAvailableStoneType, DndItemTypes } from "../types/dragDrop";

interface Props {
  availableStones: string[];
}

export default function AvailableStonesHolder({ availableStones }: Props) {
  const [referenceElement, setReferenceElement] =
    useState<HTMLDivElement | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const gameStateContext = useGameStateContext();

  const [{ isHoveringAvailableStone }, availableStoneDropZone] = useDrop(
    () => ({
      accept: DndItemTypes.AVAILABLE_STONE,
      canDrop: (item: DndAvailableStoneType) => {
        return !!item.id;
      },
      drop: (item: DndAvailableStoneType) => {
        gameStateContext?.addAvailableStone(item.letterInfo.letter);
        if (item.id) {
          gameStateContext?.removeStonePrePlacement(item.id);
        }
      },
      collect: (monitor) => ({
        isHoveringAvailableStone: monitor.isOver() && monitor.canDrop(),
      }),
    }),
  );

  return (
    <div className="flex flex-col gap-2 fixed bottom-1 left-1/2 -translate-x-1/2">
      <div className="flex justify-center gap-4">
        <button
          className="rounded bg-green-500 py-1 px-3 text-xl text-white shadow disabled:bg-gray-700 disabled:bg-opacity-70"
          disabled={gameStateContext?.prePlacementPotentialPoints === undefined}
        >
          Place
        </button>
        <button
          className="rounded bg-green-500 py-1 px-3 text-xl text-white shadow"
          onClick={() => {
            gameStateContext?.revokeStones();
          }}
        >
          Revoke Stones
        </button>
      </div>
      <div
        ref={availableStoneDropZone}
        className={`bg-black bg-opacity-60 rounded px-2 py-1 flex justify-center min-w-[200px] ${
          isHoveringAvailableStone ? "scale-105" : ""
        }`}
      >
        {availableStones.map((stone, index) => (
          <AvailableLetterStone
            key={`${stone}-${index}`}
            indexInHolder={index}
            letterInfo={{
              letter: stone,
              value: letterValues[stone],
            }}
          />
        ))}
        <div
          ref={setReferenceElement}
          onClick={() => setShowPopup(true)}
          className="w-12 h-12 bg-white border border-black rounded shadow-sm flex justify-center items-center relative select-none hover:scale-105 cursor-pointer"
        >
          <span className="text-2xl leading-none">+</span>
        </div>
      </div>
      {showPopup && (
        <StoneChooserPopup
          referenceElement={referenceElement}
          onClose={() => setShowPopup(false)}
          onChoseStone={(stone) => {
            gameStateContext?.addAvailableStone?.(stone);
          }}
        />
      )}
    </div>
  );
}

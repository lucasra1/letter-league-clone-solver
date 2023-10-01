import StoneChooserPopup from "./StoneChooserPopup";
import { useState } from "react";
import { useAddAvailableStone } from "../types/Game";
import { letterValues } from "../types/letter";
import AvailableLetterStone from "./letterStones/AvailableLetterStone";

interface Props {
  availableStones: string[];
}

export default function AvailableStonesHolder({ availableStones }: Props) {
  const [referenceElement, setReferenceElement] =
    useState<HTMLDivElement | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const addAvailableStone = useAddAvailableStone();

  return (
    <>
      <div className="fixed bottom-1 left-1/2 -translate-x-1/2 bg-black bg-opacity-60 rounded px-2 py-1 flex justify-center min-w-[200px]">
        {availableStones.map((stone, index) => (
          <AvailableLetterStone
            key={`${stone}-${index}`}
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
            addAvailableStone?.(stone);
          }}
        />
      )}
    </>
  );
}

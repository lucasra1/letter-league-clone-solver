import { letterValues } from "../types/letter";
import LetterStone from "./LetterStone";
import useComponentVisible from "../hooks/clickOutsideHook";
import { useState } from "react";
import { usePopper } from "react-popper";

interface Props {
  onChoseStone?: (stone: string) => void;
  referenceElement: HTMLElement | null;
  onClose?: () => void;
}
export default function StoneChooserPopup({
  onChoseStone,
  referenceElement,
  onClose,
}: Props) {
  const [ref, showPopup, setShowPopup] = useComponentVisible<HTMLDivElement>(
    true,
    () => {
      onClose?.();
    },
  );
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null,
  );
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [],
  });

  return (
    <>
      {showPopup && (
        <div
          className="bg-white rounded shadow-xl px-4 py-2 flex flex-wrap justify-center gap-1 max-w-2xl"
          ref={(reference) => {
            ref.current = reference;
            setPopperElement(reference);
          }}
          style={styles.popper}
          {...attributes.popper}
        >
          {Object.keys(letterValues).map((key) => (
            <LetterStone
              letterInfo={{
                letter: key,
                value: letterValues[key],
              }}
              key={key}
              onClick={() => {
                onChoseStone?.(key);
                onClose?.();
                setShowPopup(false);
              }}
            />
          ))}
        </div>
      )}
    </>
  );
}

import { ModifierField } from "./ModifierField";
import LetterStone from "./LetterStone";
import { useState } from "react";
import { usePopper } from "react-popper";
import useComponentVisible from "../hooks/clickOutsideHook";
import { usePlayFieldSetFieldAtPos } from "../types/Game";
import { FieldInfo } from "../types/gameField";

interface Props {
  fieldInfo: FieldInfo;
}

export function GameField({ fieldInfo }: Props) {
  const [ref, showPopup, setShowPopup] =
    useComponentVisible<HTMLDivElement>(false);
  const [referenceElement, setReferenceElement] =
    useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null,
  );
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [],
  });
  const [letter, setLetter] = useState("");
  const setFieldAtPos = usePlayFieldSetFieldAtPos();

  return (
    <>
      <div
        className={`relative w-12 h-12 ${
          showPopup ? "bg-amber-400" : "bg-amber-200"
        }`}
        ref={setReferenceElement}
        onClick={() => {
          setShowPopup(true);
        }}
      >
        {fieldInfo.modifier !== undefined && (
          <div className="absolute w-full h-full">
            <ModifierField modifier={fieldInfo.modifier} />
          </div>
        )}
        {fieldInfo.letter && <LetterStone letterInfo={fieldInfo.letter} />}
      </div>

      {showPopup && (
        <div
          ref={(node) => {
            ref.current = node;
            setPopperElement(node);
          }}
          className="z-10 absolute bg-white rounded shadow px-2 py-1"
          style={styles.popper}
          {...attributes.popper}
        >
          <input
            value={letter}
            onChange={(event) => setLetter(event.target.value.toUpperCase())}
            maxLength={1}
          />
          <button
            onClick={() =>
              setFieldAtPos?.(
                fieldInfo.location.row,
                fieldInfo.location.col,
                letter,
              )
            }
          >
            Add
          </button>
        </div>
      )}
    </>
  );
}

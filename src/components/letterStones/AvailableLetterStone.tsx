import LetterStone, { Props } from "./LetterStone";
import { useDrag } from "react-dnd";
import { DndAvailableStoneType, DndItemTypes } from "../../types/dragDrop";

export default function AvailableLetterStone({
  indexInHolder,
  ...props
}: Props & { indexInHolder: number }) {
  const [, drag] = useDrag(() => ({
    type: DndItemTypes.AVAILABLE_STONE,
    item: {
      letterInfo: props.letterInfo,
      indexInHolder,
    } as DndAvailableStoneType,
  }));

  return <LetterStone ref={drag} {...props} />;
}

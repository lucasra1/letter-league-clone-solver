import LetterStone, { Props } from "./LetterStone";
import { useDrag } from "react-dnd";
import { DndAvailableStoneType, DndItemTypes } from "../../types/dragDrop";

export default function PrePlacementLetterStone({
  id,
  ...props
}: Props & { id: string }) {
  const [, drag] = useDrag(() => ({
    type: DndItemTypes.AVAILABLE_STONE,
    item: { letterInfo: props.letterInfo, id } as DndAvailableStoneType,
  }));

  return <LetterStone ref={drag} {...props} />;
}

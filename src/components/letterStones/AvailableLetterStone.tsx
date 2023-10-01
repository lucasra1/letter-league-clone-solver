import LetterStone, { Props } from "./LetterStone";
import { useDrag } from "react-dnd";
import { DndItemTypes } from "../../types/dragDrop";

export default function AvailableLetterStone(props: Props) {
  const [, drag] = useDrag(() => ({
    type: DndItemTypes.AVAILABLE_STONE,
    item: props.letterInfo,
  }));

  return <LetterStone ref={drag} {...props} />;
}

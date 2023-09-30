import { Modifier } from "../types/modifier";

interface Props {
  modifier: Modifier;
}

export function ModifierField({ modifier }: Props) {
  switch (modifier) {
    case Modifier.Letter2:
      return (
        <div className="w-full h-full bg-blue-400 flex justify-center items-center">
          <span className="text-blue-600 text-2xl">2L</span>
        </div>
      );
    default:
      return null;
  }
}

import { Modifier } from "../types/modifier";

interface Props {
  modifier: Modifier;
}

export function ModifierField({ modifier }: Props) {
  switch (modifier) {
    case Modifier.Letter2:
      return (
        <div className="w-full h-full bg-blue-400 flex justify-center items-center select-none">
          <span className="text-blue-600 text-2xl">2L</span>
        </div>
      );
    case Modifier.Letter3:
      return (
        <div className="w-full h-full bg-amber-400 flex justify-center items-center select-none">
          <span className="text-amber-600 text-2xl">3L</span>
        </div>
      );
    case Modifier.Word2:
      return (
        <div className="w-full h-full bg-green-400 flex justify-center items-center select-none">
          <span className="text-green-600 text-2xl">2W</span>
        </div>
      );
    case Modifier.Word3:
      return (
        <div className="w-full h-full bg-red-400 flex justify-center items-center select-none">
          <span className="text-red-600 text-2xl">3W</span>
        </div>
      );
    default:
      return null;
  }
}

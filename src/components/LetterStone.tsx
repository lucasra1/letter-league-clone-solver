import { LetterInfo } from "../types/letter";

interface Props {
  letter: LetterInfo;
}

export default function LetterStone({ letter }: Props) {
  return (
    <div className="w-full h-full bg-white border border-black rounded shadow-sm flex justify-center items-center relative">
      <span className="text-2xl">{letter.letter}</span>
      <span className="absolute right-1 top-1 leading-none">
        {letter.value}
      </span>
    </div>
  );
}

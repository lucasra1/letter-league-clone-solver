import { LetterInfo } from "../types/letter";

interface Props {
  letterInfo: LetterInfo;
  onClick?: () => void;
}

export default function LetterStone({ letterInfo, onClick }: Props) {
  const isClickable = !!onClick;
  return (
    <div
      className={`w-12 h-12 bg-white border border-black rounded shadow-sm flex justify-center items-center relative select-none ${
        isClickable ? "hover:scale-105 cursor-pointer" : ""
      }`}
      onClick={onClick}
    >
      <span className="text-2xl">{letterInfo.letter}</span>
      <span className="absolute right-1 top-1 leading-none">
        {letterInfo.value}
      </span>
    </div>
  );
}

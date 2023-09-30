import { GameField } from "./GameField";
import { FieldInfo } from "../types/gameField";

interface Props {
  fields: FieldInfo[][];
}

export function Playfield({ fields }: Props) {
  return (
    <div className="flex flex-col gap-0.5">
      {fields.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} className="flex gap-0.5">
          {row.map((field, colIndex) => (
            <GameField
              fieldInfo={field}
              key={`${field.letter}-${field.modifier}-${rowIndex}-${colIndex}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

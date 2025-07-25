import { useEffect, useRef, useState } from "react";
import { useAppSelector } from '../../../app/redux/hooks';

export const MoveContainer: React.FC = () => {
  const moves = useAppSelector((state) => state.game.moves);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  // Group moves: 2 full moves (4 half-moves) per row, but only render existing moves
  const rows: Array<{
    num1: number;
    white1?: string;
    black1?: string;
    num2?: number;
    white2?: string;
    black2?: string;
  }> = [];
  let i = 0;
  let moveNum = 1;
  while (i < moves.length) {
    const row: any = { num1: moveNum };
    if (moves[i]?.color === "w") {
      row.white1 = moves[i].san;
      i++;
    }
    if (i < moves.length && moves[i]?.color === "b") {
      row.black1 = moves[i].san;
      i++;
    }
    if (i < moves.length && moves[i]?.color === "w") {
      row.num2 = moveNum + 1;
      row.white2 = moves[i].san;
      i++;
    }
    if (i < moves.length && moves[i]?.color === "b") {
      row.black2 = moves[i].san;
      i++;
    }
    rows.push(row);
    moveNum += 2;
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [moves]);

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
      <div
        ref={scrollRef}
        className="min-h-60 max-h-60 overflow-y-auto invisible-scrollbar"
      >
        <div className="divide-y divide-white/5">
          {rows.map((row, index) => (
            <div
              key={index}
              className={`flex flex-row gap-4 px-8 py-3 transition-all duration-200
                hover:bg-white/10 cursor-pointer
                ${hoveredRow === index ? "bg-white/10 shadow-lg" : ""}
                ${index % 2 === 0 ? "bg-white/2" : ""}`}
              onMouseEnter={() => setHoveredRow(index)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              {/* num1 and white1/black1 */}
              {row.num1 && (
                <div className="text-white/60 font-bold text-sm flex items-center justify-center min-w-[2ch]">
                  {`${row.num1}.`}
                </div>
              )}
              {row.white1 && (
                <div className="text-center text-white font-semibold bg-white/5 rounded-lg py-1 px-2 border border-white/10 min-w-[8ch]">
                  {row.white1}
                </div>
              )}
              {row.black1 && (
                <div className="text-center text-white font-semibold bg-black/20 rounded-lg py-1 px-2 border border-white/10 min-w-[8ch]">
                  {row.black1}
                </div>
              )}
              {/* num2 and white2/black2 */}
              {row.num2 && (
                <div className="text-white/60 font-bold text-sm flex items-center justify-center min-w-[2ch]">
                  {`${row.num2}.`}
                </div>
              )}
              {row.white2 && (
                <div className="text-center text-white font-semibold bg-white/5 rounded-lg py-1 px-2 border border-white/10 min-w-[8ch]">
                  {row.white2}
                </div>
              )}
              {row.black2 && (
                <div className="text-center text-white font-semibold bg-black/20 rounded-lg py-1 px-2 border border-white/10 min-w-[8ch]">
                  {row.black2}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

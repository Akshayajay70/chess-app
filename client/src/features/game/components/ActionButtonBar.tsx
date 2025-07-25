import { Button } from "./Button";

interface ActionButtonBarProps {
  onPrev: () => void;
  onNext: () => void;
  onResign: () => void;
  onOfferDraw: () => void;
}

export const ActionButtonBar: React.FC<ActionButtonBarProps> = ({
  onPrev,
  onNext,
  onResign,
  onOfferDraw,
}) => {
  return (
    <div className="flex items-center justify-between h-full
                  bg-slate-700 bg-opacity-80 rounded-2xl shadow-2xl p-4
                  border border-white/10">

      {/* Previous Move */}
      <button
        onClick={onPrev}
        className="group p-3 rounded-xl bg-white/10 
                     border border-white/10"
        aria-label="Previous Move"
      >
        <svg
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 24 24"
          className="text-white/80 group-hover:text-white transition-colors"
        >
          <path
            d="M15 6l-6 6 6 6"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Middle Actions */}
      <div className="flex gap-3">
        <Button
          text="Resign"
          color="danger"
          onClick={onResign}
          size="sm"
          className=""
        />
        <Button
          text="Offer Draw"
          color="primary"
          onClick={onOfferDraw}
          size="sm"
          className=""
        />
      </div>

      {/* Next Move */}
      <button
        onClick={onNext}
        className="group p-3 rounded-xl bg-white/10 
                     border border-white/10"
        aria-label="Next Move"
      >
        <svg
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 24 24"
          className="text-white/80 group-hover:text-white transition-colors"
        >
          <path
            d="M9 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};
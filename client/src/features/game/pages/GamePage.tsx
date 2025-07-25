import { ActionButtonBar } from "../components/ActionButtonBar";
import { MoveContainer } from "../components/MoveContainer";
import { PlayerCard } from "../components/PlayerCard";
import { ChessBoard } from "../components/ChessBoard";

export function GamePage() {
  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 to-slate-800 grid grid-cols-12 overflow-hidden">
      {/* { Chessboard Section } */}
      <div className="col-span-8 m-auto">
        <div className="bg-slate-700 bg-opacity-80 rounded-2xl shadow-2xl p-6 flex justify-center items-center">
          <ChessBoard />
        </div>
      </div>
      {/* { Right section } */}
      <div className="col-span-4 grid grid-rows-12 mr-10">
        <div className="row-span-3 my-auto">
          <PlayerCard />
        </div>
        <div className="row-span-4">
          <MoveContainer />
        </div>
        <div className="row-span-3 my-auto">
          <PlayerCard />
        </div>
        <div className="row-span-2 my-auto">
          <div className="bg-white/20 backdrop-blur-md rounded-2xl shadow-lg p-4 border border-white/30">
            <ActionButtonBar
              onNext={() => console.log()}
              onPrev={() => console.log()}
              onOfferDraw={() => { }}
              onResign={() => { }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

import { ActionButtonBar } from "../components/ActionButtonBar";
import { MoveContainer } from "../components/MoveContainer";
import { PlayerCard } from "../components/PlayerCard";
import { ChessBoard } from "../components/ChessBoard";
import { useAppSelector, useAppDispatch } from '../../../app/redux/hooks';
import { setGameState, setTurn, setCurrentPlayer, setOpponent } from '../../../app/redux/slices/game.slice';

interface PlayerCardProps {
  position: 'top' | 'bottom';
}

export function GamePage() {
  const gameState = useAppSelector(state => state.game);
  const matchMakingState = useAppSelector(state => state.matchMaking);
  const dispatch = useAppDispatch();
  
  // Debug logging
  console.log('GamePage Debug:', {
    gameState,
    matchMakingState
  });

  // Temporary function to simulate a match for testing
  const simulateMatch = () => {
    dispatch(setGameState({
      matchRoomId: 'test-match-123',
      players: [
        { gameId: 'player1', name: 'Player 1', rating: 1500 },
        { gameId: 'player2', name: 'Player 2', rating: 1500 }
      ],
      variant: 'blitz(3+2)',
      status: 'ongoing',
      moves: []
    }));
    dispatch(setTurn(true)); // Make it your turn
    dispatch(setCurrentPlayer({ gameId: 'player1', name: 'Player 1', rating: 1500 }));
    dispatch(setOpponent({ gameId: 'player2', name: 'Player 2', rating: 1500 }));
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 to-slate-800 grid grid-cols-12 overflow-hidden">
      {/* Debug button - remove this later */}
      {!gameState.matchRoomId && (
        <div className="absolute top-4 left-4 z-50">
          <button 
            onClick={simulateMatch}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Simulate Match (Debug)
          </button>
        </div>
      )}
      
      {/* { Chessboard Section } */}
      <div className="col-span-8 m-auto">
        <div className="bg-slate-700 bg-opacity-80 rounded-2xl shadow-2xl p-6 flex justify-center items-center">
          <ChessBoard />
        </div>
      </div>
      {/* { Right section } */}
      <div className="col-span-4 grid grid-rows-12 mr-10">
        <div className="row-span-3 my-auto">
          <PlayerCard position="top" />
        </div>
        <div className="row-span-4">
          <MoveContainer />
        </div>
        <div className="row-span-3 my-auto">
          <PlayerCard position="bottom" />
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

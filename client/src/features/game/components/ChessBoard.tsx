import { Chessboard } from 'react-chessboard';
import { Chess, type Square } from 'chess.js';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/redux/hooks';
import { addMove, setTurn } from '../../../app/redux/slices/game.slice';

export function ChessBoard() {
    const [game, setGame] = useState(new Chess());
    const [highlightedSquares, setHighlightedSquares] = useState({});
    const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
    const dispatch = useAppDispatch();
    
    const { moves, isMyTurn, status, matchRoomId, players } = useAppSelector(state => state.game);
    const currentUser = useAppSelector(state => state.userAuth.user);

    // Debug logging
    console.log('ChessBoard Debug:', {
        moves,
        isMyTurn,
        status,
        matchRoomId,
        players,
        currentUser,
        gameFen: game.fen(),
        gameHistory: game.history()
    });

    // Sync local game state with Redux moves
    useEffect(() => {
        const newGame = new Chess();
        moves.forEach(move => {
            try {
                newGame.move(move.san);
            } catch (error) {
                console.error('Invalid move:', move.san);
            }
        });
        setGame(newGame);
    }, [moves]);

    const onDrop = (sourceSquare: string, targetSquare: string) => {
        // Check if it's the player's turn
        if (!isMyTurn) {
            console.log('Not my turn, move blocked');
            return false;
        }

        const move = game.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: 'q',
        });

        if (move) {
            dispatch(addMove({ 
                san: move.san, 
                color: move.color 
            }));
            setHighlightedSquares({});
            setSelectedSquare(null);
            return true;
        }
        return false;
    };

    const onPieceClick = (piece: string, square: Square) => {
        // Only allow piece selection if it's the player's turn
        if (!isMyTurn) {
            console.log('Not my turn, piece selection blocked');
            return;
        }

        if (!piece || selectedSquare === square) {
            setHighlightedSquares({});
            setSelectedSquare(null);
            return;
        }

        const moves = game.moves({ square, verbose: true });
        const squareToHighlight: { [square: string]: React.CSSProperties } = {};

        moves.forEach(m => {
            squareToHighlight[m.to] = {
                background: 'radial-gradient(circle, #292929 40%, transparent 20%)',
            };
        });

        setSelectedSquare(square);
        setHighlightedSquares(squareToHighlight);
    }

    const onSquareClick = (square: Square) => {
        // Only allow square clicks if it's the player's turn
        if (!isMyTurn || !selectedSquare) return;

        const validMoves = game.moves({ square: selectedSquare as Square, verbose: true });
        const move = validMoves.find(m => m.to === square);

        if (move) {
            game.move({
                from: selectedSquare,
                to: square,
                promotion: 'q',
            });
            dispatch(addMove({
                san: move.san, 
                color: move.color
            }));
            setGame(new Chess(game.fen()));
            setHighlightedSquares({});
            setSelectedSquare(null);
        }
    }

    // Disable interactions if game is ended
    const isGameEnded = status === 'ended';

    return (
        <div className="relative">
            {/* Debug button - remove this later */}
            {!isMyTurn && (
                <div className="absolute top-2 left-2 z-50">
                    <button 
                        onClick={() => dispatch(setTurn(true))}
                        className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                    >
                        Make My Turn (Debug)
                    </button>
                </div>
            )}
            
            <Chessboard
                boardWidth={650}
                position={game.fen()}
                onPieceDrop={isGameEnded ? undefined : onDrop}
                onPieceClick={isGameEnded ? undefined : onPieceClick}
                customSquareStyles={highlightedSquares}
                onSquareClick={isGameEnded ? undefined : onSquareClick}
            />
            {status === 'ended' && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-4 text-center">
                        <p className="text-lg font-semibold text-gray-800">Game ended</p>
                    </div>
                </div>
            )}
        </div>
    );
}

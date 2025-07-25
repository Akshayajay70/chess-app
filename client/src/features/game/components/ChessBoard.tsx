import { Chessboard } from 'react-chessboard';
import { Chess, type Square } from 'chess.js';
import { useState } from 'react';
import { useAppDispatch } from '../../../app/redux/hooks';
import { addMove } from '../../../app/redux/slices/game.slice';

export function ChessBoard() {
    const [game, setGame] = useState(new Chess());
    const [highlightedSquares, setHighlightedSquares] = useState({});
    const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
    const dispatch = useAppDispatch();

    const onDrop = (sourceSquare: string, targetSquare: string) => {
        const move = game.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: 'q',
        });
        console.log(move)
        if (move) {
            dispatch(addMove({ san: move.san, color: move.color }))
            setGame(new Chess(game.fen()));
            setHighlightedSquares({});
            setSelectedSquare(null);
            return true;
        }
        return false;
    };

    const onPieceClick = (piece: string, square: Square) => {
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
        if (!selectedSquare) return;

        const validMoves = game.moves({ square: selectedSquare as Square, verbose: true });
        const move = validMoves.find(m => m.to === square);

        if (move) {
            game.move({
                from: selectedSquare,
                to: square,
                promotion: 'q',
            });
            dispatch(addMove({san: move.san, color: move.color}))
            setGame(new Chess(game.fen()));
            setHighlightedSquares({});
            setSelectedSquare(null);
        }
    }

    return (
        <Chessboard
            boardWidth={650}
            position={game.fen()}
            onPieceDrop={onDrop}
            onPieceClick={onPieceClick}
            customSquareStyles={highlightedSquares}
            onSquareClick={onSquareClick}
        />
    );
}

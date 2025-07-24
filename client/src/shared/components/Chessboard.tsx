export function Chessboard() {
  const pieces: { [key: string]: string } = {
    'white-king': 'M12 2L8 6h8L12 2zM9 6v6h6V6H9zm-1 7v2h8v-2H8zm-1 3v2h10v-2H7z',
    'white-queen': 'M8 3L9 7h6l1-4H8zm-1 5v2c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V8H7zm-2 13h14v-2H5v2zm2-3h10l2-5H5l2 5z',
    'white-bishop': 'M12 2C9.8 2 8 3.8 8 6c0 1.1.4 2.1 1.1 2.8L8 10h8l-1.1-1.2c.7-.7 1.1-1.7 1.1-2.8 0-2.2-1.8-4-4-4zM5 21h14v-2H5v2zm2-3h10l2-5H5l2 5z',
    'white-knight': 'M12 2L8 6l4 4 4-4-4-4zM7 11v2h10v-2H7zm-2 10h14v-2H5v2zm2-3h10l2-4H5l2 4z',
    'white-rook': 'M7 3h10v4H7V3zm8 4v3h4l-2 11H7L5 10h4V7h6z',
    'white-pawn': 'M12 4c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3zM8 14v3h8v-3c0-1.7-2.7-3-4-3s-4 1.3-4 3z',
    'black-king': 'M12 2L8 6h8L12 2zM9 6v6h6V6H9zm-1 7v2h8v-2H8zm-1 3v2h10v-2H7z',
    'black-queen': 'M8 3L9 7h6l1-4H8zm-1 5v2c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V8H7zm-2 13h14v-2H5v2zm2-3h10l2-5H5l2 5z',
    'black-bishop': 'M12 2C9.8 2 8 3.8 8 6c0 1.1.4 2.1 1.1 2.8L8 10h8l-1.1-1.2c.7-.7 1.1-1.7 1.1-2.8 0-2.2-1.8-4-4-4zM5 21h14v-2H5v2zm2-3h10l2-5H5l2 5z',
    'black-knight': 'M12 2L8 6l4 4 4-4-4-4zM7 11v2h10v-2H7zm-2 10h14v-2H5v2zm2-3h10l2-4H5l2 4z',
    'black-rook': 'M7 3h10v4H7V3zm8 4v3h4l-2 11H7L5 10h4V7h6z',
    'black-pawn': 'M12 4c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3zM8 14v3h8v-3c0-1.7-2.7-3-4-3s-4 1.3-4 3z',
  };

  const initialSetup: (string | null)[][] = [
    ['black-rook', 'black-knight', 'black-bishop', 'black-queen', 'black-king', 'black-bishop', 'black-knight', 'black-rook'],
    ['black-pawn', 'black-pawn', 'black-pawn', 'black-pawn', 'black-pawn', 'black-pawn', 'black-pawn', 'black-pawn'],
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill(null),
    Array(8).fill(null),
    ['white-pawn', 'white-pawn', 'white-pawn', 'white-pawn', 'white-pawn', 'white-pawn', 'white-pawn', 'white-pawn'],
    ['white-rook', 'white-knight', 'white-bishop', 'white-queen', 'white-king', 'white-bishop', 'white-knight', 'white-rook'],
  ];

  return (
    <div className="board-container relative max-w-3xl w-full aspect-square animate-board-fade">
      <div className="relative w-full h-full bg-game-dark-light/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-game-purple/20">
        <div className="grid grid-cols-8 h-full gap-1 bg-game-dark/30 p-1 rounded-xl">
          {initialSetup.map((row, rowIndex) =>
            row.map((piece, colIndex) => {
              const isLight = (rowIndex + colIndex) % 2 === 0;
              const squareColor = isLight ? 'bg-game-purple/20' : 'bg-game-dark';
              const pieceColor = piece?.startsWith('white') ? 'text-piece-white' : 'text-piece-black';

              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`relative aspect-square ${squareColor} 
                    rounded-sm transition-all duration-200 ease-in-out
                    hover:scale-105 hover:z-10`}
                >
                  {piece && (
                    <svg
                      className={`absolute inset-0 m-auto w-3/4 h-3/4 ${pieceColor}
                        transition-all duration-300 ease-in-out cursor-pointer
                        hover:brightness-110 hover:-translate-y-0.5`}
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d={pieces[piece]} />
                    </svg>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="absolute -z-10 inset-0">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-game-purple/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-game-purple/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
} 
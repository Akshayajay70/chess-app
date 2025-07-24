export interface IRating {
    name: string;
    gameId: string;
    ratings: {
        bullet: number;
        blitz: number;
        rapid: number;
        classic: number;
    };
}
export type EloInput = {
    playerRating: number;
    opponentRating: number;
    score: 0 | 0.5 | 1;
    kFactor?: number;
};

export type FromUserService = {
  gameId: string,
  name: string,
  email: string,
  status: string,
};

export type ToResponse = {
    gameId: string,
    name: string,
    ratings: {
        bullet: number,
        blitz: number,
        rapid: number,
        classic: number
    }
}


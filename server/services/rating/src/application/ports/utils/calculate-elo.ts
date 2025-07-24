import { EloInput } from "../types/index.ts";

export function calculateElo({ playerRating, opponentRating, score, kFactor = 20 }: EloInput): {
    newRating: number;
    change: number;
    expectedScore: number;
} {
    const expectedScore = 1 / (1 + Math.pow(10, (opponentRating - playerRating) / 400));
    const change = Math.round(kFactor * (score - expectedScore));
    const newRating = playerRating + change;

    return {
        newRating,
        change,
        expectedScore: Number(expectedScore.toFixed(3))
    };
}

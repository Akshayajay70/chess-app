import { CommunicationResponse, PlayerDetails, variant } from "../types/index.ts";

export interface ICommunication {
    post(
        playerA: PlayerDetails,
        playerB: PlayerDetails,
        gameType: "online",
        variant: variant
    ): Promise<CommunicationResponse>
}
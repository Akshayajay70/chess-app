import { CommunicationResponse, PlayerDetails, variant } from "../types";

export interface ICommunication {
    post(
        playerA: PlayerDetails,
        playerB: PlayerDetails,
        gameType: "online",
        variant: variant
    ): Promise<CommunicationResponse>
}
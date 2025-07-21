import { PlayerDetails, variant, CommunicationResponse, GameType } from "../../application/ports/types";
import { ICommunication } from "../../application/ports/interfaces/communication.interface";

export class CommunicationService implements ICommunication {
    async post(playerA: PlayerDetails, playerB: PlayerDetails, gameType: GameType, variant: variant): Promise<CommunicationResponse> {
        try {
            const response = await fetch('http://localhost:8004/game/create-game', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    playerA,
                    playerB,
                    gameType,
                    variant
                })
            });

            if (!response.ok) {
                throw new Error(`Communication service responded with ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            // Optional: wrap in a custom UseCaseError if needed
            throw new Error('Failed to communicate with match service');
        }
    }
}

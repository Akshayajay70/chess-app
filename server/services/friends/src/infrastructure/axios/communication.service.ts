import { UserResponse } from "../../application/ports/types/index.ts";
import { ICommunication } from "../../application/ports/interfaces/communication.interface.ts";

export class CommunicationService implements ICommunication {
    async get(id: string): Promise<UserResponse> {
        try {
            const response = await fetch(`http://localhost:8001/user/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            const data = await response.json();
            return data.user;
        } catch (error) {
            throw new Error('Failed to communicate with match service');
        }
    }
}

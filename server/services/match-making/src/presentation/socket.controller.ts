import { IHandleDisconnectUseCase, IJoinMatchUseCase } from "@/application/ports/interfaces/uc.interface";
import { Value } from "../application/ports/types";
import { Server, Socket } from "socket.io";
import { ValidationError } from "@/domain/errors/validation.error";
import { UseCaseError } from "@/domain/errors/use-case.error";
import { MatchMakingRepo } from "@/infrastructure/repositories/match-making";

export class SocketController {
    private readonly handleDisconnectUseCase;
    private readonly joinMatchUseCase;
    private readonly io;
    // Error handling
    private handleSocketError(socket: Socket, context: string, error: unknown): void {
        let message = 'Something went wrong';
        let type = 'UnknownError';
        let details: any = {};

        if (error instanceof ValidationError) {
            message = error.message;
            type = 'ValidationError';
            details = { invalidValue: error.invalidValue };
        } else if (error instanceof UseCaseError) {
            message = error.message;
            type = 'UseCaseError';
            details = { cause: error.cause?.message };
        } else if (error instanceof Error) {
            message = error.message;
            type = error.name;
        }

        socket.emit('error_occurred', {
            context,
            type,
            message,
            details,
        });
    }

    constructor(
        handleDisconnectUseCase: IHandleDisconnectUseCase,
        joinMatchUseCase: IJoinMatchUseCase,
        io: Server
    ) {
        this.handleDisconnectUseCase = handleDisconnectUseCase;
        this.joinMatchUseCase = joinMatchUseCase;
        this.io = io
    }

    async handleConnection(socket: Socket): Promise<void> {
        try {
            socket.on('join_match', async (user: Value) => {


                const input = {
                    socketId: socket.id,
                    ...user
                }

                const response = await this.joinMatchUseCase.execute(input);
                if (response.success && response.socketIds) {
                    this.io.to(response.socketIds[0]).emit('match_found', response);
                    this.io.to(response.socketIds[1]).emit('match_found', response);
                }
            })

            socket.on('disconnect', async (reason) => {
                console.log(reason)
                await this.handleDisconnectUseCase.execute(socket.id)
            })
        } catch (error) {
            this.handleSocketError(socket, 'join_match', error);
        }
    }
}
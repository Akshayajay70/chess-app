import { io, Socket } from 'socket.io-client';

const URL = import.meta.env.VITE_GAMING;

let socket: Socket | null = null;

export const connectSocket = () => {
    if (!socket) {
        socket = io(URL, {
            autoConnect: false,
            withCredentials: true,
        });
    }
    return socket;
};

export const getSocket = () => {
    if (!socket) throw new Error('Socket not initialized');
    return socket;
};

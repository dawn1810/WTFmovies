// websocketService.js
'use client';
import { io } from 'socket.io-client';

export const socket = io('http://localhost:3001');

export const sendMessage = (type: string, message: string) => {
    if (socket.connected) {
        socket.emit(type, message);
    } else {
        console.error('WebSocket connection not open.');
    }
};

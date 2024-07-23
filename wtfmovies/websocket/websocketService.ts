// websocketService.js

import { UrlWithStringQuery } from 'url';

let websocket: any;

export const connectWebSocket = () => {
    try {
        websocket = new WebSocket('wss://localhost:3000/api/v1/ws');

        websocket.onopen = () => {
            console.log('Connected to the WebSocket server');
        };

        websocket.onmessage = (event: any) => {
            handleIncomingMessage(event.data);
        };

        websocket.onclose = () => {
            console.log('Disconnected from the WebSocket server');
        };

        return websocket;
    } catch (e) {
        console.log('Error: ', e);
    }
};

export const sendMessage = (message: string) => {
    if (websocket.readyState === WebSocket.OPEN) {
        websocket.send(message);
    } else {
        console.error('WebSocket connection not open.');
    }
};

// export const closeWebSocket = () => {
//     if (websocket) {
//         websocket.close();
//     }
// };

const handleIncomingMessage = (message: UrlWithStringQuery) => {
    const newMessageEvent = new CustomEvent('newMessage', { detail: message });
    document.dispatchEvent(newMessageEvent);
};

import socketIO from 'socket.io-client';
let socket;

export const initSocket = () => {
    if (socket && socket.connect) {
        console.log('Estou connectado');
    } else {
        socket = socketIO.connect();
        console.log('connectei', socket);
    }
    return socket;
};
export const socketAddListener = (listener = '', callback = () => {}) => {
    socket.on(listener, callback);
};
export const socketRemoveListener = (listener = '', callback = () => {}) => {
    socket.off((listener = ''), callback);
};
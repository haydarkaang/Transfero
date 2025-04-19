import TCPSocket from 'react-native-tcp-socket';
import { EventRegister } from "react-native-event-listeners";
import { ServerDataHandler } from "../handler/ServerMessageHandler";
import { ServerEvent, NetAddress } from "../type/ConnectionTypes";
import { TransferoContextType } from '../type/ApplicationTypes';

const LOCATION = 'ServerManager';

const init = (context: TransferoContextType, ipV4Address: string) => {
    if (!context) return;
    let server = context.getServer();
    let serverSocket = context.getServerSocket();
    if (server && server.listening) {
        return;
    }
    context.rmAllEvents(LOCATION);
    context.onEvent({
        eventName: ServerEvent.WRITE_DATA,
        eventLocation: LOCATION,
        eventCallback: (data: string) => onDataWritten(context, data)
    })
    context.onEvent({
        eventName: ServerEvent.ERROR,
        eventLocation: LOCATION,
        eventCallback: (e) => onError(e)
    })
    context.onEvent({
        eventName: ServerEvent.ON_DATA,
        eventLocation: LOCATION,
        eventCallback: (data: string | Buffer<ArrayBufferLike>) => onDataReceived(context, data)
    })
    server = TCPSocket.createServer(socket => {
        serverSocket = socket;
        if (serverSocket) {
            serverSocket.on('data', (data) => EventRegister.emit(ServerEvent.ON_DATA, data));
            context.setServerSocket(serverSocket);
        }
    });
    server.on('listening', () => EventRegister.emit(ServerEvent.CREATED, server ? server.address() : null));
    server.on('close', () => EventRegister.emit(ServerEvent.CLOSED));
    server.on('error', (e) => EventRegister.emit(ServerEvent.ERROR, e));
    context.setServer(server);
    context.getServer()?.listen({ host: ipV4Address, port: 0 });
}

const close = (context: TransferoContextType) => {
    const server = context.getServer();
    if (server && server.listening) {
        context.rmAllEvents(LOCATION);
        const serverSocket = context.getServerSocket();
        if (serverSocket) {
            serverSocket.removeAllListeners();
        }
        server.removeAllListeners();
        server.close();
    }
}

const onError = (error: Error) => console.error(`Server error: ${error}`)
const onDataReceived = (context: TransferoContextType, data: string | Buffer<ArrayBuffer>) => ServerDataHandler.handleData(context, data)
const onDataWritten = (context: TransferoContextType, data: string | Buffer<ArrayBuffer>) => {
    if (!context) return;
    const server = context.getServer();
    const socket = context.getServerSocket();
    if (server && server.listening && socket) {
        socket.write(data);
    }
}

const getAdress = (context: TransferoContextType): NetAddress | undefined => {
    const server = context.getServer();
    const address = server ? server.address() : null;
    return !address ? undefined : { ip: address.address, port: address.port }
}

const ServerManager = {
    init,
    close,
    getAdress
}

export default ServerManager
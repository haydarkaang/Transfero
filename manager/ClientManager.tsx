import TCPSocket from 'react-native-tcp-socket';
import { EventRegister } from "react-native-event-listeners";
import { ClientDataHandler } from "../handler/ClientMessageHandler";
import { ClientEvent } from "../type/ConnectionTypes";
import DeviceUtil from '../util/DeviceUtil';
import { TransferoContextType } from '../type/ApplicationTypes';

const LOCATION = 'ClientManager';

const init = (context: TransferoContextType | undefined, remoteIP: string, remotePort: number) => {
    close(context);
    if (!context) return;
    let clientSocket = context.getClientSocket();
    const ip = DeviceUtil.getDeviceIP();
    context.setDeviceType('client');
    context.onEvent({
        eventName: ClientEvent.WRITE_DATA,
        eventLocation: LOCATION,
        eventCallback: (data: string) => onDataWritten(context, data)
    });
    context.onEvent({
        eventName: ClientEvent.CREATED,
        eventLocation: LOCATION,
        eventCallback: () => onCreated(context)
    });
    context.onEvent({
        eventName: ClientEvent.CLOSED,
        eventLocation: LOCATION,
        eventCallback: () => onClosed(context)
    });
    context.onEvent({
        eventName: ClientEvent.ERROR,
        eventLocation: LOCATION,
        eventCallback: (e: Error) => onError(e)
    });
    context.onEvent({
        eventName: ClientEvent.ON_DATA,
        eventLocation: LOCATION,
        eventCallback: (data: string | Buffer<ArrayBuffer>) => onDataReceived(context, data)
    });
    clientSocket = TCPSocket.createConnection({
        localAddress: ip,
        host: remoteIP,
        port: remotePort,
    }, () => undefined);
    clientSocket.on('connect', () => EventRegister.emit(ClientEvent.CREATED));
    clientSocket.on('close', () => EventRegister.emit(ClientEvent.CLOSED));
    clientSocket.on('error', (e) => EventRegister.emit(ClientEvent.ERROR, e));
    clientSocket.on('data', (e) => EventRegister.emit(ClientEvent.ON_DATA, e));
    context.setClientSocket(clientSocket);
}

const close = (context: TransferoContextType | undefined) => {
    if (!context) return;
    const clientSocket = context.getClientSocket();
    if (clientSocket) {
        clientSocket.removeAllListeners();
        if (!clientSocket.destroyed) {
            clientSocket.destroy();
        }
    }
    context.rmAllEvents(LOCATION);
}

const onCreated = (context: TransferoContextType) =>
    console.info(`Client created: ${context.getClientSocket()?.localAddress}:${context.getClientSocket()?.localPort}`)
const onClosed = (context: TransferoContextType) =>
    console.info(`Client closed: ${context.getClientSocket()?.localAddress}:${context.getClientSocket()?.localPort}`)
const onError = (error: Error) => console.error(`Client error: ${error}`)
const onDataReceived = (context: TransferoContextType, data: string | Buffer<ArrayBuffer>) => ClientDataHandler.handleData(context, data)
const onDataWritten = (context: TransferoContextType, data: string | Buffer<ArrayBuffer>) => {
    const socket = context.getClientSocket();
    if (socket && !socket.destroyed) {
        socket.write(data);
    }
}

const ClientManager = {
    init,
    close,
}

export default ClientManager;
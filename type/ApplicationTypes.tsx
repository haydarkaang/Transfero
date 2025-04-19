import TCPSocket from 'react-native-tcp-socket';
import { DeviceType } from './DeviceTypes';

export const ApplicationEvent = Object.freeze({
    PAIRING_COMPLETED: 'ApplicationEvent.PAIRING_COMPLETED',
    PROCESS_ABORTED: 'ApplicationEvent.PROCESS_ABORTED',
    TRANSFER_STARTED: 'ApplicationEvent.TRANSFER_STARTED',
    TRANSFER_COMPLETED: 'ApplicationEvent.TRANSFER_COMPLETED',
    PROCEEDED_FILE_CHANGED: 'ApplicationEvent.PROCEEDED_FILE_CHANGED',
    PROGRESS_CHANGED: 'ApplicationEvent.PROGRESS_CHANGED',
    ERROR_IN_TRANSFER: 'ApplicationEvent.ERROR_IN_TRANSFER',
    FILE_INFO_LIST_CREATED_AS_CLIENT: 'ApplicationEvent.FILE_INFO_LIST_CREATED_AS_CLIENT',
});

export type EventAddingType = {
    eventLocation: string,
    eventName: string,
    eventCallback: (e: any) => any
}

export type EventRemovingType = {
    eventLocation: string,
    eventName: string,
}

export type EventRegistrationType = {
    eventID: string,
    eventLocation: string,
    eventName: string,
}

export type TransferoContextType = {
    onEvent: (e: EventAddingType) => void,
    rmEvent: (e: EventRemovingType) => void,
    rmAllEvents: (e: string) => void,
    getDeviceType: () => DeviceType,
    setDeviceType: (e: DeviceType) => void,
    getGuestName: () => string,
    setGuestName: (e: string) => void,
    getServer: () => TCPSocket.Server | undefined,
    setServer: (e: TCPSocket.Server) => void,
    getServerSocket: () => TCPSocket.Socket | undefined,
    setServerSocket: (e: TCPSocket.Socket) => void,
    getClientSocket: () => TCPSocket.Socket | undefined,
    setClientSocket: (e: TCPSocket.Socket) => void,
}
import React, { createContext, ReactNode, RefObject, useEffect, useRef } from "react";
import TCPSocket from 'react-native-tcp-socket';
import { DeviceType } from "./type/DeviceTypes";
import { EventAddingType, EventRegistrationType, EventRemovingType, TransferoContextType } from "./type/ApplicationTypes";
import { EventRegister } from "react-native-event-listeners";
import IOHandler from "./handler/ClientIOHandler";

export const TransferoContext = createContext<TransferoContextType | undefined>(undefined);

export const TransferoContextProvider = ({ children }: { children: ReactNode | ReactNode[] }) => {
    const _eventRegistry: RefObject<EventRegistrationType[]> = useRef([])
    const onEvent = (e: EventAddingType) => {
        const id = EventRegister.on(e.eventName, e.eventCallback);
        if (typeof id !== 'string') {
            return;
        }
        _eventRegistry.current.push({
            eventID: id,
            eventName: e.eventName,
            eventLocation: e.eventLocation,
        });
    }
    const rmEvent = (e: EventRemovingType) => _eventRegistry.current.filter(r => r.eventName === e.eventName && e.eventLocation === r.eventLocation)
        .forEach(r => EventRegister.rm(r.eventID))
    const rmAllEvents = (e: string) => _eventRegistry.current.filter(r => e === r.eventLocation)
        .forEach(r => EventRegister.rm(r.eventID))

    const _deviceType: RefObject<DeviceType> = useRef('server');
    const getDeviceType = () => _deviceType.current;
    const setDeviceType = (e: DeviceType) => _deviceType.current = e;

    const _guestName: RefObject<string> = useRef('???');
    const getGuestName = () => _guestName.current;
    const setGuestName = (e: string) => _guestName.current = e;

    const _server: RefObject<TCPSocket.Server | undefined> = useRef(undefined);
    const getServer = () => _server.current;
    const setServer = (e: TCPSocket.Server) => _server.current = e;

    const _serverSocket: RefObject<TCPSocket.Socket | undefined> = useRef(undefined);
    const getServerSocket = () => _serverSocket.current;
    const setServerSocket = (e: TCPSocket.Socket) => _serverSocket.current = e;

    const _clientSocket: RefObject<TCPSocket.Socket | undefined> = useRef(undefined);
    const getClientSocket = () => _clientSocket.current;
    const setClientSocket = (e: TCPSocket.Socket) => _clientSocket.current = e;

    return (
        <TransferoContext.Provider value={{
            onEvent,
            rmEvent,
            rmAllEvents,
            getDeviceType,
            setDeviceType,
            getGuestName,
            setGuestName,
            getServer,
            setServer,
            getServerSocket,
            setServerSocket,
            getClientSocket,
            setClientSocket,
        }}>
            {children}
        </TransferoContext.Provider>
    )
}
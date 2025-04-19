import { ServerMessage, ClientMessage } from "../type/MessageTypes";
import { EventRegister } from "react-native-event-listeners";
import { ClientEvent, ServerEvent } from "../type/ConnectionTypes";

const encodeMessage = (message: ServerMessage | ClientMessage): string => JSON.stringify(message);

const decodeMessage = (data: string): ServerMessage | ClientMessage => JSON.parse(data);

const sendServerMessage = (message: ServerMessage) => {
    const json = encodeMessage(message);
    EventRegister.emit(ServerEvent.WRITE_DATA, json);
}

const sendClientMessage = (message: ClientMessage) => {
    const json = encodeMessage(message);
    EventRegister.emit(ClientEvent.WRITE_DATA, json);
};

const sendFileContentAsClient = (data: string | Buffer<ArrayBuffer>) => {
    EventRegister.emit(ClientEvent.WRITE_DATA, data);
}

export const MessageUtil = {
    encodeMessage,
    decodeMessage,
    sendServerMessage,
    sendClientMessage,
    sendFileContentAsClient,
}
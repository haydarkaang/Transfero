import { EventRegister } from "react-native-event-listeners";
import { ApplicationEvent, TransferoContextType } from "../type/ApplicationTypes";
import { ClientMessage, ServerMessage } from "../type/MessageTypes";
import { MessageUtil } from "../util/MessageUtil";
import { IOEvent } from "../type/IOTypes";

const LOCATION = 'ClientMessageHandler';

const handleData = (context: TransferoContextType, data: string | Buffer<ArrayBufferLike>) => {
    const received = data.toString();
    let message: ServerMessage | ClientMessage;
    try {
        message = MessageUtil.decodeMessage(received);
    } catch (error) {
        console.log(`${LOCATION}: ${error}`);
        return;
    }
    switch (message.type) {
        case 'handshake-message-ack':
            EventRegister.emit(ApplicationEvent.PAIRING_COMPLETED);
            break;
        case 'process-aborted-by-server-message':
            EventRegister.emit(ApplicationEvent.PROCESS_ABORTED);
            break;
        case 'transfer-start-message-ack':
            EventRegister.emit(IOEvent.START_FILE_TRANSFER_AS_CLIENT);
            break;
        case 'file-start-message-ack':
            EventRegister.emit(IOEvent.READ_FILE_AS_CLIENT);
            break;
        case 'file-end-message-ack':
            EventRegister.emit(IOEvent.START_FILE_TRANSFER_AS_CLIENT);
            break;
        case 'transfer-end-message-ack':
            EventRegister.emit(ApplicationEvent.TRANSFER_COMPLETED);
            break;
        default:
            break;
    }
};

export const ClientDataHandler = {
    handleData,
}
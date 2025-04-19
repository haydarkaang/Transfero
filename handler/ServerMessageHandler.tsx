import { EventRegister } from "react-native-event-listeners";
import { ApplicationEvent, TransferoContextType } from "../type/ApplicationTypes";
import { ClientMessage, FileEnd, FileStart, HandShakeMessage, ServerMessage, TransferEnd, TransferStart } from "../type/MessageTypes";
import { MessageUtil } from "../util/MessageUtil";
import { IOEvent } from "../type/IOTypes";

const LOCATION = 'ServerMessageHandler';

const handleData = (context: TransferoContextType, data: string | Buffer<ArrayBuffer>) => {
    const received = data.toString();
    let message: ServerMessage | ClientMessage;
    try {
        message = MessageUtil.decodeMessage(received);
    } catch (error) {
        EventRegister.emit(IOEvent.WRITE_PAYLOAD_AS_SERVER, data);
        return;
    }
    switch (message.type) {
        case 'handshake-message':
            MessageUtil.sendServerMessage({ type: 'handshake-message-ack', content: { time: Date.now() } })
            context.setGuestName((message.content as HandShakeMessage).deviceName);
            EventRegister.emit(ApplicationEvent.PAIRING_COMPLETED);
            break;
        case 'process-aborted-by-client-message':
            EventRegister.emit(ApplicationEvent.PROCESS_ABORTED);
            break;
        case 'transfer-start-message':
            EventRegister.emit(ApplicationEvent.TRANSFER_STARTED, (message.content as TransferStart));
            MessageUtil.sendServerMessage({ type: 'transfer-start-message-ack', content: { time: Date.now() } })
            break;
        case 'file-start-message':
            const fileStartMessage = (message.content as FileStart);
            EventRegister.emit(ApplicationEvent.PROCEEDED_FILE_CHANGED, fileStartMessage);
            EventRegister.emit(IOEvent.CREATE_FILE_AS_SERVER, fileStartMessage);
            break;
        case 'file-end-message':
            const fileEndMessage = (message.content as FileEnd);
            EventRegister.emit(IOEvent.HANDLE_FILE_END, fileEndMessage);
            break;
        case 'transfer-end-message':
            EventRegister.emit(ApplicationEvent.TRANSFER_COMPLETED, (message.content as TransferEnd));
            MessageUtil.sendServerMessage({ type: 'transfer-end-message-ack', content: { time: Date.now() } })
            break;
        default:
            break;
    }
};

export const ServerDataHandler = {
    handleData,
}
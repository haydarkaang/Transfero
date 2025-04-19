import { FileInfo } from "./FileTypes"

export type ServerMessageType = 'handshake-message-ack' | 'transfer-start-message-ack' | 'file-start-message-ack' |
    'file-end-message-ack' | 'transfer-end-message-ack' | 'transfer-aborted-by-server-message' | 'process-aborted-by-server-message' |
    'transfer-aborted-by-client-message-ack' | 'process-aborted-by-client-message-ack'

export type ClientMessageType = 'handshake-message' | 'transfer-start-message' | 'file-start-message' |
    'file-end-message' | 'transfer-end-message' | 'transfer-aborted-by-server-message-ack' | 'process-aborted-by-server-message-ack' |
    'transfer-aborted-by-client-message' | 'process-aborted-by-client-message'

export type MessagePairType = {
    server: ServerMessageType,
    client: ClientMessageType
}

export type ServerMessage = {
    type: ServerMessageType,
    content: ACKMessage | TransferAborted | ProcessAborted,
}

export type ClientMessage = {
    type: ClientMessageType,
    content: ACKMessage | HandShakeMessage | TransferStart | FileStart | FileEnd | TransferEnd | TransferAborted | ProcessAborted
}

export type ACKMessage = {
    time: number,
}

export type TransferAborted = {
    time: number,
}

export type ProcessAborted = {
    time: number,
}

export type HandShakeMessage = {
    deviceName: string
}

export type TransferStart = {
    totalSize: number,
    totalCount: number,
}

export type FileStart = {
    fileStarted: FileInfo,
    fileSize: number,
}

export type FileEnd = {
    fileEnd: FileInfo,
    fileSize: number,
}

export type TransferEnd = {
    time: Date
}

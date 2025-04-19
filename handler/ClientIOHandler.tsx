import { ApplicationEvent, TransferoContextType } from "../type/ApplicationTypes";
import { FileInfo } from "../type/FileTypes";
import { IOEvent } from "../type/IOTypes";
import RNFS from "react-native-fs";
import { MessageUtil } from "../util/MessageUtil";
import { EventRegister } from "react-native-event-listeners";

const LOCATION = 'ClientIOHandler';
let fileList: FileInfo[] | undefined = undefined;
let proceededIndex: number = 0;
let totalFileSize: number = 0;
let handledFileSize: number = 0;

const onFileRead = async () => {
    const fileInProgress: FileInfo | undefined = fileList ? fileList[proceededIndex] : undefined;
    if (fileInProgress === undefined) {
        EventRegister.emit(ApplicationEvent.ERROR_IN_TRANSFER, new Error(LOCATION + ': No file in progress!'));
        return;
    }
    const isFileExists = await RNFS.exists(fileInProgress.path);
    if (!isFileExists) {
        EventRegister.emit(ApplicationEvent.ERROR_IN_TRANSFER, new Error(LOCATION + ': File does not exists!'));
        return;
    }
    EventRegister.emit(ApplicationEvent.PROCEEDED_FILE_CHANGED, fileInProgress);

    const payloadSize = 10240;
    const fileSize = fileInProgress.size;
    let position = 0;

    while (position < fileSize) {
        const length = Math.min(payloadSize, fileSize - position);
        const base64 = await RNFS.read(fileInProgress.path, length, position, 'base64');
        const binary = Buffer.from(base64, 'base64');
        MessageUtil.sendFileContentAsClient(binary);
        handledFileSize += length;
        position += length;
        EventRegister.emit(ApplicationEvent.PROGRESS_CHANGED, (handledFileSize / totalFileSize) * 100);
    }

    setTimeout(() => {
        MessageUtil.sendClientMessage({
            type: 'file-end-message',
            content: {
                fileEnd: fileInProgress,
                fileSize: fileInProgress.size,
            }
        })
        proceededIndex += 1;
    }, 500);
}

const onTransferStarted = async (files: FileInfo[]) => {
    fileList = [...files];
    totalFileSize = fileList.map(f => f.size).reduce((prev, next) => prev + next);
}

const onFileStarted = async () => {
    if (fileList === undefined) {
        EventRegister.emit(ApplicationEvent.ERROR_IN_TRANSFER, new Error(LOCATION + ': File list is empty!'));
        return;
    }
    if (proceededIndex >= fileList.length) {
        MessageUtil.sendClientMessage({
            type: 'transfer-end-message',
            content: { time: Date.now() },
        })
        return;
    }

    const fileInProgress = fileList[proceededIndex];
    MessageUtil.sendClientMessage({
        type: 'file-start-message',
        content: {
            fileStarted: fileInProgress,
            fileSize: fileInProgress.size,
        }
    })
}

const init = (context: TransferoContextType) => {
    context.onEvent({
        eventLocation: LOCATION,
        eventName: IOEvent.READ_FILE_AS_CLIENT,
        eventCallback: onFileRead,
    })
    context.onEvent({
        eventLocation: LOCATION,
        eventName: ApplicationEvent.FILE_INFO_LIST_CREATED_AS_CLIENT,
        eventCallback: onTransferStarted,
    })
    context.onEvent({
        eventLocation: LOCATION,
        eventName: IOEvent.START_FILE_TRANSFER_AS_CLIENT,
        eventCallback: onFileStarted,
    })
}

const destroy = (context: TransferoContextType) => {
    fileList = undefined;
    proceededIndex = 0;
    totalFileSize = 0;
    handledFileSize = 0;
    context.rmAllEvents(LOCATION);
}

const ClientIOHandler = {
    init,
    destroy,
}

export default ClientIOHandler;

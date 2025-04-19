import { ApplicationEvent, TransferoContextType } from "../type/ApplicationTypes";
import { FileInfo } from "../type/FileTypes";
import { IOEvent } from "../type/IOTypes";
import RNFS from "react-native-fs";
import { MessageUtil } from "../util/MessageUtil";
import { EventRegister } from "react-native-event-listeners";
import { FileStart, TransferStart } from "../type/MessageTypes";
import { Buffer } from "buffer";

const LOCATION = 'ServerIOHandler'
let saveDir = RNFS.DownloadDirectoryPath + '/Transfero';
let subFolder: string | undefined = undefined;
let proceedingFile: FileInfo | undefined = undefined;
let totalFileSize = 0;
let handledFileSize = 0;
let currentPath: string = 'unknown.file';

const createSubFolderName = () => {
    const date = new Date();
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
}


const getTargetPath = async (file: FileInfo) => {
    return saveDir + '/' + file.name;
}

const onTransferStarted = async (message: TransferStart) => {
    totalFileSize = message.totalSize;
    if (subFolder === undefined) {
        subFolder = createSubFolderName()
        saveDir += '/' + subFolder;
    }
    const saveDirExists = await RNFS.exists(saveDir);
    if (!saveDirExists) RNFS.mkdir(saveDir);
}

const onFileStarted = async (e: FileStart) => {
    proceedingFile = e.fileStarted;
    currentPath = await getTargetPath(proceedingFile);
    if (!currentPath) {
        EventRegister.emit(ApplicationEvent.ERROR_IN_TRANSFER, new Error(LOCATION + ': Target path cannot be found!'));
        return;
    } else if (await RNFS.exists(currentPath)) {
        await RNFS.writeFile(currentPath, '', 'utf8');
    }
    EventRegister.emit(ApplicationEvent.PROCEEDED_FILE_CHANGED, proceedingFile);
    MessageUtil.sendServerMessage({
        type: 'file-start-message-ack',
        content: {
            time: Date.now()
        }
    })
}

const onPayloadReceived = async (data: Buffer<ArrayBuffer>) => {
    if (proceedingFile === undefined) {
        EventRegister.emit(ApplicationEvent.ERROR_IN_TRANSFER, new Error(LOCATION + ': Target file can not be found!'));
        return;
    }
    const payload = Buffer.from(data).toString('base64');
    await RNFS.appendFile(currentPath, payload, 'base64')
        .catch(reason => EventRegister.emit(ApplicationEvent.ERROR_IN_TRANSFER,
            new Error(LOCATION + ': Payload can not be appended!: ' + reason)));
    handledFileSize += data.byteLength;
    EventRegister.emit(ApplicationEvent.PROGRESS_CHANGED, (handledFileSize / totalFileSize) * 100);
}

const onFileEnd = async () => {
    if (proceedingFile === undefined) {
        EventRegister.emit(ApplicationEvent.ERROR_IN_TRANSFER, new Error(LOCATION + ': Proceeding file can not be found for size control!'));
        return;
    }
    MessageUtil.sendServerMessage({
        type: 'file-end-message-ack',
        content: { time: Date.now() }
    })
}

const init = (context: TransferoContextType) => {
    context.onEvent({
        eventLocation: LOCATION,
        eventName: ApplicationEvent.TRANSFER_STARTED,
        eventCallback: onTransferStarted
    })
    context.onEvent({
        eventLocation: LOCATION,
        eventName: IOEvent.CREATE_FILE_AS_SERVER,
        eventCallback: onFileStarted
    })
    context.onEvent({
        eventLocation: LOCATION,
        eventName: IOEvent.WRITE_PAYLOAD_AS_SERVER,
        eventCallback: onPayloadReceived,
    })
    context.onEvent(({
        eventLocation: LOCATION,
        eventName: IOEvent.HANDLE_FILE_END,
        eventCallback: onFileEnd,
    }))
}

const destroy = (context: TransferoContextType) => {
    subFolder = undefined;
    proceedingFile = undefined;
    totalFileSize = 0;
    handledFileSize = 0;
    context.rmAllEvents(LOCATION);
}

const ServerIOHandler = {
    init,
    destroy,
}

export default ServerIOHandler;

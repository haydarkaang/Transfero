import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import { TQRCodeData } from "./xcomponent/TQRCode";
import { FileInfo } from "./type/FileTypes";
import { FileStart, TransferStart } from "./type/MessageTypes";

export type StackParamList = {
    Permission: undefined,
    StartServer: undefined,
    NoConnection: undefined,
    Home: TQRCodeData,
    QRReader: undefined,
    Pairing: { qrData: string },
    FileSelection: undefined,
    TransferClient: { fileStartMessage: TransferStart, files: FileInfo[] }
    TransferServer: { fileStartMessage: TransferStart }
}

export type HomeScreenProp = NativeStackScreenProps<StackParamList, 'Home'>;

export type PairingScreenProp = NativeStackScreenProps<StackParamList, 'Pairing'>;

export type TransferClientScreenProp = NativeStackScreenProps<StackParamList, 'TransferClient'>;

export type TransferServerScreenProp = NativeStackScreenProps<StackParamList, 'TransferServer'>;

export type AnyScreenProp = NativeStackScreenProps<StackParamList, any>;

export const Stack = createNativeStackNavigator<StackParamList>();
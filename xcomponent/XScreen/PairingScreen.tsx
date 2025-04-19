import React, { useContext, useEffect } from 'react'
import { PairingScreenProp } from '../../Navigation'
import { language, qrCodeSplitter } from '../../AppConstants'
import { TQRCodeData } from '../TQRCode'
import { Alert, View } from 'react-native';
import { getString } from '../../AppLanguage';
import { ClientEvent } from '../../type/ConnectionTypes'
import { MessageUtil } from '../../util/MessageUtil'
import DeviceUtil from '../../util/DeviceUtil'
import ClientManager from '../../manager/ClientManager';
import { TransferoContext } from '../../TransferoContext';
import { ApplicationEvent } from '../../type/ApplicationTypes';
import XBase from '../XBase/XBase';
import FooterButtonFactory from '../../util/FooterButtonFactory';
import XLoading from '../XCommon/XLoading';

const LOCATION = 'PairingScreen';

const PairingScreen = (screenProp: PairingScreenProp) => {
    const context = useContext(TransferoContext)
    if (!context) return <></>

    const onClientCreated = (e: TQRCodeData) => {
        MessageUtil.sendClientMessage({
            type: 'handshake-message',
            content: { deviceName: DeviceUtil.getDeviceName() }
        });
    }

    const onClientError = (e: Error) => {
        Alert.alert(
            getString(language, 'pairing-error-alert-title'),
            getString(language, 'pairing-error-alert-message')
        );
        // console.error('Client error in PairingScreen');
        screenProp.navigation.navigate('StartServer');
    }

    const onPairingCompleted = () => screenProp.navigation.navigate('FileSelection');

    useEffect(() => {
        let receivedQRCodes = screenProp.route.params.qrData;
        let firstFoundQRCode = receivedQRCodes.split(qrCodeSplitter)[1];
        firstFoundQRCode = firstFoundQRCode.replace('transfero://', '');
        let qrCode: TQRCodeData = JSON.parse(atob(firstFoundQRCode));
        context.onEvent({
            eventName: ClientEvent.CREATED,
            eventLocation: LOCATION,
            eventCallback: () => onClientCreated(qrCode)
        });
        context.onEvent({
            eventName: ClientEvent.ERROR,
            eventLocation: LOCATION,
            eventCallback: (e) => onClientError(e)
        });
        context.onEvent({
            eventName: ApplicationEvent.PAIRING_COMPLETED,
            eventLocation: LOCATION,
            eventCallback: () => onPairingCompleted()
        });
        context.setGuestName(qrCode.deviceName);
        ClientManager.init(context, qrCode.ip, qrCode.port);
        return () => context.rmAllEvents(LOCATION);
    }, [])

    return (
        <XBase
            description={getString(language, 'connection-pairing')}
            footerContent={[FooterButtonFactory.abortButton(screenProp)]}>
            <View style={{ marginTop: 60 }} />
            <XLoading />
        </XBase>
    );
}

export default PairingScreen

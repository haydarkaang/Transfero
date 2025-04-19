import { View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { colors, language } from '../../../AppConstants';
import { getString } from '../../../AppLanguage';
import { AnyScreenProp } from '../../../Navigation';
import XLoading from '../../XCommon/XLoading';
import XBase from '../../XBase/XBase';
import XCard from '../../XCommon/XCard';
import FooterButtonFactory from '../../../util/FooterButtonFactory';
import { ApplicationEvent, TransferoContextType } from '../../../type/ApplicationTypes';
import DeviceUtil from '../../../util/DeviceUtil';
import { TransferoContext } from '../../../TransferoContext';
import IconFactory from '../../../util/IconFactory';
import { TransferStart } from '../../../type/MessageTypes';

const LOCATION = 'FileSelectionClientScreen';

const FileSelectionServerScreen = ({ screenProps }: { screenProps: AnyScreenProp }) => {
    const context = useContext<TransferoContextType | undefined>(TransferoContext);
    if (!context) return <></>;

    useEffect(() => {
        context.onEvent({
            eventName: ApplicationEvent.PROCESS_ABORTED,
            eventLocation: LOCATION,
            eventCallback: () => screenProps.navigation.navigate('StartServer')
        })

        context.onEvent({
            eventName: ApplicationEvent.TRANSFER_STARTED,
            eventLocation: LOCATION,
            eventCallback: (message: TransferStart) =>
                screenProps.navigation.navigate('TransferServer', { fileStartMessage: message })
        })

        return () => context.rmAllEvents(LOCATION)
    })

    return (
        <XBase description={getString(language, 'receiver-file-selection')}
            footerContent={[
                FooterButtonFactory.abortButton(screenProps, context, true),
            ]}>
            <XCard
                key='receiver-card-device-receiver'
                icon={IconFactory.createMaterialCommunityIcon('arrow-right-thick', colors.commonText, 24)}
                title={getString(language, 'receiver-screen-receiver-device-title')}
                nodes={[{ text: DeviceUtil.getDeviceName() }]} />
            <XCard
                key='receiver-card-device-transmitter'
                icon={IconFactory.createMaterialCommunityIcon('arrow-left-thick', colors.commonText, 24)}
                title={getString(language, 'receiver-screen-transmitter-device-title')}
                nodes={[{ text: context.getGuestName() }]} />
            <View style={{ marginTop: 30 }} />
            <XLoading />
        </XBase>
    );
}

export default FileSelectionServerScreen
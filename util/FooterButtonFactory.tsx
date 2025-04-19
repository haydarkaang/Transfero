import React from 'react'
import { colors, language } from '../AppConstants'
import XFooterButton from '../xcomponent/XCommon/XFooterButton'
import { AnyScreenProp } from '../Navigation'
import { Alert, Linking } from 'react-native'
import { openSettings } from 'react-native-permissions'
import { TransferoContextType } from '../type/ApplicationTypes';
import { MessageUtil } from './MessageUtil';
import ClientManager from '../manager/ClientManager';
import { getString } from '../AppLanguage';
import IconFactory from './IconFactory'

const abortButton = (screenProps: AnyScreenProp, context?: TransferoContextType, withAlert?: boolean, text?: string) => <XFooterButton
    key='abort-button'
    icon={IconFactory.createMaterialCommunityIcon('close', colors.footerButtonColor)}
    onPress={() => {
        const handleAborting = () => {
            if (context) {
                if (context.getDeviceType() == 'server') {
                    MessageUtil.sendServerMessage({ type: 'process-aborted-by-server-message', content: { time: Date.now() } })
                } else {
                    MessageUtil.sendClientMessage({ type: 'process-aborted-by-client-message', content: { time: Date.now() } })
                    ClientManager.close(context);
                }
            }
            screenProps.navigation.navigate('StartServer');
        }
        if (withAlert) {
            Alert.alert(
                getString(language, 'backhandler-alert-title'),
                getString(language, 'backhandler-alert-message'),
                [
                    { text: getString(language, 'general-no'), isPreferred: true },
                    { text: getString(language, 'general-yes'), onPress: handleAborting }
                ],
                { cancelable: false }
            )
        } else {
            handleAborting();
        }
    }}
    text={text}
/>

const scanButton = (screenProp: AnyScreenProp, text: string | undefined) => <XFooterButton
    key='scan-code-button'
    onPress={() => screenProp.navigation.navigate('QRReader')}
    icon={IconFactory.createMaterialCommunityIcon('qrcode-scan', colors.footerButtonColor)}
    text={text}
/>

const tutorialButton = (text: string | undefined) => <XFooterButton
    key='tutorial-button'
    onPress={() => openVideo()}
    icon={IconFactory.createMaterialCommunityIcon('youtube', colors.footerButtonColor)}
    text={text}
/>

const permissionButton = (text: string | undefined) => <XFooterButton
    key='permission-button'
    onPress={() => openSettings('application')}
    icon={IconFactory.createAntDesignIcon('setting', colors.footerButtonColor)}
    text={text} />

const FooterButtonFactory = {
    abortButton,
    scanButton,
    tutorialButton,
    permissionButton,
}

const openVideo = () => {
    const url = 'https://www.youtube.com/';
    Linking.canOpenURL(url).then(q => q ? Linking.openURL(url) : Alert.alert('Tutorial can not be opened from YouTube!'))
        .catch(e => Alert.alert('Tutorial can not be opened from YouTube! Error occured:\n' + e));
}

export default FooterButtonFactory 
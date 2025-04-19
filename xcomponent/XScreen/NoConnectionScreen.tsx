import { StyleSheet } from 'react-native'
import React from 'react'
import XBase from '../XBase/XBase'
import { getString } from '../../AppLanguage'
import { colors, language } from '../../AppConstants'
import XCenterize from '../XCommon/XCenterize'
import { AnyScreenProp } from '../../Navigation'
import XFooterButton from '../XCommon/XFooterButton'
import IconFactory from '../../util/IconFactory'

const NoConnectionScreen = (screenProps: AnyScreenProp) => {
    return (
        <XBase description={getString(language, 'welcome-decription-no-connection')}
            footerContent={[
                <XFooterButton
                    key='reconnect-button'
                    icon={IconFactory.createMaterialCommunityIcon('refresh', colors.footerButtonColor)}
                    onPress={() => screenProps.navigation.navigate('StartServer')}
                    text={getString(language, 'welcome-button-try-again')}
                />
            ]}>
            <XCenterize>
                {IconFactory.createMaterialCommunityIcon('wifi-off', colors.color3, 256)}
            </XCenterize>
        </XBase>
    )
}

export default NoConnectionScreen

const styles = StyleSheet.create({})
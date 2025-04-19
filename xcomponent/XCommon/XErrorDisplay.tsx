import React, { useContext } from 'react'
import XBase from '../XBase/XBase'
import { AnyScreenProp } from '../../Navigation'
import { getString } from '../../AppLanguage'
import { colors, language } from '../../AppConstants'
import XCard from './XCard'
import FooterButtonFactory from '../../util/FooterButtonFactory'
import IconFactory from '../../util/IconFactory'
import { TransferoContext } from '../../TransferoContext'

const XErrorDisplay = ({ message, screenProps }: { message: string, screenProps: AnyScreenProp }) => {
    const context = useContext(TransferoContext);
    if (!context) return <></>;

    return (
        <XBase description={getString(language, 'general-error')}
            footerContent={[FooterButtonFactory.abortButton(screenProps, context)]}>
            <XCard icon={IconFactory.createMaterialCommunityIcon('exclamation-thick', colors.commonText)}
                title={getString(language, 'general-error')}
                nodes={[{ text: message }]} />
        </XBase>
    )
}

export default XErrorDisplay
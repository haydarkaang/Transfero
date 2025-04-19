import { View } from 'react-native'
import React, { ReactElement } from 'react'

export type XCenterizeProps = {
    children: ReactElement | ReactElement[]
}

const XCenterize = (props: XCenterizeProps) => {
    return (
        <View style={{ flex: 1, flexDirection: 'column', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
            {props.children}
        </View>
    )
}

export default XCenterize
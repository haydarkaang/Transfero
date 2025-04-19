import React, { useContext } from 'react'
import { AnyScreenProp } from '../../../Navigation'
import FileSelectionServerScreen from './FileSelectionServerScreen'
import FileSelectionClientScreen from './FileSelectionClientScreen'
import { TransferoContext } from '../../../TransferoContext'

const FileSelectionScreen = (screenProp: AnyScreenProp) => {
    const context = useContext(TransferoContext);

    if (!context) return <></>

    return (
        context.getDeviceType() == 'server' ?
            <FileSelectionServerScreen screenProps={screenProp} /> :
            <FileSelectionClientScreen screenProps={screenProp} />
    )
}

export default FileSelectionScreen
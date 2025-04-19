import { Alert, View } from 'react-native'
import React, { ReactElement, useContext, useEffect, useState } from 'react'
import { AnyScreenProp } from '../../../Navigation'
import XBase from '../../XBase/XBase'
import { colors, language } from '../../../AppConstants'
import { getString } from '../../../AppLanguage'
import FooterButtonFactory from '../../../util/FooterButtonFactory'
import XCard from '../../XCommon/XCard'
import { FileCategory, FileInfo } from '../../../type/FileTypes'
import { Icon } from 'react-native-vector-icons/Icon'
import { TransferoContext } from '../../../TransferoContext'
import { errorCodes, isErrorWithCode, pick } from '@react-native-documents/picker'
import XFooterButton from '../../XCommon/XFooterButton'
import { Circle } from 'react-native-progress'
import XLoading from '../../XCommon/XLoading'
import { ApplicationEvent } from '../../../type/ApplicationTypes'
import TextUtil from '../../../util/TextUtil'
import IconFactory from '../../../util/IconFactory'
import ReactNativeBlobUtil from 'react-native-blob-util'
import XErrorDisplay from '../../XCommon/XErrorDisplay'

const LOCATION = 'FileSelectionClientScreen';

const FileSelectionClientScreen = ({ screenProps }: { screenProps: AnyScreenProp }) => {
    const context = useContext(TransferoContext);
    if (!context) return <></>

    const [progress, setProgress] = useState<number>(0);
    const [files, setFiles] = useState<FileInfo[]>([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        context.onEvent({
            eventName: ApplicationEvent.PROCESS_ABORTED,
            eventLocation: LOCATION,
            eventCallback: () => screenProps.navigation.navigate('StartServer')
        })

        return () => context.rmAllEvents(LOCATION)
    })

    const clearItems = () => {
        Alert.alert(
            getString(language, 'transmitter-screen-clear-item-title'),
            getString(language, 'transmitter-screen-clear-item-message'),
            [
                {
                    isPreferred: true,
                    text: getString(language, 'transmitter-screen-clear-item-abort'),
                },
                {
                    text: getString(language, 'transmitter-screen-clear-item-ok'),
                    onPress: () => {
                        setProgress(0);
                        setFiles([]);
                    },
                }
            ]
        );
    }

    const chooseFiles = async () => {
        const result = await pick({
            allowMultiSelection: true,
            mode: 'open',
        }).catch(reason => {
            setProgress(0);
            setFiles([]);
            if (isErrorWithCode(reason) && reason.code === errorCodes.OPERATION_CANCELED) {
                return undefined;
            }
            setError(reason);
        });

        if (!result) return;

        for (let index = 0; index < result.length; index++) {
            const item = result[index];
            const stat = await ReactNativeBlobUtil.fs.stat(item.uri).catch(_ => undefined);
            if (!stat) continue;
            const path = stat.path;
            const name = stat.filename;
            const size = stat.size;
            setFiles(prevFiles => [
                ...prevFiles,
                {
                    path: path,
                    name: name,
                    type: item.type ?? 'unknown',
                    category: getCategory(item.type),
                    size: size,
                    key: prevFiles.length,
                }
            ]);

            await new Promise(resolve => setTimeout(resolve, 0));

            setProgress((index + 1) / result.length);
        }
    };

    if (error) {
        return (<XErrorDisplay
            screenProps={screenProps}
            message={getString(language, 'transfer-screen-transfer-error') + ': ' + error} />)
    }

    if (progress == 0) {
        return (
            <XBase description={
                getString(language, 'transmitter-file-selection') + '. ' +
                getString(language, 'receiver-screen-receiver-device-title') + ': ' + context.getGuestName()
            }
                footerContent={[
                    FooterButtonFactory.abortButton(screenProps, context, true),
                    <XFooterButton
                        key='file-chooser-button'
                        onPress={() => chooseFiles()}
                        icon={IconFactory.createAntDesignIcon('folderopen', colors.footerButtonColor)} />,
                ]}>
                <XCard key='no-selection-card'
                    icon={IconFactory.createAntDesignIcon('questioncircleo', colors.commonText)}
                    title={getString(language, 'selection-information-screen-card-title')}
                    nodes={[{ text: getString(language, 'selection-information-screen-card-text') }]} />
            </XBase >
        )
    }

    if (progress > 0 && progress < 1) {
        return (
            <XBase description={getString(language, 'file-selection-client-screen-process-selected-files')}
                footerContent={[FooterButtonFactory.abortButton(screenProps, context, true)]}>
                <FilePreparationView progress={progress} />
            </XBase>
        );
    }

    if (progress >= 1) {
        return (
            <XBase description={
                files.length + getString(language, 'file-selection-client-screen-have-selected-files') + ' ' +
                getString(language, 'receiver-screen-receiver-device-title') + ': ' + context.getGuestName()
            }
                footerContent={
                    [
                        FooterButtonFactory.abortButton(screenProps, context, true),
                        <XFooterButton
                            key='clear-items-button'
                            onPress={() => clearItems()}
                            icon={IconFactory.createAntDesignIcon('delete', colors.footerButtonColor)} />,
                        <XFooterButton
                            key='file-sender-button'
                            onPress={() => screenProps.navigation.navigate('TransferClient', {
                                fileStartMessage: {
                                    totalCount: files.length,
                                    totalSize: files.map(f => f.size).reduce((prev, next) => prev + next)
                                },
                                files: files,
                            })}
                            icon={IconFactory.createMaterialCommunityIcon('file-send-outline', colors.footerButtonColor)} />,
                    ]} >
                <View>
                    <Card files={files.filter(file => file.category === 'image')} type='image' />
                    <Card files={files.filter(file => file.category === 'video')} type='video' />
                    <Card files={files.filter(file => file.category === 'audio')} type='audio' />
                    <Card files={files.filter(file => file.category === 'other')} type='other' />
                </View>
            </XBase >
        )
    }

    return (
        <XBase description={getString(language, 'file-selection-client-screen-process-selected-files')}
            footerContent={[FooterButtonFactory.abortButton(screenProps, context, true)]}>
            <View style={{ marginTop: 60 }} />
            <XLoading />
        </XBase>
    )
}

const getTitle = (type: FileCategory): string => {
    switch (type) {
        case 'image':
            return getString(language, "selection-information-screen-image-file")
        case 'video':
            return getString(language, "selection-information-screen-video-file")
        case 'audio':
            return getString(language, "selection-information-screen-audio-file")
        case 'other':
            return getString(language, "selection-information-screen-other-file")
        default:
            return 'Unimpl. Type';
    }
}

const getCountText = (length: number): string => {
    return `${length} ${getString(language, "selection-information-screen-file-count")}`;
}

const getCategory = (type: string | null): FileCategory => {
    if (!type) return 'other';

    if (type.toLocaleLowerCase().includes('image')) {
        return 'image';
    } else if (type.toLocaleLowerCase().includes('video')) {
        return 'video';
    } else if (type.toLocaleLowerCase().includes('audio')) {
        return 'audio';
    } else {
        return 'other';
    }
}

const Card = ({ type, files }: { type: FileCategory, files: FileInfo[] }) => {
    if (files.length == 0) return null

    let totalSize = 0;
    files.forEach(file => totalSize += file.size);

    return (
        <XCard
            key={type.toString().toUpperCase()}
            icon={<CardIcon type={type} />}
            title={getTitle(type)}
            nodes={[
                {
                    text: getCountText(files.length),
                    icon: IconFactory.createMaterialCommunityIcon('file-multiple-outline', colors.commonText)
                },
                {
                    text: TextUtil.getSizeText(totalSize),
                    icon: IconFactory.createMaterialCommunityIcon('harddisk', colors.commonText)
                }
            ]} />
    )
}

const CardIcon = ({ type }: { type: FileCategory }): ReactElement<Icon> => {
    let n: string = 'questioncircleo';
    switch (type) {
        case 'image':
            n = 'image'
            break;
        case 'video':
            n = 'video'
            break;
        case 'audio':
            n = 'beamed-note'
            break;
        case 'other':
        default:
            n = 'news'
            break;
    }
    return IconFactory.createEntypoIcon(n, colors.commonText);
}

const FilePreparationView = ({ progress }: { progress: number }) => {
    return (
        <View>
            <View style={{ marginTop: 60 }} />
            <Circle showsText={true} formatText={(p) => (p * 100).toFixed(1) + '%'} style={{ alignSelf: 'center' }} size={200} thickness={5} strokeCap='round'
                color={colors.color3} progress={progress} />
        </View>
    )
}

export default FileSelectionClientScreen



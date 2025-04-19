import { Animated, Easing, StyleSheet, View } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { TransferClientScreenProp } from '../../../Navigation'
import XBase from '../../XBase/XBase'
import XCard from '../../XCommon/XCard'
import { getString } from '../../../AppLanguage'
import { colors, language } from '../../../AppConstants'
import FooterButtonFactory from '../../../util/FooterButtonFactory'
import { TransferoContext } from '../../../TransferoContext'
import IconFactory from '../../../util/IconFactory'
import { FileInfo } from '../../../type/FileTypes'
import { ActivityIndicator } from 'react-native'
import { ApplicationEvent } from '../../../type/ApplicationTypes'
import { MessageUtil } from '../../../util/MessageUtil'
import { EventRegister } from 'react-native-event-listeners'
import XCenterize from '../../XCommon/XCenterize'
import XErrorDisplay from '../../XCommon/XErrorDisplay'

const LOCATION = 'TransferClientScreen';

const TransferClientScreen = (screenProps: TransferClientScreenProp) => {
    const context = useContext(TransferoContext);
    if (!context) return <></>;

    const transferStartedRef = useRef(false);
    const fadeAnimRef = useRef(new Animated.Value(0)).current;
    const [proceedingFile, setProceedingFile] = useState<FileInfo | undefined>(undefined);
    const [progress, setProgress] = useState<number>(0);
    const [completed, setCompleted] = useState<boolean>(false);
    const [error, setError] = useState<Error | undefined>(undefined);

    const transferCompleted = () => {
        setCompleted(true);
    }

    const proceedingFileChanged = (e: FileInfo) => {
        setProceedingFile(e);
    }

    const progressChanged = (e: number) => {
        setProgress(e);
    }

    const errorOccured = (e: Error) => {
        setError(e);
    }

    useEffect(() => {
        if (!transferStartedRef.current) {
            transferStartedRef.current = true;
            EventRegister.emit(ApplicationEvent.FILE_INFO_LIST_CREATED_AS_CLIENT, screenProps.route.params.files);
            MessageUtil.sendClientMessage({
                type: 'transfer-start-message',
                content: screenProps.route.params.fileStartMessage
            });
        }

        context.onEvent({
            eventLocation: LOCATION,
            eventName: ApplicationEvent.TRANSFER_COMPLETED,
            eventCallback: () => transferCompleted(),
        })

        context.onEvent({
            eventLocation: LOCATION,
            eventName: ApplicationEvent.PROCEEDED_FILE_CHANGED,
            eventCallback: (e: FileInfo) => proceedingFileChanged(e),
        })

        context.onEvent({
            eventLocation: LOCATION,
            eventName: ApplicationEvent.PROGRESS_CHANGED,
            eventCallback: (e: number) => progressChanged(e),
        })

        context.onEvent({
            eventLocation: LOCATION,
            eventName: ApplicationEvent.ERROR_IN_TRANSFER,
            eventCallback: (e: Error) => errorOccured(e),
        })

        return () => context.rmAllEvents(LOCATION)
    }, []);

    useEffect(() => {
        const fadeInOut = Animated.loop(
            Animated.sequence([
                Animated.timing(fadeAnimRef, {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnimRef, {
                    toValue: 0,
                    duration: 1000,
                    easing: Easing.linear,
                    useNativeDriver: true,
                })
            ])
        );
        fadeInOut.start();
    }, [fadeAnimRef]);

    if (error) {
        return (<XErrorDisplay
            screenProps={screenProps}
            message={getString(language, 'transfer-screen-transfer-error') + ': ' + error} />)
    }

    if (completed) {
        return (<XBase description={getString(language, 'transfer-screen-completed-info')}
            footerContent={[FooterButtonFactory.abortButton(screenProps, context)]}>
            <View style={{ marginTop: 40 }} />
            <XCenterize>
                {IconFactory.createAntDesignIcon('like2', colors.color3, 200)}
            </XCenterize>
        </XBase>)
    }

    return (
        <XBase description={getString(language, 'transfer-screen-transfer-in-progress')}
            footerContent={[FooterButtonFactory.abortButton(screenProps, context, true)]}>
            <XCard
                title={`${getString(language, 'transfer-screen-percentage')}: ${progress.toFixed(2)}%`}
                icon={IconFactory.createMaterialCommunityIcon('directions-fork', colors.footerButtonColor)}
                nodes={[
                    {
                        icon: <ActivityIndicator color={colors.commonText} />,
                        text: proceedingFile?.path ?
                            formatText(proceedingFile.name) :
                            getString(language, 'transfer-screen-start-info'),
                    }
                ]}
                key={'transfer-client-screen-information-card'} />
            <Animated.View style={{ opacity: fadeAnimRef, justifyContent: 'center', alignContent: 'center', alignItems: 'center', marginTop: 60, flex: 1, flexDirection: 'row' }}>
                {IconFactory.createMaterialCommunityIcon('cellphone-text', colors.color3, 68)}
                {IconFactory.createAntDesignIcon('swap', colors.color3, 164)}
                {IconFactory.createMaterialCommunityIcon('cellphone-text', colors.color3, 68)}
            </Animated.View>
        </XBase>
    )
}

const formatText = (text: string, maxLength = 25) => {
    if (text.length > maxLength) {
        return '...' + text.slice(-maxLength + 3);
    }
    return text;
}


export default TransferClientScreen

const styles = StyleSheet.create({})
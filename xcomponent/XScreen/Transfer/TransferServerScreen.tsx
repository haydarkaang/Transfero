import { ActivityIndicator, Animated, Easing, StyleSheet, View } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { TransferServerScreenProp } from '../../../Navigation'
import { TransferoContext } from '../../../TransferoContext';
import { language, colors } from '../../../AppConstants';
import { getString } from '../../../AppLanguage';
import FooterButtonFactory from '../../../util/FooterButtonFactory';
import IconFactory from '../../../util/IconFactory';
import XBase from '../../XBase/XBase';
import XCard from '../../XCommon/XCard';
import { FileInfo } from '../../../type/FileTypes';
import { ApplicationEvent } from '../../../type/ApplicationTypes';
import XCenterize from '../../XCommon/XCenterize';
import XErrorDisplay from '../../XCommon/XErrorDisplay';

const LOCATION = 'TransferServerScreen';

const TransferServerScreen = (screenProps: TransferServerScreenProp) => {
    const context = useContext(TransferoContext);
    if (!context) return <></>;

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
                        text: proceedingFile?.path ? formatText(proceedingFile.name) : getString(language, 'transfer-screen-start-info'),
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

export default TransferServerScreen

const styles = StyleSheet.create({})
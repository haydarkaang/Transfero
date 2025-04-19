import { Alert, AppState, AppStateStatus, View } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import XBase from '../../XBase/XBase'
import { getString } from '../../../AppLanguage'
import { language } from '../../../AppConstants'
import { checkPermissionsAndroid, checkPermissionsIOS } from '../../../util/PermissionUtil'
import { isAndroid } from '../../../util/PlatformUtil'
import RejectedPermissionList from './RejectedPermissionList'
import FooterButtonFactory from '../../../util/FooterButtonFactory'
import XLoading from '../../XCommon/XLoading'
import { AnyScreenProp } from '../../../Navigation'
import { PermissionObject } from '../../../type/PermissionTypes'
import { TransferoContext } from '../../../TransferoContext'

const PermissionScreen = (screenProp: AnyScreenProp) => {
    const context = useContext(TransferoContext);
    if (!context) return <></>;

    const [rejectedPermissions, setRejectedPermissions] = useState<PermissionObject[] | undefined>(undefined);
    const [appState, setAppState] = useState<AppStateStatus>('active');
    const permissionDialogRef = useRef<boolean>(false);

    useEffect(() => {
        const subscription = AppState.addEventListener('change', status => setAppState(status));
        return () => subscription.remove();
    }, [])

    useEffect(() => {
        const server = context.getServer();
        if (!server && rejectedPermissions && rejectedPermissions.length == 0) {
            screenProp.navigation.navigate('StartServer');
        }
    }, [rejectedPermissions])

    useEffect(() => {
        if (appState == 'active' && !permissionDialogRef.current) {
            permissionDialogRef.current = true;
            const checker = isAndroid() ? checkPermissionsAndroid : checkPermissionsIOS;
            checker().then(r => setRejectedPermissions(r.rejectedPermissions))
                .catch(e => Alert.alert(e as string)).finally(() => permissionDialogRef.current = false);
        }
    }, [appState])

    return (
        <XBase description={getString(language, 'ask-permission')}
            footerContent={[FooterButtonFactory.permissionButton(undefined)]}>
            {
                !rejectedPermissions ?
                    <View style={{ marginTop: 60 }}><XLoading /></View> : rejectedPermissions.length !== 0 ?
                        <NoPermissionComponent rejectedPermissions={rejectedPermissions} />
                        : <></>
            }
        </XBase>
    )
}

const NoPermissionComponent = ({ rejectedPermissions }: { rejectedPermissions: PermissionObject[] }) => (
    <RejectedPermissionList permissionList={rejectedPermissions} />
)

export default PermissionScreen
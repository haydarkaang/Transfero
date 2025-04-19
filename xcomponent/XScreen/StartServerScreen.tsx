import { Alert, BackHandler, NativeEventSubscription, StyleSheet } from 'react-native'
import React, { useContext, useEffect, useRef } from 'react'
import XBase from '../XBase/XBase'
import { getString } from '../../AppLanguage'
import { language } from '../../AppConstants'
import { AnyScreenProp } from '../../Navigation'
import XLoading from '../XCommon/XLoading'
import { ServerEvent } from '../../type/ConnectionTypes'
import { AddressInfo } from 'react-native-tcp-socket/lib/types/Socket'
import XCenterize from '../XCommon/XCenterize'
import ServerManager from '../../manager/ServerManager'
import DeviceUtil from '../../util/DeviceUtil'
import ClientManager from '../../manager/ClientManager'
import { TransferoContext } from '../../TransferoContext'
import { MessageUtil } from '../../util/MessageUtil'

const LOCATION = 'StartServerScreen';

const StartServerScreen = (screenProps: AnyScreenProp) => {
  const backHandlerRef = useRef<NativeEventSubscription | undefined>(undefined);
  const context = useContext(TransferoContext)
  if (!context) return <></>

  const handleNavigation = () => {
    const address = ServerManager.getAdress(context);
    if (!address) {
      screenProps.navigation.navigate('NoConnection');
      return;
    }
    screenProps.navigation.navigate(
      'Home',
      {
        deviceName: DeviceUtil.getDeviceName(),
        ip: address.ip,
        port: address.port,
      }
    );
  }

  const onServerCreated = (e: AddressInfo) => {
    handleNavigation();
  }

  const onServerError = (e: Error) => {
    screenProps.navigation.navigate('NoConnection');
  }

  useEffect(() => {
    context.setDeviceType('server');
    const server = context.getServer();
    if (server && server.listening) {
      handleNavigation();
      return;
    }
    ClientManager.close(context);
    if (!DeviceUtil.checkIfWifiOn()) {
      screenProps.navigation.navigate('NoConnection');
      return;
    }
    context.onEvent({
      eventName: ServerEvent.CREATED,
      eventLocation: LOCATION,
      eventCallback: onServerCreated,
    });
    context.onEvent({
      eventName: ServerEvent.ERROR,
      eventLocation: LOCATION,
      eventCallback: onServerError,
    });
    ServerManager.init(context, DeviceUtil.getDeviceIP());
    if (ServerManager.getAdress(context) !== undefined) {
      handleNavigation();
    }
    const timeout = setTimeout(() => {
      if (ServerManager.getAdress(context) === undefined) {
        screenProps.navigation.navigate('NoConnection');
      }
    }, 3000);

    if (!backHandlerRef.current) {
      backHandlerRef.current = BackHandler.addEventListener('hardwareBackPress', () => {
        const handleAborting = () => {
          if (context) {
            if (context.getDeviceType() == 'server') {
              MessageUtil.sendServerMessage({
                type: 'process-aborted-by-server-message',
                content: { time: Date.now() }
              })
            } else {
              MessageUtil.sendClientMessage({
                type: 'process-aborted-by-client-message',
                content: { time: Date.now() }
              })
              ClientManager.close(context);
            }
          }
          screenProps.navigation.navigate('StartServer');
        }
        Alert.alert(
          getString(language, 'backhandler-alert-title'),
          getString(language, 'backhandler-alert-message'),
          [
            { text: getString(language, 'general-no'), isPreferred: true },
            { text: getString(language, 'general-yes'), onPress: handleAborting }
          ],
          { cancelable: false }
        )
        return true;
      });
    }

    return () => {
      context.rmAllEvents(LOCATION);
      clearTimeout(timeout);
    }
  }, [])

  return (
    <XBase
      description={getString(language, 'welcome-description-loading')}
      footerContent={[]}>
      <XCenterize>
        <XLoading />
      </XCenterize>
    </XBase>
  )
}

export default StartServerScreen

const styles = StyleSheet.create({})
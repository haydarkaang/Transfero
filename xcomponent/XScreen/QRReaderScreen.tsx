import { GestureResponderEvent, StatusBar, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { Camera, CameraDevice, CodeScanner, useCameraDevice, useCodeScanner } from 'react-native-vision-camera'
import React, { useContext, useEffect, useRef, useState } from 'react';
import { getString } from '../../AppLanguage';
import { colors, language, qrCodeSplitter } from '../../AppConstants';
import XText from '../XCommon/XText';
import Logo from '../../resource/svg/transfero-basic-icon.svg'
import XCenterize from '../XCommon/XCenterize';
import XBase from '../XBase/XBase';
import FooterButtonFactory from '../../util/FooterButtonFactory';
import { AnyScreenProp } from '../../Navigation';
import XLoading from '../XCommon/XLoading';
import { TransferoContext } from '../../TransferoContext';
import IconFactory from '../../util/IconFactory';

export default function QRReaderScreen(screenProps: AnyScreenProp) {
  const context = useContext(TransferoContext);
  let device = useCameraDevice('back');
  const [scannedData, setScannedData] = useState<string | undefined>();
  const [deviceFound, setDeviceFound] = useState<boolean>(false);
  const cameraRef = useRef<Camera | null>(null);
  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: (codes) => {
      let value: string = '';
      for (let index = 0; index < codes.length; index++) {
        const code = codes[index];
        value += qrCodeSplitter + (code.value ?? '[not decoded]');
      }
      setScannedData(value);
    }
  })

  useEffect(() => {
    let timeout = undefined;
    if (!device) {
      timeout = setTimeout(() => setDeviceFound(true), 4000);
    }
    return () => clearTimeout(timeout)
  }, [device]);

  useEffect(() => {
    if (scannedData) {
      screenProps.navigation.navigate('Pairing', { qrData: scannedData });
    }
  }, [scannedData])

  useEffect(() => {
    return () => {
      device = undefined;
      cameraRef.current = null;
    }
  })

  if (!deviceFound) {
    <XBase description={getString(language, 'qr-reader-camera-preparing')}
      footerContent={[FooterButtonFactory.abortButton(screenProps, context)]}>
      <View style={{ marginTop: 60 }} />
      <XLoading />
    </XBase>
  }

  if (scannedData) {
    return (
      <XBase description={getString(language, 'qr-reader-scanned-data-preparing')}
        footerContent={[FooterButtonFactory.abortButton(screenProps, context)]}>
        <View style={{ marginTop: 60 }} />
        <XLoading />
      </XBase>
    )
  }

  if (!device) {
    return (
      <XBase description={getString(language, 'qr-reader-error')}
        footerContent={[FooterButtonFactory.abortButton(screenProps)]}>
        <XCenterize>
          {IconFactory.createMaterialCommunityIcon('camera-off', colors.color3, 256)}
        </XCenterize>
      </XBase>
    )
  }


  return <CameraScreen screenProps={screenProps}
    cameraRef={cameraRef}
    device={device}
    codeScanner={codeScanner} />

}

function CameraScreen({ screenProps, cameraRef, device, codeScanner }: {
  screenProps: AnyScreenProp,
  cameraRef: React.RefObject<Camera | null>,
  device: CameraDevice,
  codeScanner: CodeScanner
}) {
  let mt = StatusBar.currentHeight ?? 15;

  const handleFocus = async (event: GestureResponderEvent) => {
    if (!device || !cameraRef || !cameraRef.current) return;

    try {
      const { locationX, locationY } = event.nativeEvent;
      await cameraRef.current.focus({ x: locationX, y: locationY });
    } catch (error) {
      // skip camera error
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={handleFocus}>
        <Camera isActive={true} style={StyleSheet.absoluteFill} device={device} codeScanner={codeScanner} ref={cameraRef} />
      </TouchableWithoutFeedback>
      <View style={{
        width: '100%', backgroundColor: '#0009', paddingTop: mt, paddingBottom: 12, alignItems: 'center',
        borderBottomLeftRadius: 22, borderBottomRightRadius: 22,
      }}>
        <Logo width={42} height={36} />
        <XText style={{ fontWeight: 'bold', width: '80%', textAlign: 'center' }}>{getString(language, 'qr-reader-desc')}</XText>
      </View>
      <View style={{
        width: '100%', paddingBottom: 64, paddingTop: 12, minHeight: 42, alignItems: 'center', position: 'absolute', bottom: 0,
        backgroundColor: '#0009', borderTopRightRadius: 22, borderTopLeftRadius: 22,
      }}>
        <View style={{ minWidth: '50%' }}>
          <TouchableOpacity
            onPress={() => screenProps.navigation.navigate('StartServer')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignContent: 'center',
              borderWidth: 1,
              borderColor: '#fff',
              borderRadius: 12,
              padding: 5,
              paddingHorizontal: 10,
            }}>
            <View style={{ flex: 1 }} />
            {IconFactory.createMaterialCommunityIcon('close', '#fff')}
            <View style={{ flex: 1 }} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({})
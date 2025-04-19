import { View, StyleSheet } from 'react-native'
import React from 'react'
import QRCode from 'react-native-qrcode-svg';
import { colors } from '../AppConstants';

export interface TQRCodeData {
    ip: string,
    port: number,
    deviceName: string
}

export default function TQRCode({ data }: { data: TQRCodeData }) {
    return (
        <View style={style.container}>
            <QRCode backgroundColor={colors.color1}
                color={colors.commonText}
                size={256}
                value={'transfero://' + btoa(JSON.stringify(data))} />
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: colors.color1,
        borderRadius: 12,
        alignItems: 'center'
    }
});
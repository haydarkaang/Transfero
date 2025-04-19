
import { StyleSheet, Text, TextStyle } from 'react-native'
import React, { ReactNode } from 'react'
import { TextProps } from 'react-native-svg'
import { colors } from '../../AppConstants'

interface TTextProps {
    props?: TextProps,
    children?: ReactNode,
    style?: TextStyle,
}

const XText = ({ props, children, style }: TTextProps) => {
    return (
        <Text style={{
            ...styles.text,
            ...style,
        }} {...props}>
            {children}
        </Text>
    )
}

const styles = StyleSheet.create({
    text: {
        color: colors.commonText,
        fontSize: 16,
    }
})

export default XText


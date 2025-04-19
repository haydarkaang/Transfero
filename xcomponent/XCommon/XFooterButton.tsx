import { GestureResponderEvent, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { ReactElement } from 'react'
import { colors } from '../../AppConstants'
import { Icon } from 'react-native-vector-icons/Icon'
import XText from './XText'

export type XFooterProps = {
  icon: ReactElement<Icon>,
  onPress: (e: GestureResponderEvent) => void,
  text?: string | undefined,
}

const XFooterButton = (props: XFooterProps) => {
  let content: ReactElement | undefined = undefined;
  if (props.text) {
    content = <TouchableOpacity
      onPress={props.onPress}
      style={{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        borderWidth: 1,
        borderColor: colors.footerButtonColor,
        borderRadius: 12,
        padding: 5,
        paddingHorizontal: 10,
      }}>
      {props.icon}
      <View style={{ flex: 1 }} />
      <XText style={{ color: colors.color3 }}> {props.text} </XText>
    </TouchableOpacity>
  } else {
    content = <TouchableOpacity
      onPress={props.onPress}
      style={{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        borderWidth: 1,
        borderColor: colors.footerButtonColor,
        borderRadius: 12,
        padding: 5,
      }}>
      <View style={{ flex: 1 }} />
      {props.icon}
      <View style={{ flex: 1 }} />
    </TouchableOpacity>
  }

  return (
    <View style={{ flex: 1 }}>
      {content}
    </View>
  )
}

export default XFooterButton

const styles = StyleSheet.create({})
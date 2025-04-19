import { StyleSheet, View } from 'react-native'
import React, { ReactElement, ReactNode } from 'react'
import { colors } from '../../AppConstants'
import { SafeAreaView } from 'react-native-safe-area-context'

export type XFooterProps = {
  children?: ReactElement | ReactElement[] | ReactNode | ReactNode[]
}

const XFooter = (props: XFooterProps) => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.footer}>
          {props.children}
        </View>
      </View>
    </SafeAreaView>
  )
}

export default XFooter

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    borderTopWidth: 1,
    borderColor: colors.footerTopBorder,
    paddingVertical: 10,
    boxShadow: [
      {
        offsetX: 0,
        offsetY: -2,
        blurRadius: 4,
        color: '#0000001a',
        spreadDistance: 0,
      }
    ]
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    gap: 10,
  },
})
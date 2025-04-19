import { ScrollView, StyleSheet, View } from 'react-native'
import React, { ReactElement, ReactNode } from 'react'
import XHeader from './XHeader'
import XDescription from './XDescription'
import XFooter from './XFooter'
import { colors } from '../../AppConstants'

const XBase = (props: XBaseProps) => {
  return (
    <View style={{ flex: 1 }}>
      <XHeader />
      <View style={styles.container}>
        <XDescription text={props.description} />
        <ScrollView style={styles.contentContainer}>
          {props.children}
        </ScrollView>
        <XFooter>
          {props.footerContent}
        </XFooter>
      </View>
    </View>
  )
}

export type XBaseProps = {
  children: ReactElement | ReactElement[] | ReactNode | ReactNode[],
  description: string,
  footerContent?: ReactElement | ReactElement[] | ReactNode | ReactNode[],
}

export default XBase

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: `${colors.appBackground}`,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    width: '90%',
    maxWidth: '90%',
    marginHorizontal: 'auto',
  }
})
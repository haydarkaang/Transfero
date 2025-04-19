import { StyleSheet, View } from 'react-native'
import React from 'react'
import XText from '../XCommon/XText'
import { colors } from '../../AppConstants';
import IconFactory from '../../util/IconFactory';

const XDescription = ({ text }: { text: string }) => {
  return (
    <View style={styles.container}>
      {IconFactory.createMaterialCommunityIcon('information-outline', '#fff', 24)}
      <XText style={{ minWidth: '90%', maxWidth: '90%' }}>{text}</XText>
    </View>
  )
}

export default XDescription

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    marginHorizontal: 'auto',
    padding: 10,
    alignContent: 'space-around',
    alignItems: 'flex-start',
    height: 'auto',
    minWidth: '90%',
    maxWidth: '90%',
    backgroundColor: colors.color2,
    borderRadius: 10,
    marginVertical: 10,
  }
})
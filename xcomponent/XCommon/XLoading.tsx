import { StyleSheet } from 'react-native'
import React from 'react'
import { CircleSnail } from 'react-native-progress'
import { colors } from '../../AppConstants'

const XLoading = () => {
  return (
    <CircleSnail size={200} spinDuration={3000} thickness={5}
      strokeCap='round' indeterminate={true} color={colors.color3} style={{ alignSelf: 'center' }} />
  )
}

export default XLoading

const styles = StyleSheet.create({})
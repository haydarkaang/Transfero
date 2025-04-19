import { View } from 'react-native'
import React, { ReactElement } from 'react'
import XText from './XText'
import { Icon } from 'react-native-vector-icons/Icon'
import { colors } from '../../AppConstants'

export type XCardContent = {
  icon: ReactElement<Icon>,
  title: string,
  nodes: XCardNode[]
}

export type XCardNode = {
  icon?: ReactElement<Icon>,
  text: string,
}

const XCard = (props: XCardContent) => {
  return (
    <View style={{
      flexDirection: 'column', backgroundColor: colors.color1,
      alignItems: 'center', marginVertical: 5, padding: 10,
      borderRadius: 12
    }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {props.icon}
        <View style={{ flex: 1 }} />
        <XText style={{ fontWeight: 700 }}>
          {props.title}
        </XText>
      </View>
      <View style={{ height: 1, width: '100%', borderColor: colors.commonText, borderBottomWidth: 1, marginVertical: 12 }} />
      <View />
      {
        props.nodes.map(
          node =>  <View key={node.text} style={{ flexDirection: 'row', marginBottom: 10 }}>
            {node.icon ?? null}
            <View style={{ flex: 1 }} />
            <XText>{node.text}</XText>
          </View>
        )
      }
    </View>
  )
}

export default XCard
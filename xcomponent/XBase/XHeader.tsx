import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { colors } from '../../AppConstants'
import Logo from '../../resource/svg/transfero-basic-icon.svg'
import { isAndroid } from '../../util/PlatformUtil'

const XHeader = () => {
  const [android, setAndroid] = useState<boolean>(true);
  useEffect(() => setAndroid(isAndroid()), [])

  return (android ? <AndroidHeader /> : <IOSHeader />)
}

const AndroidHeader = () => (
  <View style={{ backgroundColor: colors.appBackground }}>
    <StatusBar translucent={true} backgroundColor='rgba(0,0,0,0)' />
    <LinearGradient colors={colors.gradientInfo.color}
      useAngle={true}
      angleCenter={colors.gradientInfo.points}
      style={stylesAndroid.container}>
      <View style={{ flex: 1 }} />
      <View style={stylesAndroid.header}>
        <Logo width={40} height={20} />
        <Text style={stylesAndroid.txt}>
          ransfero
        </Text>
      </View>
    </LinearGradient>
  </View>
)

const IOSHeader = () => (
  <View style={stylesIOS.container}>
    <LinearGradient colors={colors.gradientInfo.color}
      useAngle={true}
      angleCenter={colors.gradientInfo.points}
      style={stylesIOS.gradient}>
      <View style={{ flex: 1 }} />
      <View style={stylesIOS.header}>
        <Logo width={40} height={20} />
        <Text style={stylesIOS.txt}>
          ransfero
        </Text>
      </View>
    </LinearGradient>
  </View>
)

const stylesAndroid = StyleSheet.create({
  container: {
    flexDirection: 'column',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignContent: 'flex-end',
    alignItems: 'center',
    verticalAlign: 'bottom',
    paddingTop: isAndroid() ? StatusBar.currentHeight ?? 0 : 0,
    paddingBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    gap: 5,
  },
  txt: {
    color: '#fff',
    fontSize: 26,
  }
})

const stylesIOS = StyleSheet.create({
  container: {
    verticalAlign: 'bottom',
    width: '100%',
  },
  gradient: {
    width: '100%',
    height: 95,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    gap: 5,
  },
  txt: {
    color: '#fff',
    fontSize: 26,
  }
})

export default XHeader
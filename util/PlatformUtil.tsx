import { Appearance, Platform } from "react-native"

export const isAndroid = () => Platform.OS == 'android';

export const isIOS = () => Platform.OS == 'ios'

export const isThemeDark = () => Appearance.getColorScheme() === 'dark'
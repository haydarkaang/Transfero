import { Langugage } from "./AppLanguage";
import { isThemeDark } from "./util/PlatformUtil";
import { getLocales } from "react-native-localize";

export const colors = {
    appBackground: isThemeDark() ? '#20242A' : '#FDFDFD',
    gradientInfo: {
        color: ['#0F67A4', '#017C47'],
        points: { x: 0.6, y: 0.5 }
    },
    commonText: '#fff',
    color1: isThemeDark() ? '#FFFFFF0F' : '#0F68A3',
    color2: '#027B4C',
    color3: isThemeDark() ? '#FFFA' : '#0F68A3',
    footerTopBorder: isThemeDark() ? '#ffffff1a' : '#0000001a',
    footerButtonColor: isThemeDark() ? '#fff' : '#0F68A3',
}

const getFirstLanguageCode = () => getLocales().at(0)?.languageCode.toLocaleLowerCase() ?? 'en';

export const language: Langugage = getFirstLanguageCode() === 'tr' ? 'tr' : 'en';
export const qrCodeSplitter: string = '[code-start]';
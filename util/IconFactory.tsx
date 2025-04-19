import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { StyleProp, TextStyle } from 'react-native';

const SIZE = 22;

const createMaterialCommunityIcon = (name: string, color: string, size?: number, style?: StyleProp<TextStyle>) =>
    <MaterialCommunityIcon name={name} color={color} size={size ?? SIZE} style={style} />

const createAntDesignIcon = (name: string, color: string, size?: number, style?: StyleProp<TextStyle>) =>
    <AntDesignIcon name={name} color={color} size={size ?? SIZE} style={style} />

const createEntypoIcon = (name: string, color: string, size?: number, style?: StyleProp<TextStyle>) =>
    <EntypoIcon name={name} color={color} size={size ?? SIZE} style={style} />

const IconFactory = {
    createMaterialCommunityIcon,
    createAntDesignIcon,
    createEntypoIcon,
}

export default IconFactory;
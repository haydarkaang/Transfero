import DeviceInfo from "react-native-device-info";

const getDeviceName = () => DeviceInfo.getDeviceNameSync();

const getDeviceIP = () => DeviceInfo.getIpAddressSync();

const checkIfWifiOn = () => getDeviceIP() !== '0.0.0.0';

const DeviceUtil = {
    getDeviceName,
    getDeviceIP,
    checkIfWifiOn,
}

export default DeviceUtil
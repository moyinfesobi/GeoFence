import { PermissionsAndroid, Platform} from "react-native";

async function requestLocationPermission () {
    try {
       if (Platform.OS === "android") {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'Location Permission',
                message: 'This app needs access to your location',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK'
            }
          );
          return granted === PermissionsAndroid.RESULTS.GRANTED;
       } else {
          return true;
       }
    } catch (err) {
       console.warn(err);
       return false;
    }
}

export default requestLocationPermission;
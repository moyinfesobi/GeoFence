import * as Location from 'expo-location';
import {  useEffect } from 'react';
import { Alert } from 'react-native';

interface LocationType {
  latitude: number;
  longitude: number;
}


export default function startLocationTracking(setLocation: (location: LocationType) => void) {
    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Denied', 'Location access is needed to use this feature');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
  
        Location.watchPositionAsync({
          accuracy: Location.Accuracy.High,
          timeInterval: 1000,
          distanceInterval: 1,
        }, (newLocation) => {
          setLocation({
            latitude: newLocation.coords.latitude,
            longitude: newLocation.coords.longitude,
          });
        });
      })();
    }, []);
  }
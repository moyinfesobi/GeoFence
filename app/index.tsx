import { useState, useEffect } from "react";
import { SafeAreaView, Alert } from "react-native";
import requestLocationPermission from "@/components/screens/Permisions";
import useGeofencing from "@/components/screens/hook/useGeofencing";
import Map from "@/components/screens/Map";
import * as Location from 'expo-location';

interface LocationType {
  latitude: number;
  longitude: number;
}

export default function Index() {
  const [location, setLocation] = useState<LocationType | null>(null);
  const [geofence, setGeoFence] = useState<LocationType | null>(null);

  useEffect(() => {
    const startTracking = async () => {
      try {
        const granted = await requestLocationPermission();
        if (granted) {
          let currentLocation = await Location.getCurrentPositionAsync({});
          setLocation({
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
          });

          await Location.watchPositionAsync(
            {
              accuracy: Location.Accuracy.High,
              timeInterval: 1000,
              distanceInterval: 1,
            },
            (newLocation) => {
              setLocation({
                latitude: newLocation.coords.latitude,
                longitude: newLocation.coords.longitude,
              });
            }
          );
        } else {
          Alert.alert('Permission Denied', 'Location access is needed to use this feature');
        }
      } catch (error:any) {
        if (error.code === 'E_LOCATION_UNAUTHORIZED') {
          Alert.alert('Error', 'Not authorized to use location services. Please enable location permissions in your device settings.');
        } else {
          Alert.alert('Error', 'An unexpected error occurred while accessing location services.');
        }
        console.error(error);
      }
    };

    startTracking();
  }, []);

  useEffect(() => {
    if (location) {
      useGeofencing(location, geofence, 500);
    }
  }, [location, geofence]);

  if (!location) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Map location={location} geoFence={geofence} setGeoFence={setGeoFence} />
    </SafeAreaView>
  );
}

import * as Location from 'expo-location';
import { useEffect } from 'react';
import { Alert } from 'react-native';

interface LocationType {
  latitude: number;
  longitude: number;
}

function useGeofencing(
  location: LocationType,
  geofence: LocationType | null,
  radius: number
) {
  useEffect(() => {
    let watchId: number | null = null;

    if (geofence) {
      const checkGeofence = (currentLocation: LocationType) => {
        const distance = calculateDistance(
          currentLocation.latitude,
          currentLocation.longitude,
          geofence.latitude,
          geofence.longitude
        );

        if (distance <= radius) {
          Alert.alert('Geofence', 'You have entered the geofenced area');
        } else {
          Alert.alert('Geofence', 'You have exited the geofenced area');
        }
      };

      const subscription = Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          distanceInterval: 1,
        },
        (position) => {
          const currentLocation: LocationType = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          checkGeofence(currentLocation);
        }
      );

     
      return () => {
        if (subscription) {
          subscription.then(sub => sub.remove());
        }
      };
    }
  }, [geofence, location, radius]);
}

function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const toRad = (x: number) => (x * Math.PI) / 180;

  const R = 6371; // Radius of the Earth in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c * 1000; // Distance in meters

  return distance;
}

export default useGeofencing;

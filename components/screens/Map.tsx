import MapView, {Marker, Circle} from "react-native-maps";
import React, { useState } from "react";
import { View } from "react-native";

interface MapProps {
    location: {
        latitude: number,
        longitude: number,
    };
    geoFence: {
        latitude: number,
        longitude: number,
    } | null;
    setGeoFence: (coordinate: { latitude: number, longitude: number}) => void;
}

const Map: React.FC<MapProps> = ({location, geoFence, setGeoFence} ) => {
   
  
    const [radius, setRadius] = useState(500); // Default radius
    return (
    
      <View style={{flex: 1}}>
      <MapView
         style={{flex: 1}}
         initialRegion={{
             latitude: location.latitude,
             longitude: location.longitude,
             latitudeDelta: 0.0922,
             longitudeDelta: 0.0421,
         }}
         onPress={(e) => setGeoFence(e.nativeEvent.coordinate)}
      >
        <Marker coordinate={location} />
        {
         geoFence && (
             <Circle 
               center={geoFence}
               radius={radius}
               strokeColor="rgba(0, 150, 136, 1)"
               fillColor="rgba(0, 150, 136, 0.3)"
             />
         )
        }
      </MapView>
     </View>
    
    );

};

export default Map;


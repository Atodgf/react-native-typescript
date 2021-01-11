import React, { FC, useState, useEffect } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';

const signUp : FC = () => {
    const [location, setLocation] = useState<any>(null);
    
    
    useEffect(() => {
        (async () => {
          let { status } = await Location.requestPermissionsAsync();
          if (status !== 'granted') {
            Alert.alert('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
        })();
      }, []);
    console.log(location)

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE} 
                style={styles.map}
                region={{
                    latitude: 53.9155828,
                    longitude: 27.4885124,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
                >
            </MapView> 
        </View>
    )
}

export default signUp

const styles = StyleSheet.create({
    container: {
        height:"100%",
        width:"100%",
        alignItems: 'center',
        justifyContent: 'flex-end',
      },
      map:{
          ...StyleSheet.absoluteFillObject
      }
})
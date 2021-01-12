import React, { FC, useState, useEffect } from 'react'
import { View, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native'
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

    return location !==null ?(
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE} 
                style={styles.map}
                showsUserLocation
                region={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
                >
            </MapView> 
        </View>
    ) : <ActivityIndicator style={{flex:1}} animating size = "large"/>
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
import React, { FC, useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Input, Button } from '../components'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';

const signUp : FC = (props:any) => {
    // const [location, setLocation] = useState<any>(null);
    // const [errorMsg, setErrorMsg] = useState<any>(null);
    
    // useEffect(() => {
    //     (async () => {
    //       let { status } = await Location.requestPermissionsAsync();
    //       if (status !== 'granted') {
    //         setErrorMsg('Permission to access location was denied');
    //         return;
    //       }
    
    //       let location = await Location.getCurrentPositionAsync({});
    //       setLocation(location);
    //     })();
    //   }, []);



    // const MapButton = () =>{
    //     return(
    //         <MapView
    //             provider={PROVIDER_GOOGLE} // remove if not using Google Maps
    //             style={styles.map}
    //             region={{
    //                 latitude: location.coords.latitude,
    //                 longitude: location.coords.longitude,
    //                 latitudeDelta: 0.015,
    //                 longitudeDelta: 0.0121,
    //             }}
    //             >
    //      </MapView> 
    //     )
    // }  
    return (
        <View style={styles.container}>
            <Button title="Map" onPress={()=> props.navigation.navigate('map')}/>
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
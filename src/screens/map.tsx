import React, { FC, useState, useEffect } from 'react'
import { View, Text, StyleSheet, Alert, ActivityIndicator, } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker, } from 'react-native-maps';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-community/async-storage'
import {  Button } from '../components'
import { TextInput } from 'react-native-gesture-handler';


const Map : FC = (props:any) => {
    const [location, setLocation] = useState<any>(null);
    const [shop, setShop] = useState<any>(null);

    useEffect(() => {
        (async () => {
          let keys = await AsyncStorage.getAllKeys()
          let shops = keys.reverse().slice(3)
          const finall:any = [] 
          shops.forEach(async(item)=>{
            finall.push(JSON.parse(await AsyncStorage.getItem(item) || '{}'))
            setShop(finall)
          })
          

          let { status } = await Location.requestPermissionsAsync();
          if (status !== 'granted') {
            Alert.alert('Permission to access location was denied');
            return;
          }
          
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
        })();
      }, []);

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
                    {shop.map((marker:any, index:any)=>{
                        if (marker.shoptype ==='supermarket'){
                            return(
                                <Marker title={marker.shopname} key={index} image={require('../images/Map-Marker-Azure.png')} coordinate={{latitude:parseFloat(marker.shoplatitude), longitude: parseFloat(marker.shoplontitude) }}/>
                            )
                        } if (marker.shoptype ==='boutique'){
                            return(
                                <Marker title={marker.shopname} key={index} image={require('../images/Map-Marker-Chartreuse.png')} coordinate={{latitude:parseFloat(marker.shoplatitude), longitude: parseFloat(marker.shoplontitude) }}/>
                            )
                        }if(marker.shoptype ==='bazaar'){
                            return(
                                <Marker title={marker.shopname} key={index} image={require('../images/map-marker-icon.png')} coordinate={{latitude:parseFloat(marker.shoplatitude), longitude: parseFloat(marker.shoplontitude) }}/>
                            )
                        }else {
                            return(
                                <Marker title={marker.shopname} key={index}  coordinate={{latitude:parseFloat(marker.shoplatitude), longitude: parseFloat(marker.shoplontitude) }}/>
                            )
                        }
                    })}
            </MapView> 
            <View style={styles.searchBox}>
                    <TextInput
                    placeholder="Search here"
                    placeholderTextColor="#000"
                    autoCapitalize="none"
                    style={{flex:1,padding:0}}
                    />
            </View>
            <View style={{
                height:"100%",
                width:"100%",
                alignItems: 'center',
                justifyContent: 'flex-end',}}>
                <Button title="Back" onPress={()=>props.navigation.goBack() }/>
            </View>
        </View>
    ) : <ActivityIndicator style={{flex:1}} animating size = "large"/>
}

export default Map

const styles = StyleSheet.create({
    container: {
        height:"100%",
        width:"100%",
        alignItems: 'center',
        
      },
      searchBox:{
          position:'absolute',
          marginTop: 30,
          flexDirection:'row',
          backgroundColor:'#fff',
          width:'90%',
          alignSelf:'center',
          borderRadius:5,
          padding:10,
          shadowColor:'#ccc',
          shadowOffset:{width:0, height:3},
          shadowOpacity:0.5,
          shadowRadius:5,
          elevation:10
      },
      map:{
          ...StyleSheet.absoluteFillObject
      }
})
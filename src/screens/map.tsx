import React, { FC, useState, useEffect } from 'react'
import { View, StyleSheet, Alert, ActivityIndicator, Button as ReactButton } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import {  Button as ButtonIcon, Icon, Text } from 'native-base';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-community/async-storage'
import {  Button } from '../components'
import { TextInput } from 'react-native-gesture-handler';
import { AuthContext } from '../components/context'


const Map : FC = (props:any) => {
    const [location, setLocation] = useState<any>(null);
    const [shop, setShop] = useState<any>('');
    const [search, setSearch] = useState<any>('');

    const { favHandler } = React.useContext(AuthContext)

    const setFavourite = async ( name:string)=>{
        favHandler( name)
      }
    
    const favourite = () =>{
        shop.map((item:any)=>{
            console.log(item.isFavourite)
        })
    }

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
                    {shop.filter( (item:any) =>{return item.shopname.toLowerCase().includes(search.toLowerCase())}).map((marker:any, index:any)=>{
                                console.log(marker.isFavourite)
                            
                        if (marker.shoptype ==='supermarket'){
                            return(
                                <Marker title={marker.shopname} key={index} image={require('../images/Map-Marker-Azure.png')} coordinate={{latitude:parseFloat(marker.shoplatitude), longitude: parseFloat(marker.shoplontitude) }}>
                                    <Callout tooltip onPress={()=>{setFavourite( marker.shopname)}}>
                                        <View style={styles.bubble}>
                                            <Text>Shop name: {marker.shopname}</Text>
                                            <Text>Shop type: {marker.shoptype}</Text>
                                            <ButtonIcon small rounded  dark  >
                                                <Icon name='heart' />
                                            </ButtonIcon>
                                        </View>
                                    </Callout>
                                </Marker>
                            )
                        } if (marker.shoptype ==='boutique'){
                            return(
                                <Marker title={marker.shopname} key={index} image={require('../images/Map-Marker-Chartreuse.png')} coordinate={{latitude:parseFloat(marker.shoplatitude), longitude: parseFloat(marker.shoplontitude) }}>
                                    <Callout tooltip onPress={()=>{setFavourite( marker.shopname)}}>
                                        <View style={styles.bubble}>
                                            <Text>Shop name: {marker.shopname}</Text>
                                            <Text>Shop type: {marker.shoptype}</Text>
                                            <ButtonIcon small rounded  dark >
                                                <Icon name='heart' />
                                            </ButtonIcon>
                                        </View>
                                    </Callout>
                                </Marker>
                            )
                        }if(marker.shoptype ==='bazaar'){
                            return(
                                <Marker title={marker.shopname} key={index} image={require('../images/map-marker-icon.png')} coordinate={{latitude:parseFloat(marker.shoplatitude), longitude: parseFloat(marker.shoplontitude) }}>
                                    <Callout tooltip onPress={()=>{setFavourite( marker.shopname)}}>
                                        <View style={styles.bubble}>
                                            <Text>Shop name: {marker.shopname}</Text>
                                            <Text>Shop type: {marker.shoptype}</Text>
                                            <ButtonIcon small rounded  dark >
                                                <Icon name='heart' />
                                            </ButtonIcon>
                                        </View>
                                    </Callout>
                                </Marker>
                            )
                        }else {
                            return(
                                <Marker title={marker.shopname} key={index} coordinate={{latitude:parseFloat(marker.shoplatitude), longitude: parseFloat(marker.shoplontitude) }}>
                                    <Callout tooltip onPress={()=>{setFavourite( marker.shopname)}}>
                                        <View style={styles.bubble}>
                                            <Text>Shop name: {marker.shopname}</Text>
                                            <Text>Shop type: {marker.shoptype}</Text>
                                            <ButtonIcon small rounded  dark >
                                                <Icon name='heart' />
                                            </ButtonIcon>
                                        </View>
                                    </Callout>
                                </Marker>
                            )
                        }
                    })}
            </MapView> 
            <View style={styles.searchBox}>
                    <TextInput
                    placeholder="Search here!"
                    placeholderTextColor="#000"
                    autoCapitalize="none"
                    style={{flex:1,padding:0}}
                    onChangeText={text =>{setSearch(text)}}
                    />
            </View>
            <View style={{
                height:"100%",
                width:"100%",
                alignItems: 'center',
                justifyContent: 'flex-end',}}>
                <Button title="Favourite" onPress={()=>favourite() }/>
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
      },
      bubble: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 6,
        borderColor: '#ccc'
      }
})
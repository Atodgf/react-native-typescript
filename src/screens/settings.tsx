import React, { FC, useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Switch, Alert } from 'react-native'
import {  Button } from '../components'
import { AuthContext } from '../context/context'
import {useTheme} from 'react-native-paper'
import * as Location from 'expo-location';


const signUp : FC = () => {

    const { signOut, toggleTheme } = React.useContext(AuthContext)
 
    const paperTheme = useTheme()

    const {colors} = useTheme()

    const [location, setLocation] = useState<any>(null);

    useEffect(() => {
        (async () => {
          let { status } = await Location.requestPermissionsAsync();
          if (status !== 'granted') {
            Alert.alert('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({})
            fetch (`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}&localityLanguage=en`)
            .then((responce)=>responce.json())
            .then((json=>{
            setData({
                city: json.city
                })
            })).catch((err)=> console.log(err))
          setLocation(location);
        })();
      }, []);

    const [data, setData] = React.useState ({
        city:"",
    })
   
    return (
        <View style={[styles.container, {
            backgroundColor:colors.background
        }]}>
            <Text style={{color: colors.text}}>Setting screen</Text>
            <Button title="Log out" onPress={() => {signOut()}}/>
            <Text>You are currently in: {data.city}</Text>
            <TouchableOpacity style={{marginTop:50}} onPress={()=>{toggleTheme()}}>
                <Text>Dark Theme</Text>
                <View pointerEvents="none">
                    <Switch value={paperTheme.dark}/>
                </View>
            </TouchableOpacity>
        </View>
        
    )
}

export default signUp

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
})
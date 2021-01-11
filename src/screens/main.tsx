import React, { FC,  } from 'react'
import { View,  StyleSheet } from 'react-native'
import {  Button } from '../components'


const signUp : FC = (props:any) => {
    
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
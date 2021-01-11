import React, { FC } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Input, Button } from '../components'
import AsyncStorage from '@react-native-community/async-storage'
import { AuthContext } from '../components/context'

const signUp : FC = () => {

    const { signOut } = React.useContext(AuthContext)
    const logout = async () =>{
        await AsyncStorage.removeItem('usertoken')
        
    }

    return (
        <View style={styles.container}>
            <Text>Setting screen</Text>
            <Button title="Log out" onPress={() => {signOut()}}/>
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
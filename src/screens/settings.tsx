import React, { FC, } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Switch  } from 'react-native'
import { Input, Button } from '../components'
import { AuthContext } from '../components/context'
import {useTheme} from 'react-native-paper'


const signUp : FC = () => {

    const { signOut, toggleTheme } = React.useContext(AuthContext)
 
    const paperTheme = useTheme()

    const {colors} = useTheme()


   
    return (
        <View style={[styles.container, {
            backgroundColor:colors.background
        }]}>
            <Text style={{color: colors.text}}>Setting screen</Text>
            <Button title="Log out" onPress={() => {signOut()}}/>
            <TouchableOpacity onPress={()=>{toggleTheme()}}>
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
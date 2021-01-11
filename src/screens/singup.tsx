import React, { FC, useState } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Input, Button } from '../components'
import { AuthContext } from '../components/context'


const signUp : FC = (props:any) => {

    const [data, setData] = React.useState ({
        login: '',
        password: '',
        confirmPassword: ''
    })

    const { signUp } = React.useContext(AuthContext)

    const handleLoginChange = (val:any) => {
        setData({
            ...data,
            login:val
        })
    }

    const handlePasswordChange = (val:any) => {
        setData({
            ...data,
            password:val
        })
    }
    const handleConfirmPasswordChange = (val:any) => {
        setData({
            ...data,
            confirmPassword:val
        })
    }


    const registerHandle = (login:any, password:any) => {
        
        if ( data.password !== data.confirmPassword ) {
            Alert.alert('Wrong Input!', 'Password doesn\'t match', [
                {text: 'Okay'}
            ]);
            return;
        }  else {
            props.navigation.navigate("login")
            signUp(login, password)
        }
    }

    return (
        <View style={styles.container}>
            <Text>Sign Up screen</Text>
            <Input placeholder="Login" onChangeText={(val) => handleLoginChange(val)}/>
            <Input placeholder="Password" secureTextEntry onChangeText={(val) => handlePasswordChange(val)}/>
            <Input placeholder="Confirm Password" secureTextEntry onChangeText={(val) => handleConfirmPasswordChange(val)}/>
            <Button title="Sign Up" onPress={()=> {registerHandle(data.login, data.password)}}/>
            <View style={styles.loginText}>
                <Text style={{marginHorizontal:5}}>Already have an account?</Text>
                <TouchableOpacity onPress={()=> props.navigation.navigate('login')} style={{marginHorizontal:5}}>
                    <Text style={{color: 'rgba(81,135,200,1)'}}>Login here</Text>
                </TouchableOpacity>
            </View>
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
      loginText:{
          flexDirection: 'row',
          marginVertical:20
      }
})
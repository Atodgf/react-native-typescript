import React, { FC, } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Input, Button } from '../components'
import { AuthContext } from '../context/context'
import schema from '../schemas/loginscheme'


const signUp : FC = (props:any) => {
    const [data, setData] = React.useState ({
        login: '',
        password: ''
    })
    

    const { signIn } = React.useContext(AuthContext)

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

    const handleChange = (val:any) => {
        setData({
            ...data,
            password:val
        })
    }
    const loginHandle =  async (login:any, password:any) => {
        const isValid = await schema.isValid(data)
        if (isValid === true) {
            signIn(login, password)
        } else {
            Alert.alert('Wrong Input!', 'Please try again', [
                {text: 'Ok'}
            ]);
            return;
        }
         
    }

    return (
        <View style={styles.container}>
            <Text>Login screen</Text>
            <Input placeholder="Login" onChangeText={(val) => handleLoginChange(val)}/>
            <Input placeholder="Password" secureTextEntry onChangeText={(val) => handlePasswordChange(val)}/>
            <Button title="Login" onPress={()=> {loginHandle(data.login, data.password)}}/>
            <View style={styles.loginText}>
                <Text style={{marginHorizontal:5}}>Don't have an account?</Text>
                <TouchableOpacity onPress={()=> props.navigation.navigate('signup')} style={{marginHorizontal:5}}>
                    <Text style={{color: 'rgba(81,135,200,1)'}}>Sing up here</Text>
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
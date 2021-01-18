import React, { FC, } from 'react'
import { View, Text, StyleSheet,  } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Input, Button } from '../components'
import { AuthContext } from '../components/context'
import schema from '../schemas/validationscheme'


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
    const loginHandle =  async (login:any, password:any) => {
         signIn(login, password)
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
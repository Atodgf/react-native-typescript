import React, { FC } from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {SignUp, Login, SplashScreen} from '../screens'

const {Navigator, Screen} = createStackNavigator()

const AuthStack: FC = () => {
    return(
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name="splashscreen" component={SplashScreen}/>
            <Screen name="signup" component={SignUp}/>
            <Screen name="login" component={Login}/>
        </Navigator>
    )
} 

export default AuthStack
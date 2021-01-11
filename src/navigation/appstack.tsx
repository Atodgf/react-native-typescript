import React, { FC } from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {Main, Settings, Map} from '../screens'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

const {Navigator, Screen} = createStackNavigator()
const Tab = createBottomTabNavigator()


const MainTab = () =>{
    return(
        <Tab.Navigator>
            <Tab.Screen name="main" component={Main}/>
            <Tab.Screen name="settings" component={Settings}/>
            <Tab.Screen name="map" component={Map}/>
        </Tab.Navigator>
    )
}

const AppStack: FC = () => {
    return(
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name="mainTab" component={MainTab}/>
        </Navigator>
    )
} 

export default AppStack
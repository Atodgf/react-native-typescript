import React, { FC } from 'react'
import {createStackNavigator,} from '@react-navigation/stack'
import {Main, Settings, Map, ShopForm} from '../screens'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

const {Navigator, Screen} = createStackNavigator()
const Tab = createBottomTabNavigator()


const MainTab = () =>{
    return(
        <Tab.Navigator >
            <Tab.Screen name="Main" component={Main}/>
            <Tab.Screen name="Settings" component={Settings}/>
            <Tab.Screen name="Shops" component={ShopForm}/>
        </Tab.Navigator>
    )
}

const AppStack: FC = () => {
    return(
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name="mainTab" component={MainTab}/>
            <Screen name="map" component={Map}/>
        </Navigator>
    )
} 

export default AppStack
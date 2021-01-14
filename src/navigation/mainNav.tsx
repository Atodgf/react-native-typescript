import React, { FC, useEffect, } from 'react'
import {NavigationContainer, DarkTheme, DefaultTheme} from '@react-navigation/native'
import {  Alert, View, ActivityIndicator} from 'react-native';
import AppStack from './appstack'
import AuthStack from './authstack'
import AsyncStorage from '@react-native-community/async-storage'
import { AuthContext } from '../components/context'



const MainNav : FC = () => {
    
    const [isDarkTheme, setIsDarkTheme] = React.useState(false)

    const inicialLoginState = {
        isLoading: true,
        login:null,
        password: null,
        userToken:null
      }

    const CustomDefaultTheme = {
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        backgroud:'#ffffff',
        text: '#333333'
      }
    } 
    
    const CustomDarkTheme = {
      ...DarkTheme,
      colors: {
        ...DarkTheme.colors,
        backgroud:'#333333',
        text: '#ffffff'
      }
    }  

    const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme

    const loginReducer = (prevState:any, action:any) => {
        switch (action.type) {
          case 'RETRIEVE_TOKEN':
            return {
              ...prevState,
              userToken: action.token,
              isLoading: false,
            };
          case 'LOGIN':
            return {
              ...prevState,
              userToken: action.token,
              isLoading: false,
            };
          case 'LOGOUT':
            return {
              ...prevState,
              userToken: null,
              isLoading: false,
            };
          case 'REGISTER':
            return {
              ...prevState,
              login: action.id,
              password: action.value,
              isLoading: false,
            };   
        }
      }

    const [loginState, dispatch] = React.useReducer(loginReducer, inicialLoginState)

    const authContext = React.useMemo(() => ({
        signIn: async(login:any, password:any) => {
          let userToken
          userToken = null
          const storagelogin = await AsyncStorage.getItem('login')
          const storagePassword = await AsyncStorage.getItem('password')
          if (login === storagelogin && password === storagePassword) {
              try {
                userToken= "righttoken"
                await AsyncStorage.setItem('userToken', userToken)
                await AsyncStorage.getItem('login')
              } catch(e) {
                console.log(e)
              }
          } else {
            console.log('Fail')
            Alert.alert(
              'Wrong login or password!',
              'Please try again!',)
          }
          dispatch({type: 'LOGIN', token: userToken})
        },
        signOut: async() => {
          dispatch({type: 'LOGOUT'})
          try {
            await AsyncStorage.removeItem('userToken')
          } catch(e) {
            console.log(e)
          }
        },
    
        signUp: async(login:any, password:any) => {
              try {
                await AsyncStorage.setItem('login', login)
                await AsyncStorage.setItem('password', password)
              } catch(e) {
                console.log(e)
            }
            
          dispatch({type: 'REGISTER', id: login, value: password})
        },
        toggleTheme:()=>{
          setIsDarkTheme(isDarkTheme=>!isDarkTheme)
        },
        shopForm: async(name:any, type:any, price:any, latitude:any, lontitude:any) =>{
          const newShop = {
            shopname: name,
            shoptype: type,
            shopprice: price,
            shoplatitude: latitude,
            shoplontitude: lontitude
          }
          try {
            await AsyncStorage.setItem(name, JSON.stringify(newShop))
          } catch(e) {
            console.log(e)
        }
        }
      }), [])
    
    
      useEffect(() => {
        setTimeout (async() => {
          let userToken = null
          try {
            userToken = await AsyncStorage.getItem('userToken')
          } catch(e) {
            console.log(e)
          }
          dispatch({type: 'RETRIEVE_TOKEN', token: userToken})
        }, 1000)
      }, [])

      if (loginState.isLoading) {
        return(
          <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <ActivityIndicator size="large"/>
          </View>
        )
      }

    return(
        <AuthContext.Provider value={authContext}>
          <NavigationContainer theme={theme}>
            {loginState.userToken !== null ? <AppStack /> : <AuthStack/>}
          </NavigationContainer>
        </AuthContext.Provider>
    )
}

export default MainNav
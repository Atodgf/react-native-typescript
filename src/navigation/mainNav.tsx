import React, { FC, useEffect, } from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {  Alert} from 'react-native';
import AppStack from './appstack'
import AuthStack from './authstack'
import AsyncStorage from '@react-native-community/async-storage'
import { AuthContext } from '../components/context'



const MainNav : FC = () => {
    

    const inicialLoginState = {
        isLoading: true,
        login:null,
        password: null,
        userToken:null
      }

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



    return(
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
            {loginState.userToken !== null ? <AppStack /> : <AuthStack/>}
        </NavigationContainer>
        </AuthContext.Provider>
    )
}

export default MainNav
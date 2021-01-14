import React from 'react'

type ContextProps = { 
    signIn: any,
    signUp: any,
    signOut: any,
    toggleTheme:any,
    shopForm:any
  };

export const AuthContext = React.createContext<Partial<ContextProps>>({})
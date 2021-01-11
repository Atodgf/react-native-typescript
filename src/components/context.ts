import React from 'react'

type ContextProps = { 
    signIn: any,
    signUp: any,
    signOut: any,
  };

export const AuthContext = React.createContext<Partial<ContextProps>>({})
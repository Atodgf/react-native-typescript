import React, {FC} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';


const SplashScreen: FC = (props:any) => {
    
    return (
      <View style={styles.container}>
            <View style={styles.header}>
                <Image
                        source={require('../images/welcome.jpg')}
                        style={styles.logo}
                        resizeMode="stretch"
                    />
            </View>
            <View style={styles.footer}>
                <Text style={styles.title}>Stay connected with everyone!</Text>
                <Text style={styles.text}>Sign in with account</Text>
                <View style={styles.button}>
                    <TouchableOpacity onPress={()=>props.navigation.navigate('login')}>
                        <View style={styles.signIn}>
                            <Text style={styles.textSign}>Login </Text>
                            
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>props.navigation.navigate('signup')}>
                        <View style={styles.signUp}>
                            <Text style={styles.textSign}>Sign Up </Text>
                            
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
      </View>
    );
};

export default SplashScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#009387'
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
  },
  footer: {
      flex: 1,
      backgroundColor: '#fff',
      paddingVertical: 50,
      paddingHorizontal: 30
  },
  logo: {
        width: "100%",
        height: "100%",
  },
  title: {
      color: '#05375a',
      fontSize: 30,
      fontWeight: 'bold'
  },
  text: {
      color: 'grey',
      marginTop:5
  },
  button: {
      alignItems: 'flex-end',
      marginTop: 30
  },
  signIn: {
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      marginBottom: 20,
      flexDirection: 'row',
      backgroundColor: '#009387'
  },
  signUp: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
    backgroundColor: '#009387'
},
  textSign: {
      color: '#fff',
      fontWeight: 'bold',
  }
});
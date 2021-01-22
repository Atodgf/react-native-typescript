import React, { FC, } from 'react'
import { View, Text, StyleSheet, Alert,  } from 'react-native'
import { Input, Button } from '../components'
import { AuthContext } from '../context/context'
import {Picker} from '@react-native-picker/picker';


const shopForm : FC = (props:any) => {
    const [data, setData] = React.useState<any> ({
        name: '',
        type: '',
        price: '',
        latitude:'',
        lontitude: '',
        isFavourite: false
    })

    const { shopForm } = React.useContext(AuthContext)

    const handleNameChange = (val:string, ) => {
        setData({
            ...data,
            name:val,
        })
    }
    const handleLatitudeChange = (val:string, ) => {
        setData({
            ...data,
            latitude:val,
        })
    }
    const handleLontitudeChange = (val:string, ) => {
        setData({
            ...data,
            lontitude:val,
        })
    }
    const shopsHandle = (name:string, type:string, price:string, latitude:string, lontitude:string, isFavourite:boolean) => {
        
        shopForm(name, type, price, latitude, lontitude, isFavourite)
    }
    const createHandle = () =>{
        shopsHandle(data.name, data.type, data.price, data.latitude, data.lontitude, data.isFavourite)
        Alert.alert('Success!','You succesfully created a new shop!')
        props.navigation.navigate('mainTab')
    }

    return (
        <View style={styles.container}>
            <Text>Add new shop here!</Text>
            <Input placeholder="Name"  onChangeText={(val) => handleNameChange(val)}/>
            <View style={{flexDirection: 'row',}}>
                <Text style={{marginTop:15, fontSize:15}}>Type:</Text>
                <Picker
                    selectedValue={data.type}
                    style={{height: 50, width: 200,  }}
                    onValueChange={(itemValue, itemIndex) =>
                        setData({...data, type: itemValue})
                    }
                >   
                    <Picker.Item label="boutique" value="boutique" />
                    <Picker.Item label="bazaar" value="bazaar" />
                    <Picker.Item label="supermarket" value="supermarket" />
                </Picker>
            </View>
            <View style={{flexDirection: 'row', }}>
                <Text style={{marginTop:15, fontSize:15}}>Price:</Text>
                <Picker
                    
                    selectedValue={data.price}
                    style={{height: 50, width: 200,  }}
                    onValueChange={(itemValue, itemIndex) =>
                        setData({...data, price: itemValue})
                    }
                >
                    <Picker.Item label="low" value="low" />
                    <Picker.Item label="medium" value="medium" />
                    <Picker.Item label="high" value="high" />
                </Picker>
            </View>
            <Text>Coordinates:</Text>
            <Input placeholder="Latitude"  onChangeText={(val) => handleLatitudeChange(val)}/>
            <Input placeholder="Lontitude"  onChangeText={(val) => handleLontitudeChange(val)}/>
            <Button title="Create" onPress={()=> {createHandle()}}/>
            <Button title="Back" onPress={()=>props.navigation.goBack() }/>
        </View>
    )
}

export default shopForm

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
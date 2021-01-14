import React, { FC, } from 'react'
import { View, Text, StyleSheet,  } from 'react-native'
import { Input, Button } from '../components'
import { AuthContext } from '../components/context'
import {Picker} from '@react-native-picker/picker';


const shopForm : FC = (props:any) => {
    const [data, setData] = React.useState<any> ({
        name: '',
        type: '',
        price: '',
        latitude:'',
        lontitude: ''
    })

    const { shopForm } = React.useContext(AuthContext)

    const handleNameChange = (val:any, ) => {
        setData({
            ...data,
            name:val,
        })
    }
    const handleLatitudeChange = (val:any, ) => {
        setData({
            ...data,
            latitude:val,
        })
    }
    const handleLontitudeChange = (val:any, ) => {
        setData({
            ...data,
            lontitude:val,
        })
    }
    const shopsHandle = (name:any, type:any, price:any, latitude:any, lontitude:any, ) => {
        
        shopForm(name, type, price, latitude, lontitude)
    }

    return (
        <View style={styles.container}>
            <Text>Add new shop here!</Text>
            <Input placeholder="Name" onChangeText={(val) => handleNameChange(val)}/>
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
            <Input placeholder="Latitude" onChangeText={(val) => handleLatitudeChange(val)}/>
            <Input placeholder="Lontitude" onChangeText={(val) => handleLontitudeChange(val)}/>
            <Button title="Create" onPress={()=> {shopsHandle(data.name, data.type, data.price, data.latitude, data.lontitude)}}/>
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
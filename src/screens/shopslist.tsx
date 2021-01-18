import React, { FC, useState, useEffect } from 'react'
import { StyleSheet, FlatList  } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { Container, Header, Item, Input, Icon, Button, Text, List, ListItem } from 'native-base';
import { AuthContext } from '../components/context'



const Shops : FC = (props:any) => {
    const [data, setData] = useState<any>([]);
    const [search, setSearch] = useState<any>('');

    useEffect(() => {
        (async () => {
          let keys = await AsyncStorage.getAllKeys()
          let shops = keys.reverse().slice(3)
          const finall:any = [] 
          shops.forEach(async(item)=>{
            finall.push(JSON.parse(await AsyncStorage.getItem(item) || '{}'))
            setData(finall)
          })
        })();
      }, []);

    const { favHandler } = React.useContext(AuthContext)
    const favourite = async ( name:string)=>{
      favHandler( name)
    }

    const filteredData = data.filter( (item:any) =>{
      return item.shopname.toLowerCase().includes(search.toLowerCase())
    })

    const renderData = ({item, index}:any) => {
      if (item.isFavourite === true ) {
        return(
          <ListItem>
            <Text>{item.shopname}</Text>
            <Button small rounded  danger onPress={()=>{favourite( item.shopname)}}>
              <Icon name='heart' />
            </Button>
          </ListItem>
    )
      } else {
        return(
          <ListItem>
            <Text>{item.shopname} </Text>
            <Button small rounded  dark onPress={()=>{favourite( item.shopname)}}>
              <Icon name='heart' />
            </Button>
          </ListItem>
    )
      }
      
    }


    return (
      <Container>
      <Header searchBar rounded>
        <Item>
          <Icon name="ios-search" />
          <Input placeholder="Search" onChangeText={text =>{setSearch(text)}}/>
        </Item>
      </Header>
      <List>
        <FlatList
        data={filteredData}
        renderItem={renderData}
        keyExtractor={(item, index)=> index.toString()}/>
          </List>
    </Container>
    )
}

export default Shops

const styles = StyleSheet.create({
    container: {
        height:"100%",
        width:"100%",
        alignItems: 'center',
        justifyContent: 'flex-end',
      },
    shop: {
      height:"80%",
      justifyContent: 'flex-start',
    
    },
      map:{
          ...StyleSheet.absoluteFillObject
      }
})
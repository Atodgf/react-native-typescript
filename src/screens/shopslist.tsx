import React, { FC, useState, useEffect } from 'react'
import { View, StyleSheet, Alert, ActivityIndicator, FlatList  } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { Container, Header, Item, Input, Icon, Button, Text, Content, List, ListItem } from 'native-base';



const Shops : FC = (props:any) => {
    const [data, setData] = useState<any>([]);
    const [search, setSearch] = useState<any>([]);
    

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
    const favourite = ()=>{

    }

    const renderData = ({item, index}:any) => {
      return(
            <ListItem>
              <Text>{item.shopname} </Text>
              <Button small rounded  danger onPress={()=>{favourite()}}>
                <Icon name='heart' />
              </Button>
            </ListItem>
      )
    }

    const handleSearch = (text:any) =>{
      setSearch(data.filter((i:any)=>{
        i.shopname.includes(text)
        console.log(search)
      }))
      
    }

    return (
      <Container>
      <Header searchBar rounded>
        <Item>
          <Icon name="ios-search" />
          <Input placeholder="Search" onChangeText={text =>{handleSearch(text)}}/>
        </Item>
      </Header>
      <List>
        <FlatList
        data={data}
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
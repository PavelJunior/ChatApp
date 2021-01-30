import React, { useEffect, useState } from 'react'
import {StyleSheet, View, FlatList} from 'react-native'
import ChatListItem from './../components/ChatListItem'

import { API, Auth, graphqlOperation } from 'aws-amplify'
import { getUser } from './../graphql/customQueries'
import {onDeleteMessage, onCreateMessage, onUpdateChatRoom} from "../graphql/subscriptions";

const ChatsScreen = () => {
  const [chatRooms, setChatRooms] = useState([])

  const fetchChatRooms = async () => {
    try {
      const userInfo = await Auth.currentAuthenticatedUser()

      const userData = await API.graphql(
        graphqlOperation(
          getUser, {
            id: userInfo.attributes.sub
          }
        )
      )
      let newChatRooms = userData.data.getUser.chatRoomUser.items;
      setChatRooms(newChatRooms.filter(item => item.chatRoom.lastMessage))
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchChatRooms()
  }, [])

  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onCreateMessage)
    ).subscribe({
      next: (data) => {
        // check whether you need to update or not
        fetchChatRooms()
      }
    })

    return () => subscription.unsubscribe();
  }, [])

  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onDeleteMessage)
    ).subscribe({
      next: (data) => {
        // check whether you need to update or not
        fetchChatRooms()
      }
    })

    return () => subscription.unsubscribe();
  }, [])

  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onUpdateChatRoom)
    ).subscribe({
      next: (data) => {
        // check whether you need to update or not
        fetchChatRooms()
      }
    })

    return () => subscription.unsubscribe();
  }, [])

  return (
    <View style={styles.container}>
      <FlatList data={chatRooms}
                style={styles.list}
                renderItem={({item}) => <ChatListItem chatRoom={item.chatRoom}/>}
                keyExtractor={(item) => item.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    width: '100%'
  }
})

export default ChatsScreen;

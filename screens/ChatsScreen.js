import React, { useEffect, useState } from 'react'
import {StyleSheet, View, FlatList} from 'react-native'
import ChatListItem from './../components/ChatListItem'

import { API, Auth, graphqlOperation } from 'aws-amplify'
import { getUser } from './../graphql/customQueries'

const ChatsScreen = () => {
  const [chatRooms, setChatRooms] = useState([])

  useEffect(() => {
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

        setChatRooms(userData.data.getUser.chatRoomUser.items)
      } catch (e) {
        console.log(e)
      }
    }

    fetchChatRooms()
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
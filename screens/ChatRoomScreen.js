import React, {useState, useEffect} from 'react'
import {StyleSheet, Text, FlatList, ImageBackground} from 'react-native'

import { useRoute } from '@react-navigation/native';

import ChatMessage from './../components/ChatMessage'
import InputBox from './../components/InputBox'
import BG from './../assets/images/BG.png'
import {API, graphqlOperation, Auth} from "aws-amplify";
import {messagesByChatRoom} from "../graphql/customQueries";


const ChatsRoomScreen = () => {
  const [messages, setMessages] = useState([])
  const [myId, setMyId] = useState(null)
  const route = useRoute();

  useEffect(() => {
    const fetchMessages = async () => {
      const messagesData = await API.graphql(
        graphqlOperation(
          messagesByChatRoom, {
            chatRoomID: route.params.id,
            sortDirection: "DESC",
          }
        )
      )

      console.log(messagesData)
      setMessages(messagesData.data.messagesByChatRoom.items)
    }

    fetchMessages()
  }, [])

  useEffect(() => {
    const getMyId = async () => {
      const userData = await Auth.currentAuthenticatedUser()
      setMyId(userData.attributes.sub)
    }

    getMyId()
  }, [])

  return (
    <ImageBackground style={styles.background} source={BG}>
      <FlatList data={messages}
                renderItem={({item}) => <ChatMessage message={item} myId={myId}/>}
                keyExtractor={(item) => item.id}
                inverted
      />
      <InputBox chatRoomId={route.params.id}/>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%'
  },

})

export default ChatsRoomScreen;
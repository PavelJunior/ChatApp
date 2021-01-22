import React, {useState, useEffect} from 'react'
import {StyleSheet, Text, FlatList, ImageBackground, KeyboardAvoidingView} from 'react-native'

import { useRoute } from '@react-navigation/native';

import ChatMessage from './../components/ChatMessage'
import InputBox from './../components/InputBox'
import BG from './../assets/images/BG.png'
import {API, graphqlOperation, Auth} from "aws-amplify";
import {messagesByChatRoom} from "../graphql/customQueries";
import {onCreateMessage} from "../graphql/subscriptions";


const ChatsRoomScreen = () => {
  const [messages, setMessages] = useState([])
  const [myId, setMyId] = useState(null)
  const route = useRoute();

  const fetchMessages = async () => {
    const messagesData = await API.graphql(
      graphqlOperation(
        messagesByChatRoom, {
          chatRoomID: route.params.id,
          sortDirection: "DESC",
        }
      )
    )

    setMessages(messagesData.data.messagesByChatRoom.items)
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  useEffect(() => {
    const getMyId = async () => {
      const userData = await Auth.currentAuthenticatedUser()
      setMyId(userData.attributes.sub)
    }

    getMyId()
  }, [])

  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onCreateMessage)
    ).subscribe({
      next: (data) => {
        const newMessage = data.value.data.onCreateMessage;

        if(newMessage && newMessage.chatRoomID !== route.params.id){
          console.log("Message is in another room.")
          return;
        }

        fetchMessages()
      }
    })

    return () => subscription.unsubscribe();
  }, [])


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      <ImageBackground style={styles.background} source={BG}>
        <FlatList data={messages}
                  renderItem={({item}) => <ChatMessage message={item} myId={myId}/>}
                  keyExtractor={(item) => item.id}
                  inverted
        />
        <InputBox chatRoomId={route.params.id}/>
      </ImageBackground>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%'
  },

})

export default ChatsRoomScreen;
import React from 'react'
import {StyleSheet, Text, FlatList, ImageBackground} from 'react-native'

import { useRoute } from '@react-navigation/native';

import chatRoomData from './../data/Chats'
import ChatMessage from './../components/ChatMessage'
import InputBox from './../components/InputBox'
import BG from './../assets/images/BG.png'

const ChatsRoomScreen = () => {

  const route = useRoute();

  return (
    <ImageBackground style={styles.background} source={BG}>
      <FlatList data={chatRoomData.messages}
                renderItem={({item}) => <ChatMessage message={item}/>}
                keyExtractor={(item) => item.id}
                inverted
      />
      <InputBox/>
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
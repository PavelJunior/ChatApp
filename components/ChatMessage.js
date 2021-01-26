import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native'
import moment from 'moment'
import {Storage} from 'aws-amplify';
import AudioMessage from '../components/AudioMessage'
import ImageMessage from '../components/ImageMessage'

const ChatMessage = (props) => {
  const [file, setFile] = useState(null)
  const {message, myId} = props;

  useEffect( () => {
   const getFile = async() => {
     const url = await Storage.get(message.content)
     setFile(url)
   }
   getFile()

  }, [])

  const isMyMessage = () => {
    return message.user.id === myId;
  }

  return (
    <View style={styles.container}>
      <View style={[styles.messageBox, {
        backgroundColor: isMyMessage() ? '#DCF8C5' : 'white',
        marginLeft: isMyMessage() ? 50 : 0,
        marginRight: isMyMessage() ? 0 : 50,
      }]}>
        {!isMyMessage() && <Text style={styles.name}>{message.user.name}</Text>}
        {message.type === 'text' && <Text style={styles.message}>{message.content}</Text>}
        {message.type === 'photo' && <ImageMessage file={file}/>}
        {message.type === 'audio' && <AudioMessage file={file}/>}
        <Text style={styles.time}>{moment(message.createdAt).fromNow()}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  messageBox: {
    padding: 10,
    borderRadius: 5,
  },
  name: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  message: {

  },
  time: {
    alignSelf: 'flex-end',
    color: 'grey',
    marginTop: 8
  }
})

export default ChatMessage;

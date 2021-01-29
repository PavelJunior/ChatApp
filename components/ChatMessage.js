import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableWithoutFeedback} from 'react-native'
import moment from 'moment'
import {Storage} from 'aws-amplify';
import AudioMessage from '../components/AudioMessage'
import ImageMessage from '../components/ImageMessage'
import MessageActionMenu from './MessageActionMenu'


const ChatMessage = (props) => {
  const [file, setFile] = useState(null)
  const [visible, setVisible] = useState(false);
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

  const setInvisible = () => {
    setVisible(false)
  }

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onLongPress={() => {setVisible(true)}}>
        <View style={[styles.messageBox, {
          backgroundColor: isMyMessage() ? '#DCF8C5' : 'white',
          marginLeft: isMyMessage() ? 50 : 0,
          marginRight: isMyMessage() ? 0 : 50,
        }]}>
          {!isMyMessage() && <Text style={styles.name}>{message.user.name}</Text>}
          {message.type === 'text' && <Text>{message.content}</Text>}
          {message.type === 'photo' && <ImageMessage file={file}/>}
          {message.type === 'audio' && <AudioMessage file={file}/>}
          <Text style={styles.time}>{moment(message.createdAt).fromNow()}</Text>
        </View>
      </TouchableWithoutFeedback>
      <MessageActionMenu messageId={message.id} visible={visible} setInvisible={setInvisible}/>
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
  time: {
    alignSelf: 'flex-end',
    color: 'grey',
    marginTop: 8
  }
})

export default ChatMessage;

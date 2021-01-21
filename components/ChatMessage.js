import React from 'react'
import {StyleSheet, View, Text} from 'react-native'
import moment from 'moment'


const ChatMessage = (props) => {
  const {message, myId} = props;

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
        <Text style={styles.message}>{message.content}</Text>
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
    borderRadius: 5
  },
  name: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  message: {

  },
  time: {
    alignSelf: 'flex-end',
    color: 'grey'
  }
})

export default ChatMessage;
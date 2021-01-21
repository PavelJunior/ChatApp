import React, {useState, useEffect} from 'react'
import {StyleSheet, View, TextInput, TouchableOpacity} from 'react-native'

import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome5,
  Entypo,
  Fontisto,
} from '@expo/vector-icons';

import {API, graphqlOperation, Auth} from 'aws-amplify'
import {createChatRoomUser, createMessage, updateChatRoom} from './../graphql/mutations'


const InputBox = (props) => {
  const {chatRoomId} = props;
  const [message, setMessage] = useState('')
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser()
      setUserId(userInfo.attributes.sub)
    }
    fetchUser()
  }, [])

  const onMicrophonePress = () => {
    console.log('microphone')
  }

  const updateChatRoomLastMessage = async (messageId) => {
    try {
      await API.graphql(
        graphqlOperation(
          updateChatRoom, {
            input: {
              id: chatRoomId,
              lastMessageID: messageId,
            }
          }
        )
      );
    } catch (e) {
      console.log(e);
    }
  }

  const onSendPress = async () => {
    try {
      const newMessageData = await API.graphql(
        graphqlOperation(
          createMessage, {
            input: {
              content: message,
              chatRoomID: chatRoomId,
              userID: userId,
            }
          }
        )
      )
      await updateChatRoomLastMessage(newMessageData.data.createMessage.id)

    } catch (e) {
      console.log(e)
    }
    setMessage('')
  }

  const onPress = () => {
    if(!message){
      onMicrophonePress()
    } else {
      onSendPress()
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <FontAwesome5 name="laugh-beam" size={24} color="grey" />
        <TextInput placeholder="Type a message"
                   multiline
                   value={message}
                   onChangeText={setMessage}
                   style={styles.textInput}
        />
        <Entypo name='attachment' size={24} color='gray' style={styles.icon}/>
        {!message && <Fontisto name="camera" size={24} color="grey" style={styles.icon} />}
      </View>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.buttonContainer}>
          {!message ?
            <MaterialCommunityIcons name="microphone" size={28} color="white"/> :
            <MaterialIcons name="send" size={28} color="white"/>
          }
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'flex-end'
  },
  mainContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 25,
    marginRight: 10,
    flex: 1,
    alignItems: 'flex-end'
  },
  textInput: {
    flex: 1,
    marginHorizontal: 10,
  },
  icon: {
    marginHorizontal: 5
  },
  buttonContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default InputBox;
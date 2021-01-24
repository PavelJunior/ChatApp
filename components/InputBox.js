import React, {useState, useEffect} from 'react'
import {StyleSheet, View, TextInput, TouchableOpacity} from 'react-native'
import AttachmentActionSheet from './AttachmentActionSheet'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import Fontisto from 'react-native-vector-icons/Fontisto'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

MaterialIcons.loadFont()
Entypo.loadFont()
Fontisto.loadFont()
MaterialCommunityIcons.loadFont()

import {API, graphqlOperation, Auth} from 'aws-amplify'
import {createMessage, updateChatRoom} from './../graphql/mutations'

export const sendMessage = async (content, chatRoomId, userId, messageType) => {
  try {
    const newMessageData = await API.graphql(
      graphqlOperation(
        createMessage, {
          input: {
            content: content,
            chatRoomID: chatRoomId,
            userID: userId,
            type: messageType
          }
        }
      )
    )
    await updateChatRoomLastMessage(chatRoomId, newMessageData.data.createMessage.id)

  } catch (e) {
    console.log(e)
  }
}

export const updateChatRoomLastMessage = async (chatRoomId, messageId) => {
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

  const onPress = async () => {
    if(!message){
      onMicrophonePress()
    } else {
      await sendMessage(message, chatRoomId, userId, 'text')
      setMessage('')
    }
  }

  const showActionSheet = () => {
    this.ActionSheet.show()
  }

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <Entypo name="emoji-happy" size={24} color="grey" />
        <TextInput placeholder="Type a message"
                   multiline
                   value={message}
                   onChangeText={setMessage}
                   style={styles.textInput}
        />
        <AttachmentActionSheet userId={userId} chatRoomId={chatRoomId}/>
        {!message && <Fontisto name="camera" size={24} color="grey" style={styles.icon} />}
      </View>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.buttonContainer}>
          {!message ?
            <MaterialCommunityIcons name="microphone" size={28} color="white"/> :
            <MaterialIcons name="send" size={28} color="white" onPress={onPress}/>
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

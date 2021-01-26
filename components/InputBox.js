import React, {useState, useEffect} from 'react'
import {StyleSheet, View, TextInput, TouchableOpacity} from 'react-native'
import AttachmentActionSheet from './AttachmentActionSheet'
import {Auth} from 'aws-amplify'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import Fontisto from 'react-native-vector-icons/Fontisto'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {sendMessage} from '../utilities/messages';
import MessageAudioRecorder from './MessageAudioRecorder'

import AudioRecorderPlayer from 'react-native-audio-recorder-player';


MaterialIcons.loadFont()
Entypo.loadFont()
Fontisto.loadFont()
MaterialCommunityIcons.loadFont()



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

  const onMessageSend = async () => {
    await sendMessage(message, chatRoomId, userId, 'text')
    setMessage('')
  }

  const showActionSheet = () => {
    this.ActionSheet.show()
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <AttachmentActionSheet userId={userId} chatRoomId={chatRoomId}/>
      </View>
      <View style={styles.mainContainer}>
        <TextInput placeholder="Type a message"
                   multiline
                   value={message}
                   onChangeText={setMessage}
                   style={styles.textInput}
        />

      </View>
      <TouchableOpacity>
        <View style={styles.buttonContainer}>
          {!message ? <MessageAudioRecorder userId={userId} chatRoomId={chatRoomId}/> :
            <MaterialIcons name="send" size={28} color="white" onPress={onMessageSend}/>
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
    marginHorizontal: 5,
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

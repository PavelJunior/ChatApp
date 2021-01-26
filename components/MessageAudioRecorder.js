import React, {useState} from 'react'
import {View} from 'react-native'
import {Storage} from 'aws-amplify';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {sendMessage} from '../utilities/messages'

const audioRecorderPlayer = new AudioRecorderPlayer();

const MessageAudioRecorder = (props) => {
  const [isRecording, setIsRecording] = useState(null)
  const [recordSecs, setRecordSecs] = useState(null)
  const [recordTime, setRecordTime] = useState(0)

  const uploadFile = async (result) => {
    try {
      const response = await fetch(result)
      const blob = await response.blob()
      const name = Math.random().toString(36).substring(7)

      Storage.put(`${name}.m4a`, blob, {
        contentType: 'audio/m4a',
      }).then(async (r) => {
        await sendMessage(r.key, props.chatRoomId, props.userId, 'audio')
      })
    } catch (err) {
      console.log(err)
    }
  }

  const onRecordStart = async () => {
    setIsRecording(true)
    await audioRecorderPlayer.startRecorder();

    audioRecorderPlayer.addRecordBackListener((e) => {
      setRecordSecs(e.current_position)
      setRecordTime(audioRecorderPlayer.mmssss(
        Math.floor(e.current_position),
      ))
      return;
    });
  }


  const onRecordStop = async () => {
    setIsRecording(false)
    const result = await audioRecorderPlayer.stopRecorder();
    setRecordTime(0)
    audioRecorderPlayer.removeRecordBackListener();
    await uploadFile(result)
  }

  return (
    <View>
      {!isRecording ? <MaterialCommunityIcons name="microphone" size={28} color="black" onPress={onRecordStart}/> :
        <MaterialCommunityIcons name="pause" size={28} color="black" onPress={onRecordStop}/>
      }
    </View>
  )
}

export default MessageAudioRecorder;

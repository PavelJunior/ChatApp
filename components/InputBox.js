import React, {useState} from 'react'
import {StyleSheet, View, TextInput, TouchableOpacity} from 'react-native'

import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome5,
  Entypo,
  Fontisto,
} from '@expo/vector-icons';


const InputBox = () => {
  const [message, setMessage] = useState('')

  const onMicrophonePress = () => {
    console.log('microphone')
  }

  const onSendPress = () => {
    console.log(`Sending: ${message}`)
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
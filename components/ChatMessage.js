import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native'
import moment from 'moment'
import {Storage} from 'aws-amplify';



const ChatMessage = (props) => {
  const [image, setImage] = useState(null)
  const {message, myId} = props;

  useEffect( () => {
   const getImage = async() => {
     const url = await Storage.get(message.content)
     setImage(url)
   }

   getImage()

  }, [])

  const isMyMessage = () => {
    return message.user.id === myId;
  }

  // <Image source={{uri: uri}} width={60} height={60}/>

  return (
    <View style={styles.container}>
      <View style={[styles.messageBox, {
        backgroundColor: isMyMessage() ? '#DCF8C5' : 'white',
        marginLeft: isMyMessage() ? 50 : 0,
        marginRight: isMyMessage() ? 0 : 50,
      }]}>
        {!isMyMessage() && <Text style={styles.name}>{message.user.name}</Text>}
        {message.type === 'text' && <Text style={styles.message}>{message.content}</Text>}
        {message.type === 'photo' && <Image source={{ url: image }} style={styles.image}/>}
        <Text style={styles.time}>{moment(message.createdAt).fromNow()}</Text>
      </View>
    </View>
  )
}

// const win = Dimensions.get('window');
// win.width = win.width - 50 - 20;
// const aspectRatio

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
  },
  image: {
    resizeMode: 'contain',
    flex: 1,
    aspectRatio: 1,
  }
})

export default ChatMessage;

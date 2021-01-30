import React, {useState, useEffect} from 'react'
import {TouchableWithoutFeedback, StyleSheet, View, Text, Image} from 'react-native'
import {Auth} from 'aws-amplify'
import moment from 'moment'
import { useNavigation } from '@react-navigation/native';


const ChatListItem = (props) => {
  const { chatRoom } = props;
  const [ otherUser, setOtherUser] = useState({})

  useEffect(() => {
    const getOtherUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser()
      if(chatRoom.chatRoomUsers.items[0].user.id === userInfo.attributes.sub){
        setOtherUser(chatRoom.chatRoomUsers.items[1].user)
      } else {
        setOtherUser(chatRoom.chatRoomUsers.items[0].user)
      }
    }

    getOtherUser();
  }, [])

  const lastMessage = chatRoom.lastMessage;
  const navigation = useNavigation();


  const onClick = () => {
    navigation.navigate('ChatRoom', {
      id: chatRoom.id,
      name: otherUser.name
    })
  }

  const getLastMessage = () => {
    if (!lastMessage || lastMessage.type == 'text') {
      return lastMessage ? lastMessage.content : ""
    } else if (lastMessage.type == 'photo') {
      return ("Photo")
    } else if (lastMessage.type == 'audio') {
      return ("Voice Message")
    }
  }


  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Image source={{ url: otherUser.imageUrl }} style={styles.avatar}/>
          <View style={styles.midContainer}>
            <Text style={styles.username}>{otherUser.name}</Text>
            <Text numberOfLines={2} style={styles.lastMessage}>
              {getLastMessage()}
            </Text>
          </View>
        </View>
        <Text style={styles.time}>
          {lastMessage && moment(lastMessage.createdAt).format("DD/MM/YYYY")}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  leftContainer: {
    flex: 0.8,
    flexDirection: 'row',
  },
  midContainer: {
    justifyContent: 'space-around'
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 15,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  lastMessage: {
    fontSize: 16,
    color: 'grey',
  },
  time: {
    fontSize: 14,
    color: 'grey'
  },
})

export default ChatListItem;

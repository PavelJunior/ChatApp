import React from 'react'
import {TouchableWithoutFeedback, StyleSheet, View, Text, Image} from 'react-native'
import data from './../data/ChatRooms'
import moment from 'moment'
import { useNavigation } from '@react-navigation/native';


const ChatListItem = (props) => {
  const { chatRoom } = props;
  const user = chatRoom.users[1]
  const lastMessage = chatRoom.lastMessage;

  const navigation = useNavigation();


  const onClick = () => {
    navigation.navigate('ChatRoom', {
      id: chatRoom.id,
      name: user.name
    })
  }


  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Image source={{ url: user.imageUri }} style={styles.avatar}/>
          <View style={styles.midContainer}>
            <Text style={styles.username}>{user.name}</Text>
            <Text numberOfLines={2} style={styles.lastMessage}>{lastMessage.content}</Text>
          </View>
        </View>
        <Text style={styles.time}>
          {moment(lastMessage.createdAt).format("DD/MM/YYYY")}
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
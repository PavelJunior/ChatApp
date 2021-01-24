import React from 'react'
import {StyleSheet, View, Text, TouchableWithoutFeedback, Image} from 'react-native'
import { useNavigation } from '@react-navigation/native';

import { API, graphqlOperation, Auth } from 'aws-amplify'
import { createChatRoom, createChatRoomUser } from './../graphql/mutations'
import { getUser } from "../graphql/customQueries";


const ContactListItem = (props) => {
  const { user } = props;

  const navigation = useNavigation()

  const isChatExists = async (currentUserId, otherUserId) => {
    const userData = await API.graphql(
      graphqlOperation(getUser, {
        id: otherUserId,
      })
    )

    let chatId = null;

    userData.data.getUser.chatRoomUser.items.forEach((i) => {
      const chatRoomUsers = i.chatRoom.chatRoomUsers ? i.chatRoom.chatRoomUsers.items : []
      chatRoomUsers.forEach((u) => {
        if(u.user.id === currentUserId){
          chatId = i.chatRoomID
        }
      })
    });

    return chatId;
  }

  const onClick = async () => {
    try {
      // check if this chat already existed
      const currentUserInfo = await Auth.currentAuthenticatedUser()

      isChatExists(currentUserInfo.attributes.sub, user.id).then(async (chatId) => {
        if(chatId != null){
          navigation.navigate('ChatRoom', {
            id: chatId,
          })
        } else {
          // creating new chat room
          const newChatRoomData = await API.graphql(
            graphqlOperation(createChatRoom, {
              input: {
                lastMessageID: ""
              }
            })
          )

          if (!newChatRoomData.data){
            console.log("Failed to create chat room")
            return;
          }

          const newChatRoom = newChatRoomData.data.createChatRoom;

          // adding clicked user to chat
          await API.graphql(
            graphqlOperation(
              createChatRoomUser, {
                input: {
                  userID: user.id,
                  chatRoomID: newChatRoom.id
                }
              }
            )
          )

          // adding yourself to chat
          await API.graphql(
            graphqlOperation(
              createChatRoomUser, {
                input: {
                  userID: currentUserInfo.attributes.sub,
                  chatRoomID: newChatRoom.id
                }
              }
            )
          )

          navigation.navigate('ChatRoom', {
            id: newChatRoom.id,
          })
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Image source={{ url: user.imageUrl }} style={styles.avatar}/>
          <View style={styles.midContainer}>
            <Text style={styles.username}>{user.name}</Text>
            <Text numberOfLines={2} style={styles.status}>{user.status}</Text>
          </View>
        </View>
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
  status: {
      fontSize: 16,
      color: 'grey',
    }
  }
)

export default ContactListItem;

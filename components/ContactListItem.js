import React from 'react'
import {StyleSheet, View, Text, TouchableWithoutFeedback, Image} from 'react-native'
import { useNavigation } from '@react-navigation/native';

import { API, graphqlOperation, Auth } from 'aws-amplify'
import { createChatRoom, createChatRoomUser } from './../graphql/mutations'


const ContactListItem = (props) => {
  const { user } = props;

  const navigation = useNavigation()

  const onClick = async () => {
    try {
      const newChatRoomData = await API.graphql(
        graphqlOperation(createChatRoom, {
          input: {}
        })
      )

      if (!newChatRoomData.data){
        console.log("Failed to create chat room")
        return;
      }

      const newChatRoom = newChatRoomData.data.createChatRoom;

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

      const userInfo = await Auth.currentAuthenticatedUser()
      await API.graphql(
        graphqlOperation(
          createChatRoomUser, {
            input: {
              userID: userInfo.attributes.sub,
              chatRoomID: newChatRoom.id
            }
          }
        )
      )

      navigation.navigate('ChatRoom', {
        id: newChatRoom,
        name: 'Some name'
      })
    }catch (e) {
      console.log(e)
    }
  }

  console.log(user)
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
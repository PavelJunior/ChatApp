import React from 'react'
import {StyleSheet, View, Text, TouchableWithoutFeedback, Image} from 'react-native'
import { useNavigation } from '@react-navigation/native';


const ContactListItem = (props) => {
  const { user } = props;

  const navigation = useNavigation()

  const onClick = () => {

  }

  return (
    <TouchableWithoutFeedback onPress={onClick}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Image source={{ url: user.imageUri }} style={styles.avatar}/>
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
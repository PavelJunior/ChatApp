import React from 'react'
import {StyleSheet, View, FlatList} from 'react-native'
import ChatRoomsData from './../data/ChatRooms'
import ChatListItem from './../components/ChatListItem'

const ChatsScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList data={ChatRoomsData}
                style={styles.list}
                renderItem={({item}) => <ChatListItem chatRoom={item}/>}
                keyExtractor={(item) => item.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

})

export default ChatsScreen;
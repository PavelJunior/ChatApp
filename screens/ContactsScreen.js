import React from 'react'
import {StyleSheet, View, Text, FlatList} from 'react-native'
import UsersData from "../data/Users";
import ContactListItem from "../components/ContactListItem";

const ContactsScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList data={UsersData}
                style={styles.list}
                renderItem={({item}) => <ContactListItem user={item}/>}
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
  list: {
    width: '100%'
  }
})

export default ContactsScreen;
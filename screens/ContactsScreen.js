import React, { useEffect, useState } from 'react'
import {StyleSheet, View, Text, FlatList} from 'react-native'
import ContactListItem from "../components/ContactListItem";

import { API, graphqlOperation } from 'aws-amplify'
import { listUsers } from './../graphql/queries'

const ContactsScreen = () => {
  const [users, setUser] = useState('')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await  API.graphql(
          graphqlOperation(
            listUsers
          )
        )

        setUser(usersData.data.listUsers.items)
      } catch (e) {
        console.log(e)
      }
    }

    fetchUsers()
  }, [])

  return (
    <View style={styles.container}>
      <FlatList data={users}
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
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainTabNavigation from './navigation/MainTabNavigation'

import { withAuthenticator } from 'aws-amplify-react-native'
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify'
import config from './aws-exports'

import { getUser } from './graphql/queries'
import { createUser } from './graphql/mutations'

Amplify.configure(config)

const randomImages = [
  'https://hieumobile.com/wp-content/uploads/avatar-among-us-2.jpg',
  'https://hieumobile.com/wp-content/uploads/avatar-among-us-3.jpg',
  'https://hieumobile.com/wp-content/uploads/avatar-among-us-6.jpg',
  'https://hieumobile.com/wp-content/uploads/avatar-among-us-9.jpg',
]

function App(){
  const getRandomImage = () => {
    return randomImages[Math.floor(Math.random()) * randomImages.length]
  }

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await Auth.currentAuthenticatedUser({bypassCache: true})

      if (userInfo) {
        const userData = await API.graphql(graphqlOperation(getUser, { id : userInfo.attributes.sub }))

        if (userData.data.getUser) {
          return;
        }

        const newUser = {
          id: userInfo.attributes.sub,
          name: userInfo.username,
          imageUrl: getRandomImage(),
          status: "Hey, I am using this messenger",
        }

        API.graphql(graphqlOperation(createUser, {input: newUser}))
      }
    }

    fetchUser()
  }, [])

  return (
    <NavigationContainer>
      <MainTabNavigation />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

export default withAuthenticator(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

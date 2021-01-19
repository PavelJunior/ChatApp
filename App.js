import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { withAuthenticator } from 'aws-amplify-react-native'
import Amplify, { Auth, API, graphqlOperation } from 'aws-amplify'
import config from './aws-exports'

import { getUser } from './graphql/queries'
import { createUser } from './graphql/mutations'

Amplify.configure(config)

import ChatRoomScreen from './screens/ChatRoomScreen'
import ChatsScreen from "./screens/ChatsScreen";

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

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Chats" component={ChatsScreen} />
        <Stack.Screen name="ChatRoom" component={ChatRoomScreen} />
      </Stack.Navigator>
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

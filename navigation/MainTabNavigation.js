import React from 'react';
import ChatsScreen from './../screens/ChatsScreen'
import ChatRoomScreen from './../screens/ChatRoomScreen'
import ContactsScreen from './../screens/ContactsScreen'

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function MainTabNavigation(){
  return (
      <Tab.Navigator>
        <Tab.Screen name="Chats" component={Chats} />
        <Tab.Screen name="Contacts" component={Contacts} />
      </Tab.Navigator>
  )
}

function Chats(){
  return (
    <Stack.Navigator initialRouteName="ChatsScreen">
      <Stack.Screen name="Chats" component={ChatsScreen} />
      <Stack.Screen name="ChatRoom" component={ChatRoomScreen} />
    </Stack.Navigator>
  )
}

function Contacts(){
  return (
    <Stack.Navigator initialRouteName="ContactsScreen">
      <Stack.Screen name="Contacts" component={ContactsScreen} />
    </Stack.Navigator>
  )
}
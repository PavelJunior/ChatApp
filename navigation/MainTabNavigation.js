import React from 'react';
import ChatsScreen from './../screens/ChatsScreen'
import ChatRoomScreen from './../screens/ChatRoomScreen'
import ContactsScreen from './../screens/ContactsScreen'

import { createStackNavigator } from '@react-navigation/stack';
import {getFocusedRouteNameFromRoute, useRoute} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Entypo from 'react-native-vector-icons/dist/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'

Entypo.loadFont()
AntDesign.loadFont()

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function getHeaderTitle(route){
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Chats';
  return routeName;
}

function TabNavigation(){
  // console.log(Entypo)
  return (
      <Tab.Navigator>
        <Tab.Screen name="Chats" component={ChatsScreen} options={{
          tabBarLabel: "Chats",
          tabBarIcon: () => (
            <Entypo
              name="chat"
              color={'gray'}
              size={24}
            />
          ),
        }} />
        <Tab.Screen name="Contacts" component={ContactsScreen} options={{
          tabBarIcon: () => (
            <AntDesign
              name="contacts"
              color={'gray'}
              size={24}
            />
          ),
        }} />
      </Tab.Navigator>
  )
}

export default function MainNavigation(){
  return (
    <Stack.Navigator initialRouteName="ChatsScreen">
      <Stack.Screen name="Menu" component={TabNavigation} options={({ route }) => ({
        headerTitle: getHeaderTitle(route),
      })}/>
      <Stack.Screen name="ChatRoom" component={ChatRoomScreen} />
    </Stack.Navigator>
  )
}

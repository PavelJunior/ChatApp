import React from 'react';
import ChatsScreen from './../screens/ChatsScreen'
import ChatRoomScreen from './../screens/ChatRoomScreen'
import ContactsScreen from './../screens/ContactsScreen'

import { createStackNavigator } from '@react-navigation/stack';
import {getFocusedRouteNameFromRoute, useRoute} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome5,
  Entypo,
  Fontisto,
} from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function getHeaderTitle(route){
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Chats';
  return routeName;
}

function TabNavigation(){
  return (
      <Tab.Navigator>
        <Tab.Screen name="Chats" component={ChatsScreen} options={{
          tabBarLabel: "Chats",
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="chat"
              color={'gray'}
              size={24}
            />
          ),
        }} />
        <Tab.Screen name="Contacts" component={ContactsScreen} options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons
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
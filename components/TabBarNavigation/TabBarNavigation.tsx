import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import Home from '../../screens/home';
import UserAccount from '../../screens/userAccount/UserAccount.screen';

const Tab = createBottomTabNavigator();

export default function TabBarNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: '#E5E7E9',
        inactiveTintColor: '#E79A36',
        activeBackgroundColor: '#E79A36',
        inactiveBackgroundColor: '#E5E7E9',
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => <Icon name="home" size={30} color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={UserAccount}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => <Icon name="user" size={30} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

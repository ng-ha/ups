import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/themed';
import React, { useLayoutEffect } from 'react';

import CustomerScreen from '../screens/CustomerScreen';
import OrdersScreen from '../screens/OrdersScreen';

export type TabStackParamList = {
  Customers: undefined;
  Orders: undefined;
};

const Tab = createBottomTabNavigator<TabStackParamList>();

const TabNavigator = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#59C1CC',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ focused }) => {
          if (route.name === 'Customers') {
            return <Icon name="users" type="entypo" color={focused ? '#59C1CC' : 'gray'} />;
          } else if (route.name === 'Orders') {
            return <Icon name="box" type="entypo" color={focused ? '#EB6A7C' : 'gray'} />;
          }
        },
      })}
    >
      <Tab.Screen name="Customers" component={CustomerScreen} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;

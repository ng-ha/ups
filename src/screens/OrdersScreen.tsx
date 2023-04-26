import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, Icon } from '@rneui/themed';
import React, { useLayoutEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, View } from 'react-native';

import OrderCard from '../components/OrderCard';
import useOrders from '../hooks/useOrders';
import { RootStackParamList } from '../navigators/RootNavigator';
import { TabStackParamList } from '../navigators/TabNavigator';

export type OrdersScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, 'Orders'>,
  NativeStackNavigationProp<RootStackParamList>
>;

const OrdersScreen = () => {
  const navigation = useNavigation<OrdersScreenNavigationProp>();
  const { loading, error, orders } = useOrders();
  const [ascending, setAscending] = useState<boolean>(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      tabBarHideOnKeyboard: true,
      tabBarLabel: ({ focused, color }) => (
        <Text style={{ color: focused ? '#EB6A7C' : color, fontSize: 10 }}>Orders</Text>
      ),
    });
  }, []);

  return (
    <ScrollView className="bg-[#EB6A7C]">
      <Image source={require('../../assets/images/621e.jpeg')} className="w-full h-64" />
      <View>
        <Button
          color="white"
          titleStyle={{ color: 'gray', fontWeight: '400' }}
          onPress={() => setAscending(!ascending)}
          style={{
            paddingVertical: 8,
            paddingHorizontal: 20,
          }}
        >
          {ascending ? (
            <>
              <Icon name="sort-ascending" color="#EB6A7C" type="material-community" />
              <Text className="pl-3 text-[#EB6A7C] font-bold">Oldest first</Text>
            </>
          ) : (
            <>
              <Icon name="sort-descending" color="#EB6A7C" type="material-community" />
              <Text className="pl-3 text-[#EB6A7C] font-bold">Most recent first</Text>
            </>
          )}
        </Button>
        {loading && <ActivityIndicator className="mt-10" color="white" size="large" />}
        {error && (
          <>
            <Text className="mt-10 text-white text-xl text-center italic">
              Opps! Something went wrong :(
            </Text>
            <Text className="mt-4 text-white text-sm text-center italic">{error.message}</Text>
          </>
        )}
        {orders
          ?.sort((a, b) => {
            if (ascending) {
              return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
            } else {
              return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1;
            }
          })
          .map((order) => (
            <OrderCard key={order.trackingId} item={order} />
          ))}
      </View>
    </ScrollView>
  );
};

export default OrdersScreen;

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { View } from 'react-native';

import DeliveryCard from '../components/DeliveryCard';
import { RootStackParamList } from '../navigators/RootNavigator';
import { OrdersScreenNavigationProp } from './OrdersScreen';

export type OrderScreenRouteProp = RouteProp<RootStackParamList, 'Order'>;

const OrderScreen = () => {
  const navigation = useNavigation<OrdersScreenNavigationProp>();
  const {
    params: { order },
  } = useRoute<OrderScreenRouteProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: order.trackingItems.customer.name,
      headerTitleStyle: { color: 'black' },
      headerTintColor: '#EB6A7C',
      headerBackTitle: 'Deliveries', // doesnt work
    });
  }, [order]);

  return (
    <View className="-mt-2">
      <DeliveryCard order={order} fullWidth />
    </View>
  );
};

export default OrderScreen;

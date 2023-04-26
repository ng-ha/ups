import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icon } from '@rneui/themed';
import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

import DeliveryCard from '../components/DeliveryCard';
import useCustomerOrders from '../hooks/useCustomerOrders';
import { RootStackParamList } from '../navigators/RootNavigator';
import { TabStackParamList } from '../navigators/TabNavigator';

type ModalScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList, 'MyModal'>,
  BottomTabNavigationProp<TabStackParamList>
>;

type ModalScreenRouteProp = RouteProp<RootStackParamList, 'MyModal'>;

const ModalScreen = () => {
  const navigation = useNavigation<ModalScreenNavigationProp>();
  const {
    params: { name, userId },
  } = useRoute<ModalScreenRouteProp>();
  const { orders } = useCustomerOrders(userId);
  return (
    <View>
      <TouchableOpacity onPress={navigation.goBack} className="absolute right-5 top-5 z-10">
        <Icon name="closecircle" type="antdesign" />
      </TouchableOpacity>

      <View className="mt-[10]">
        <View className="py-5 border-b border-[#59C1CC]">
          <Text className="text-center text-xl font-bold text-[#59C1CC]">{name}</Text>
          <Text className="text-center italic text-sm">Deliveries</Text>
        </View>
      </View>

      <FlatList
        data={orders}
        keyExtractor={(order) => order.trackingId}
        renderItem={({ item: order }) => <DeliveryCard order={order} />}
        contentContainerStyle={{ paddingBottom: 200 }}
      />
    </View>
  );
};

export default ModalScreen;

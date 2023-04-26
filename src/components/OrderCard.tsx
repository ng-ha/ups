import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Icon } from '@rneui/themed';
import { Card } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import { OrdersScreenNavigationProp } from '../screens/OrdersScreen';

type Props = {
  item: Order;
};

const OrderCard = ({ item }: Props) => {
  const navigation = useNavigation<OrdersScreenNavigationProp>();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Order', { order: item })}>
      <Card containerStyle={{ paddingHorizontal: 20, borderRadius: 8 }}>
        <View className="flex-row justify-between items-center">
          <View>
            <Icon name="truck-delivery" color="#EB6A7C" type="material-community" />
            <Text className="text-[10px]">{new Date(item.createdAt).toDateString()}</Text>
          </View>

          <View>
            <Text className="text-gray-400 text-[10px]">
              {item.carrier} - {item.trackingId}
            </Text>
            <Text className="text-gray-500 text-xl ">{item.trackingItems.customer.name}</Text>
          </View>

          <View className="flex-row items-center">
            <Text className="text-sm text-[#EB6A7C]">{item.trackingItems.items.length} x</Text>
            <Icon name="box" type="feather" style={{ marginLeft: 8 }} />
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default OrderCard;

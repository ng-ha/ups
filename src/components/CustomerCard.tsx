import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Card, Icon } from '@rneui/themed';
import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

import useCustomerOrders from '../hooks/useCustomerOrders';
import { CustomerScreenNavigationProp } from '../screens/CustomerScreen';

type Props = {
  userId: string;
  name: string;
  email: string;
};

const CustomerCard = ({ email, userId, name }: Props) => {
  const { loading, error, orders } = useCustomerOrders(userId);
  const navigation = useNavigation<CustomerScreenNavigationProp>();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('MyModal', { name, userId })}>
      <Card containerStyle={{ padding: 20, borderRadius: 8 }}>
        <View className="flex-row justify-between ">
          <View>
            <Text className="text-2xl font-bold">{name}</Text>
            <Text className="text-sm text-[#59C1CC]">ID: {userId}</Text>
          </View>

          <View className="flex-row items-center justify-end">
            {loading ? (
              <ActivityIndicator color="#59C1CC" />
            ) : error ? (
              <MaterialIcons name="error" size={24} color="#F7768E" />
            ) : (
              <Text className="text-[#59C1CC]">{orders.length} x</Text>
            )}
            <Icon
              name="box"
              type="entypo"
              color="#59C1CC"
              size={50}
              style={{ marginBottom: 20, marginLeft: 'auto' }}
            />
          </View>
        </View>
        <Card.Divider />
        <Text>{email}</Text>
      </Card>
    </TouchableOpacity>
  );
};

export default CustomerCard;

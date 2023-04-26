import { useQuery } from '@apollo/client';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Input } from '@rneui/themed';
import React, { useLayoutEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, View } from 'react-native';

import CustomerCard from '../components/CustomerCard';
import { GET_CUSTOMERS } from '../graphql/queries';
import { RootStackParamList } from '../navigators/RootNavigator';
import { TabStackParamList } from '../navigators/TabNavigator';

export type CustomerScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, 'Customers'>,
  NativeStackNavigationProp<RootStackParamList>
>;

const CustomerScreen = () => {
  const navigation = useNavigation<CustomerScreenNavigationProp>();
  const [input, setInput] = useState<string>('');

  const { loading, error, data } = useQuery(GET_CUSTOMERS);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <ScrollView className="bg-[#59C1CC]">
      <Image source={require('../../assets/images/uU8GTZM.jpeg')} className="w-full h-64" />
      <Input
        placeholder="Search by Customer"
        value={input}
        onChangeText={setInput}
        containerStyle={{
          backgroundColor: 'white',
          paddingTop: 20,
          paddingBottom: 0,
          paddingHorizontal: 40,
        }}
      />
      {loading && <ActivityIndicator className="mt-10" color="white" size="large" />}
      {error && (
        <>
          <Text className="mt-10 text-white text-xl text-center italic">
            Opps! Something went wrong :(
          </Text>
          <Text className="mt-4 text-white text-sm text-center italic">{error.message}</Text>
        </>
      )}
      {data?.getCustomers
        .filter((customer: CustomerList) => customer.value.name.includes(input))
        .map(({ name: id, value: { name, email } }: CustomerResponse) => (
          <CustomerCard key={id} email={email} name={name} userId={id} />
        ))}
      <View className="pb-4" />
    </ScrollView>
  );
};

export default CustomerScreen;

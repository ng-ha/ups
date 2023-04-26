import { Card, Divider, Icon } from '@rneui/themed';
import React from 'react';
import { Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

type Props = {
  order: Order;
  fullWidth?: boolean;
};

const DeliveryCard = ({ order, fullWidth }: Props) => {
  return (
    <Card
      containerStyle={{
        borderRadius: fullWidth ? 0 : 8,
        marginHorizontal: fullWidth && 0,
        marginVertical: 8,
        padding: 0,
        paddingTop: 16,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        backgroundColor: fullWidth ? '#EB6A7C' : '#59C1CC',
      }}
    >
      <View className={fullWidth ? 'h-full' : ''}>
        <Icon name="box" type="entypo" size={50} color="white" />

        <View className="pb-4">
          <Text className="text-xs text-center uppercase text-white font-bold">
            {order.carrier} - {order.trackingId}
          </Text>
          <Text className="text-white text-center text-lg font-bold">
            Expected Delivery: {new Date(order.createdAt).toLocaleDateString()}
          </Text>
        </View>

        <Divider color="white" />

        <View className="mx-auto pb-5">
          <Text className="text-center text-white font-bold mt-5 text-base">Adress</Text>
          <Text className="text-sm text-center text-white ">
            {order.Address}, {order.City}
          </Text>
          <Text className="text-sm text-center italic text-white">
            Shipping Cost: ${order.shippingCost}
          </Text>
        </View>

        <Divider color="white" />

        <View className="p-5">
          {order.trackingItems.items.map((item) => (
            <View key={item.item_id} className="flex-row justify-between items-center">
              <Text className="text-sm italic text-white">{item.name}</Text>
              <Text className="text-white text-xl">x {item.quantity}</Text>
            </View>
          ))}
        </View>

        <MapView
          initialRegion={{
            latitude: order.Lat,
            longitude: order.Lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.05,
          }}
          className={`w-full flex-1 ${!fullWidth && 'h-[200]'}`}
        >
          <Marker
            coordinate={{ latitude: order.Lat, longitude: order.Lng }}
            title="Delivery Location"
            description={order.Address}
            identifier="origin"
          />
        </MapView>
      </View>
    </Card>
  );
};

export default DeliveryCard;

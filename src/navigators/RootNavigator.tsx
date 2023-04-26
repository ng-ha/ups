import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import ModalScreen from '../screens/ModalScreen';
import OrderScreen from '../screens/OrderScreen';
import TabNavigator from './TabNavigator';

export type RootStackParamList = {
  Main: undefined;
  MyModal: { userId: string; name: string };
  Order: { order: Order };
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Group>
          <RootStack.Screen name="Main" component={TabNavigator} />
        </RootStack.Group>

        <RootStack.Group screenOptions={{ presentation: 'modal' }}>
          <RootStack.Screen
            name="MyModal"
            component={ModalScreen}
            options={{ headerShown: false }}
          />
        </RootStack.Group>

        <RootStack.Group>
          <RootStack.Screen name="Order" component={OrderScreen} />
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;

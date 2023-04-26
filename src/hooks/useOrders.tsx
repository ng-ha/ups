import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { GET_ORDERS } from '../graphql/queries';

const useOrders = () => {
  const { loading, error, data } = useQuery(GET_ORDERS);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!data) return;
    const orders: Order[] = data.getOrders.map(({ value }: OrderResponse) => ({
      ...value,
    }));
    setOrders(orders);
  }, [data]);

  return { loading, error, orders };
};

export default useOrders;

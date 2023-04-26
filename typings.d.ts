type Customer = {
  email: string;
  name: string;
};

type CustomerList = {
  name: ID;
  value: Customer;
};

type TrackingItems = {
  customer_id: ID;
  customer: Customer;
  items: Item[];
};

type Item = {
  item_id: ID;
  name: string;
  price: number;
  quantity: number;
};

type OrderResponse = {
  value: Order;
};

type CustomerResponse = {
  name: ID;
  value: Customer;
};

type Order = {
  Address: string;
  City: string;
  Lat: number;
  Lng: numder;
  carrier: string;
  createdAt: string;
  shippingCost: number;
  trackingId: string;
  trackingItems: TrackingItems;
};

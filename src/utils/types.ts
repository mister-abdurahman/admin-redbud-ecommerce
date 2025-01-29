export interface ICartDisplay {
  img_url: string;
  name: string;
  price: number;
  quantity: number;
}

export interface IBrand {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

export interface IProduct {
  name: string;
  price: number;
  status: boolean;
  description: string;
  img_url: string;
  brand_id: number;
  category_id: number;
  id: number;
}

export interface filterType {
  label: string;
  value: string;
  method?: string;
}

export interface IOrder {
  id?: number;
  created_at?: string;
  user_id: number;
  status: boolean;
  shipping_address: string;
  total_amount: number;
  user_profiles?: { first_name: string; last_name: string };
}

export interface IOrdersByDateRes extends IOrder {
  user_profiles: {
    first_name: string;
    last_name: string;
  };
}
export interface IOrderItem {
  id?: number;
  order_id: number;
  product_id: number;
  quantity: number;
  products?: { name: string };
}
export interface IOrderTableItem {
  order_id: any;
  product_id: any;
  quantity: any;
  products: {
    name: any;
  }[];
}

export interface IOrderRow {
  created_at: string;
  order_id: number;
  order_items: { product_name: string; quantity: number }[];
  shipping_address: string;
  status: boolean;
  total_amount: number;
  user_profile: { last_name: string; first_name: string };
}

export interface ICart {
  img_url: string;
  name: string;
  price: number;
  id: number;
  quantity: number;
  status?: boolean;
  product_id?: number;
  user_id?: number;
}

export interface IProduct {
  brand_id: number;
  category_id: number;
  description: string;
  id: number;
  img_url: string;
  name: string;
  price: number;
  reviews: IReview;
  status: boolean;
}
export interface IProductForm {
  name: string;
  price: number;
  description: string;
  status: string;
  img_url: string;
  brand_id: number;
  category_id: number;
}

export interface IProductRow {
  id: number;
  name: string;
  price: number;
  status: boolean;
  brands: { name: string };
  categories: { name: string };
}

export interface IProductWithBrandName extends IProduct {
  brands: {
    name: string;
  };
}

export interface IReview {
  coment: string;
  ratings: number;
  reviewer: string;
}

export interface ICategory {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

export interface IAvailableLocation {
  state: string;
  locations: {
    address: string;
    price: number;
  }[];
}

export interface IProfile {
  id: string;
  email: string;
  state: string;
  city: string;
  country: string;
  first_name: string;
  last_name: string;
  street_address: string;
  phone_number: number;
}

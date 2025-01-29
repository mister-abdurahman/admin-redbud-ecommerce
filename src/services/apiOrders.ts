import supabase from "./supabase";
import { getToday } from "../utils/helpers";
import {
  filterType,
  IOrder,
  IOrderItem,
  IOrdersByDateRes,
  IOrderTableItem,
} from "../utils/types";
import { RES_PER_PAGE } from "../utils/constants";

export async function getOrders(): Promise<IOrder[]> {
  try {
    const { data, error }: { data: unknown; error: any } = await supabase
      .from("orders")
      .select("*");

    if (error) {
      throw new Error(error);
    }
    return data as IOrder[];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getOrdersByDate(
  date: string | Date
): Promise<IOrdersByDateRes[]> {
  try {
    const { data, error }: { data: unknown; error: any } = await supabase
      .from("orders")
      .select("*, user_profiles(first_name, last_name)")
      .gte("created_at", date)
      .lte("created_at", getToday({ end: true }));

    if (error) {
      throw new Error(error);
    }
    return data as IOrdersByDateRes[];
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function getOrdersByUserId(user_id: string): Promise<IOrder[]> {
  try {
    const { data, error }: { data: unknown; error: any } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", user_id);

    if (error) {
      throw new Error(error);
    }
    return data as IOrder[];
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function getOrderById(
  id: string
): Promise<{ data: IOrder; orderItems: IOrderTableItem[] }> {
  try {
    const { data, error }: { data: any; error: any } = await supabase
      .from("orders")
      .select("*, user_profiles(first_name, last_name)")
      .eq("id", id)
      .single();

    if (error) {
      throw new Error(error);
    }

    const { data: orderItems, error: OrderItemErr } = await supabase
      .from("order_items")
      .select("order_id, product_id, quantity, products(name)");

    if (OrderItemErr) {
      throw new Error(OrderItemErr.message);
    }
    return { data, orderItems };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function getOrderItemsByOrderId(
  order_id: number
): Promise<IOrderItem[]> {
  try {
    const { data, error }: { data: unknown; error: any } = await supabase
      .from("order_items")
      .select("*")
      .eq("order_id", order_id);

    if (error) {
      throw new Error(error);
    }
    return data as IOrderItem[];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getTableOrders({
  filter,
  sortBy,
  currentPage,
}: {
  filter: filterType | null;
  sortBy: { field: string; direction: string };
  currentPage: number | null;
}): Promise<{ data: IOrder[]; count: number; orderItems: IOrderTableItem[] }> {
  try {
    let query: any = supabase
      .from("orders")
      .select("*, user_profiles(first_name, last_name)", {
        count: "exact",
      });

    if (filter)
      query = query[filter.method || "eq"](filter.label, filter.value);

    if (sortBy)
      query = query.order(sortBy.field, {
        ascending: sortBy.direction === "asc",
      });

    if (currentPage) {
      const from = (currentPage - 1) * RES_PER_PAGE;
      // const to = currentPage * RES_PER_PAGE;
      const to = from + RES_PER_PAGE - 1;
      query = query.range(from, to);
    }

    const { data, error, count } = await query;

    const { data: orderItems, error: OrderItemErr } = await supabase
      .from("order_items")
      .select("order_id, product_id, quantity, products(name)");

    if (error) {
      throw new Error(error.message);
    }
    if (OrderItemErr) {
      throw new Error(OrderItemErr.message);
    }
    return { data, count, orderItems };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

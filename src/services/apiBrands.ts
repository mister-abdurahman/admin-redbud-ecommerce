import { RES_PER_PAGE } from "../utils/constants";
import { IBrand, ICategory } from "../utils/types";
import supabase from "./supabase";

export async function getBrandById(id: number): Promise<IBrand> {
  try {
    const { data, error }: { data: unknown; error: any } = await supabase
      .from("brands")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw new Error(error);
    }
    return data as IBrand;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function getBrands(): Promise<IBrand[]> {
  try {
    const { data, error }: { data: unknown; error: any } = await supabase
      .from("brands")
      .select("*");

    if (error) {
      throw new Error(error);
    }
    return data as IBrand[];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const createEditBrand = async (newBrand: any, id?: number) => {
  let query: any = supabase.from("brands");

  // create category:
  if (!id) query = query.insert([{ ...newBrand }]);

  // edit category:
  if (id) query = query.update({ ...newBrand }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error(`Brand could not be ${id ? "updated" : "created"}`);
  }

  return data;
};

// do not use (for now)
export const deleteBrand = async (id: number) => {
  const { error } = await supabase.from("brands").delete().eq("id", id);

  //   await supabase.from("product_tags").delete().eq("product_id", id);

  if (error) {
    console.error(error);
    throw new Error("Brand could not be deleted");
  }
};

export async function getTableBrands({
  sortBy,
  currentPage,
}: {
  sortBy: { field: string; direction: string };
  currentPage: number | null;
}): Promise<{ data: ICategory[]; count: number }> {
  try {
    let query: any = supabase.from("brands").select("*", { count: "exact" });

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

    if (error) {
      throw new Error(error.message);
    }
    return { data, count };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

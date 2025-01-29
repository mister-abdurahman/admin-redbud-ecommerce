import { RES_PER_PAGE } from "../utils/constants";
import { ICategory } from "../utils/types";
import supabase from "./supabase";

export async function getCategorys(): Promise<ICategory[]> {
  try {
    const { data, error }: { data: unknown; error: any } = await supabase
      .from("categories")
      .select("*");

    if (error) {
      throw new Error(error);
    }
    return data as ICategory[];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getCategoryById(id: number): Promise<ICategory> {
  try {
    const { data, error }: { data: unknown; error: any } = await supabase
      .from("categories")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      // throw new Error(`Category with id ${id} not Found`);
      throw new Error(error);
    }
    return data as ICategory;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const createEditCategory = async (newCategory: any, id?: number) => {
  let query: any = supabase.from("categories");

  // create category:
  if (!id) query = query.insert([{ ...newCategory }]);

  // edit category:
  if (id) query = query.update({ ...newCategory }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error(`Category could not be ${id ? "updated" : "created"}`);
  }

  return data;
};

export const deleteCategory = async (id: number) => {
  const { error } = await supabase.from("categories").delete().eq("id", id);

  await supabase.from("product_tags").delete().eq("product_id", id);

  if (error) {
    console.error(error);
    throw new Error("Product could not be deleted");
  }
};

export async function getTableCategories({
  sortBy,
  currentPage,
}: {
  sortBy: { field: string; direction: string };
  currentPage: number | null;
}): Promise<{ data: ICategory[]; count: number }> {
  try {
    let query: any = supabase
      .from("categories")
      .select("*", { count: "exact" });

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

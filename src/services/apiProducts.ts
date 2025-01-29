import supabase from "./supabase";
import {
  filterType,
  IBrand,
  ICategory,
  IProduct,
  IProductRow,
  IProductWithBrandName,
} from "../utils/types";
import { RES_PER_PAGE } from "../utils/constants";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

export async function getProducts(): Promise<IProduct[]> {
  try {
    const { data, error }: { data: unknown; error: any } = await supabase
      .from("products")
      .select("*");

    if (error) {
      throw new Error(error);
    }
    return data as IProduct[];
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function getProductsWithBrandName(): Promise<
  IProductWithBrandName[]
> {
  try {
    const { data, error }: { data: unknown; error: any } = await supabase
      .from("products")
      .select("brands(name)");

    if (error) {
      throw new Error(error);
    }
    return data as IProductWithBrandName[];
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function getTableProducts({
  filter,
  sortBy,
  currentPage,
}: {
  filter: filterType | null;
  sortBy: { field: string; direction: string };
  currentPage: number | null;
}): Promise<{ data: IProductRow[]; count: number }> {
  try {
    let query: any = supabase
      .from("products")
      .select("*, brands(name), categories(name)", { count: "exact" });

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

    if (error) {
      throw new Error(error.message);
    }
    return { data, count };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function getProductById(id: number): Promise<IProduct> {
  try {
    const { data, error }: { data: unknown; error: any } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      // throw new Error(`Product with id ${id} not Found`);
      throw new Error(error);
    }
    return data as IProduct;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function getProductsByCategoryId(
  categoryId: string
): Promise<IProduct[]> {
  try {
    const { data, error }: { data: unknown; error: any } = await supabase
      .from("products")
      .select("id, name, price, status, img_url")
      .eq("category_id", categoryId);

    if (error) {
      // throw new Error(`Product with id ${id} not Found`);
      throw new Error(error);
    }
    return data as IProduct[];
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getProductsBySearch(
  searchText: string
): Promise<IProduct[]> {
  try {
    const { data, error } = await supabase.rpc("search_products_01", {
      search_term: searchText,
    });
    if (error) throw new Error(error.message);
    else console.log(data);

    return data as IProduct[];
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function getProductsByTag(tagName: string) {
  const { data, error } = await supabase.rpc("get_products_by_tag", {
    tag_name: tagName,
  });

  if (error) {
    console.error("Error fetching products by tag:", error);
    return null;
  }

  return data;
}

export const createEditProduct = async (newProduct: any, id?: number) => {
  console.log("image var is...:", newProduct);
  const hasImagePath = newProduct.img_url?.startsWith?.(supabaseUrl);
  // create Product

  const imageName = `${Math.random()}-${newProduct.name.replaceAll("/", "")}`;
  const imageUrl = hasImagePath
    ? newProduct.img_url
    : `${supabaseUrl}/storage/v1/object/public/product-images/${imageName}`;

  let query: any = supabase.from("products");

  // create cabin:
  if (!id) query = query.insert([{ ...newProduct, img_url: imageUrl }]);

  // edit cabin:
  if (id)
    query = query.update({ ...newProduct, img_url: imageUrl }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  // if image already exists, do not upload image again:
  if (hasImagePath) return data;

  // upload image to bucket
  const { data: storageData, error: storageError } = await supabase.storage
    .from("product-images")
    .upload(imageName, newProduct.img_url);

  if (storageError) {
    await supabase.from("products").delete().eq("id", data?.id);
    await supabase.from("product_tags").delete().eq("product_id", data?.id);
    console.error(storageError);
    throw new Error(
      "An error occured while uploading image to storage bucket and product was not created."
    );
  }

  return data;
};

export const deleteProduct = async (id: number) => {
  const { error } = await supabase.from("products").delete().eq("id", id);

  await supabase.from("cart").delete().eq("product_id", id);
  await supabase.from("order_items").delete().eq("product_id", id);
  await supabase.from("product_tags").delete().eq("product_id", id);

  if (error) {
    console.error(error);
    throw new Error("Product could not be deleted");
  }
};

// CREATE OR REPLACE FUNCTION search_products_04(search_term TEXT)
// RETURNS TABLE(
//     id INT8,
//     name TEXT,
//     price INT4,
//     status boolean,
//     img_url TEXT
// ) AS $$
// BEGIN
//     RETURN QUERY
//     SELECT
//         p.id AS id,
//         p.name AS name,
//         p.price AS price,
//         p.status AS status,
//         p."img_url" AS img_url
//     FROM products p
//     JOIN brands b ON b.id = p.brand_id
//     JOIN categories c ON c.id = p.category_id
//     WHERE p.name ILIKE '%' || search_term || '%'
//        OR b.name ILIKE '%' || search_term || '%'
//        OR c.name ILIKE '%' || search_term || '%';
// END;
// $$ LANGUAGE plpgsql;

// SELECT * FROM search_products_04('Over');

//
// CREATE OR REPLACE FUNCTION get_products_by_tag(tag_name TEXT)
// RETURNS TABLE (
//   id INT8,
//   name TEXT,
//   price INT4,
//   status boolean,
//   img_url TEXT
// ) AS $$
// BEGIN
//   RETURN QUERY
//   SELECT p.id AS id , p.name AS name, p.price AS price, p.status AS status, p.img_url AS img_url
//   FROM products p
//   JOIN product_tags pt ON p.id = pt.product_id
//   JOIN tags t ON pt.tag_id = t.id
//   WHERE t.name = tag_name;
// END;
// $$ LANGUAGE plpgsql;

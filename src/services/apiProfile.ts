import supabase from "./supabase";
import { IProfile } from "../utils/types";

export async function getProfileById(id: number): Promise<IProfile> {
  try {
    const { data, error }: { data: unknown; error: any } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw new Error(error);
    }
    return data as IProfile;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

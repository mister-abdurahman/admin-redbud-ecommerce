import supabase from "./supabase";

export async function signup({
  fullName,
  password,
  email,
}: {
  fullName: string;
  password: string;
  email: string;
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);

  const { data: ProfileData, error: ProfileError } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", data.user.id)
    .single();

  if (ProfileError) throw new Error(ProfileError.message);
  if (!ProfileData.isAdmin)
    throw new Error("You are not authorized to access this resource");

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession(); //checks for session on localstorage

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
  // nothing to return
}

export async function updateCurrentUser({ password, fullName, avatar }: any) {
  let updatedData: any;

  if (password) updatedData = { password };
  if (fullName) updatedData = { data: { fullName } };
  // 1. update password or fullName
  const { data, error } = await supabase.auth.updateUser(updatedData);
  if (error) throw new Error(error.message);
  if (!avatar) return data;

  // 2. upload avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (storageError) throw new Error(storageError.message);

  // 3. update avatar in the user
  const { data: updatedUser, error: updateUserError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${process.env.VITE_SUPABASE_URL}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (updateUserError) throw new Error(updateUserError.message);
  return updatedUser;
}

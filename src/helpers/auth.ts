import { pb } from "../lib/pocketbase";

interface LoginForm {
  username: string;
  password: string;
}

export async function Login({ username, password }: LoginForm) {
  try {
    await pb.collection("users").authWithPassword(username, password);

    return {
      isSuccess: true,
    };
  } catch (err) {
    return err;
  }
}

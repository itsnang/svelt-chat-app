<script lang="ts">
  import { Login } from "../helpers/auth";
  import { currentUser, pb } from "./pocketbase";

  let username: string;
  let password: string;

  async function login() {
    if (!username || !password) {
      return;
    }
    await Login({ username, password });
  }

  async function signUp() {
    try {
      const data = {
        username,
        password,
        passwordConfirm: password,
        name: username.toUpperCase(),
      };
      await pb.collection("users").create(data);
      await login();
    } catch (err) {
      console.error(err);
    }
  }

  function signOut() {
    pb.authStore.clear();
  }
</script>

<section class="bg-gray-50 dark:bg-gray-900">
  <div
    class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
  >
    <img
      class="w-40 h-40 mr-2"
      src="https://media.tenor.com/Ex1pkci_-v8AAAAi/white-cute-cat-hearts.gif"
      alt="logo"
    />
    <div
      class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1
          class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
        >
          Sign in to your account
        </h1>
        <form
          on:submit|preventDefault
          class="space-y-4 md:space-y-6"
          action="#"
        >
          <div>
            <label
              for="username"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Your name</label
            >
            <input
              bind:value={username}
              type="username"
              name="username"
              id="username"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="pdei oun"
            />
          </div>
          <div>
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Password</label
            >
            <input
              bind:value={password}
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div class="flex items-center justify-between"></div>
          <button
            on:click={login}
            type="submit"
            class="w-full text-white bg-rose-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >Sign in</button
          >
          <div class="text-sm font-light text-gray-500 dark:text-gray-400">
            Don’t have an account yet?
            <p
              class="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Sign up
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>

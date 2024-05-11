<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { currentUser, pb } from "./pocketbase";
  import Chat from "../components/Chat.svelte";

  let newMessage: string;
  let messages: any[] = [];
  let unsubscribe: () => void;
  function signOut() {
    pb.authStore.clear();
  }

  onMount(async () => {
    // Get initial messages
    const resultList = await pb.collection("messages").getList(1, 50, {
      sort: "created",
      expand: "user",
    });
    messages = resultList.items.sort(function (a: any, b: any) {
      var keyA = new Date(a.created),
        keyB = new Date(b.created);
      // Compare the 2 dates
      if (keyA < keyB) return 1;
      if (keyA > keyB) return -1;
      return 0;
    });

    // Subscribe to realtime messages
    unsubscribe = await pb
      .collection("messages")
      .subscribe("*", async ({ action, record }) => {
        if (action === "create") {
          // Fetch associated user
          const user = await pb.collection("users").getOne(record.user);
          record.expand = { user };
          messages = [...messages, record].sort(function (a: any, b: any) {
            var keyA = new Date(a.created),
              keyB = new Date(b.created);
            // Compare the 2 dates
            if (keyA < keyB) return 1;
            if (keyA > keyB) return -1;
            return 0;
          });
          console.log(messages);
        }
        if (action === "delete") {
          messages = messages.filter((m) => m.id !== record.id);
        }
      });
  });

  // Unsubscribe from realtime messages
  onDestroy(() => {
    unsubscribe?.();
  });

  async function sendMessage() {
    if (!newMessage) {
      return;
    }
    const data = {
      field: newMessage,
      user: $currentUser?.id,
    };
    await pb.collection("messages").create(data);
    newMessage = "";
  }

  const isAnotherPerson = (message: any) => {
    return message.expand?.user?.username !== $currentUser?.username;
  };
</script>

<section class="relative flex flex-col flex-grow justify-center items-center">
  <div class="fixed bottom-0 h-screen w-screen md:w-1/2 py-20 overflow-clip">
    <div class="h-full w-full overflow-scroll px-4 pt-20 flex flex-col-reverse">
      {#each messages as message (message.id)}
        <Chat
          name={message.expand?.user?.username}
          message={message.field}
          isAnotherPerson={isAnotherPerson(message)}
        />
      {/each}
    </div>
  </div>
  <form
    class="h-20 fixed bottom-0 w-full flex justify-center items-center"
    on:submit|preventDefault={sendMessage}
  >
    <div
      class="w-screen md:w-1/2 p-4 flex flex-grow-1 justify-center items-center space-x-4"
    >
      <input
        class={"w-full h-12 px-4 bg-transparen rounded-lg border-2 border-rose-300  focus:outline-none"}
        placeholder="Message"
        type="text"
        bind:value={newMessage}
      />
      <button class="bg-rose-400 h-12 px-4 rounded-lg" type="submit">
        <img width="24px" height="24px" src="./send.svg" alt="hh" />
      </button>
    </div>
  </form>
</section>

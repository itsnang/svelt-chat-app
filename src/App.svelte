<script lang="ts">
  import svelteLogo from "./assets/svelte.svg";
  import viteLogo from "/vite.svg";
  import Counter from "./lib/Counter.svelte";
  import Login from "./lib/Login.svelte";
  import Messages from "./lib/Messages.svelte";
  import { currentUser } from "./lib/pocketbase";
</script>

<main class="max-w-screen-md mx-auto min-h-screen">
  <div>
    <div>
      {#if $currentUser}
        <Messages />
      {:else}
        <Login />
      {/if}
    </div>
  </div>
</main>

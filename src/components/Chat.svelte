<script lang="ts">
  export let name: string;
  export let message: string;
  export let isAnotherPerson: boolean;
</script>

{#if isAnotherPerson}
  <div class="flex mt-4 items-start gap-2.5">
    <div class="bg-gray-100 rounded-full flex items-center p-3">
      <img
        src={`https://media.tenor.com/BEBopBnhjVEAAAAi/peach-and-goma-peach-goma.gif`}
        alt="avatar"
        width="40px"
        height="40px"
      />
    </div>
    <div
      class="flex flex-col w-full max-w-[320px] leading-1.5 p-2 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700"
    >
      <div class="flex items-center space-x-2 rtl:space-x-reverse">
        <span class="text-sm font-semibold text-gray-900 dark:text-white"
          >{name}</span
        >
        <span class="text-sm font-normal text-gray-500 dark:text-gray-400"
          >11:46</span
        >
      </div>
      <p class="text-sm font-normal py-1 text-gray-900 dark:text-white">
        {message}
      </p>
    </div>
  </div>
{:else}
  <div class="flex mt-4 flex-row-reverse gap-2.5">
    <div class="bg-gray-100 rounded-full flex items-center px-3">
      <img
        src={`https://media.tenor.com/SwQT4BBJS0oAAAAi/peach-and-goma-peach-goma.gif`}
        alt="avatar"
        width="40px"
        height="40px"
      />
    </div>
    <div
      class="flex flex-col w-full max-w-[320px] leading-1.5 p-2 border-gray-200 bg-rose-100 rounded-e-xl rounded-es-xl dark:bg-gray-700"
    >
      <div class="flex items-center space-x-2 rtl:space-x-reverse">
        <span class="text-sm font-semibold text-gray-900 dark:text-white"
          >{name}</span
        >
        <span class="text-sm font-normal text-gray-500 dark:text-gray-400"
          >11:46</span
        >
      </div>
      <p class="text-sm font-normal py-1 text-gray-900 dark:text-white">
        {message}
      </p>
    </div>
  </div>
{/if}

<template>
  <div
    class="flex flex-wrap items-center justify-between w-full p-2 mb-2 transition-all duration-300 ease-in-out bg-white rounded-lg  sm:p-4 lg:flex-no-wrap group"
  >
    <div class="mb-2 mr-8 lg:mb-0">
      <h1 class="text-xl leading-snug text-gray-600">
        <nuxt-link
          :to="{
            name: 'snippets-id',
            params: {
              id: snippet.id,
            },
          }"
          class="text-gray-600 hover:text-blue-500"
          >{{ snippet.title || "Untitle snippet" }} ({{ snippet.steps_count }}
          steps)
        </nuxt-link>
      </h1>
    </div>

    <div>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    snippet: {
      required: true,
      type: Object,
    },
  },
};
</script>

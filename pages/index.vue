<template>
  <div class="">
    <div class="mb-16 bg-white">
      <div
        class="flex px-2 py-16 mx-auto mt-8 max-w-7xl sm:px-6 lg:px-8 lg:py-32"
      >
        <div class="w-full lg:w-1/2">
          <h1 class="mb-6 text-5xl font-medium leading-tight text-gray-700">
            Browse and create mini step-by-step tutorials.
          </h1>

          <p class="mb-12 text-xl text-gray-600">
            Snippets are small collections of steps for things you don't need to
            remember.
          </p>

          <nuxt-link
            :to="{
              name: 'snippets-id',
              params: {
                id: snippets[0].id,
              },
            }"
            class="
              inline-block
              px-5
              py-3
              text-lg text-white
              bg-blue-500
              rounded-lg
            "
            >Check out an example &rarr;</nuxt-link
          >
        </div>
      </div>
    </div>

    <div class="px-2 mx-auto mt-8 max-w-7xl sm:px-6 lg:px-8">
      <h1 class="mb-6 text-xl font-medium text-gray-600">Latest snippets</h1>

      <SnippetCard
        v-for="snippet in snippets"
        :key="snippet.id"
        :snippet="snippet"
      >
        <nuxt-link
          :to="{
            name: 'author-id',
            params: {
              id: snippet.author.username,
            },
          }"
          >{{ snippet.author.name }}</nuxt-link
        >
      </SnippetCard>
    </div>
  </div>
</template>

<script>
import SnippetCard from "@/components/snippets/SnippetCard";

export default {
  middleware: ["authIndent"],

  components: {
    SnippetCard,
  },

  data() {
    return {
      snippets: [],
    };
  },
  head() {
    return {
      title: "Snippets by Codecourse",
    };
  },
  async asyncData({ app }) {
    let snippets = await app.$axios.$get("api/snippets?limit=10");

    return {
      snippets: snippets.data,
    };
  },
};
</script>

<template>
  <div>
    <Breadcrumb leading="Browse" />

    <div class="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <AppInput
        type="text"
        placeholder="Search....."
        class="h-8 p-1 mt-5 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded "
        v-model="search"
      />
      <h1 class="my-8 text-xl font-medium text-gray-600">
        All Snippets ({{ snippets.length }})
      </h1>
      <template v-if="snippets.length">
        <SnippetCard
          v-for="snippet in snippets"
          :key="snippet.id"
          :snippet="snippet"
        >
          <!-- <nuxt-link
            class="text-blue-500"
            :to="{
              name: 'author-id',
              params: {
                id: snippet.author.username,
              },
            }"
            >{{ snippet.author.name }}</nuxt-link
          > -->
          {{ snippet.author.name }}
        </SnippetCard>
      </template>
      <template v-else>
        <div class="p-2 bg-white border rounded-md">
          <p>No snippets found.</p>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { debounce as _debounce } from "lodash";

export default {
  middleware: ["authIndent"],
  data() {
    return {
      snippets: [],
      search: null,
    };
  },
  head() {
    return {
      title: "Browse",
    };
  },

  watch: {
    search: {
      handler: _debounce(async function (query) {
        this.getData(query);
      }, 500),
    },
  },

  methods: {
    async getData(query) {
      try {
        let response = await this.$axios
          .$get(`/api/snippets?query=${query}`)
          .then((response) => {
            this.snippets = response.data;
          });
      } catch (e) {
        console.log(e);
      }
    },
  },

  async asyncData({ app }) {
    let snippets = await app.$axios.$get("api/snippets");
    return {
      snippets: snippets.data,
    };
  },
};
</script>

<template>
  <div>
    <Breadcrumb leading="Dashboard" />
    <div class="px-2 mx-auto mt-8 max-w-7xl sm:px-6 lg:px-8">
      <div class="flex justify-between">
        <h1 class="mb-6 text-xl font-medium text-gray-600">
          Your Snippets ({{ snippets.length }})
        </h1>

        <a href="#" class="text-xl text-blue-500" @click.prevent="createSnippet"
          >+ Create snippet
        </a>
      </div>

      <div v-if="snippets.length === 0" class="font-medium text-gray-500">
        There are no snippets here. You know what to do.
      </div>

      <DashboardSnippetCard
        v-for="snippet in snippets"
        :key="snippet.id"
        :snippet="snippet"
        @deleted="removeSnippet"
      />
    </div>
  </div>
</template>

<script>
import DashboardSnippetCard from "./components/DashboardSnippetCard";

export default {
  middleware: ["authIndent"],

  components: {
    DashboardSnippetCard,
  },
  data() {
    return {
      snippets: [],
    };
  },
  methods: {
    async createSnippet() {
      let snippet = await this.$axios.$post("api/snippets");

      this.$router.push({
        name: "snippets-id-edit",
        params: { id: snippet.data.id },
      });
    },

    removeSnippet(snippet) {
      this.snippets = this.snippets.filter((s) => s.id !== snippet.id);
      console.log(this.snippets, snippet.id);
    },
  },

  head() {
    return {
      title: "Dashboard",
    };
  },

  async asyncData({ app }) {
    let snippets = await app.$axios.$get("api/my-snippets");

    return {
      snippets: snippets.data,
    };
  },
};
</script>

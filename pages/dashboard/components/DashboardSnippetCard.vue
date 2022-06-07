<template>
  <SnippetCard :snippet="snippet">
    <ul class="flex items-end text-gray-600">
      <li class="mr-6 text-green-500">
        <template v-if="snippet.is_public">Public</template>
        <template v-else>Private</template>
      </li>
      <li class="mr-6">
        <nuxt-link
          class="text-blue-500"
          :to="{
            name: 'snippets-id-edit',
            params: {
              id: snippet.id,
            },
          }"
          >Edit</nuxt-link
        >
      </li>
      <li class="mr-6">
        <button class="text-red-500" @click.prevent="deleteSnippet()">
          Delete
        </button>
      </li>
    </ul>
  </SnippetCard>
</template>
<script>
export default {
  props: {
    snippet: {
      required: true,
      type: Object,
    },
  },
  methods: {
    async deleteSnippet() {
      if (!window.confirm("Are you sure you want to delete this snippet?")) {
        return;
      }

      await this.$axios.delete(`api/snippets/${this.snippet.id}`);
      this.$emit("deleted", this.snippet);
    },
  },
};
</script>

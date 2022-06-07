<template>
  <button
    @click.prevent="deleteStep"
    class="order-10 lg:order-12"
    title="Delete step"
  >
    <TrashIcon
      class="flex-shrink-0 p-1 text-white bg-blue-500 border rounded-md  lg:mt-1 w-7 h-7"
    />
  </button>
</template>

<script>
import { TrashIcon } from "@vue-hero-icons/outline";
export default {
  components: {
    TrashIcon,
  },

  props: {
    snippet: {
      required: true,
      type: Object,
    },
    currentStep: {
      required: true,
      type: Object,
    },
  },

  methods: {
    async deleteStep() {
      await this.$axios.delete(
        `api/snippets/${this.snippet.id}/steps/${this.currentStep.id}`
      );

      this.$emit("deleted", this.currentStep);
    },
  },
};
</script>

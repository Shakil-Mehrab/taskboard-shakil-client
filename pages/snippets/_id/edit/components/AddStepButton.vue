<template>
  <a
    href=""
    class="order-11 lg:order-11"
    :title="`Add step ${position}`"
    @click.prevent="addStep"
  >
    <PlusIcon
      class="flex-shrink-0 p-1 text-white bg-blue-500 border rounded-md  lg:mt-1 w-7 h-7"
    />
  </a>
</template>
<script>
import { PlusIcon } from "@vue-hero-icons/outline";

export default {
  components: {
    PlusIcon,
  },
  props: {
    position: {
      required: true,
      type: String,
    },
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
    async addStep() {
      const response = await this.$axios.$post(
        `api/snippets/${this.snippet.id}/steps`,
        {
          [this.position]: this.currentStep.id,
        }
      );

      this.$emit("added", response.data);
    },
  },
};
</script>

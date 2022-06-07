<template>
  <ul>
    <li
      v-for="(step, index) in orderedStepsAsc"
      :key="step.id"
      class="mt-3 text-sm font-medium text-blue-500 font-rubik"
      :class="{ 'font-bold': currentStep.id == step.id }"
    >
      <nuxt-link :to="{ query: { step: step.id } }"
        >{{ index + 1 }}. {{ step.title || "Untitled step" }}
        {{ step.order }}</nuxt-link
      >
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    orderedStepsAsc: {
      type: Array,
      required: true,
    },
    currentStep: {
      type: Object,
      required: true,
    },
  },
};
</script>

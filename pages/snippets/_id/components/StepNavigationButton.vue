<template>
  <nuxt-link
    :to="step ? { query: { step: step.id } } : {}"
    :title="title"
    :class="[{ 'opacity-25 pointer-events-none': !step }, order]"
  >
    <slot />
  </nuxt-link>
</template>
<script>
export default {
  props: {
    step: {
      required: true,
      type: Object | null,
    },
    title: {
      required: false,
      type: String,
      default: null,
    },
    order: {
      required: false,
      type: String,
      default: "order-1",
    },
  },
};
</script>

<template>
  <input
    :placeholder="placeholder"
    :value="value"
    @input="$emit('input', $event.target.value)"
    class="flex-grow w-full px-2 rounded-md  focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 focus:outline-none"
  />
</template>

<script>
export default {
  props: {
    value: {
      required: false,
      type: String,
      default: "",
    },
    placeholder: {
      required: false,
      type: String,
      default: "text",
    },
  },
};
</script>

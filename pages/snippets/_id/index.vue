<template>
  <div class="w-full">
    <Breadcrumb
      :leading="snippet.title"
      :trialing="snippet.author.name"
      breadcrumb="Created By"
    />

    <div class="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <h3 class="py-5 text-lg font-semibold text-gray-700">
        {{ currentStepIndex }}/{{ steps.length }}. {{ currentStep.title }}
      </h3>
      <div
        class="
          flex flex-wrap
          space-y-3
          lg:flex-nowrap lg:space-y-0 lg:space-x-6
        "
      >
        <div
          class="flex flex-wrap justify-between w-full lg:w-8/12 lg:flex-nowrap"
        >
          <StepNavigationButton :step="previousStep" title="Previous Step">
            <ArrowLeftIcon
              class="
                flex-shrink-0
                p-1
                mt-3
                text-white
                bg-blue-500
                border
                rounded-md
                w-7
                h-7
              "
            />
          </StepNavigationButton>
          <div class="order-3 w-full p-3 rounded-md lg:mx-3 lg:order-2">
            <AppTextArea
              class="w-full border-2 border-dashed"
              rows="10"
              v-model="currentStep.body"
            />
          </div>
          <div class="flex flex-row order-2 my-3 lg:flex-col lg:order-3">
            <StepNavigationButton :step="nextStep" title="Next Step">
              <ArrowRightIcon
                class="
                  flex-shrink-0
                  p-1
                  text-white
                  bg-blue-500
                  border
                  rounded-md
                  w-7
                  h-7
                "
                title="Next Step"
              />
            </StepNavigationButton>

            <nuxt-link
              v-if="snippet.user.owner"
              :to="{
                name: 'snippets-id-edit',
                params: { id: snippet.id },
                query: { step: currentStep ? currentStep.id : null },
              }"
              class="order-10 lg:order-11"
            >
              <PencilAltIcon
                class="
                  flex-shrink-0
                  p-1
                  text-white
                  bg-blue-500
                  border
                  rounded-md
                  lg:mt-1
                  w-7
                  h-7
                "
              />
            </nuxt-link>
          </div>
        </div>
        <div class="w-full lg:w-4/12">
          <h3 class="text-lg font-semibold">Steps</h3>
          <div>
            <ul>
              <StepList
                :orderedStepsAsc="orderedStepsAsc"
                :currentStep="currentStep"
              />
            </ul>
            <p class="mt-8 text-base text-gray-500">
              Use <span class="px-2 bg-gray-300 rounded">ctrl</span> +
              <span class="px-2 bg-gray-300 rounded">shift</span> +
              <span class="px-2 bg-gray-300 rounded">left</span> or right on
              your keyboard to navigate between steps
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  PencilAltIcon,
} from "@vue-hero-icons/outline";

import StepList from "./components/StepList";
import StepNavigationButton from "./components/StepNavigationButton";
import browserSnippet from "@/mixins/snippets/browserSnippet";

export default {
  middleware: ["authIndent"],

  head() {
    return {
      title: ` ${this.snippet.title || "Untitled Snippet"}`,
    };
  },

  data() {
    return {
      snippet: null,
      steps: [],
    };
  },

  mixins: [browserSnippet],

  components: {
    ArrowLeftIcon,
    ArrowRightIcon,
    PencilAltIcon,
    StepList,
    StepNavigationButton,
  },

  async asyncData({ app, params }) {
    let respinse = await app.$axios.$get(`api/snippets/${params.id}`);
    return {
      snippet: respinse.data,
      steps: respinse.data.steps,
    };
  },
};
</script>

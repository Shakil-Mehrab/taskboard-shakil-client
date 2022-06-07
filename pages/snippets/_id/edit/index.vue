<template>
  <div class="w-full">
    <div class="bg-white border-b shadow-sm">
      <div class="mx-auto max-w-7xl">
        <div class="px-2 sm:px-6 lg:mx-auto lg:px-8 lg:border-gray-200">
          <div class="flex py-6 md:items-center md:justify-between">
            <div class="flex-1 min-w-0">
              <!-- Profile -->
              <div class="flex items-center">
                <div class="w-full">
                  <div class="flex items-center">
                    <AppInput
                      type="text"
                      placeholder="Untitled Snippet"
                      class="w-full h-12 p-2 text-3xl font-medium text-gray-500 border-2 border-dashed rounded-md  bg-gray-50"
                      v-model="snippet.title"
                    />
                  </div>
                  <dl class="flex mt-3">
                    <dd
                      class="flex items-center text-base font-medium text-gray-500 capitalize  sm:mr-6"
                    >
                      <UserIcon
                        class="flex-shrink-0 w-5 h-5 mr-0.5 text-gray-400"
                        aria-hidden="true"
                      />
                      Created By
                      <hr />

                      <nuxt-link class="ml-2 text-base text-blue-500" :to="{}">
                        Md Shakil Sarder
                      </nuxt-link>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <h3 class="flex py-5 space-x-2 text-lg font-semibold">
        {{ currentStepIndex }}/{{ steps.length }}.
      </h3>
      <div class="w-full">
        <AppInput
          type="text"
          placeholder="Untitled Step"
          class="p-2 text-lg font-medium text-gray-500 bg-white border-2 border-dashed rounded "
          v-model="currentStep.title"
        />
      </div>

      <div
        class="flex flex-wrap space-y-3  lg:flex-nowrap lg:space-y-0 lg:space-x-6"
      >
        <div
          class="flex flex-wrap justify-between w-full lg:w-8/12 lg:flex-nowrap"
        >
          <div class="flex flex-row my-3 lg:flex-col">
            <StepNavigationButton :step="previousStep" title="Previous Step">
              <ArrowLeftIcon
                class="flex-shrink-0 p-1 text-white bg-blue-500 border rounded-md  w-7 h-7"
              />
            </StepNavigationButton>
            <AddStepButton
              position="before"
              :snippet="snippet"
              :currentStep="currentStep"
            />
          </div>
          <div class="order-3 w-full p-3 rounded-md lg:mx-3 lg:order-2">
            <AppTextArea
              class="w-full border-2 border-dashed"
              rows="5"
              v-model="currentStep.body"
            />

            <!-- <div class="p-2 bg-white border rounded-md" v-if="currentStep.body">
              <p>
                {{ currentStep.body }}
              </p>
            </div> -->
          </div>
          <div class="flex flex-row order-2 my-3 lg:flex-col lg:order-3">
            <StepNavigationButton
              :step="nextStep"
              title="Next Step"
              order="order-12 lg:order-1"
            >
              <ArrowRightIcon
                class="flex-shrink-0 p-1 text-white bg-blue-500 border rounded-md  w-7 h-7"
                title="Next Step"
              />
            </StepNavigationButton>

            <AddStepButton
              @added="handleStepAdded"
              position="after"
              :snippet="snippet"
              :currentStep="currentStep"
            />
            <DeleteStepButton
              v-if="steps.length > 1"
              :snippet="snippet"
              :currentStep="currentStep"
              @deleted="handleStepDeleted"
            />
          </div>
        </div>

        <div class="w-full lg:w-4/12">
          <h3 class="text-lg font-semibold">Steps</h3>
          <div>
            <StepList
              :orderedStepsAsc="orderedStepsAsc"
              :currentStep="currentStep"
            />

            <div class="py-3 my-5 border-t border-b">
              <h3 class="text-lg font-semibold">Publishing</h3>
              <p class="mt-1 text-base text-gray-500">
                <template v-if="lastSaved">
                  Last saved at {{ lastSavedFormatted }}
                </template>
                <template v-else>
                  No changes saved in this session yet.
                </template>
              </p>
            </div>

            <div class="flex items-baseline mb-6">
              <input
                v-model="snippet.is_public"
                type="checkbox"
                name="public"
                id="public"
                class="mr-2"
              />
              <div>
                <label for="public" class="font-medium text-gray-600">
                  Make this snippet public
                </label>
                <p class="text-sm text-gray-500">
                  Don't worry you can change this later
                </p>
              </div>
            </div>

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
  UserIcon,
} from "@vue-hero-icons/outline";
import { debounce as _debounce } from "lodash";
import StepList from "../components/StepList";
import StepNavigationButton from "../components/StepNavigationButton";
import { orderBy as _orderBy } from "lodash";
import browserSnippet from "@/mixins/snippets/browserSnippet";
import AddStepButton from "./components/AddStepButton";
import DeleteStepButton from "./components/DeleteStepButton";
import moment from "moment";

export default {
  middleware: ["authIndent"],

  head() {
    return {
      title: `Editing ${this.snippet.title || "Untitled Snippet"}`,
    };
  },

  data() {
    return {
      snippet: null,
      steps: [],
      lastSaved: null,
    };
  },

  mixins: [browserSnippet],

  components: {
    ArrowRightIcon,
    UserIcon,
    StepList,
    StepNavigationButton,
    ArrowLeftIcon,
    AddStepButton,
    DeleteStepButton,
  },

  watch: {
    "snippet.title": {
      handler: _debounce(async function (title) {
        await this.$axios.$patch(`api/snippets/${this.snippet.id}`, {
          title,
        });
        this.touchLastSaved();
      }, 500),
    },

    "snippet.is_public": {
      handler: _debounce(async function (isPublic) {
        await this.$axios.$patch(`api/snippets/${this.snippet.id}`, {
          is_public: isPublic,
        });

        this.touchLastSaved();
      }, 500),
    },

    currentStep: {
      deep: true,
      handler: _debounce(async function (step) {
        await this.$axios.$patch(
          `api/snippets/${this.snippet.id}/steps/${step.id}`,
          {
            title: step.title,
            body: step.body,
          }
        );

        this.touchLastSaved();
      }, 500),
    },
  },

  computed: {
    lastSavedFormatted() {
      return moment(this.lastSaved).format("hh:mm:ss");
    },
  },

  methods: {
    touchLastSaved() {
      this.lastSaved = moment.now();
    },

    handleStepAdded(step) {
      this.steps.push(step);
      this.goToStep(step);
    },

    handleStepDeleted(step) {
      const previousStep = this.previousStep;

      this.steps = this.steps.filter((s) => {
        return s.id !== step.id;
      });

      this.goToStep(previousStep || this.firstStep);
    },
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

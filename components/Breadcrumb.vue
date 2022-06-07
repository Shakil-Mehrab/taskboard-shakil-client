<template>
  <div class="bg-white border-b shadow-sm">
    <div class="mx-auto max-w-7xl">
      <div class="px-2 sm:px-6 lg:mx-auto lg:px-8 lg:border-gray-200">
        <div class="flex py-6 md:items-center md:justify-between">
          <div class="flex-1 min-w-0">
            <div class="flex items-center">
              <div>
                <div class="flex items-center">
                  <h1
                    class="text-2xl font-semibold leading-7 text-gray-700  sm:leading-9 sm:truncate first-letter:capitalize font-roboto"
                  >
                    {{ leading }}
                  </h1>
                </div>
                <dl class="flex mt-1">
                  <dd
                    class="flex items-center text-base font-medium text-gray-500 capitalize  sm:mr-6"
                  >
                    <p v-if="breadcrumb">
                      <UserIcon
                        class="flex-shrink-0 w-5 h-5 mr-0.5 text-gray-400"
                        aria-hidden="true"
                      />
                      {{ breadcrumb }}
                    </p>
                    <nuxt-link
                      class="ml-2 text-base text-blue-500"
                      :to="link()"
                    >
                      {{ trialing }}
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
</template>

<script>
import { UserIcon } from "@vue-hero-icons/outline";

export default {
  props: {
    leading: {
      required: false,
      type: String,
      default: null,
    },
    trialing: {
      required: false,
      type: String,
      default: null,
    },
    href: {
      required: false,
      type: String | Object,
      default: "#",
    },
    breadcrumb: {
      required: false,
      type: String,
      default: null,
    },
  },
  components: {
    UserIcon,
  },
  methods: {
    link() {
      return this.href ? this.href : "/";
    },
  },
};
</script>

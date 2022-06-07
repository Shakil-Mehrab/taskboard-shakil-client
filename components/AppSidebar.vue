<template>
  <div class="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
    <div
      class="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto liner-gradient"
    >
      <div class="flex items-center justify-center flex-shrink-0 px-4">
        <img
          class="w-auto h-12"
          src="@/assets/images/dbc-white-logo.svg"
          alt="Easywire logo"
        />
      </div>

      <nav
        class="flex flex-col flex-1 mt-5 overflow-y-auto divide-y divide-red-800 "
        aria-label="Sidebar"
      >
        <div class="px-2 space-y-1">
          <nuxt-link
            class="flex items-center px-2 py-2 text-sm font-medium leading-6 text-red-100 rounded-md  group hover:text-white hover:bg-red-600"
          >
            <UserGroupIcon
              class="w-6 h-6 mr-4 text-red-200"
              aria-hidden="true"
            />
            Users
          </nuxt-link>
        </div>
        <div class="pt-6 mt-6">
          <div class="px-2 space-y-1">
            <a
              class="flex items-center px-2 py-2 text-sm font-medium leading-6 text-red-100 rounded-md  group hover:text-white hover:bg-red-600"
            >
              <CogIcon class="w-6 h-6 mr-4 text-red-200" aria-hidden="true" />
              Settings
            </a>

            <a
              href="#"
              class="flex items-center px-2 py-2 text-sm font-medium leading-6 text-red-100 rounded-md  group hover:text-white hover:bg-red-600"
            >
              <QuestionMarkCircleIcon
                class="w-6 h-6 mr-4 text-red-200"
                aria-hidden="true"
              />
              Help
            </a>

            <a
              href="#"
              class="flex items-center px-2 py-2 text-sm font-medium leading-6 text-red-100 rounded-md  group hover:text-white hover:bg-red-600"
            >
              <ShieldCheckIcon
                class="w-6 h-6 mr-4 text-red-200"
                aria-hidden="true"
              />
              Privacy
            </a>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import {
  CogIcon,
  TagIcon,
  CollectionIcon,
  BookOpenIcon,
  QuestionMarkCircleIcon,
  ShieldCheckIcon,
  DatabaseIcon,
  UserGroupIcon,
} from "@vue-hero-icons/outline";
import { LocationMarkerIcon, NewspaperIcon } from "@vue-hero-icons/solid";

export default {
  components: {
    CogIcon,
    TagIcon,
    LocationMarkerIcon,
    CollectionIcon,
    NewspaperIcon,
    BookOpenIcon,
    QuestionMarkCircleIcon,
    ShieldCheckIcon,
    DatabaseIcon,
    UserGroupIcon,
  },
};
</script>

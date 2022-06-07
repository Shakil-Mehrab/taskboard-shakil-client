<template>
  <div class="h-16 bg-white">
    <div
      class="relative z-10 flex justify-between flex-shrink-0 w-full h-full px-2 mx-auto  max-w-7xl sm:px-6 lg:px-8 lg:border-none"
    >
      <button
        type="button"
        class="pr-4 text-gray-400  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500 lg:hidden"
        @click.prevent="openDrawer"
      >
        <span class="sr-only">Open sidebar</span>
        <MenuAlt1Icon class="w-7 h-7" />
      </button>
      <div class="flex items-center flex-shrink-0 h-full">
        <nuxt-link :to="{}">
          <img
            class="w-auto h-8"
            src="@/assets/images/dbc-red-logo.png"
            alt="Easywire logo"
          />
        </nuxt-link>
      </div>
      <div class="justify-between flex-1 hidden w-full lg:flex">
        <div class="flex items-center">
          <h3 class="flex items-center ml-4 text-lg md:ml-6">
            <nuxt-link :to="{ name: 'browse' }">Browse</nuxt-link>
          </h3>
          <h3 class="flex items-center ml-4 text-lg md:ml-6">
            <a href="">Search</a>
          </h3>
        </div>

        <div class="flex items-center ml-4 md:ml-6">
          <nuxt-link
            :to="{ name: 'dashboard' }"
            class="flex items-center mx-4 text-lg md:ml-6"
          >
            Dashboard
          </nuxt-link>

          <button
            type="button"
            class="p-1 text-gray-400 bg-white rounded-full  hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <span class="sr-only">View notifications</span>
            <BellIcon class="w-6 h-6" />
          </button>

          <div class="flex justify-center" v-if="!$auth.user">
            <nuxt-link
              to="login/signin"
              class="flex items-center ml-4 text-lg font-semibold  md:ml-6 font-rubik"
            >
              Sign In
            </nuxt-link>
            <nuxt-link
              to="login/register"
              class="flex items-center ml-4 text-lg font-semibold  md:ml-6 font-rubik"
            >
              Create an Account
            </nuxt-link>
          </div>
          <div
            v-else
            @click.prevent="profileDropdown = !profileDropdown"
            v-click-outside="hide"
            class="relative ml-3"
          >
            <div>
              <button
                type="button"
                class="flex items-center max-w-xs text-sm bg-white rounded-full  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 lg:p-2 lg:rounded-md lg:hover:bg-gray-50"
              >
                <img
                  class="w-8 h-8 rounded-full"
                  v-if="$auth.user.data.profile_photo_path"
                  :src="$auth.user.data.profile_photo_path"
                  :alt="$auth.user.data.name"
                />
                <span class="ml-3 text-sm font-medium text-gray-700 font-rubik">
                  {{ $auth.user.data.name }}
                </span>
                <ChevronDownIcon
                  class="flex-shrink-0 w-5 h-5 ml-1 text-gray-400"
                />
              </button>
            </div>

            <div
              class="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg  ring-1 ring-black ring-opacity-5 focus:outline-none"
              v-show="profileDropdown"
            >
              <nuxt-link
                :to="{ name: 'profile' }"
                class="block px-4 py-2 text-sm text-gray-700"
                >Your Profile</nuxt-link
              >
              <a
                @click.prevent="logout"
                href="#"
                class="block px-4 py-2 text-sm text-gray-700"
                >Logout</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClickOutside from "vue-click-outside";
import { mapActions } from "vuex";
import {
  MenuAlt1Icon,
  BellIcon,
  ChevronDownIcon,
  SearchIcon,
} from "@vue-hero-icons/outline";

export default {
  data() {
    return {
      profileDropdown: false,
    };
  },
  components: {
    MenuAlt1Icon,
    BellIcon,
    ChevronDownIcon,
    SearchIcon,
  },
  methods: {
    ...mapActions({
      openDrawer: "drawer/open",
    }),

    hide() {
      this.profileDropdown = false;
    },

    async logout() {
      try {
        await this.$auth.logout();

        this.$router.replace({
          name: "auth-login",
        });
      } catch (e) {
        console.error(e);
      }
    },
  },
  directives: {
    ClickOutside,
  },
};
</script>

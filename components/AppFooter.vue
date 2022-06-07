<template>
  <div class="bg-white">
    <div class="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div
        class="justify-between py-5 space-y-2 text-sm text-center  md:space-y-0 md:flex"
      >
        <p>
          &copy; 2016-{{ date }} Dhaka Bangla Media & Communication Ltd. All
          rights reserved.
        </p>
        <p>Lead By : Akram Khan</p>
        <p>Developed By : Md. Shakil Sarder</p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      date: moment().format("YYYY"),
    };
  },
};
</script>

<template>
  <div
    class="toast-container position-fixed pe-3 top-0 end-0"
    style="z-index: 1500"
  >
    <div
      v-for="(msg, key) in messages"
      :key="key"
      class="toast show"
      :class="`toast${key}`"
      role="alert"
    >
      <div class="toast-header">
        <span
          :class="`bg-${msg.style}`"
          class="p-2 rounded me-2 d-inline-block"
        ></span>
        <strong class="me-auto">{{ msg.title }}</strong>
        <button
          type="button"
          class="btn-close"
          @click="clearToast(key)"
          aria-label="Close"
        ></button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { useToastMessageStore } from "../store/toastMessage";
export default {
  computed: {
    ...mapState(useToastMessageStore, ['messages'])
  },
  methods: {
    ...mapActions(useToastMessageStore, ['clearToast'])
  }
};
</script>
<template>
  <div :class="classNames">
    <PToast
      v-for="toast in toasts"
      :key="toast.id"
      :toast="toast"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import { useToast } from '../composables/toast'
import PToast from './PToast.vue'

const componentName = 'p-toast-container'

const { toasts } = useToast()

const classNames = computed(() => [componentName])
</script>

<style>
.p-toast-container {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 1000;

  display: flex;
  flex-direction: column;
  gap: 12px;

  width: min(420px, calc(100vw - 48px));
}
</style>

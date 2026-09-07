<template>
  <div
    :class="classNames"
    role="status"
    aria-live="polite"
  >
    <span
      :class="`${componentName}__message`"
      v-text="toast.message"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import { generateClass } from '../utils/classGenerator'

import type { PToastProps } from '../types'

const componentName = 'p-toast'

const props = defineProps<{ toast: PToastProps }>()

const classNames = computed(() => [
  componentName,
  generateClass(componentName, props.toast.type),
])
</script>

<style>
.p-toast {
  display: flex;
  align-items: center;
  min-width: 280px;
  max-width: 420px;
  padding: 12px 16px;
  border: 1px solid var(--p-color-border);
  border-radius: var(--p-radius-md);
  background: var(--p-color-surface);
  color: var(--p-color-text);
  box-shadow: 0 8px 24px rgb(15 23 42 / 12%);
}

.p-toast__message {
  font-size: 14px;
  line-height: 20px;
}

.p-toast--success {
  border-color: var(--p-color-success);
}

.p-toast--error {
  border-color: var(--p-color-danger);
}

.p-toast--warning {
  border-color: var(--p-color-warning);
}

.p-toast--info {
  border-color: var(--p-color-primary);
}
</style>

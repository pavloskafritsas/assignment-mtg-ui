<template>
  <component
    :is="getElTag"
    v-bind="$attrs"
    :class="classNames"
    :disabled="disabled"
  >
    <slot :label="label">
      <span
        class="p-button__label"
        v-text="label"
      />
    </slot>
  </component>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import { generateClass } from '../utils/classGenerator'

import type { PButtonProps } from '../types'

const componentName = 'p-button'

const props = withDefaults(defineProps<PButtonProps>(), {
  color: 'primary',
  disabled: false,
  loading: false,
  radius: 'md',
  size: 'md',
})

const classNames = computed(() => [
  componentName,
  generateClass(componentName, props.color),
  generateClass('p-radius', props.radius),
  props.disabled && generateClass(componentName, 'disabled'),
  props.loading && generateClass(componentName, 'loading'),
  generateClass(componentName, props.size),
])

const getElTag = computed<'a' | 'button'>(() => {
  if (props.to) {
    return 'button'
  } else if (props.href) {
    return 'a'
  }

  return 'button'
})
</script>

<style>
:root {
  --p-button-size-xs: 24px;
  --p-button-size-sm: 32px;
  --p-button-size-md: 40px;
  --p-button-size-lg: 48px;
}

.p-button {
  border: 1px solid transparent;
  font: inherit;
  font-weight: 500;
  cursor: pointer;
  transition:
    background-color 0.15s,
    border-color 0.15s;
}

.p-button--primary {
  background: var(--p-color-primary);
  color: #fff;
}

.p-button--primary:hover:not(:disabled) {
  background: var(--p-color-primary-hover);
}

.p-button--secondary {
  background: var(--p-color-surface);
  color: var(--p-color-text);
  border-color: var(--p-color-border);
}

.p-button--secondary:hover:not(:disabled) {
  background: var(--p-color-background);
}

.p-button--danger {
  background: var(--p-color-danger);
  color: #fff;
}

.p-button:focus-visible {
  outline: 2px solid var(--p-color-focus);
  /* outline-offset: 2px; */
}

.p-button--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.p-button--loading {
  cursor: progress;
}

.p-button--sm {
  min-height: var(--p-button-size-sm);
}

.p-button--md {
  min-height: var(--p-button-size-md);
}

.p-button--lg {
  min-height: var(--p-button-size-lg);
}
</style>

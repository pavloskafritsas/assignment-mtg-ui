<template>
  <div :class="classNames">
    <label
      v-if="label"
      class="p-text-field__label"
      :for="inputId"
      v-text="label"
    />

    <input
      :id="inputId"
      class="p-text-field__input"
      :type="inputType"
      :value="model"
      :disabled="disabled"
      :required="required"
      :placeholder="placeholder"
      :aria-describedby="describedBy"
      :aria-invalid="error ? 'true' : undefined"
      @input="handleInput"
    />

    <p
      v-if="error"
      :id="errorId"
      class="p-text-field__error"
      v-text="error"
    />

    <p
      v-else-if="description"
      :id="descriptionId"
      class="p-text-field__description"
      v-text="description"
    />
  </div>
</template>

<script setup lang="ts" generic="T extends 'text' | 'number' = 'text'">
import { computed, useId } from 'vue'

import { generateClass } from '../utils/classGenerator'

import type { PTextField } from '../types'

const componentName = 'p-text-field'

type ModelValue<T> = T extends 'number' ? number : string

const props = withDefaults(defineProps<PTextField<T>>(), {
  color: 'primary',
  disabled: false,
  loading: false,
  radius: 'md',
  required: false,
  size: 'md',
})

const model = defineModel<ModelValue<T>>()

const classNames = computed(() => [
  componentName,
  generateClass(componentName, props.color),
  generateClass('p-radius', props.radius),
  props.disabled && generateClass(componentName, 'disabled'),
  props.loading && generateClass(componentName, 'loading'),
  generateClass(componentName, props.size),
])

const inputType = computed(() => props.type ?? 'text')

const generatedId = useId()

const inputId = computed(() => props.id ?? `${componentName}-${generatedId}`)

const descriptionId = computed(() => `${inputId.value}-description`)

const errorId = computed(() => `${inputId.value}-error`)

const describedBy = computed(() => {
  if (props.error) return errorId.value
  if (props.description) return descriptionId.value
  return undefined
})

const handleInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value

  if (inputType.value === 'number') {
    model.value = Number(value) as ModelValue<T>
    return
  }

  model.value = value as ModelValue<T>
}
</script>

<style>
.p-text-field {
  display: flex;
  flex-direction: column;
  gap: 6px;

  --p-text-field-border: var(--p-color-border);
  --p-text-field-focus: var(--p-color-focus);
}

.p-text-field--primary {
  --p-text-field-border: var(--p-color-primary);
  --p-text-field-focus: var(--p-color-primary);
}

.p-text-field--secondary {
  --p-text-field-border: var(--p-color-secondary);
  --p-text-field-focus: var(--p-color-secondary);
}

.p-text-field--success {
  --p-text-field-border: var(--p-color-success);
  --p-text-field-focus: var(--p-color-success);
}

.p-text-field--danger {
  --p-text-field-border: var(--p-color-danger);
  --p-text-field-focus: var(--p-color-danger);
}

.p-text-field--sm .p-text-field__input {
  height: 32px;
  padding: 0 10px;
  font-size: 13px;
}

.p-text-field--md .p-text-field__input {
  height: 40px;
  padding: 0 12px;
  font-size: 14px;
}

.p-text-field--lg .p-text-field__input {
  height: 48px;
  padding: 0 14px;
  font-size: 16px;
}

.p-text-field__input {
  width: 100%;
  height: 40px;
  padding: 0 12px;

  border: 1px solid var(--p-text-field-border);
  border-radius: inherit;

  background: var(--p-color-surface);
  color: var(--p-color-text);

  font: inherit;
  font-size: 14px;

  outline: none;

  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;
}

.p-text-field__input::placeholder {
  color: var(--p-color-text-muted);
}

.p-text-field__input:hover:not(:disabled) {
  border-color: var(--p-text-field-focus);
}

.p-text-field__input:focus {
  border-color: var(--p-text-field-focus);
  box-shadow: 0 0 0 3px
    color-mix(in srgb, var(--p-text-field-focus) 15%, transparent);
}

.p-text-field__input:disabled {
  background: var(--p-color-background);
  color: var(--p-color-text-muted);
  cursor: not-allowed;
  opacity: 0.7;
}
</style>

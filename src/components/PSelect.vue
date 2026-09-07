<template>
  <div :class="classNames">
    <label
      v-if="label"
      :class="`${componentName}__label`"
      :for="triggerId"
      v-text="label"
    />

    <PButton
      :id="triggerId"
      ref="elTrigger"
      type="button"
      role="combobox"
      :aria-expanded="isOpen"
      :aria-controls="listboxId"
      aria-haspopup="listbox"
      :aria-describedby="describedBy"
      :aria-invalid="error ? 'true' : undefined"
      :disabled="disabled"
      @click="toggle"
      @keydown="onKeydown"
    >
      <slot
        v-if="selectedOption"
        name="item-selected"
        :selected="selectedOption"
      >
        <span
          :class="`${componentName}__value`"
          v-text="selectedOption.label"
        />
      </slot>

      <slot
        v-else
        name="placeholder"
      >
        <span
          :class="`${componentName}__placeholder`"
          v-text="placeholder"
        />
      </slot>

      <span
        aria-hidden="true"
        :class="`${componentName}__icon`"
        v-text="'▾'"
      />
    </PButton>

    <POverlay
      v-model="isOpen"
      :anchor="elTrigger?.$el"
      :backdrop="false"
    >
      <div
        :id="listboxId"
        :class="[
          `${componentName}__listbox`,
          generateClass('p-radius', props.radius),
        ]"
        role="listbox"
      >
        <PButton
          v-for="(option, i) in options"
          :key="i"
          type="button"
          role="option"
          color="secondary"
          :aria-selected="isSelected(option)"
          :class="{
            [`${componentName}__option`]: true,
            [`${componentName}__option--highlighted`]: i === highlightedIndex,
            [`${componentName}__option--selected`]: isSelected(option),
          }"
          :label="option.label"
          @click="selectOption(option)"
          @mouseenter="highlightedIndex = i"
        />
      </div>
    </POverlay>

    <p
      v-if="error"
      :id="errorId"
      :class="`${componentName}__error`"
      v-text="error"
    />

    <p
      v-else-if="description"
      :id="descriptionId"
      :class="`${componentName}__description`"
      v-text="description"
    />
  </div>
</template>

<script lang="ts" setup generic="T">
import { computed, ref, useId, useTemplateRef } from 'vue'

import { generateClass } from '../utils/classGenerator'
import PButton from './PButton.vue'
import POverlay from './POverlay.vue'

import type { PSelectOption, PSelectProps } from '../types'

const componentName = 'p-select'

const props = withDefaults(defineProps<PSelectProps<T>>(), {
  color: 'primary',
  disabled: false,
  placeholder: 'Select an option',
  radius: 'md',
  required: false,
  size: 'md',
})

const modelValue = defineModel<T>()

const isOpen = ref<boolean>(false)
const highlightedIndex = ref<number>(-1)

const elTrigger = useTemplateRef('elTrigger')

const generatedId = useId()
const triggerId = `p-select-${generatedId}`
const listboxId = `${triggerId}-listbox`
const descriptionId = `${triggerId}-description`
const errorId = `${triggerId}-error`

const classNames = computed(() => [
  componentName,
  generateClass(componentName, props.size),
  generateClass(componentName, props.color),
  generateClass('p-radius', props.radius),
  {
    [`${componentName}--disabled`]: props.disabled,
    [`${componentName}--error`]: props.error,
    [`${componentName}--open`]: isOpen.value,
  },
])

const selectedOption = computed<PSelectOption<T> | undefined>(() =>
  props.options.find((option) => option.value === modelValue.value),
)

const describedBy = computed<string | undefined>(() => {
  if (props.error) return errorId
  if (props.description) return descriptionId

  return undefined
})

const isSelected = (option: PSelectOption<T>): boolean =>
  option.value === modelValue.value

const open = (): void => {
  if (props.disabled || !props.options.length) return

  isOpen.value = true

  const selectedIndex: number = props.options.findIndex(isSelected)

  highlightedIndex.value = selectedIndex >= 0 ? selectedIndex : 0
}

const close = (): void => {
  isOpen.value = false
  highlightedIndex.value = -1
}

const toggle = (): void => {
  if (isOpen.value) {
    close()
    return
  }

  open()
}

const selectOption = (option: PSelectOption<T>): void => {
  modelValue.value = option.value

  close()

  elTrigger.value?.$el.focus()
}

const moveHighlight = (direction: 1 | -1): void => {
  if (!props.options.length) return

  if (!isOpen.value) {
    open()

    return
  }

  const length: number = props.options.length

  highlightedIndex.value =
    (highlightedIndex.value + direction + length) % length
}

const onKeydown = (event: KeyboardEvent): void => {
  switch (event.key) {
    case 'Enter':
    case ' ':
      event.preventDefault()

      if (!isOpen.value) {
        open()
        return
      }

      if (highlightedIndex.value >= 0) {
        selectOption(props.options[highlightedIndex.value])
      }

      break

    case 'ArrowDown':
      event.preventDefault()
      moveHighlight(1)
      break

    case 'ArrowUp':
      event.preventDefault()
      moveHighlight(-1)
      break

    case 'Home':
      if (isOpen.value) {
        event.preventDefault()
        highlightedIndex.value = 0
      }
      break

    case 'End':
      if (isOpen.value) {
        event.preventDefault()
        highlightedIndex.value = props.options.length - 1
      }
      break

    case 'Escape':
      if (isOpen.value) {
        event.preventDefault()
        close()
      }
      break
  }
}
</script>

<style>
.p-select__listbox {
  width: 100%;
  max-height: 280px;
  overflow-y: auto;
  padding: 4px;
  border: 1px solid var(--p-color-border);
  background: var(--p-color-surface);
  box-shadow: 0 8px 24px rgb(15 23 42 / 12%);
}

.p-select__option {
  width: 100%;
  justify-content: flex-start;
  border: 0;
  text-align: left;
}

.p-select__option:hover.p-button,
.p-select__option--highlighted.p-button {
  color: var(--p-color-text);
  background: var(--p-color-background);
}

.p-select__option--selected {
  font-weight: 600;
}

.p-select__option--selected::after {
  content: '✓';
  margin-left: auto;
  color: var(--p-color-primary);
}

.p-select__option--highlighted {
  outline: none;
}

.p-select__option:focus-visible {
  outline: 2px solid var(--p-color-focus);
  outline-offset: -2px;
}
</style>

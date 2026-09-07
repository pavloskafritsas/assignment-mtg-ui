<template>
  <Teleport
    :to="teleportTarget"
    :defer="teleportDefer"
  >
    <div
      :class="classNames"
      @click.self="onClickOutside"
    >
      <div
        v-if="modelValue"
        :class="`${componentName}__content`"
        :style="contentStyles"
      >
        <slot>
          <!--  -->
        </slot>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import { computed, onBeforeUnmount, watch, type CSSProperties } from 'vue'

import { generateClass } from '../utils/classGenerator'

import type { POverlayProps } from '../types'

const componentName = 'p-overlay'

const props = withDefaults(defineProps<POverlayProps>(), {
  backdrop: true,
  closeOnEscape: true,
  closeOnOutsideClick: true,
  teleportDefer: false,
  teleportTarget: 'body',
})

const modelValue = defineModel<boolean>({ required: true })

const classNames = computed(() => [
  componentName,
  modelValue.value && generateClass(componentName, 'open'),
  props.backdrop && generateClass(componentName, 'backdrop'),
])

const contentStyles = computed<CSSProperties>(() => {
  if (!props.anchor) {
    return {}
  }

  const rect: DOMRect = props.anchor.getBoundingClientRect()

  return {
    position: 'fixed',
    top: `${rect.bottom}px`,
    left: `${rect.left}px`,
    width: `${rect.width}px`,
  }
})

const onClickOutside = () => {
  if (props.closeOnOutsideClick) {
    modelValue.value = false
  }
}

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.closeOnEscape) {
    modelValue.value = false
  }
}

const lockBodyScroll = () => {
  document.body.style.overflow = 'hidden'
}

const unlockBodyScroll = () => {
  document.body.style.overflow = ''
}

const onOpen = () => {
  if (props.closeOnEscape) {
    document.addEventListener('keydown', onKeydown)
  }

  lockBodyScroll()
}

const onClose = () => {
  document.removeEventListener('keydown', onKeydown)

  unlockBodyScroll()
}

watch(modelValue, (v) => {
  if (v) {
    onOpen()
  } else {
    onClose()
  }
})

onBeforeUnmount(() => {
  onClose()
})
</script>

<style>
.p-overlay--open {
  position: fixed;
  inset: 0;
  z-index: 1000;
}

.p-overlay--open.p-overlay--backdrop {
  background: var(--p-color-overlay);
}

.p-overlay__content {
  position: relative;
}
</style>

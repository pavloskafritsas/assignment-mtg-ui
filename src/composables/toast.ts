import { ref } from 'vue'

import type { PToastProps } from '../types'

type ToastPartial = Omit<PToastProps, 'id' | 'type'>

const toasts = ref<PToastProps[]>([])

const defaultDuration = 5000

let toastId: number = 0

export const useToast = () => {
  const generateId = (): string => {
    toastId += 1

    return `toast-${toastId}`
  }

  const handleTimeout = (toast: PToastProps) => {
    setTimeout(() => {
      const index = toasts.value.findIndex((item) => item.id === toast.id)

      if (index !== -1) {
        toasts.value.splice(index, 1)
      }
    }, toast.duration)
  }

  const error = (props: ToastPartial) => {
    const toast = {
      ...props,
      duration: props.duration ?? defaultDuration,
      id: generateId(),
      type: 'error' as const,
    }

    toasts.value.push(toast)

    if (toast.duration) {
      handleTimeout(toast)
    }
  }

  const info = (props: ToastPartial) => {
    const toast = {
      ...props,
      duration: props.duration ?? defaultDuration,
      id: generateId(),
      type: 'info' as const,
    }

    toasts.value.push(toast)

    if (toast.duration) {
      handleTimeout(toast)
    }
  }

  const success = (props: ToastPartial) => {
    const toast = {
      ...props,
      duration: props.duration ?? defaultDuration,
      id: generateId(),
      type: 'success' as const,
    }

    toasts.value.push(toast)

    if (toast.duration) {
      handleTimeout(toast)
    }
  }

  const warning = (props: ToastPartial) => {
    const toast = {
      ...props,
      duration: props.duration ?? defaultDuration,
      id: generateId(),
      type: 'warning' as const,
    }

    toasts.value.push(toast)

    if (toast.duration) {
      handleTimeout(toast)
    }
  }

  return {
    toasts,
    error,
    info,
    success,
    warning,
  }
}

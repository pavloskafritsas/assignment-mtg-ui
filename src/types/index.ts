import type { RouteLocationRaw } from 'vue-router'

export type PTheme = 'light' | 'dark'

export type PColor = 'primary' | 'secondary' | 'danger' | 'success'

export type PRadius =
  | 'none'
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | 'full'
  | 'round'

export type PSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export interface PButtonProps {
  color?: PColor
  disabled?: boolean
  href?: string
  label?: string | null | undefined
  loading?: boolean
  radius?: PRadius
  size?: PSize
  to?: string | RouteLocationRaw
}

export interface POverlayProps {
  anchor?: HTMLElement | null
  backdrop?: boolean
  closeOnEscape?: boolean
  closeOnOutsideClick?: boolean
  teleportDefer?: boolean
  teleportTarget?: string
}

export interface PSelectOption<T> {
  label: string
  value: T
}

export interface PToastProps {
  duration?: number
  id: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
}

export interface PTextField<T> {
  color?: PColor
  description?: string
  disabled?: boolean
  error?: string
  id?: string
  label?: string
  loading?: boolean
  placeholder?: string
  radius?: PRadius
  required?: boolean
  size?: PSize
  type?: T
}

export interface PSelectProps<T> {
  color?: PColor
  description?: string
  disabled?: boolean
  error?: string
  label?: string
  options: PSelectOption<T>[]
  placeholder?: string
  radius?: PRadius
  required?: boolean
  size?: PSize
}

export type Pagination = {
  current_page: number
  from: number
  last_page: number
  to: number
  total: number
}

export type PDataTableHeaderValue<T> = (params: {
  key: string
  row: T
}) => string

export type PDataTableHeader<T> = {
  key: string
  label: string
  value?: PDataTableHeaderValue<T>
}

export type PDataTableProps<T> = {
  headers: PDataTableHeader<T>[]
  height?: string
  loading?: boolean
  pagination?: Pagination
  rows: T[]
}

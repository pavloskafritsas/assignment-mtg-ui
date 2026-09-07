<template>
  <div :class="classNames">
    <table>
      <slot name="thead">
        <thead>
          <tr>
            <th
              v-for="header in headers"
              :key="header.key"
              :class="[`${componentName}__header`]"
            >
              <div :class="`${componentName}__header-content`">
                <span v-text="header.label" />
              </div>
            </th>
          </tr>
        </thead>
      </slot>

      <slot name="tbody">
        <tbody>
          <template
            v-for="(row, i) in rows"
            :key="`row-${i}`"
          >
            <tr :class="`${componentName}__row`">
              <td
                v-for="header in headers"
                :key="header.key"
              >
                <slot
                  :header="header"
                  :index="i"
                  :name="`cell_${header.key}`"
                  :row="row"
                  :value="getCellValue(row, header.key, header.value)"
                >
                  <span v-text="getCellValue(row, header.key, header.value)" />
                </slot>
              </td>
            </tr>
          </template>
        </tbody>
      </slot>

      <slot name="tfoot" />
    </table>

    <div
      v-if="pagination"
      :class="`${componentName}__pagination`"
    >
      <slot
        :from="pagination.from"
        name="pagination"
        :page="pagination.current_page"
        :page-items-count="pagination.total"
        :to="pagination.to"
        :total="pagination.total"
      >
        <div :class="`${componentName}__pagination-container`">
          <span v-text="pagination.from" />

          <span v-text="'-'" />

          <span v-text="pagination.to" />

          <span v-text="'of'" />

          <span v-text="pagination.total" />
        </div>

        <div :class="`${componentName}__pagination-actions`">
          <PButton
            :disabled="disablePrev"
            label="<"
            radius="round"
            @click="onClickPrev"
          />

          <PButton
            :disabled="disableNext"
            label=">"
            radius="round"
            @click="onClickNext"
          />
        </div>
      </slot>
    </div>
  </div>
</template>

<script
  lang="ts"
  setup
  generic="T extends { [key: string]: string | number | object | undefined }"
>
import { computed } from 'vue'

import { generateClass } from '../utils/classGenerator'
import PButton from './PButton.vue'

import type { PDataTableHeaderValue, PDataTableProps } from '../types'

const componentName = 'p-data-table'

const props = defineProps<PDataTableProps<T>>()

const emit = defineEmits<{
  (e: 'paginate', p: number): void
}>()

const classNames = computed(() => [
  componentName,
  props.loading && generateClass(componentName, 'loading'),
])

const disableNext = computed<boolean>(
  () =>
    props.loading
    || !props.pagination
    || props.pagination.current_page >= props.pagination.last_page,
)

const disablePrev = computed<boolean>(
  () =>
    props.loading || !props.pagination || props.pagination.current_page <= 1,
)

const getCellValue = (
  row: T,
  key: string,
  value?: PDataTableHeaderValue<T>,
) => {
  return value ? value({ row, key }) : row[key]
}

const onClickNext = () => {
  if (!props.pagination || disableNext.value) return

  emit('paginate', props.pagination.current_page + 1)
}

const onClickPrev = () => {
  if (!props.pagination || disablePrev.value) return

  emit('paginate', props.pagination.current_page - 1)
}
</script>

<style>
.p-data-table {
  width: 100%;
  overflow: hidden;
  border: 1px solid var(--p-color-border);
  border-radius: var(--p-radius-md);
  background: var(--p-color-surface);
  color: var(--p-color-text);
}

.p-data-table table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.p-data-table__header {
  padding: 12px 16px;
  border-bottom: 1px solid var(--p-color-border);
  background: var(--p-color-background);
  color: var(--p-color-text-muted);
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
}

.p-data-table__header-content {
  display: flex;
  align-items: center;
  min-height: 24px;
}

.p-data-table tbody {
  display: block;
  height: v-bind('height');
  overflow-y: auto;
}

.p-data-table thead,
.p-data-table tbody tr {
  display: table;
  width: 100%;
  table-layout: fixed;
}

.p-data-table__row {
  border-bottom: 1px solid var(--p-color-border);
}

.p-data-table__row:last-child {
  border-bottom: 0;
}

.p-data-table tbody {
  height: v-bind('height');
  overflow: auto;
  display: block;
}

.p-data-table__row:hover {
  background: var(--p-color-background);
}

.p-data-table td {
  padding: 14px 16px;
  font-size: 14px;
  line-height: 20px;
  vertical-align: middle;
}

.p-data-table__pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 16px;
  border-top: 1px solid var(--p-color-border);
}

.p-data-table__pagination-container {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--p-color-text-muted);
  font-size: 14px;
}

.p-data-table__pagination-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.p-data-table__pagination-actions .p-button {
  width: 32px;
  min-height: 32px;
  padding: 0;
}
</style>

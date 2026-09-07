<template>
  <main class="playground">
    <header class="playground__header">
      <h1>Assignment UI Playground</h1>
      <p>Development playground for testing the component library.</p>

      <PButton
        :label="currentTheme === 'light' ? 'Dark' : 'Light'"
        radius="sm"
        @click="setTheme(currentTheme === 'light' ? 'dark' : 'light')"
      />
    </header>

    <section class="playground__section">
      <h2>Radius tokens</h2>

      <div class="radius-controls">
        <PButton
          v-for="radius in ['none', 'sm', 'md', 'lg', 'xl', 'full', 'round']"
          :key="radius"
          size="md"
          color="primary"
          :label="radius"
          @click="selectedRadius = radius"
        />
      </div>

      <div
        class="radius-preview"
        :class="generateClass('p-radius', selectedRadius)"
      >
        {{ selectedRadius }}
      </div>
    </section>

    <!-- Components will go here -->
    <section class="playground__section">
      <h2>Button</h2>

      <p>Add component examples here as they are implemented.</p>
    </section>

    <section class="playground__section">
      <h2>PTextField</h2>

      <PTextField v-model="text" />
    </section>

    <section class="playground__section">
      <PButton
        label="toggle overlay"
        @click="overlay = !overlay"
      />

      <POverlay v-model="overlay">
        <!--  -->
      </POverlay>

      <PButton
        label="Add toast"
        @click="onClickAddToast"
      />
    </section>

    <PToastContainer />

    <PDataTable
      :pagination="{
        current_page: 1,
        from: 1,
        to: 30,
        last_page: 5,
        total: 30,
      }"
      :headers="[
        {
          key: 'id',
          label: 'ID',
        },
        {
          key: 'name',
          label: 'Name',
        },
      ]"
      :rows="[
        {
          id: '123',
          name: 'name',
        },

        {
          id: '123',
          name: 'name',
        },
      ]"
    />
  </main>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import PButton from '../src/components/PButton.vue'
import PDataTable from '../src/components/PDataTable.vue'
import POverlay from '../src/components/POverlay.vue'
import PTextField from '../src/components/PTextField.vue'
import PToastContainer from '../src/components/PToastContainer.vue'
import { useTheme } from '../src/composables/theme.js'
import { useToast } from '../src/composables/toast.js'
import { generateClass } from '../src/utils/classGenerator'

import type { PRadius, PTheme } from '../src/types'

const selectedRadius = ref<PRadius>('md')

const currentTheme = computed<PTheme>(() => getTheme())

const { getTheme, setTheme } = useTheme()

const text = ref('')

const overlay = ref(false)

const toast = useToast()

const onClickAddToast = () => {
  toast.error({
    message: 'error',
  })

  toast.info({
    message: 'info',
  })

  toast.success({
    message: 'success',
  })

  toast.warning({
    message: 'warning',
  })
}
</script>

<style>
:root {
  font-family:
    Inter,
    ui-sans-serif,
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
  color: #111827;
  background: #f9fafb;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
}

button {
  font: inherit;
}

.playground {
  width: min(1200px, calc(100% - 48px));
  margin: 0 auto;
  padding: 48px 0 80px;
}

.playground__header {
  margin-bottom: 48px;
}

.playground__header h1 {
  margin: 0 0 8px;
  font-size: 32px;
}

.playground__header p {
  margin: 0;
  color: #6b7280;
}

.playground__section {
  padding: 32px 0;
  border-top: 1px solid #e5e7eb;
}

.playground__section h2 {
  margin: 0 0 24px;
  font-size: 20px;
}

.radius-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 32px;
}

.radius-controls button:hover {
  background: #f3f4f6;
}

.radius-preview {
  display: grid;
  width: 160px;
  height: 160px;
  place-items: center;
  border: 2px solid #111827;
  background: white;
}
</style>

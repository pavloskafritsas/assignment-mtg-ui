import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['src'],
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'AssignmentUI',
      fileName: 'assignment-mtg-ui',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['vue', 'vue-router'],
    },
  },
})

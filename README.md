# Assignment MTG UI

A small Vue 3 + TypeScript component library built for the assignment application.

The library provides reusable UI primitives with typed APIs, CSS-variable based theming, and some accessibility-focused interaction patterns.

## Requirements

* Node.js
* corepack

## Enable Corepack:
```bash
corepack enable
```

## Development

Install dependencies:

```bash
pnpm install
```

Run the playground:

```bash
pnpm dev
```

Build the library:

```bash
pnpm build
```

Run tests:

```bash
pnpm vitest run
```

Check formatting:

```bash
pnpm format:check
```

## Naming & Collision Prevention

All library components use the P prefix, for example PButton, PSelect, and PDataTable.

All library CSS classes use the p- prefix, for example:

.p-button
.p-select
.p-data-table

This convention provides an explicit namespace for the library and reduces the risk of component and CSS naming collisions with consuming applications or other dependencies.

## Usage

The library is consumed as a package and is compatible with any.

```ts
import {
  PButton,
  PDataTable,
  PSelect,
  PTextField,
} from 'assignment-mtg-ui'
```

Import the library stylesheet in the consuming application:

```ts
assignment-mtg-ui/style.css'
```

## Components

### PButton

Supports button, anchor, and router navigation usage, with variants, sizes, loading (partially implemented), disabled (partially implemented), and radius options.

```vue
<PButton
  label="Save"
  color="primary"
  size="md"
  :loading="isSaving"
  @click="save"
/>

<PButton
  label="View members"
  href="/members"
/>
```

The default slot can also be used for custom button content.

### PTextField

Typed text and number input with `v-model`, labels, descriptions, errors, and accessible relationships between the input and its supporting text.

```vue
<PTextField
  v-model="email"
  label="Email"
  description="We'll use this to contact you."
  placeholder="you@example.com"
/>

<PTextField
  v-model="age"
  type="number"
  label="Age"
/>
```

### PSelect

A typed select component with keyboard navigation and slot-based customization.

```vue
<PSelect
  v-model="role"
  label="Role"
  :options="[
    { label: 'Admin', value: 'admin' },
    { label: 'Developer', value: 'developer' },
  ]"
/>
```

Keyboard interaction includes opening with Enter/Space, ArrowUp/ArrowDown navigation, Home/End navigation, selection with Enter, and Escape to close.

### PDataTable

A slot-driven table component supporting custom cell rendering, loading/empty/error states, and pagination.

```vue
<PDataTable
  :headers="headers"
  :rows="members"
  :pagination="pagination"
  @paginate="onPaginate"
>
  <template #cell_status="{ value }">
    <span>{{ value }}</span>
  </template>
</PDataTable>
```

Consumers define the table columns and can provide cell slots for custom presentation.

### PToast

Toast notifications are exposed through `useToast()`.

```ts
const toast = useToast()

toast.success({
  message: 'Member created',
})

toast.error({
  message: 'Something went wrong',
})
```

`PToastContainer` renders the active toast queue:

```vue
<PToastContainer />
```

Toasts are queued and automatically removed after their configured duration.

## Theming

The library uses CSS custom properties for its design tokens, including colors, spacing, typography, radii, and elevation. Light and dark theme values are defined at the token level, allowing components to consume the same variables without component-specific theme logic. Theme selection is exposed through a dedicated composable.

## Architecture

The library is intentionally independent from the Nuxt application. It contains reusable Vue components and composables only; application-specific data fetching and business logic remain in the Nuxt app.

`POverlay` provides shared overlay mechanics for components such as `PSelect` and `PModal`.

The public package entry point exports components, composables, and public TypeScript types. Internal utilities are kept private to the library.

## Testing

Component and composable behavior is tested with Vitest and Vue Test Utils.

The tests focus on important user-facing behavior such as:

* button rendering and states
* form model updates and accessibility attributes
* select keyboard interaction
* table rendering and pagination

## Design decisions

The library uses vanilla CSS with CSS custom properties rather than a component framework. This keeps the implementation small and makes the design tokens explicit.

The component APIs favor typed props, slots, and emits while avoiding abstractions that are not needed by the assignment.

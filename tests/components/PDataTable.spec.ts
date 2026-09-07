import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import PDataTable from '../../src/components/PDataTable.vue'

const headers = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
]

const rows = [
  { name: 'John Doe', email: 'john@example.com' },
  { name: 'Jane Doe', email: 'jane@example.com' },
]

describe('PDataTable', () => {
  it('renders headers and rows', () => {
    const wrapper = mount(PDataTable, {
      props: {
        headers,
        rows,
      },
    })

    expect(wrapper.text()).toContain('Name')
    expect(wrapper.text()).toContain('Email')
    expect(wrapper.text()).toContain('John Doe')
    expect(wrapper.text()).toContain('john@example.com')
  })

  it('emits paginate when the next page is clicked', async () => {
    const wrapper = mount(PDataTable, {
      props: {
        headers,
        rows,
        pagination: {
          current_page: 1,
          from: 1,
          last_page: 3,
          per_page: 2,
          to: 2,
          total: 6,
        },
      },
    })

    const buttons = wrapper.findAll('button')
    const nextButton = buttons.at(-1)

    await nextButton?.trigger('click')

    expect(wrapper.emitted('paginate')).toBeTruthy()
  })
})

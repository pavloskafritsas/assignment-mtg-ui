import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import PButton from '../../src/components/PButton.vue'

describe('PButton', () => {
  it('renders a button by default', () => {
    const wrapper = mount(PButton, {
      props: {
        label: 'Save',
      },
    })

    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(wrapper.text()).toContain('Save')
  })

  it('renders an anchor when href is provided', () => {
    const wrapper = mount(PButton, {
      props: {
        href: '/members',
        label: 'Members',
      },
    })

    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.attributes('href')).toBe('/members')
  })

  it('applies loading and disabled states', () => {
    const wrapper = mount(PButton, {
      props: {
        label: 'Save',
        loading: true,
        disabled: true,
      },
    })

    expect(wrapper.classes()).toContain('p-button--loading')
    expect(wrapper.classes()).toContain('p-button--disabled')
    expect(wrapper.attributes('disabled')).toBeDefined()
  })
})

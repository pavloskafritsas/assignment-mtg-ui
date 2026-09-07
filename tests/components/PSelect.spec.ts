import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'

import PSelect from '../../src/components/PSelect.vue'

const options = [
  { label: 'Admin', value: 'admin' },
  { label: 'Developer', value: 'developer' },
  { label: 'Designer', value: 'designer' },
]

describe('PSelect', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('opens with Enter', async () => {
    const wrapper = mount(PSelect, {
      props: { options },
      attachTo: document.body,
    })

    const trigger = wrapper.find('[role="combobox"]')

    await trigger.trigger('keydown', { key: 'Enter' })

    expect(document.body.querySelector('[role="listbox"]')).not.toBeNull()
  })

  it('moves the highlighted option with ArrowDown', async () => {
    const wrapper = mount(PSelect, {
      props: { options },
      attachTo: document.body,
    })

    const trigger = wrapper.find('[role="combobox"]')

    await trigger.trigger('keydown', { key: 'Enter' })
    await trigger.trigger('keydown', { key: 'ArrowDown' })

    const option = document.body.querySelectorAll('[role="option"]')[1]

    expect(option.classList.contains('p-select__option--highlighted')).toBe(
      true,
    )
  })

  it('selects the highlighted option with Enter', async () => {
    const wrapper = mount(PSelect, {
      props: { options },
    })

    const trigger = wrapper.find('[role="combobox"]')

    await trigger.trigger('keydown', { key: 'Enter' })
    await trigger.trigger('keydown', { key: 'ArrowDown' })
    await trigger.trigger('keydown', { key: 'Enter' })

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['developer'])
  })

  it('closes with Escape', async () => {
    const wrapper = mount(PSelect, {
      props: { options },
      attachTo: document.body,
    })

    const trigger = wrapper.find('[role="combobox"]')

    await trigger.trigger('keydown', { key: 'Enter' })

    expect(document.body.querySelector('[role="listbox"]')).not.toBeNull()

    await trigger.trigger('keydown', { key: 'Escape' })

    expect(document.body.querySelector('[role="listbox"]')).toBeNull()
  })
})

import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import PTextField from '../../src/components/PTextField.vue'

describe('PTextField', () => {
  it('updates the model value', async () => {
    const wrapper = mount(PTextField, {
      props: {
        modelValue: 'John',
      },
    })

    await wrapper.find('input').setValue('Jane')

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['Jane'])
  })

  it('converts number input to a number', async () => {
    const wrapper = mount(PTextField, {
      props: {
        type: 'number',
      },
    })

    await wrapper.find('input').setValue('42')

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([42])
  })

  it('sets the correct error accessibility attributes', () => {
    const wrapper = mount(PTextField, {
      props: {
        label: 'Email',
        error: 'Invalid email',
      },
    })

    const input = wrapper.find('input')
    const error = wrapper.find('.p-text-field__error')

    expect(input.attributes('aria-invalid')).toBe('true')
    expect(input.attributes('aria-describedby')).toBe(error.attributes('id'))
  })
})

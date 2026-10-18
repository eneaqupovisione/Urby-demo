import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BookSection from '@/components/sections/BookSection.vue'

describe('BookSection', () => {
  it('does not submit without a name', async () => {
    const w = mount(BookSection)
    await w.find('form').trigger('submit')
    expect(w.find('.result').exists()).toBe(false)
  })

  it('shows the request and the copy fallback when no chat is configured', async () => {
    const w = mount(BookSection, { props: { botTemplate: '' } })
    await w.find('#name').setValue('Ana')
    await w.find('form').trigger('submit')
    expect(w.find('pre').text()).toContain('Name: Ana')
    expect(w.find('a.btn').exists()).toBe(false)
    expect(w.text()).toContain('not connected')
  })

  it('links to the booking chat with an encoded message', async () => {
    const w = mount(BookSection, { props: { botTemplate: 'https://wa.me/660000?text={msg}' } })
    await w.find('#name').setValue('Ana & Co')
    await w.find('form').trigger('submit')
    const a = w.find('a.btn')
    expect(a.attributes('href')).toContain('Ana%20%26%20Co')
    expect(a.attributes('rel')).toContain('noopener')
  })

  it('edit brings the form back', async () => {
    const w = mount(BookSection)
    await w.find('#name').setValue('Ana')
    await w.find('form').trigger('submit')
    await w.findAll('button').find((b) => b.text() === 'Edit').trigger('click')
    expect(w.find('form').exists()).toBe(true)
  })
})

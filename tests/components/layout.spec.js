import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SiteHeader from '@/components/layout/SiteHeader.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import SiteFooter from '@/components/layout/SiteFooter.vue'
import { NAV } from '@/content/site.js'

describe('layout', () => {
  it('header links every section and the booking', () => {
    const w = mount(SiteHeader)
    const hrefs = w.findAll('nav a').map((a) => a.attributes('href'))
    expect(hrefs).toEqual([...NAV.map((n) => n.href), '#book'])
    expect(w.find('[role="status"]').exists()).toBe(true)
  })

  it('hero is the logo lockup with an accessible name', () => {
    const w = mount(HeroSection)
    const h1 = w.find('h1')
    expect(h1.attributes('aria-label')).toBe('Urby')
    expect(h1.find('svg').exists()).toBe(true)
    expect(h1.text()).toContain('Kitchen & Bakery')
  })

  it('every external link opens safely', () => {
    const w = mount(SiteFooter)
    w.findAll('a[target="_blank"]').forEach((a) => {
      expect(a.attributes('rel')).toMatch(/noopener/)
      expect(a.attributes('href')).toMatch(/^https:\/\//)
    })
  })
})

<script setup>
import SiteHeader from '@/components/layout/SiteHeader.vue'
import QuickBar from '@/components/layout/QuickBar.vue'
import SiteFooter from '@/components/layout/SiteFooter.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import CommonSection from '@/components/sections/CommonSection.vue'
import KitchenSection from '@/components/sections/KitchenSection.vue'
import BreakfastSection from '@/components/sections/BreakfastSection.vue'
import EveningSection from '@/components/sections/EveningSection.vue'
import HouseSection from '@/components/sections/HouseSection.vue'
import FindUsSection from '@/components/sections/FindUsSection.vue'
import BookSection from '@/components/sections/BookSection.vue'
</script>

<template>
  <SiteHeader />
  <main>
    <HeroSection />
    <CommonSection />
    <KitchenSection />
    <BreakfastSection />
    <EveningSection />
    <HouseSection />
    <FindUsSection />
    <BookSection />
    <SiteFooter />
  </main>
  <QuickBar />
</template>

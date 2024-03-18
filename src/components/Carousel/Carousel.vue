<script setup>
import emblaCarouselVue from 'embla-carousel-vue'
import Autoplay from 'embla-carousel-autoplay'

const [emblaRef] = emblaCarouselVue(
  {
    loop: true,
    autoplay: true
  },
  [Autoplay({ delay: 8000 })]
)

const images = [
  {
    src: 'https://ik.imagekit.io/webbuilder/rubiks-cubes-shop/Carousel/b-15xeuS6yM_aL5VpGY5T8.jpg',
    alt: 'Slide 1'
  },
  {
    src: 'https://ik.imagekit.io/webbuilder/rubiks-cubes-shop/Carousel/Yaes9e8jzcM_ko_6TP9t46.jpg',
    alt: 'Slide 2'
  },
  {
    src: 'https://ik.imagekit.io/webbuilder/rubiks-cubes-shop/Carousel/bre9NRpAl-g_e37oxmlB1m.jpg',
    alt: 'Slide 3'
  }
]
</script>

<template>
  <div ref="emblaRef" class="embla">
    <div class="embla__container">
      <div v-for="({ src, alt }, index) in images" :key="index" class="embla__slide">
        <img :src="src" :alt="alt" class="embla__slide-img" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.embla {
  overflow: hidden;
  margin-bottom: 45px;

  &__container {
    display: flex;
    user-select: none;
    -webkit-touch-callout: none;
    -webkit-tap-highlight-color: transparent;
  }

  &__slide {
    flex: 0 0 auto;
    max-width: 100%;
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 15px;
    position: relative;
    border-radius: 20px;
    overflow: hidden;

    &-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>

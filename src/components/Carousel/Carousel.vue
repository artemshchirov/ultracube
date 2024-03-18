<script setup>
import emblaCarouselVue from 'embla-carousel-vue'
import Autoplay from 'embla-carousel-autoplay'

const [emblaRef] = emblaCarouselVue(
  {
    loop: true,
    autoplay: true
  },
  [Autoplay({ delay: 5000 })]
)

const carouselImages = [
  {
    src: 'https://ik.imagekit.io/webbuilder/rubiks-cubes-shop/Carousel/carousel-1_rF0s-Yyzk.webp?updatedAt=1710797669023',
    alt: 'Slide 1'
  },
  {
    src: 'https://ik.imagekit.io/webbuilder/rubiks-cubes-shop/Carousel/carousel-2_GtTNDkeFm.webp?updatedAt=1710797669126',
    alt: 'Slide 2'
  },
  {
    src: 'https://ik.imagekit.io/webbuilder/rubiks-cubes-shop/Carousel/carousel-3_ExGPsFofN.webp?updatedAt=1710797668954',
    alt: 'Slide 3'
  },
  {
    src: 'https://ik.imagekit.io/webbuilder/rubiks-cubes-shop/Carousel/carousel-4_dXF6HEklZ.webp?updatedAt=1710797668955',
    alt: 'Slide 4'
  },
  {
    src: 'https://ik.imagekit.io/webbuilder/rubiks-cubes-shop/Carousel/carousel-5_z-BMmbH-f.webp?updatedAt=1710797668979',
    alt: 'Slide 5'
  }
]
</script>

<template>
  <div ref="emblaRef" class="embla">
    <div class="embla__container">
      <div v-for="({ src, alt }, index) in carouselImages" :key="index" class="embla__slide">
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
    max-width: 70%;
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

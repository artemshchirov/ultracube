<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="14"
    viewBox="0 0 16 14"
    fill="none"
    class="close-icon"
  >
    <path
      d="M1 7H14.7143"
      stroke="black"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M8.71436 1L14.7144 7L8.71436 13"
      stroke="black"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<style scoped lang="scss">
.close-icon {
  @include transition-default;
  cursor: pointer;
  opacity: 0.3;
  transform: rotate(180deg);

  &:hover {
    opacity: 1;
    transform: translateX(-4px) rotate(180deg);
  }
}
</style>

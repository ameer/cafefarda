<template>
  <div
    class="v-image v-responsive mx-auto theme--light"
    :style="cssStyle"
  >
    <div
      class="v-responsive__sizer"
      style="padding-bottom: 100%"
    ></div>
    <div
      class="v-image__image v-image__image--cover"
      :style="
        `background-image: url('${imgSrc}');
        background-position: center center;`
      "
    ></div>
    <div class="v-responsive__content"></div>
  </div>
</template>
<script>
export default {
  props: {
    cssStyle: {
      type: String,
      default: '',
    },
    imgSrc: {
      type: String,
      default: '',
    },
  },
}
</script>
<style></style>

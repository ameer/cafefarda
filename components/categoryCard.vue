<template>
  <v-card
    elevation="1"
    min-height="160"
    width="164"
    style="border-radius: 24px"
    class="category-card d-block ma-3 pb-3"
    :class="index > 3 ? 'd-md-none' : ''"
    color="#e1ddd4"
    @click="$router.push(`/category/${category}#${title}`)"
  >
    <div class="pa-2">
      <v-img
        :src="`${apiURL}/icons/${title}.svg`"
        eager
        style="border-radius: 24px"
        class="mx-auto"
        aspect-ratio="1"
        :lazy-src="`${apiURL}/icons/${title}.svg`"
      />
    </div>
    <div class="golden-idea thin mb-2 mx-auto" />
    <v-card-title class="justify-center py-0">
      <div class="font-weight-bold text-body-1 fardaGreen--text">
        {{ $t(`${category}.${title}`) }}
      </div>
    </v-card-title>
  </v-card>
</template>
<script>
export default {
  props: {
    category: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    product: {
      type: Object,
      default: () => {}
    },
    index: {
      type: Number,
      default: 0
    }
  },
  computed: {
    apiURL () {
      return ''
    },
    imageExt () {
      return this.$store.getters.imageExt
    }
  }
}
</script>
<style>

</style>

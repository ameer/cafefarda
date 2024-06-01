<template>
  <v-card color="transparent">
    <v-img
      :src="image"
      class="white--text align-end"
      gradient="to bottom, rgba(0,0,0,.4), rgba(0,0,0,.85)"
      height="256px"
      :position="position"
    >
      <v-card-title class="pt-0 flex-column align-start">
        <span>{{ name }}</span>
        <span v-if="subtitle" class="text-caption my-1" v-text="subtitle" />
      </v-card-title>
      <v-card-subtitle>{{ address }}</v-card-subtitle>
      <div v-if="!disabled" class="px-4 pb-4 d-flex align-center">
        <v-btn icon outlined dark :href="phone">
          <v-img contain src="/icons/phone.svg" max-width="20" height="20" />
        </v-btn>
        <v-btn
          v-if="location"
          icon
          outlined
          dark
          :href="location"
          class="mr-3"
        >
          <v-img contain src="/icons/directions.svg" max-width="20" height="20" />
        </v-btn>
        <v-spacer />

        <v-btn
          class="rounded-lg"
          :href="link ?? null"
          :to="branch ? {path: `/menu/${branch}`} : null"
          :target="link ? '_blank' : null"
          outlined
          dark
        >
          <v-img class="mr-n2" contain src="/icons/list.svg" max-width="20" height="20" />
          <span class="mr-2" v-text="btnText" />
        </v-btn>
      </div>
    </v-img>
    <!-- <v-container>
      <v-row align="stretch">
        <v-col cols="3">
          <v-img src="/images/branches/mehrvila.jpg" />
        </v-col>
        <v-col />
      </v-row>
    </v-container> -->
  </v-card>
</template>
<script>
export default {
  props: {
    image: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    subtitle: {
      type: [String, Boolean],
      default: false
    },
    address: {
      type: String,
      default: ''
    },
    phone: {
      type: String,
      default: ''
    },
    location: {
      type: String,
      default: ''
    },
    branch: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    btnText: {
      type: String,
      default: 'منو'
    },
    link: {
      type: String,
      default: null
    },
    position: {
      type: String,
      default: 'center center'
    }
  }
}
</script>
<style>

</style>

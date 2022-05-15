<template>
  <v-dialog
    :fullscreen="$vuetify.breakpoint.smAndDown"
    :max-width="$vuetify.breakpoint.smAndDown ? '' : '600px'"
    transition="dialog-bottom-transition"
    :value="open"
    @click:outside="closeDialog"
  >
    <v-card color="grey lighten-3" class="product-detail-card">
      <v-card-text>
        <v-img :src="image" contain>
          <v-btn
            icon
            text
            color="white"
            left
            absolute
            small
            class="mt-4 backdrop-filter"
            @click="closeDialog"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-img>
        <v-divider class="py-4" />
        <v-row>
          <v-col
            v-for="(img, n) in images"
            :key="n"
            class="d-flex child-flex"
            cols="6"
            md="4"
            xl="3"
          >
            <v-img
              :src="`${url}/${img}`"
              :lazy-src="`${url}/images/${imageExt}/cafe-farda-logo.${imageExt}`"
              aspect-ratio="1"
              class="grey lighten-2"
            >
              <template #placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      default: '/coffee-1.jpg',
    },
    imageExt: {
      type: String,
      default: 'jpg',
    },
    images: {
      type: Array,
      default: () => [],
    },
    url: {
      type: String,
      default: '/api',
    },
  },
  methods: {
    closeDialog() {
      this.$emit('close', false)
    },
  },
}
</script>
<style></style>

<template>
  <v-dialog :fullscreen="$vuetify.breakpoint.smAndDown" :max-width="$vuetify.breakpoint.smAndDown ? '' : '500px'" transition="dialog-bottom-transition" :value="open">
    <v-card
      v-if="product.isVariable"
      color="grey lighten-3"
      class="product-detail-card"
    >
      <v-img :src="'/images/'+ product.image + imageExt" contain>
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
      <v-card-title
        v-for="(variable, k) in product.variables"
        :key="'vars-' + k"
      >
        <div>
          <div class="font-weight-bold text-h5 mb-2 brown--text">
            {{ variable.name }}
          </div>
          <div class="text-body-2">
            ارتفاع کشت: <span>{{ variable.height }}</span>
          </div>
        </div>
        <v-spacer></v-spacer>
        <div class="text--primary text-h5 font-weight-bold mb-0">
          <span class="price faNum">{{ variable.price }}</span>
          <span class="text--secondary text-caption price-unit"
            >هــزار تومان</span
          >
        </div>
        <!-- <v-btn fab icon small color="cGreen"
          ><v-icon>mdi-plus-circle</v-icon></v-btn
        > -->
      </v-card-title>
    </v-card>
    <v-card v-else color="grey lighten-3" class="product-detail-card">
      <div></div>
      <v-img :src="'/images/'+ product.image + imageExt" contain>
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
      <v-card-title class="justify-space-between">
        <div class="font-weight-bold text-h4 brown--text">
          {{ product.name }}
        </div>
        <div class="text--primary text-h5 font-weight-bold mb-0">
          <span class="price faNum">{{ product.price }}</span>
          <span class="text--secondary text-caption price-unit"
            >هــزار تومان</span
          >
        </div>
      </v-card-title>
      <v-card-text>
        <v-divider class="my-4"></v-divider>
        <div class="text-body-1">
          {{ product.desc }}
        </div>
        <div class="mt-2 text-body-2">
          محتویات:
          <span v-for="(ing, j) in product.ingredients" :key="'ing-' + j">
            {{ ing }}
            <span v-if="j + 1 < product.ingredients.length">،</span>
          </span>
        </div>
        <v-divider class="my-4"></v-divider>
        <div v-if="hasFlavor" class="mt-4">
          <span class="text-body-1"> طعم‌یادها: </span>
          <v-chip
            v-for="(flavor, i) in product.etc.mem"
            :key="'flavor-' + i"
            color="brown darken-2"
            class="mx-1"
            dark
          >
            <span class="text-body-2">{{ flavor }}</span>
          </v-chip>
        </div>
        <div v-if="hasCaffeine" class="mt-4">
          <span class="text-body-1"> میزان کافئین: </span>
          <v-chip dark :color="caffeine[0]">{{ caffeine[1] }}</v-chip>
        </div>
      </v-card-text>
      <!-- <v-card-actions>
        <v-btn tile block x-large min-height="64px" color="cGreen">
          <span class="white--text text-h6 font-weight-bold"
            >افزودن به سبد خرید</span
          >
        </v-btn>
      </v-card-actions> -->
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
    product: {
      type: Object,
      default: () => {},
    },
    image: {
        type: String,
        default: '/coffee-1.jpg'
    },
    imageExt: {
        type: String,
        default: 'jpg'
    }
  },
  computed: {
    hasETC() {
      return 'etc' in this.product
    },
    hasFlavor() {
      if (this.hasETC === true) {
        return 'mem' in this.product.etc
      } else {
        return false
      }
    },
    hasCaffeine() {
      if (this.hasETC === true) {
        return 'cafein' in this.product.etc
      } else {
        return false
      }
    },
    caffeine() {
      if (this.hasETC && this.hasCaffeine) {
        if (this.product.etc.cafein === 'VH') {
          return ['red darken-1', 'بسیار بالا']
        } else if (this.product.etc.cafein === 'H') {
          return ['orange darken-1', 'بالا']
        } else if (this.product.etc.cafein === 'M') {
          return ['yellow darken-2', 'متوسط']
        } else {
          return ['green', 'کم']
        }
      } else {
        return ['', '']
      }
    },
  },
  methods: {
    closeDialog() {
      this.$emit('close')
    },
  },
}
</script>
<style></style>

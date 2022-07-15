<template>
  <v-dialog :fullscreen="$vuetify.breakpoint.smAndDown" :max-width="$vuetify.breakpoint.smAndDown ? '' : '500px'"
    transition="dialog-bottom-transition" :value="open" @click:outside="closeDialog">
    <v-card v-if="product.isVariable" color="grey lighten-3" class="product-detail-card">
      <v-img :src="image" contain>
        <v-btn icon text color="white" left absolute small class="mt-4 backdrop-filter" @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-img>
      <v-card-text v-for="(variable, k) in product.variables" :key="'vars-' + k"
        class="d-flex align-center flex-wrap mt-8">
        <div class="font-weight-bold text-h5 mb-2 brown--text">
          {{ variable.name }} 
          <v-img class="d-inline-block vr-middle" contain :src="`/icons/${variable.flag}.svg`" width="24" height="24"></v-img>
        </div>
        <v-spacer></v-spacer>
        <div class="text--primary text-h5 font-weight-bold mb-0">
          <span class="price faNum">{{ variable.price }}</span>
          <span class="text--secondary text-caption price-unit">هــزار تومان</span>
        </div>
        <div class="flex-100 mt-4">
          <div class="mb-2">
            <v-icon color="brown lighten-1">mdi-waves-arrow-up</v-icon>
            <span class="mx-1 brown--text">ارتفاع کشت:</span>
            <span class="faNum">{{ variable.height }} متر</span>
          </div>
          <div class="mb-2">
            <v-icon color="brown lighten-1">mdi-coffee-maker-outline</v-icon>
            <span class="mx-1 brown--text">روش فرآوری:</span>
            <span class="faNum">{{ variable.method }}</span>
          </div>
          <div class="mb-2">
            <v-icon color="brown lighten-1">mdi-leaf</v-icon>
            <span class="mx-1 brown--text">طعم‌یادها:</span>
            <span class="faNum">{{ variable.mem[0].replaceAll('/', ' | ') }}</span>
          </div>
          <div v-if="variable.type !== ''" class="mb-2">
            <v-icon color="brown lighten-1">mdi-star</v-icon>
            <span class="mx-1 brown--text">نمره ارزیابی:</span>
            <v-chip label color="green darken-2" dark class="">{{ Intl.NumberFormat('fa-IR').format(variable.type) }}</v-chip>
          </div>
        </div>
        <v-divider class="flex-100 mt-8"></v-divider>
      </v-card-text>
    </v-card>
    <v-card v-else color="grey lighten-3" class="product-detail-card">
      <div></div>
      <v-img :src="image" contain>
        <v-btn icon text color="white" left absolute small class="mt-4 backdrop-filter" @click="closeDialog">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-img>
      <v-card-title class="justify-space-between">
        <div class="font-weight-bold text-h4 brown--text">
          {{ product.name }}
        </div>
        <div class="text--primary text-h5 font-weight-bold mb-0">
          <span class="price faNum">{{ product.price }}</span>
          <span class="text--secondary text-caption price-unit">هــزار تومان</span>
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
          <v-chip v-for="(flavor, i) in product.etc.mem" :key="'flavor-' + i" color="brown darken-2" class="mx-1" dark>
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
      default: () => { },
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
      this.$emit('close', false)
    },
  },
}
</script>
<style>
</style>

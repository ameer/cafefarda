<template>
  <v-row justify-md="center">
    <product-details-dialog
      :open="dialogOpen"
      :product="selectedProduct"
      :image="dialogImageURL"
      :image-ext="imageExt"
      @close="dialogOpen = false"
    />
    <v-col cols="12" md="6" lg="9">
      <v-slide-group v-model="selectedChip" show-arrows center-active mandatory>
        <v-slide-item
          v-for="(value, key, n) in menuData[$route.params.slug]"
          :key="n"
          v-slot="{ active, toggle }"
        >
          <v-btn
            class="mx-2"
            :input-value="active"
            active-class="cGreen white--text"
            depressed
            rounded
            @click="toggle"
          >
            {{ $t(`${$route.params.slug}.${key}`, $route.params.locale) }}
          </v-btn>
        </v-slide-item>
      </v-slide-group>
      <v-row
        v-if="products && $route.params.slug !== 'cake'"
        class="mt-4"
        align="stretch"
      >
        <v-col v-for="(item, i) in products" :key="i" cols="6" md="4" lg="3">
          <v-card
            elevation="1"
            min-height="160"
            style="border-radius: 24px"
            class="product-card mx-auto pt-0 h-100"
            @click="openDetailDialog(item)"
          >
            <v-img
              :src="`${apiURL}/images/${imageExt}/${item.image}.${imageExt}`"
              style="border-radius: 24px"
              class="mx-auto"
              aspect-ratio="1"
              lazy-src="/images/cafe-farda-logo.webp"
            />
              <!-- <v-btn
                icon
                class="backdrop-filter"
                left
                :color="$store.state.favs.includes(item.name) ? 'red' : 'white'"
                @click.stop="toggleFavs(item.name)"
                ><v-icon>mdi-heart</v-icon></v-btn
              > -->
            <v-card-title>
              <div class="font-weight-bold text-body-1 brown--text">
                {{ item.name }}
              </div>
            </v-card-title>
            <v-card-actions>
              <p
                v-if="item.isVariable"
                class="text--primary font-weight-bold text-h5 mb-0"
              >
                <span class="text--secondary text-caption"
                  >مشاهده گزینه‌ها</span
                >
              </p>
              <p v-else class="text--primary font-weight-bold text-h5 mb-0">
                <span class="price faNum">{{ item.price }}</span>
                <span class="text--secondary text-caption price-unit"
                  >هــزار تومان</span
                >
              </p>
              <v-spacer></v-spacer>
              <!-- <v-btn fab icon small color="cGreen"
                ><v-icon>mdi-plus-circle</v-icon></v-btn
              > -->
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-else class="mt-4" align="stretch" justify="center">
        <v-col v-for="(item, i) in products" :key="i" cols="12" md="6">
          <v-card
            elevation="1"
            min-height="160"
            style="border-radius: 24px"
            class="product-card mx-auto pt-2 h-100"
          >
            <v-img
              src="/cake.jpg"
              max-width="90%"
              max-height="90%"
              style="border-radius: 24px"
              class="mx-auto"
              aspect-ratio="1"
            ></v-img>
            <v-card-title>
              <div class="font-weight-bold text-body-1 brown--text">
                {{ item.name }}
              </div>
            </v-card-title>
            <v-card-actions>
              <p class="text--primary font-weight-bold text-h5 mb-0">
                <span class="price faNum">{{ item.price }}</span>
                <span class="text--secondary text-caption price-unit"
                  >هــزار تومان</span
                >
              </p>
              <v-spacer></v-spacer>
              <!-- <v-btn fab icon small color="cGreen"
                ><v-icon>mdi-plus-circle</v-icon></v-btn
              > -->
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
import productDetailsDialog from '~/components/productDetailsDialog.vue'
export default {
  components: { productDetailsDialog },
  layout: 'default',
    data() {
    return {
      dialogOpen: false,
      selectedChip: 0,
      selectedProduct: {},
      menuData: {},
      webpSupport: false,
    }
  },
  computed: {
    dialogImageURL(){
      if(this.selectedProduct.image){
        return `${this.apiURL}/images/${this.imageExt}/${this.selectedProduct.image}.${this.imageExt}`
      }
      return `${this.apiURL}/images/${this.imageExt}/cafe-farda-logo.${this.imageExt}`
    },
    apiURL(){
      return this.$axios.defaults.baseURL + '/storage'
    },
    imageExt(){
      return this.$store.getters.imageExt
    },
    products() {
      if (Object.keys(this.menuData).length === 0) {
        return []
      }
      const keys = Object.keys(this.menuData[this.$route.params.slug])
      return this.menuData[this.$route.params.slug][keys[this.selectedChip]]
    },
    image() {
      if (this.$route.params.slug === 'hot') {
        return `/new (${Math.floor(Math.random() * 23)}).jpeg`
      } else if (this.$route.params.slug === 'cold') {
        return '/ice.jpg'
      } else if (this.$route.params.slug === 'cake') {
        return '/cake.jpg'
      } else if (this.$route.params.slug === 'breakfast') {
        return '/breakfast.jpg'
      } else {
        return '/coffee-1.jpg'
      }
    },
  },
  async beforeMount() {
    this.menuData = await this.$store.state.products
  },
  mounted(){
    this.testWebP(document.body)
  },
  methods: {
    testWebP (elem) {
      const self = this
      const webP = new Image();
      webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
      webP.onload = webP.onerror = function () {
        self.webpSupport = webP.height === 2
      }
    },
    openDetailDialog(item) {
      this.selectedProduct = item
      this.dialogOpen = true
    },
    toggleFavs(name) {
      this.$store.commit('toggleFavs', name)
    },
  },
}
</script>
<style></style>

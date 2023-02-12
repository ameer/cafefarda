<template>
  <v-row justify-md="center">
    <product-details-dialog :open="dialogOpen" :product="selectedProduct" :image="dialogImageURL" :image-ext="imageExt"
      @close="dialogOpen = false" />
    <v-col cols="12" lg="9" class="px-0 pt-6">
      <v-slide-group v-if="products && $route.params.slug !== 'cake'" v-model="selectedChip" center-active mandatory>
        <v-slide-item v-for="(value, key, n) in menuData[$route.params.slug]" :key="n" v-slot="{ active, toggle }">
          <v-btn class="mx-2" :input-value="active" active-class="cGreen white--text" depressed rounded @click="toggle">
            {{ $t(`${$route.params.slug}.${key}`, $route.params.locale) }}
          </v-btn>
        </v-slide-item>
      </v-slide-group>
      <v-container fluid class="mt-n4">
        <v-row v-if="products && $route.params.slug !== 'cake'" class="mt-4" align="stretch">
        <v-col v-for="(item, i) in products" :key="i" cols="6" sm="4" md="3" xl="2">
          <v-card elevation="1" min-height="160" style="border-radius: 24px" class="product-card mx-auto pt-0 h-100"
            color="#e1ddd4" @click="openDetailDialog(item)">
            <div class="pa-2">
              <v-img :src="`${apiURL}/images/${imageExt}/${item.image}.${imageExt}`" style="border-radius: 24px"
              class="mx-auto" aspect-ratio="1" lazy-src="/images/cafe-farda-logo.webp" />
            </div>
            <!-- <v-btn
                icon
                class="backdrop-filter"
                left
                :color="$store.state.favs.includes(item.name) ? 'red' : 'white'"
                @click.stop="toggleFavs(item.name)"
                ><v-icon>mdi-heart</v-icon></v-btn
              > -->
              <div class="golden-idea thin mb-2 mx-auto"></div>
            <v-card-title class="justify-center py-0">
              <div class="font-weight-bold text-body-1 fardaGreen--text">
                {{ item.name }}
              </div>
            </v-card-title>
            <v-card-actions class="justify-center">
              <v-btn v-if="item.isVariable" class="font-weight-bold text-body-2 rounded-xl" dark outlined color="fardaGreen" block>
                <span class="font-weight-regular">مشاهده لاین‌های قهوه</span>
              </v-btn>
              <p v-else class="text-body-1 mb-0 d-flex">
                <span class="fardaGreen--text price faNum me-1">{{ item.price }}</span>
                <span class="fardaGreen--text price-unit faNum">هــزار تومان</span>
              </p>
              <!-- <v-btn fab icon small color="cGreen"
                ><v-icon>mdi-plus-circle</v-icon></v-btn
              > -->
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-else class="mt-4" align="stretch" justify="center">
        <v-col v-for="(item, i) in products" :key="i" cols="9" sm="6" md="4" xl="3" class="mt-n6">
          <v-card elevation="1" min-height="160" style="border-radius: 24px" class="product-card mx-auto pt-2 h-100">
            <v-img src="/cake.jpg" max-width="90%" max-height="90%" style="border-radius: 24px" class="mx-auto"
              aspect-ratio="1"></v-img>
              <div class="golden-idea thin my-2 mx-auto"></div>
            <v-card-title class="mt-n4">
              <div class="font-weight-regular text-center text-body-2 fardaGreen--text">
                {{ item.name }}
              </div>
            </v-card-title>
            <v-card-actions class="justify-center">
              <p class="text-h6 mb-0 d-flex align-center">
                <span class="fardaGreen--text price faNum me-1">{{ item.price }}</span>
                <span class="fardaGreen--text price-unit faNum">هــزار تومان</span>
              </p>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      </v-container>
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
      webpSupport: false,
    }
  },
  head(){
    return {
      title: this.$t(this.$route.params.slug).name,
    }
  },
  computed: {
    menuData() {
      return this.$store.state.products
    },
    dialogImageURL() {
      if (this.selectedProduct.image) {
        return `${this.apiURL}/images/${this.imageExt}/${this.selectedProduct.image}.${this.imageExt}`
      }
      return `${this.apiURL}/images/${this.imageExt}/cafe-farda-logo.${this.imageExt}`
    },
    apiURL() {
      return this.$axios.defaults.baseURL + '/storage'
    },
    imageExt() {
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
  mounted() {
    if(this.$route.query.subcat !== undefined){
      this.selectedChip = Number(this.$route.query.subcat)
      this.$forceUpdate()
    }
    this.testWebP(document.body)
  },
  methods: {
    testWebP(elem) {
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
<style>
.golden-idea {
  background-color: #c8933f;
  height: 6px;
  width: 36px;
  border-radius: 4px;
}
.golden-idea.thin {
   height: 3px;
  width: 28px;
}
</style>

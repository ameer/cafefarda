<template>
  <v-row v-scroll="onScroll" justify-md="center">
    <v-col cols="12" lg="9" class="px-0">
      <!-- <v-slide-group v-if="products && $route.params.slug !== 'cake'" v-model="selectedChip" center-active mandatory>
        <v-slide-item v-for="(value, key, n) in menuData[$route.params.slug]" :key="n" v-slot="{ active, toggle }">
          <v-btn class="mx-2" :input-value="active" active-class="cGreen white--text" depressed rounded @click="toggle">
            {{ $t(`${$route.params.slug}.${key}`, $route.params.locale) }}
          </v-btn>
        </v-slide-item>
      </v-slide-group> -->
      <div class="sticky-positioner" :class="{ 'd-none': !fixedSlideGroup }" />
      <v-slide-group
        v-if="$route.params.slug !== 'cake'"
        v-model="selectedChip"
        center-active
        :class="{ 'fixed-slide-group': fixedSlideGroup }"
      >
        <v-slide-item v-for="(subcat, n) in subCategories" :key="n" v-slot="{ active, toggle }">
          <v-btn
            class="mx-2"
            :input-value="active"
            active-class="fardaGreen white--text"
            depressed
            rounded
            :to="`#${subcat}`"
            link
            @click="handleScrollOnClick(toggle)"
          >
            {{ $t(`${subcat}`) }}
          </v-btn>
        </v-slide-item>
      </v-slide-group>
      <v-container v-if="$route.params.slug !== 'cake'" fluid class="mt-n4">
        <v-row
          v-for="(subCat, key, i) in productsBySubCategory"
          :id="`${key}`"
          :key="`subcat-products-${i}`"
          v-intersect="{
            handler: onIntersect,
            options: {
              rootMargin: '-64px 0px 0px 32px', threshold: subCat.length < 7 ? [0.25] : 0
            }
          }"
          :data-index="i"
          class="mt-4"
          align="stretch"
        >
          <v-col cols="12" class="d-flex align-center">
            <h2 class="spanishGrey--text text--darken-1">
              {{ $t(`${key}`) }}
            </h2>
            <v-divider class="ms-4" />
          </v-col>
          <v-col
            v-for="(item, j) in subCat"
            :key="`product-col-${j}`"
            :cols="key === 'cakes' ? 12 : 6"
            sm="4"
            md="3"
            xl="2"
          >
            <v-card
              elevation="1"
              min-height="160"
              style="border-radius: 24px"
              class="product-card mx-auto pt-0 h-100"
              color="#e1ddd4"
              @click="openDetailDialog(item)"
            >
              <div class="pa-2">
                <v-img
                  :src="`${apiURL}/images/${imageExt}/${item.image}.${imageExt}`"
                  style="border-radius: 24px;background-color: #386864;"
                  class="mx-auto"
                  aspect-ratio="1"
                  :lazy-src="`${apiURL}/images/jpg/${item.image}.jpg`"
                />
              </div>
              <!-- <v-btn
                icon
                class="backdrop-filter"
                left
                :color="$store.state.favs.includes(item.name) ? 'red' : 'white'"
                @click.stop="toggleFavs(item.name)"
                ><v-icon>mdi-heart</v-icon></v-btn
              > -->
              <div class="golden-idea thin mb-2 mx-auto" />
              <v-card-title class="justify-center py-0">
                <div v-if="key !== 'cakes'" class="font-weight-bold text-body-1 fardaGreen--text text-center">
                  {{ item.name }}
                </div>
                <span v-else class="text-body-1 fardaGreen--text text-center">{{ item.name }}</span>
              </v-card-title>
              <v-card-actions class="justify-center">
                <v-btn
                  v-if="item.isVariable"
                  class="text-body-2 rounded-xl"
                  dark
                  outlined
                  color="fardaGreen"
                  small
                >
                  <span class="font-weight-regular">مشاهده گزینه‌ها</span>
                </v-btn>
                <p v-else-if="item.hasVariablePrice" class="mb-0">
                  <span class="fardaGreen--text font-weight-bold text-caption text-md-body-2">بسته به لاین قهوه انتخابی</span>
                </p>
                <p v-else class="text-body-1 mb-0 d-flex">
                  <span class="faNum" :class="item.sale_price ? 'text-decoration-line-through text--secondary' : 'fardaGreen--text price faNum me-1'">{{ item.price }}</span>
                  <span v-if="item.sale_price" class="fardaGreen--text price faNum me-1">{{ item.sale_price }}</span>
                  <!-- <span class="fardaGreen--text price faNum me-1">{{ item.price }}</span> -->
                  <span class="fardaGreen--text price-unit faNum">هــزار تومان</span>
                </p>
                <!-- <v-btn fab icon small color="cGreen"
                ><v-icon>mdi-plus-circle</v-icon></v-btn
              > -->
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <!-- <v-row v-else class="mt-4" align="stretch" justify="center">
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
        </v-row> -->
      </v-container>
      <v-container v-else fluid class="mt-n4">
        <v-row
          v-for="(subCat, key, i) in productsBySubCategory"
          :id="`${key}`"
          :key="`subcat-products-${i}`"
          class="mt-4"
          align="stretch"
          justify="center"
        >
          <v-col v-for="(item, j) in subCat" :key="`product-col-${j}`" cols="12" sm="6" md="4">
            <v-card
              elevation="1"
              min-height="160"
              style="border-radius: 24px"
              class="product-card mx-auto pt-0 h-100"
              color="#e1ddd4"
              @click="openDetailDialog(item)"
            >
              <div class="pa-2">
                <v-img
                  :src="`${apiURL}/images/${imageExt}/${item.image}.${imageExt}`"
                  style="border-radius: 24px"
                  class="mx-auto"
                  aspect-ratio="1"
                  lazy-src="/images/cafe-farda-logo.webp"
                />
              </div>
              <!-- <v-btn
                icon
                class="backdrop-filter"
                left
                :color="$store.state.favs.includes(item.name) ? 'red' : 'white'"
                @click.stop="toggleFavs(item.name)"
                ><v-icon>mdi-heart</v-icon></v-btn
              > -->
              <div class="golden-idea thin mb-2 mx-auto" />
              <v-card-title class="justify-center py-0">
                <div class="font-weight-bold text-body-1 fardaGreen--text">
                  {{ item.name }}
                </div>
              </v-card-title>
              <v-card-actions class="justify-center">
                <p class="text-body-1 mb-0 d-flex">
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
      </v-container>
      <div style="height:128px;" />
    </v-col>
  </v-row>
</template>
<script>
export default {
  layout: 'default',
  data () {
    return {
      fixedSlideGroup: false,
      dialogOpen: false,
      selectedChip: 0,
      selectedProduct: {},
      webpSupport: false,
      hashUpdateTimeout: null,
      isScrolling: false,
      shouldScrollToHash: true
    }
  },
  head () {
    return {
      title: this.$t(this.$route.params.slug).name
    }
  },
  computed: {
    menuData () {
      return this.$store.state.products
    },
    categories () {
      return [
        'hot', 'cold', 'cake', 'breakfast'
      ]
    },
    apiURL () {
      return ''
    },
    imageExt () {
      return this.$store.getters.imageExt
    },
    products () {
      if (Object.keys(this.menuData).length === 0) {
        return []
      }
      // const keys = Object.keys(this.menuData[this.$route.params.slug])
      return this.menuData
    },
    subCategories () {
      return [...new Set(this.products.map(item => item.subCategory))]
    },
    productsBySubCategory () {
      const _products = {}
      this.subCategories.forEach((subCat) => {
        _products[subCat] = this.products.filter(p => p.subCategory === subCat)
      })
      return _products
    },
    // products () {
    //   try {
    //     // const keys = Object.keys(this.menuData[this.$route.params.slug])
    //     return this.menuData.filter(p => p.category === this.$route.params.slug)
    //   } catch (error) {
    //     return []
    //   }
    // },
    // subCategories () {
    //   return [...new Set(this.products.map(item => item.subCategory))]
    // },
    // productsBySubCategory () {
    //   const _products = {}
    //   this.subCategories.forEach((subCat) => {
    //     _products[subCat] = this.products.filter(p => p.subCategory === subCat)
    //   })
    //   return _products
    // },
    image () {
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
    }
  },
  mounted () {
    // window.addEventListener('scroll', () => {
    //   if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    //     this.handleReachingBottom()
    //   }
    // })
    if (this.$route.hash !== '' && this.shouldScrollToHash) {
      this.$nextTick(() => {
        this.waitForElm(this.$route.hash).then((elm) => {
          this.goToHash(this.$route.hash)
        })
      })
    }
    document.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy () {
    document.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    handleReachingBottom () {
      const slug = this.$route.params.slug
      const index = this.categories.findIndex(c => c === slug)
      if (index !== -1 && typeof this.categories[index + 1] !== 'undefined') {
        this.$router.push({ path: `/category/${this.categories[index + 1]}`, params: { preventScroll: false } })
      }
    },
    waitForElm (selector) {
      return new Promise((resolve) => {
        if (document.querySelector(selector)) {
          return resolve(document.querySelector(selector))
        }

        const observer = new MutationObserver((mutations) => {
          if (document.querySelector(selector)) {
            resolve(document.querySelector(selector))
            observer.disconnect()
          }
        })

        observer.observe(document.body, {
          childList: true,
          subtree: true
        })
      })
    },
    onScroll () {
      const t = window.scrollY || document.documentElement.offsetTop || 0
      if (!this.isScrolling) {
        this.fixedSlideGroup = t > 70
      }
    },
    handleScrollOnClick (toggle) {
      toggle()
      this.isScrolling = true
      setTimeout(() => {
        this.isScrolling = false // Let the browser to scroll smoothly and then start the instersection observer
      }, 1000)
    },
    goToHash (hash) {
      this.isScrolling = true
      const elem = document.getElementById(hash.replace('#', ''))
      this.selectedChip = parseInt(elem.dataset.index) || 0
      setTimeout(() => {
        this.$vuetify.goTo(hash, { duration: 500, offset: 56 })
        this.isScrolling = false
      }, 500)
    },
    onIntersect (entries, observer) {
      if (this.isScrolling === true) { return false }
      clearTimeout(this.hashUpdateTimeout)
      const elem = entries[0]
      const hash = `#${elem.target.id}`
      if (elem.isIntersecting && this.$route.hash !== hash) {
        this.selectedChip = parseInt(elem.target.dataset.index)
        this.hashUpdateTimeout = setTimeout(this.setHash(hash), 500)
      }
    },
    setHash (hash) {
      this.$router.replace({
        hash,
        params: {
          preventScroll: true
        }
      })
    },
    testWebP (elem) {
      const self = this
      const webP = new Image()
      webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
      webP.onload = webP.onerror = function () {
        self.webpSupport = webP.height === 2
      }
    },
    openDetailDialog (item) {
      this.$nuxt.$emit('setSelectedProduct', item, this.$route.hash)
    },
    toggleFavs (name) {
      this.$store.commit('toggleFavs', name)
    }
  }
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

.sticky-positioner {
  height: 36px;
  visibility: hidden;
}

.fixed-slide-group {
  position: fixed;
  top: 56px;
  left: 0;
  right: 0;
  z-index: 101;
  background: #e7e6e1;
  padding: 8px 0px;
  border-bottom: thin solid rgb(0 0 0 / 7%);
  box-shadow: 0 7px 11px -5px rgba(0, 0, 0, 0.2);
}
</style>

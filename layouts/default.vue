<template>
  <v-app>
    <v-app-bar fixed app elevate-on-scroll color="#f7f6f2">
      <SearchDialog
        :open="searchDialog.open"
        @closeDialog="closeSearchDialog"
      />
      <product-details-dialog
        :open="pdDialog.open"
        :product="selectedProduct"
        :image="dialogImageURL"
        :image-ext="imageExt"
        :hash="pdDialog.hash"
        @close="pdDialog.open = false"
      />
      <v-container class="px-0 px-md-3">
        <v-row align="center" justify-md="center">
          <v-col cols="12" md="9">
            <v-container fluid class="px-0 px-md-3">
              <v-row no-gutters align="center">
                <v-col cols="4">
                  <v-img
                    src="/cafe-farda-logo.svg"
                    contain
                    max-height="42px"
                    max-width="128px"
                    class="flex-1 pointer"
                    @click="$router.push('/')"
                  />
                </v-col>
                <v-col cols="8" class="text-left d-flex align-center justify-end">
                  <v-btn v-if="$route.path === '/classic'" :to="'/'" link outlined rounded>
                    مشاهده منو مدرن
                  </v-btn>
                  <v-btn v-else :to="'/classic'" link outlined rounded>
                    مشاهده منو کلاسیک
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
    <v-main>
      <v-container>
        <!-- <v-row justify-md="center">
          <v-col cols="12" md="9">
            <div id="search-field-container">
              <v-text-field
                background-color="#f7f6f2"
                clearable
                label="جستجو در منو"
                filled
                dense
                rounded
                single-line
                readonly
                prepend-inner-icon="mdi-magnify"
                hide-details="auto"
                @click.stop="openSearchDialog"
              />
            </div>
          </v-col>
        </v-row> -->
        <Nuxt />
      </v-container>
    </v-main>
    <v-btn
      color="fardaGreen lighten-1"
      elevation="4"
      fab
      bottom
      fixed
      app
      class="ms-4"
      @click.stop="openSearchDialog"
    >
      <v-icon color="white">
        mdi-magnify
      </v-icon>
    </v-btn>
    <!-- <v-speed-dial
      v-model="fab"
      bottom
      app
      fixed
      :right="true"
      :left="false"
      direction="top"
      transition="slide-y-reverse-transition"
    >
      <template #activator>
        <v-btn v-model="fab" color="fardaGreen" dark fab>
          <v-icon v-if="fab"> mdi-close </v-icon>
          <v-icon v-else> mdi-menu </v-icon>
        </v-btn>
      </template>
      <v-btn
        v-for="(item, i) in cats"
        :key="i"
        fab
        dark
        color="fardaGreen darken-2"
        @click="$router.push(`/category/${item.url}`)"
      >
        <v-img
          :src="`/icons/${item.url}.png`"
          contain
          max-height="32px"
          eager
        ></v-img>
      </v-btn>
    </v-speed-dial> -->
    <!-- <v-footer fixed color="transparent" class="px-3" app>
      <v-container class="relative pa-0">
        <v-row justify-md="center" no-gutters>
          <v-col cols="12" md="9" lg="6">
            <v-sheet
              color="#f5f4f0"
              width="100%"
              class="d-flex align-center justify-space-between justify-md-space-around rounded-xl px-5 py-3 pa-md-3"
            >
              <nuxt-link v-for="(item, i) in cats" :key="i" class="bottom-nav__btn" :to="`/category/${item.url}`">
                <v-icon color="" class="text-h4 text-md-h3">
                  {{
                    `icon-${item.icon}`
                  }}
                </v-icon>
                <span class="text-body-2 text-md-body-1">{{ item.name }}</span>
              </nuxt-link>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-footer> -->
  </v-app>
</template>

<script>
import SearchDialog from '~/components/searchDialog.vue'
import productDetailsDialog from '~/components/productDetailsDialog.vue'
export default {
  components: { SearchDialog, productDetailsDialog },
  data () {
    return {
      value: null,
      fab: false,
      showSearchIcon: false,
      searchDialog: {
        open: false
      },
      pdDialog: {
        open: false,
        hash: ''
      },
      selectedProduct: {},
      debounceTimeout: null,
      searchResults: [],
      cats: [
        {
          name: 'نوشیدنی گرم',
          url: 'hot',
          icon: 'hot'
        },
        {
          name: 'نوشیدنی سرد',
          url: 'cold',
          icon: 'ice'
        },
        {
          name: 'کیک',
          url: 'cake',
          icon: 'cake'
        },
        {
          name: 'ساندویچ',
          url: 'breakfast',
          icon: 'burger'
        }
      ]
    }
  },
  computed: {
    dialogImageURL () {
      if (this.selectedProduct.image) {
        return `${this.apiURL}/images/${this.imageExt}/${this.selectedProduct.image}.${this.imageExt}`
      }
      return `${this.apiURL}/images/${this.imageExt}/cafe-farda-logo.${this.imageExt}`
    },
    apiURL () {
      return ''
    },
    imageExt () {
      return this.$store.getters.imageExt
    },
    user () {
      return this.$store.state.user
        ? this.$store.state.user
        : { username: 'کافه فردایی', avatar: false }
    },
    products () {
      return this.$store.state.products
    }
  },
  mounted () {
    this.$axios.get('menu.json').then((response) => {
      this.$store.commit('setProducts', response.data)
      this.$nuxt.$emit('dataLoaded')
    })
    window.addEventListener('popstate', (event) => {
      this.closeSearchDialog()
      this.closeProductDetailsDialog()
    })
    document.addEventListener('scroll', this.onScroll)
  },
  created () {
    this.$nuxt.$on('setSelectedProduct', this.setSelectedProduct)
  },
  beforeDestroy () {
    document.removeEventListener('scroll', this.onScroll)
    this.$nuxt.$off('setSelectedProduct', this.setSelectedProduct)
  },
  methods: {
    onScroll () {
      const t = window.scrollY || document.documentElement.offsetTop || 0
      this.showSearchIcon = t > 70
    },
    setSelectedProduct (product, hash = '') {
      this.selectedProduct = product
      this.pdDialog.hash = hash
      this.openProductDetailsDialog()
    },
    openSearchDialog () {
      window.history.pushState({}, '')
      this.searchDialog.open = true
    },
    closeSearchDialog () {
      this.searchDialog.open = false
    },
    openProductDetailsDialog () {
      window.history.pushState({}, '')
      this.pdDialog.open = true
    },
    closeProductDetailsDialog () {
      this.pdDialog.open = false
    },
    search (query) {
      if (query === '') { this.searchResults.splice(0) }
      this.searchResults = this.products.filter((p) => { return p.precache.includes(query) })
    }
  }
}
</script>
<style>
.bottom-nav__btn {
  text-decoration: none !important;
  align-items: center;
  display: flex;
  flex-direction: column !important;
  flex: 1 1 0px;
  transform: scale(0.9);
  transition: all 0.34s ease-in-out;
}

.bottom-nav__btn.nuxt-link-active {
  transform: scale(1);
}

.golden-idea.position-absolute {
  height: 4px;
  top: 0;
  left: 50%;
  margin-left: -18px;
}

.bottom-nav__btn span {
  color: #787878;
}

.bottom-nav__btn.nuxt-link-active .v-icon {
  color: #324843;
}

.bottom-nav__btn.bottom-nav__btn.nuxt-link-active span {
  color: #386864;
  font-weight: bold;
}

@media (min-width: 960px) {
  .golden-idea.position-absolute {
    width: 64px;
    height: 6px;
    margin-left: -32px;
  }
}
</style>

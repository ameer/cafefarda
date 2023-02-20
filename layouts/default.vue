<template>
  <v-app>
    <v-app-bar fixed app elevate-on-scroll color="#f7f6f2">
      <SearchDialog :open="searchDialog.open" @closeDialog="closeSearchDialog"
        />
      <v-container class="px-0">
        <v-row align="center" justify="center">
          <v-col cols="12" lg="9" class="d-flex align-center justify-center">
            <div>
              <v-img src="/cafe-farda-logo.svg" contain max-height="42px" max-width="128px" class="flex-1 pointer"
                @click="$router.push('/')"></v-img>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
    <v-main>
      <v-container>
        <v-row justify-md="center">
          <v-col cols="12" md="9">
            <div id="search-field-container">
              <v-text-field background-color="#f7f6f2" clearable label="جستجو در منو" filled dense rounded single-line
                prepend-inner-icon="mdi-magnify" hide-details="auto" @click="openSearchDialog">
              </v-text-field>
            </div>
          </v-col>

        </v-row>
        <Nuxt />
      </v-container>
    </v-main>
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
    <v-footer fixed color="transparent" class="px-3" app>
      <v-container class="relative pa-0">
        <v-row justify-md="center" no-gutters>
          <v-col cols="12" md="9" lg="6">
            <v-sheet color="#f5f4f0" width="100%"
              class="d-flex align-center justify-space-between justify-md-space-around rounded-xl px-5 py-3 pa-md-3">
              <nuxt-link v-for="(item, i) in cats" :key="i" class="bottom-nav__btn" :to="`/category/${item.url}`">
                <v-icon color="" class="text-h4 text-md-h3">{{
                `icon-${item.icon}`
                }}</v-icon>
                <span class="text-body-2 text-md-body-1">{{ item.name }}</span>
              </nuxt-link>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
import SearchDialog from '~/components/searchDialog.vue'

export default {
  components: { SearchDialog },
  data() {
    return {
      value: null,
      fab: false,
      searchDialog: {
        open: false
      },
      debounceTimeout: null,
      searchResults: [],
      cats: [
        {
          name: 'نوشیدنی گرم',
          url: 'hot',
          icon: 'hot',
        },
        {
          name: 'نوشیدنی سرد',
          url: 'cold',
          icon: 'ice',
        },
        {
          name: 'کیک',
          url: 'cake',
          icon: 'cake',
        },
        {
          name: 'ساندویچ',
          url: 'breakfast',
          icon: 'burger',
        },
      ],
    }
  },
  computed: {
    user() {
      return this.$store.state.user
        ? this.$store.state.user
        : { username: 'کافه فردایی', avatar: false }
    },
    products() {
      return this.$store.state.products
    },
  },
  beforeMount() {
    this.$axios.get('http://localhost:3000/menu.json').then((response) => {
      this.$store.commit('setProducts', response.data)
      this.$nuxt.$emit('dataLoaded')
    })
  },
  methods: {
    openSearchDialog() {
      this.searchDialog.open = true
    },
    closeSearchDialog() {
      this.searchDialog.open = false
    },
    
    search(query) {
      if(query === '') this.searchResults.splice(0)
      console.log(query);
      this.searchResults = this.products.filter((p) => { return p.precache.includes(query) })
    }
  },
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

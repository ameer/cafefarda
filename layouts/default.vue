<template>
  <v-app>
    <v-app-bar fixed app elevate-on-scroll color="#f7f6f2">
      <v-container class="px-0">
        <v-row align="center" justify="center">
          <v-col cols="12" lg="9" class="d-flex align-center justify-center">
            <div>
              <v-img
                src="/cafe-farda-logo.svg"
                contain
                max-height="42px"
                max-width="128px"
                class="flex-1 pointer"
                @click="$router.push('/')"
              ></v-img>
            </div>
            <!-- <v-spacer></v-spacer>
            <v-avatar
              color="fardaGreen"
              size="32"
              @click="$router.push('/startup/profileBuilder')"
            >
              <v-img v-if="user.avatar" :src="user.avatar"></v-img>
              <v-icon v-else dark size="28"> mdi-account-circle </v-icon>
            </v-avatar> -->
            <!-- <v-badge color="#00522e" dot overlap>
        <v-icon>mdi-bell</v-icon>
      </v-badge> -->
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
    <v-main>
      <v-container>
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
        <div class="golden-idea position-absolute"></div>
        <v-row justify-md="center" no-gutters>
          <v-col cols="12" md="9" lg="6">
            <v-sheet
              color="#f5f4f0"
              width="100%"
              class="d-flex align-center justify-space-between justify-md-space-around rounded-xl px-5 py-3 pa-md-3"
            >
              
              <nuxt-link
                v-for="(item, i) in cats"
                :key="i"
                class="bottom-nav__btn"
                :to="`/category/${item.url}`"
              >
                <v-icon color="" class="text-h4 text-md-h3">{{
                  `icon-${item.icon}`
                }}</v-icon>
                <span class="text-body-2 text-md-body-1">{{
                  item.name
                }}</span>
              </nuxt-link>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      value: null,
      fab: false,
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
  },
  beforeMount() {
    this.$axios.get('/storage/menuData.json').then((response) => {
      this.$store.commit('setProducts', response.data)
      this.$nuxt.$emit('dataLoaded')
    })
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
  transform: scale(.9);
  transition: all .34s ease-in-out;
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

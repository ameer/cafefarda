<template>
  <v-app>
    <v-app-bar fixed app elevate-on-scroll color="white">
      <v-container class="px-0">
        <v-row align="center" justify="center">
          <v-col cols="12" md="6" lg="9" class="d-flex align-center">
            <div>
              <v-img
                src="/cafe-farda-logo.svg"
                contain
                max-height="42px"
                max-width="165px"
                class="flex-1 pointer"
                @click="$router.push('/')"
              ></v-img>
            </div>
            <v-spacer></v-spacer>
            <v-avatar
              color="brown"
              size="32"
              @click="$router.push('/startup/profileBuilder')"
            >
              <v-img v-if="user.avatar" :src="user.avatar"></v-img>
              <v-icon v-else dark size="28"> mdi-account-circle </v-icon>
            </v-avatar>
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
    <v-speed-dial
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
        <v-btn v-model="fab" color="brown" dark fab>
          <v-icon v-if="fab"> mdi-close </v-icon>
          <v-icon v-else> mdi-menu </v-icon>
        </v-btn>
      </template>
      <v-btn
        v-for="(item, i) in cats"
        :key="i"
        fab
        dark
        color="brown darken-2"
        @click="$router.push(`/category/${item.url}`)"
      >
        <v-img
          :src="`/icons/${item.url}.png`"
          contain
          max-height="32px"
        ></v-img>
      </v-btn>
    </v-speed-dial>
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
        },
        {
          name: 'نوشیدنی سرد',
          url: 'cold',
        },
        {
          name: 'کیک',
          url: 'cake',
        },
        {
          name: 'ساندویچ',
          url: 'breakfast',
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

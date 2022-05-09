<template>
  <v-app>
    <v-app-bar app>
      <v-spacer></v-spacer>
      <div class="pointer">
        <v-icon left large>mdi-account-circle</v-icon>
        <span>{{ $store.$auth.user.name }}</span>
      </div>
    </v-app-bar>
    <v-navigation-drawer app right fixed>
      <div class="text-center pa-4">
        <v-img
          src="/cafe-farda-logo.svg"
          contain
          max-height="42px"
          class="flex-1"
          @click="$router.push('/')"
        ></v-img>
        <div class="text-h6 font-weight-bold text--secondary mt-2">
          پنل مدیریت
        </div>
      </div>
      <v-divider></v-divider>

      <v-list nav>
        <v-list-item
          v-for="item in navItems"
          :key="item.title"
          link
          exact
          :to="`/dashboard/${item.url}`"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="text-body-1">{{
              item.title
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
export default {
  middleware: 'auth',
  data() {
    return {
      navItems: [
        {
          title: 'ویرایش محصولات',
          icon: 'mdi-pencil',
          url: 'edit-products',
        },
      ],
    }
  },
  beforeMount() {
    this.$axios.get('/data/menu').then((response) => {
      this.$store.commit('setProducts', response.data)
      this.$nuxt.$emit('dataLoaded')
      this.menuData = response.data
    })
  },
}
</script>
<style></style>

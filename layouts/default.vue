<template>
  <v-app>
    <!-- <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
    <v-app-bar fixed app elevate-on-scroll color="white">
      <v-avatar color="brown" size="32">
        <v-img v-if="user.avatar" :src="user.avatar"></v-img>
        <v-icon v-else dark size="28"> mdi-account-circle </v-icon>
      </v-avatar>
      <v-spacer></v-spacer>
      <v-toolbar-title class="font-weight-bold brownish"
        >کافه فردا</v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-badge color="#00522e" dot overlap>
        <v-icon>mdi-bell</v-icon>
      </v-badge>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-bottom-navigation color="teal" grow shift fixed app>
      <v-btn to="/" nuxt exact>
        <span>خانه</span>

        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn>
        <span>پسندیده‌ها</span>

        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn>
        <span>سبد خرید</span>

        <v-icon>mdi-cart</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      value: null,
    }
  },
  computed: {
    user() {
      return this.$store.state.user
        ? this.$store.state.user
        : { username: 'کافه فردایی', avatar: false }
    },
  },
}
</script>

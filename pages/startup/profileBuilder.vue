<template>
  <v-container fluid class="pa-0 h-100 brown-gr">
    <avatar-dialog
      :open="avatarDialogOpen"
      :avatar="avatar"
      @close="avatarDialogOpen = false"
      @saveAvatar="saveAvatar"
    />
    <v-img src="/startup/5.jpg" position="center" class="h-100">
      <v-container class="h-100">
        <v-row align="center" justify="center" class="h-100">
          <v-col cols="12" md="6" class="text-center" align-self="start">
            <h3 class="text-h3 font-weight-bold text-center py-4 brownish">
              کافه فردا
            </h3>
          </v-col>
          <v-col align-self="start" cols="12" md="6" class="text-center">
            <v-avatar
              color="brown"
              size="150px"
              @click="avatarDialogOpen = true"
            >
              <v-img v-if="avatar" :src="avatar" max-width="128"></v-img>
              <v-icon v-else dark size="128"> mdi-account-circle </v-icon>
            </v-avatar>
            <v-text-field
              id="username"
              v-model="username"
              label="نام شما"
              solo-inverted
              rounded
              class="mt-8 text-center"
            ></v-text-field>
          </v-col>
          <v-col align-self="end" cols="12" md="6">
            <v-btn
              color="#00522e"
              rounded
              dark
              block
              x-large
              @click="saveUser"
            >
              <span class="text-h6">آغاز سفر</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-img>
  </v-container>
</template>

<script>
import avatarDialog from '~/components/avatarDialog.vue'
export default {
  components: { avatarDialog },
  layout: 'startup',
  transitions: 'slide',
  data() {
    return {
      avatar: null,
      avatarDialogOpen: false,
      username: '',
    }
  },
  mounted() {
    this.avatar = `https://avataaars.io/`
  },
  methods: {
    saveAvatar(newAvatar) {
      this.avatar = newAvatar
    },
    saveUser() {
      const user = {
        avatar: this.avatar,
        username: this.username,
      }
      this.$store.commit('setUser', user)
      this.$router.push('/')
    },
  },
}
</script>

<style></style>

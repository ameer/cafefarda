<template>
  <v-row justify="center">
    <v-col cols="12" sm="9" md="6" xl="4">
      <v-card>
        <v-card-text>
          <v-form @submit.prevent="login">
            <v-text-field
              v-model="email"
              type="text"
              label="Email"
              outlined
            ></v-text-field>
            <v-text-field
              v-model="password"
              type="password"
              label="Password"
              outlined
            ></v-text-field>
            <v-btn type="submit" block color="primary" x-large>
              <span class="text-h6">ورود</span>
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    login() {
      this.$auth
        .loginWith('laravelSanctum', {
          data: {
            email: this.email,
            password: this.password,
          },
        })
        .then(() => console.log('logged in'))
    },
  },
}
</script>
<style></style>

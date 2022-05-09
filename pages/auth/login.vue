<template lang="">
  <div>
    <v-form @submit.prevent="login">
      <v-text-field v-model="email" type="text" label="Email"></v-text-field>
      <v-text-field
        v-model="password"
        type="password"
        label="Password"
      ></v-text-field>
      <v-btn type="submit">Submit</v-btn>
    </v-form>
  </div>
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
        .then(() => console.log("logged in"))
    },
  },
}
</script>
<style lang=""></style>

<template>
  <v-container fluid class="pa-0 h-100 fardaGreen-gr">
    <v-img src="/startup/5.jpg" position="left center" class="h-100">
      <v-container class="h-100">
        <v-row align="center" justify="center" class="h-100">
          <v-col cols="12" md="6">
            <v-img
              src="/cafe-farda-logo.svg"
              contain
              @click="counter"
            />
            <div v-if="show === 3" class="d-flex flex-column">
              <v-btn v-for="(b, i) in branches" :key="`bb-${i}`" class="mb-2" outlined :to="{path: `/menu/${b.branch}`}">
                {{ b.name }}
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-img>
  </v-container>
</template>
<script>
export default {
  layout: 'startup',
  transition: 'slide',
  data () {
    return {
      branches: [
        { name: 'مهرویلا', branch: 'mehrvila' },
        { name: 'گوهردشت', branch: 'gohardasht' },
        { name: 'سه‌راه', branch: '3rah' }
      ],
      show: 0
    }
  },
  methods: {
    counter () {
      if (this.show === 3) { this.show = 0 } else { this.show++ }
    }
  }
}
</script>
<style>

</style>

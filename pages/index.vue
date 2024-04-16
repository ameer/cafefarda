<template>
  <v-container fluid class="pa-0 h-100 fardaGreen-gr">
    <v-img src="/startup/5.jpg" position="left center" class="h-100">
      <v-container class="h-100">
        <v-row align="start" justify="center" class="h-100">
          <v-col cols="12" md="6">
            <v-img
              src="/farda-logo.png"
              contain
              max-width="80%"
              class="mx-auto"
            />
            <div class="d-flex flex-column mt-4">
              <branch-card
                v-for="(b, i) in branches"
                v-bind="b"
                :key="`bb-${i}`"
                class="mb-4"
              >
                {{ b.name }}
              </branch-card>
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
        { name: 'فضای مهرویلا', address: 'مهرویلا، خیابان رودکی غربی، نبش تقاطع سعدی', image: '/images/branches/mehrvila.jpg', phone: 'tel:02633554014', location: 'https://www.google.com/maps/dir//Alborz+Province,+Karaj,+Mehrvila,+%D8%B3%D8%B9%D8%AF%DB%8C%D8%8C+RX84%2BMH9+Farda+Cafe%E2%80%AD/@35.8166714,50.9564745,17z/data=!4m9!4m8!1m0!1m5!1m1!1s0x3f8dbe5bdec79ed7:0xa055c210c994b2c7!2m2!1d50.956463!2d35.8166731!3e0?entry=ttu', branch: 'mehrvila' },
        { name: 'فضای گوهردشت', address: 'فاز دوم، خیابان دکتر حسابی شمالی، نبش نهم غربی', image: '/images/branches/gohardasht.jpg', phone: 'tel:02634421473', location: 'https://www.google.com/maps/dir//Cafe+Farda+(%DA%A9%D8%A7%D9%81%D9%87+%D9%81%D8%B1%D8%AF%D8%A7),+VX4F%2BGRC+Gohardasht,+Karaj,+Alborz+Province%E2%80%AD/@35.8562709,50.9745033,17z/data=!4m9!4m8!1m0!1m5!1m1!1s0x3f8dbf749a1aa2b9:0xe5ec4979a5d9086c!2m2!1d50.9744921!2d35.856289!3e0?entry=ttu', branch: 'gohardasht' },
        { name: 'فضای سه‌راه گوهردشت (کارگاه رستری و قهوه فروشی)', address: 'کنار گذر پل سه راه گوهردشت، روبروی ایستگاه تاکسی، پایین‌تر از نانوایی اپامه', image: '/images/branches/3rah.jpg', phone: 'tel:09360767684', location: 'https://www.google.com/maps/dir//Cafe+Farda+(%DA%A9%D8%A7%D9%81%D9%87+%D8%B1%D8%B3%D8%AA%D8%B1%DB%8C+%D9%81%D8%B1%D8%AF%D8%A7),+RXH9%2BC67+South+Kuye+Karmandan,+Karaj,+Alborz+Province%E2%80%AD/@35.8285375,50.9680469,17z/data=!4m9!4m8!1m0!1m5!1m1!1s0x3f8dbfbb70e65b0f:0x3163a85055477d6!2m2!1d50.9681133!2d35.8285117!3e0?entry=ttu', branch: '3rah' },
        { name: 'کارگاه کیک و شیرینی (آنلاین)', image: '/images/branches/pastry.jpg', phone: 'https://wa.link/skftiu' },
        { name: 'فضای جدید (به‌زودی)', image: '/startup/5.jpg', disabled: true }
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

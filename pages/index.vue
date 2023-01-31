<template>
  <v-row justify-md="center">
    <v-col cols="12" lg="9">
      <v-container>
        <v-row>
          <v-col cols="12" class="pa-0">
            <p class="fardaGreenish text-h6">
              سلام {{ user.username }}، {{ greetingsBasedOnTime }}!
            </p>
            <!-- <div id="search-field-container">
              <v-text-field
                background-color="#f4f4f4"
                clearable
                label="جستجو در منو"
                filled
                rounded
                single-line
                prepend-inner-icon="mdi-magnify"
                hide-details="auto"
              >
                <template #append>
                  <v-btn elevation="0" dark rounded fab small color="#cca069">
                    <v-icon>mdi-tune</v-icon>
                  </v-btn>
                </template>
              </v-text-field>
            </div> -->
          </v-col>
          <v-col cols="12" class="pb-6">
            <p class="fardaGreenish font-weight-bold text-body-1 mb-0 mt-3">
              دسته‌بندی‌ها
            </p>
          </v-col>
          <v-row class="overflow-hidden" dense>
            <v-col
              v-for="(cat, i) in cats"
              :key="i"
              cols="6"
              md="3"
              class="list-item-deactive"
              :class="active === true ? 'active' : ''"
            >
              <nuxt-link
                :to="`/category/${cat.url}`"
                class="text-decoration-none"
              >
                <v-card color="fardaGreen" rounded="xl" elevation="0">
                  <v-card-text>
                    <v-img
                      :src="`/icons/${cat.url}.png`"
                      contain
                      max-height="64px"
                    ></v-img>
                    <p class="mb-0 mt-2 white--text text-center">
                      {{ cat.name }}
                    </p>
                  </v-card-text>
                </v-card>
              </nuxt-link>
            </v-col>
          </v-row>
          <!-- <v-col cols="12">
            <p class="fardaGreenish font-weight-bold text-body-1 mb-4 mt-3">
              پیشنهاد ویژه🔥
            </p>
            <v-card style="border-radius: 24px" min-height="128px">
              <v-card-text class="h-100">
                <v-row align="center" class="h-100" dense>
                  <v-col cols="5">
                    <v-img
                      height="100px"
                      width="100px"
                      style="border-radius: 24px"
                      class="mx-auto"
                      src="/coffee-1.jpg"
                    ></v-img>
                  </v-col>
                  <v-col cols="7">
                    <v-chip>تخفیف ویژه</v-chip>
                    <div class="font-weight-bold text-body-1 fardaGreen--text mt-4">
                      دابل اسپرسو
                    </div>
                    <div
                      class="font-weight-light text-body-2 text--secondary mt-2"
                    >
                      یک فنجان دابل اسپرسو + یک اسلایس از کیک روز
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col> -->
        </v-row>
      </v-container>
    </v-col>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      active: false,
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
          name: 'کلاب و ساندویچ',
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
    greetingsBasedOnTime() {
      const date = new Date()
      const hour = date.getHours()
      if (hour < 12) {
        return 'صبح بخیر'
      } else if (hour < 20) {
        return 'عصر بخیر'
      } else {
        return 'شب بخیر'
      }
    },
  },
  mounted() {
    setTimeout(() => {
      this.active = true
    }, 600)
  },
}
</script>

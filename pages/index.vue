<template>
  <v-row justify-md="center">
    <v-col cols="12" lg="9">
      <v-container>
        <v-row>
          <v-col cols="12" class="pa-0">
            <!-- <p class="fardaGreenish text-h6">
              سلام {{ user.username }}، {{ greetingsBasedOnTime }}!
            </p> -->
          </v-col>
          <v-col
            v-for="(category, i) in toShowCategories"
            :key="`category-box-${i}`"
            cols="12"
            class="pa-0"
          >
            <CategoryBox :category="category" :products="featuredProducts.filter((p) => p.category === category)" />
            <v-divider class="mb-6 mt-4" />
          </v-col>
          <!-- <v-col cols="12" class="pb-6">
            <p class="fardaGreenish font-weight-bold text-body-1 mb-0 mt-3">
              دسته‌بندی‌ها
            </p>
          </v-col> -->
          <!-- <v-col cols="12">
            <div ref="zoneChanger" class="zone-changer">
              <div class="d-flex align-center justify-center">
                <button v-for="(z, j) in zones" :key="`zone-btn-${j}`" :class="zone === j ? 'active' : ''" @click="changeZone(j)">{{ z }}</button>
              </div>
              <div class="sliding-bg" :style="`width:${slidingBgWidth}px;transform: translateX(${slidingBgX}px);`"></div>
            </div>
          </v-col> -->
          <!-- <v-row class="overflow-hidden" dense>
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
          </v-row> -->
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
import CategoryBox from '~/components/categoryBox.vue'
export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { CategoryBox },
  data () {
    return {
      title: 'منو',
      active: false,
      slidingBgWidth: 0,
      slidingBgX: -8,
      zones: ['Regular Zone', 'Cafein Zone'],
      zone: 0,
      cats: [
        {
          name: 'نوشیدنی گرم',
          url: 'hot'
        },
        {
          name: 'نوشیدنی سرد',
          url: 'cold'
        },
        {
          name: 'کیک',
          url: 'cake'
        },
        {
          name: 'کلاب و ساندویچ',
          url: 'breakfast'
        }
      ],
      toShowCategories: ['hot', 'cold', 'breakfast']
    }
  },
  head () {
    return {
      title: this.title
    }
  },
  computed: {
    products () {
      return this.$store.state.products
    },
    featuredProducts () {
      let featuredProducts = []
      if (this.products.length > 0) {
        featuredProducts = this.products.filter((item) => {
          return this.toShowCategories.includes(item.category)
        })
      }
      return featuredProducts
    },

    // products() {
    //   if (Object.keys(this.menuData).length === 0) {
    //     return []
    //   }
    //   const
    //   const keys = Object.keys(this.menuData[this.$route.params.slug])
    //   return this.menuData[this.$route.params.slug][keys[this.selectedChip]]
    // },
    user () {
      return this.$store.state.user
        ? this.$store.state.user
        : { username: 'کافه فردایی', avatar: false }
    },
    greetingsBasedOnTime () {
      const date = new Date()
      const hour = date.getHours()
      if (hour < 12) {
        return 'صبح بخیر'
      } else if (hour < 20) {
        return 'عصر بخیر'
      } else {
        return 'شب بخیر'
      }
    }
  },
  mounted () {
    // const zoneChangerWidth = this.$refs.zoneChanger.clientWidth
    // this.slidingBgWidth = (zoneChangerWidth / this.zones.length) - 8

    setTimeout(() => {
      this.active = true
    }, 600)
  },
  methods: {
    changeZone (index) {
      this.zone = index
      this.slidingBgX = index * this.slidingBgWidth * -1 - 8
    }
  }
}
</script>
<style>
.zone-changer {
  background: #f7f6f2;
  border-radius: 36px;
  padding: 30px 0;
  max-width: 600px;
  margin: 0 auto;
  position: relative;
}
.zone-changer div {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 2;
}
.zone-changer div button {
  flex: 1 1 0px;
  transition: all 0.3s ease-in-out;
}
.zone-changer div button.active {
  color: #fff;
  font-weight: bold;
}
.zone-changer .sliding-bg {
  background: #386864;
  position: absolute;
  height: 84%;
  top: 8%;
  opacity: 1;
  z-index: 0;
  border-radius: 24px;
  transition: transform 0.3s ease-in-out;
}
</style>

<template>
  <v-row justify-md="center">
    <v-col cols="12" lg="9" class="px-0">
      <div class="text-center text--secondary vat-notice pa-4">
        به قیمت‌های پایین ۱۰٪ مالیات بر ارزش افزوده، اضافه خواهد شد.
      </div>
      <v-container fluid class="mt-n4">
        <v-row
          v-for="(subCat, key, i) in productsBySubCategory"
          :id="`${key}`"
          :key="`subcat-products-${i}`"
          class="mt-4"
          align="stretch"
        >
          <v-col cols="12" class="d-flex align-center">
            <h2 class="spanishGrey--text text--darken-1">
              {{ $t(`${key}`) }}
            </h2>
            <v-divider class="ms-4" />
          </v-col>
          <v-col
            v-for="(item, j) in subCat"
            :key="`product-col-${j}`"
            cols="12"
            class="d-flex align-center"
          >
            <span v-if="key !== 'cakes'" class="text-h6">{{ item.name }}</span>
            <span v-else class="text-h6">کیک روز</span>
            <v-divider class="mx-2" />
            <v-btn
              v-if="item.isVariable"
              class="text-body-2 rounded-xl"
              dark
              outlined
              color="fardaGreen"
              small
              @click="openDetailDialog(item)"
            >
              <span class="font-weight-regular">مشاهده گزینه‌ها</span>
            </v-btn>
            <p v-else-if="item.hasVariablePrice" class="mb-0">
              <span class="fardaGreen--text font-weight-bold text-body-2">بسته به لاین قهوه انتخابی</span>
            </p>
            <p v-else class="text-body-1 mb-0 d-flex">
              <span class="fardaGreen--text price faNum me-1">{{ item.price }}</span>
              <span class="fardaGreen--text price-unit faNum">هــزار تومان</span>
            </p>
          </v-col>
        </v-row>
      </v-container>
    </v-col>
  </v-row>
</template>
<script>
export default {
  layout: 'default',
  computed: {
    menuData () {
      return this.$store.state.products
    },
    apiURL () {
      return ''
    },
    imageExt () {
      return this.$store.getters.imageExt
    },
    products () {
      if (Object.keys(this.menuData).length === 0) {
        return []
      }
      // const keys = Object.keys(this.menuData[this.$route.params.slug])
      return this.menuData
    },
    categories () {
      return [...new Set(this.products.map(item => item.category))]
    },
    subCategories () {
      return [...new Set(this.products.map(item => item.subCategory))]
    },
    productsBySubCategory () {
      const _products = {}
      this.subCategories.forEach((subCat) => {
        _products[subCat] = this.products.filter(p => p.subCategory === subCat)
      })
      return _products
    }
  },
  methods: {
    openDetailDialog (item) {
      this.$nuxt.$emit('setSelectedProduct', item)
    }
  }
}
</script>
<style>
/* .vat-notice {
    position: sticky;
    top: 16px;
    z-index: 7;
    max-width: 320px !important;
    margin: 0 auto;
} */
</style>

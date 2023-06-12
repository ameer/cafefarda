<template>
  <v-container class="pa-0">
    <v-row no-gutters>
      <v-col cols="12">
        <div class="d-flex align-center">
          <v-chip v-if="category !== 'breakfast'" color="fardaGreen" dark>
            {{ $t(`${category}.name`) }}
          </v-chip>
          <v-chip v-else color="fardaGreen" dark>
            ساندویچ‌ها
          </v-chip>
          <v-spacer />
          <v-btn text :to="`/category/${category}`">
            <span>مشاهده همه</span>
            <v-icon right>
              mdi-arrow-left
            </v-icon>
          </v-btn>
        </div>
      </v-col>
      <v-col cols="12" class="pa-0">
        <v-slide-group class="no-arrows-slide-group" :show-arrows="false">
          <v-slide-item v-for="(subCategory, i) in subCategories" :key="`sub-category-${i}`">
            <CategoryCard v-if="subCategory !== 'club'" :title="subCategory" :index="i" :category="category" />
          </v-slide-item>
          <!-- <v-row>
              <v-col v-for="(products, subCategory, i) in subCategories"
                :key="`sub-category-${i}`"
                cols="4"

              >
                <CategoryCard :item="subCategory" :category="category" />
              </v-col>
            </v-row> -->
        </v-slide-group>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import CategoryCard from './categoryCard.vue'

export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { CategoryCard },
  props: {
    category: {
      type: String,
      default: ''
    },
    products: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    subCategories () {
      return [...new Set(this.products.map(p => p.subCategory))]
    }
  }
}
</script>
<style></style>

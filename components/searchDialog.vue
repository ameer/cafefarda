<template>
  <v-dialog :value="open" fullscreen transition="dialog-bottom-transition" persistent>
    <v-card>
      <v-card-title class="text-h5 pa-2 pt-0">
        <v-text-field
          v-model="query"
          clearable
          label="جستجو در منو"
          single-line
          hide-details="auto"
          color="fardaGreen"
          :loading="loading"
        >
          <template #prepend-inner>
            <v-icon class="me-2" @click="closeDialog">
              mdi-arrow-right
            </v-icon>
          </template>
        </v-text-field>
      </v-card-title>

      <v-card-text class="px-1">
        <v-container fluid>
          <v-row>
            <transition-group
              name="scroll-y-transition"
              tag="div"
              class="col col-12 col-md-6 col-xl-4"
            >
              <SearchResultCard v-for="(result, i) in results" :key="`result-${i}`" :product="result" :query="query" @cardClicked="openDetailDialog" />
            </transition-group>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import SearchResultCard from './searchResultCard.vue'

export default {
  components: { SearchResultCard },
  props: {
    open: {
      type: Boolean,
      default: false
    }
    // results: {
    //     type: Array,
    //     default: () => []
    // }
  },
  data () {
    return {
      loading: false,
      timeout: null,
      debouncedInput: ''
    }
  },
  computed: {
    products () {
      return this.$store.state.products
    },
    query: {
      get () {
        return this.debouncedInput
      },
      set (val) {
        if (this.timeout) { clearTimeout(this.timeout) }
        this.timeout = setTimeout(() => {
          this.debouncedInput = val
        }, 750)
      }
    },
    results () {
      if (typeof this.products.filter !== 'function' || this.debouncedInput === '') {
        return []
      } else {
        return this.products.filter((p) => {
          return p.precache.includes(this.debouncedInput)
        })
      }
    },
    resultCategories () {
      return [...new Set(this.results.map(item => item.category))]
    }
  },
  methods: {
    openDetailDialog (item) {
      this.$nuxt.$emit('setSelectedProduct', item)
    },
    closeDialog () {
      this.$emit('closeDialog')
    }
  }
}
</script>
<style>

</style>

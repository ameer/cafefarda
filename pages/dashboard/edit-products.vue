<template>
  <v-container>
    <image-select-dialog
      :image="dialogImageURL"
      :image-ext="$store.getters.imageExt"
      :images="images"
      :open="imageSelectDialogOpen"
      :url="apiURL"
      @close="imageSelectDialogOpen = false"
    />
    <v-row>
      <v-col cols="12" sm="3" class="mb-4">
        <v-select
          v-model="selectedCategory"
          :items="categories"
          label="دسته‌بندی‌ها"
          outlined
          hide-details="auto"
        >
          <template #item="{ item }">
            <span>{{ $t(`${item}.name`) }}</span>
          </template>
          <template #selection="{ item }">
            <span>{{ $t(`${item}.name`) }}</span>
          </template>
        </v-select>
      </v-col>
      <v-col cols="12" sm="3" class="mb-4">
        <v-select
          v-model="selectedSubCategory"
          :items="subItems"
          label="زیردسته"
          outlined
          hide-details="auto"
        >
          <template #item="{ item }">
            <span>{{ $t(`${selectedCategory}.${item}`) }}</span>
          </template>
          <template #selection="{ item }">
            <span>{{ $t(`${selectedCategory}.${item}`) }}</span>
          </template>
        </v-select>
      </v-col>
      <v-spacer />
      <v-col cols="12" sm="3" class="mb-4 text-left">
        <transition name="slide-y-reverse-transition">
          <v-btn
            v-show="unsaved"
            height="56px"
            max-width="320px"
            color="success"
            elevation="4"
            rounded
          >
            <v-icon>mdi-save</v-icon>
            <span class="text-body-1" @click="saveToDatabase">ذخیره اطلاعات منو</span>
          </v-btn>
        </transition>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-subtitle> برای ویرایش روی هر ردیف کلیک کنید </v-card-subtitle>
          <v-data-table
            :headers="headers"
            :items="filterdProducts"
            :items-per-page="5"
            class="elevation-1 banded-table"
            no-data-text="لطفا یک دسته را انتخاب کنید"
            fixed-header
          >
            <template
              v-for="(header, i) in headers"
              #[`item.${header.value}`]="{ item }"
            >
              <span v-if="header.readonly" :key="i">
                {{ item[header.value] }}
              </span>
              <v-btn v-else-if="header.type === 'image'" :key="'image-'+i" @click="openSelectImageDialog(item)">
                مشاهده و ویرایش
              </v-btn>
              <v-edit-dialog
                v-else
                :key="'edit-dialog-' + i"
                color="primary"
                :return-value="item[header.value]"
                :transition="'slide-x-reverse-transition'"
                large
                save-text="ذخیره"
                cancel-text="لغو"
                @save="save(item, header.value)"
                @open="open(item)"
              >
                {{ item[header.value] }}
                <template #input>
                  <v-textarea
                    v-if="header.type === 'textarea'"
                    v-model="editedItem[header.value]"
                  />
                  <v-text-field
                    v-else-if="header.type === 'number'"
                    v-model.number="editedItem[header.value]"
                    min="0"
                    type="number"
                    class="faNum"
                  />
                  <v-text-field v-else v-model="editedItem[header.value]" />
                </template>
              </v-edit-dialog>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import imageSelectDialog from '~/components/imageSelectDialog.vue'
export default {
  components: { imageSelectDialog },
  layout: 'dashboard',
  data () {
    return {
      imageSelectDialogOpen: false,
      editedItem: {},
      selectedCategory: '',
      selectedSubCategory: '',
      subItems: [],
      filterdProducts: [],
      products: {},
      headers: [
        {
          text: 'نام',
          align: 'start',
          sortable: true,
          value: 'name',
          class: 'text-body-1 font-weight-bold',
          cellClass: 'text-body-1',
          width: '256px'
        },
        {
          text: 'قیمت',
          value: 'price',
          type: 'number',
          cellClass: 'faNum fs-18',
          class: 'text-body-1 font-weight-bold',
          width: '256px'
        },
        {
          text: 'توضیحات',
          value: 'desc',
          type: 'textarea',
          class: 'text-body-1 font-weight-bold'
        },
        {
          text: 'تصویر',
          value: 'image',
          type: 'image',
          sortable: false,
          readonly: false,
          class: 'text-body-1 font-weight-bold'
        }
      ],
      unsaved: false,
      images: [],
      selectedProduct: {}
    }
  },
  computed: {
    categories () {
      return Object.keys(this.$store.state.products).length
        ? Object.keys(this.$store.state.products)
        : []
    },
    dialogImageURL () {
      if (this.selectedProduct.image) {
        return `${this.apiURL}/images/${this.imageExt}/${this.selectedProduct.image}.${this.imageExt}`
      }
      return `${this.apiURL}/images/${this.imageExt}/cafe-farda-logo.${this.imageExt}`
    },
    apiURL () {
      return ''
    },
    imageExt () {
      return this.$store.getters.imageExt
    }
  },
  watch: {
    categories () {
      this.selectedCategory = this.categories[0]
    },
    async selectedCategory () {
      await this.getProducts()
      this.subItems = Object.keys(this.products[this.selectedCategory])
      this.selectedSubCategory = this.subItems[0]
    },
    selectedSubCategory () {
      if (this.selectedCategory !== '') {
        this.filterdProducts =
          this.products[this.selectedCategory][this.selectedSubCategory]
      }
    },
    filterdProducts () {
      if (this.selectedCategory && this.selectedSubCategory) {
        this.filterdProducts =
          this.products[this.selectedCategory][this.selectedSubCategory]
      }
    }
  },
  created () {
    this.$nuxt.$on('dataLoaded', () => {
      this.getProducts()
    })
  },
  mounted () {
    this.getImages()
  },
  beforeDestroy () {
    this.$nuxt.$off('dataLoaded')
  },
  methods: {
    getImages () {
      const ext = this.$store.getters.imageExt.replace(/\./g, '')
      this.$axios.get(`/api/images/${ext}`, { withCredentials: true }).then((res) => {
        this.images = res.data.map(image => image.replace(/public/g, ''))
      })
    },
    openSelectImageDialog (item) {
      this.selectedProduct = item
      this.imageSelectDialogOpen = true
    },
    getProducts () {
      this.products = JSON.parse(JSON.stringify(this.$store.state.products))
    },
    open (item) {
      this.editedItem = { ...item }
    },
    save (item, editedKey) {
      if (item[editedKey] === String(this.editedItem[editedKey]).trim()) {
        return
      }
      this.unsaved = true
      item[editedKey] = this.editedItem[editedKey]
    },
    saveToDatabase () {
      this.$axios.put(
        '/admin/updateData',
        JSON.stringify(this.products),
        { withCredentials: true }
      ).then(() => alert('با موفقیت ذخیره شد'), this.unsaved = false)
        .catch(() => alert('خطا در ذخیره سازی'))
    }
  }
}
</script>
<style>
</style>

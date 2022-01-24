<template>
  <v-row justify-md="center">
    <v-col
      cols="12"
      md="6"
    >
      <v-container>
        <v-row>
          <v-col
            cols="12"
            class="pa-0"
          >
            <p class="brownish font-weight-bold text-h6">سلام کیوان، عصر بخیر!</p>
            <div id="search-field-container">
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
                  <v-btn
                    elevation="0"
                    dark
                    rounded
                    fab
                    small
                    color="#cca069"
                  >
                    <v-icon>mdi-tune</v-icon>
                  </v-btn>
                </template>
              </v-text-field>
            </div>
          </v-col>
          <v-col
            cols="12"
            class="pb-6"
          >
            <p class="brownish font-weight-bold text-body-1 mb-0 mt-3">دسته‌بندی‌ها</p>
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
            <nuxt-link :to="`/category/${cat.url}`" class="text-decoration-none">
              <v-card
                color="#8a624a"
                rounded="xl"
                elevation="0"
              >
                <v-card-text>
                  <v-img
                    :src="`/icons/${cat.url}.png`"
                    contain
                    max-height="64px"
                  ></v-img>
                  <p class="mb-0 mt-2 white--text text-center">{{cat.name}}</p>
                </v-card-text>
              </v-card>
              </nuxt-link>
            </v-col>
          </v-row>
        </v-row>

      </v-container>
    </v-col>
  </v-row>
</template>
<script>
export default {
  data () {
    return {
      active: false,
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
          name: 'صبحانه',
          url: 'breakfast'
        },
      ]
    }
  },
  mounted() {
    setTimeout(() => {
      this.active = true;
    }, 600);
  },
}
</script>

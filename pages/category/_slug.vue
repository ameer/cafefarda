<template>
  <v-row justify-md="center">
    <v-col cols="12" md="6">
      <v-slide-group v-model="selectedChip" show-arrows center-active mandatory>
        <v-slide-item
          v-for="(value, key, n) in menuData[$route.params.slug]"
          :key="n"
          v-slot="{ active, toggle }"
        >
          <v-btn
            class="mx-2"
            :input-value="active"
            active-class="cGreen white--text"
            depressed
            rounded
            @click="toggle"
          >
            {{ $t(`${$route.params.slug}.${key}`, $route.params.locale) }}
          </v-btn>
        </v-slide-item>
      </v-slide-group>
      <v-row v-if="products" class="mt-4">
        <v-col v-for="(item, i) in products" :key="i" cols="6" md="4">
          <v-card>
            <v-card-text>
              {{ item.name }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
export default {
  layout: 'default',
  data() {
    return {
      selectedChip: 0,
      menuData: {
        hot: {
          espersso: [
            {
              name: 'اسپرسو کامرشیال',
              price: '۲۵',
              src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Tazzina_di_caff%C3%A8_a_Ventimiglia.jpg/1200px-Tazzina_di_caff%C3%A8_a_Ventimiglia.jpg',
              desc: '',
            },
            {
              name: 'اسپرسو پریمیوم',
              price: '۳۰',
              desc: '',
            },
            {
              name: 'اسپرسو اسپشیال',
              price: '۴۰-۱۵۰',
              desc: '',
            },
            {
              name: 'آمریکانو',
              price: '۲۸',
              desc: '',
            },
            {
              name: 'آمریکانو پریمیوم',
              price: '۳۳',
              desc: '',
            },
            {
              name: 'کاپوچینو',
              price: '۳۲',
              desc: '',
            },
            {
              name: 'لاته',
              price: '۳۴',
              desc: '',
            },
            {
              name: 'ماکیاتو',
              price: '۳۶',
              desc: '',
            },
            {
              name: 'رد آی',
              price: '۴۰',
              desc: '',
            },
            {
              name: 'کافه اوله',
              price: '۳۸',
              desc: '',
            },
            {
              name: 'آفوگاتو',
              price: '۳۵',
              desc: '',
            },
            {
              name: 'پامکین لاته',
              price: '۴۴',
              desc: '',
            },
            {
              name: 'اسپنیش لاته',
              price: '۴۴',
              desc: '',
            },
            {
              name: 'مونگو لاته',
              price: '۴۲',
              desc: '',
            },
            {
              name: 'کوکی لاته',
              price: '۴۰',
              desc: '',
            },
            {
              name: 'وایت موکا لاته',
              price: '۴۰',
              desc: '',
            },
            {
              name: 'پرو اسپرسو',
              price: '۴۰',
              desc: '',
            },
          ],
          browing: [
            {
              name: 'V60',
              price: '',
              desc: '',
            },
            {
              name: 'کمکس',
              price: '',
              desc: '',
            },
            {
              name: 'Gem',
              price: '',
              desc: '',
            },
            {
              name: 'کالیتا',
              price: '',
              desc: '',
            },
            {
              name: 'کلور',
              price: '',
              desc: '',
            },
            {
              name: 'فرنچ پرس',
              price: '',
              desc: '',
            },
            {
              name: 'سایفون',
              price: '',
              desc: '',
            },
            {
              name: 'ائروپرس',
              price: '',
              desc: '',
            },
            {
              name: 'فیلترکافی',
              price: '',
              desc: '',
            },
            {
              name: 'قهوه ترک',
              price: '۲۹',
              desc: '',
            },
            {
              name: 'قهوه یونانی',
              price: '۳۳',
              desc: '',
            },
            {
              name: 'کلدبرو',
              price: '۴۵-۶۰',
              desc: '',
            },
            {
              name: 'کاسکارا',
              price: '۴۰',
              desc: '',
            },
          ],
          chocolate: [
            {
              name: 'پرمیوم چاکلت',
              price: '۴۵',
              desc: '',
            },
            {
              name: 'فروت چاکلت',
              price: '۴۰',
              desc: '',
            },
            {
              name: 'آمریکن استایل',
              price: '۴۵',
              desc: '',
            },
            {
              name: 'ویسکوزی چاکلت',
              price: '۴۵',
              desc: '',
            },
            {
              name: 'شیر نوتلا',
              price: '۴۵',
              desc: '',
            },
            {
              name: 'هات چاکلت',
              price: '۳۵',
              desc: '',
            },
            {
              name: 'وایت چاکلت',
              price: '۳۵',
              desc: '',
            },
          ],
          hotbar: [
            {
              name: 'سلپ',
              price: '۳۸',
              desc: '',
            },
            {
              name: 'کرک',
              price: '۴۰',
              desc: '',
            },
            {
              name: 'ماسالا',
              price: '۳۸',
              desc: '',
            },
            {
              name: 'چای لاته',
              price: '۳۲',
              desc: '',
            },
            {
              name: 'شیر عسل دارچین',
              price: '۳۶',
              desc: '',
            },
          ],
          dami: [
            {
              name: 'سیب دارچین',
              price: '۳۸',
              desc: '',
            },
            {
              name: 'سیب زعفران',
              price: '۴۲',
              desc: '',
            },
            {
              name: 'پرتقال میخک',
              price: '۴۰',
              desc: '',
            },
            {
              name: 'کهربا',
              price: '۴۰',
              desc: '',
            },
            {
              name: 'دمنوش کاسکارا',
              price: '۴۰',
              desc: '',
            },
            {
              name: 'دمنوش فردا',
              price: '۳۵',
              desc: '',
            },
          ],
          tea: [
            {
              name: 'چای سیاه معطر',
              price: '۲۰',
              desc: '',
            },
            {
              name: 'چای دشتی',
              price: '۳۰',
              desc: '',
            },
            {
              name: 'چای راگا',
              price: '۴۰',
              desc: '',
            },
          ],
        },
        cold: {
          ice: [
            {
              name: 'آیس آمریکانو',
              price: '۳۰',
              desc: '',
            },
            {
              name: 'آیس لاته',
              price: '۳۵',
              desc: '',
            },
            {
              name: 'آیس کافی',
              price: '۳۸',
              desc: '',
            },
            {
              name: 'ساور چری تونیک',
              price: '۴۴',
              desc: '',
            },
            {
              name: 'منگو تونیک',
              price: '۴۴',
              desc: '',
            },
            {
              name: 'هایپرسو',
              price: '۴۲',
              desc: '',
            },
            {
              name: 'بلک آیس',
              price: '۳۵',
              desc: '',
            },
          ],
          sharbat: [
            {
              name: 'زعفران',
              price: '۳۹',
              desc: '',
            },
            {
              name: 'نشاط',
              price: '۴۵',
              desc: '',
            },
            {
              name: 'خاک شیر',
              price: '۳۶',
              desc: '',
            },
            {
              name: 'خیار سکنجبین',
              price: '۳۸',
              desc: '',
            },
          ],
          smoti: [
            {
              name: 'بلک اسموتی',
              price: '۶۵',
              desc: '',
            },
            {
              name: 'رد اسموتی',
              price: '۶۰',
              desc: '',
            },
            {
              name: 'سوییت اسموتی',
              price: '۵۵',
              desc: '',
            },
          ],
          mocktel: [
            {
              name: 'لیموناد',
              price: '۳۸',
              desc: '',
            },
            {
              name: 'موهیتو',
              price: '۴۰',
              desc: '',
            },
            {
              name: 'بلواسکای',
              price: '۴۰',
              desc: '',
            },
            {
              name: 'مارون',
              price: '۴۸',
              desc: '',
            },
            {
              name: 'رابی',
              price: '۵۰',
              desc: '',
            },
            {
              name: 'هاوایی',
              price: '۵۳',
              desc: '',
            },
            {
              name: 'پینک',
              price: '۶۰',
              desc: '',
            },
            {
              name: 'فراستی',
              price: '۴۳',
              desc: '',
            },
            {
              name: 'ردلایت',
              price: '۴۴',
              desc: '',
            },
            {
              name: 'آبمیوه طبیعی',
              price: '۳۸',
              desc: '',
            },
          ],
          shake: [
            {
              name: 'کلاسیک (وانیل / شکلات)',
              price: '۴۴',
              desc: '',
            },
            {
              name: 'نوتلا',
              price: '۵۵',
              desc: '',
            },
            {
              name: 'کیت کت',
              price: '۵۵',
              desc: '',
            },
            {
              name: 'اسپرسو',
              price: '۵۲',
              desc: '',
            },
            {
              name: 'بادام زمینی',
              price: '۵۲',
              desc: '',
            },
            {
              name: 'موز گردو',
              price: '۶۵',
              desc: '',
            },
            {
              name: 'ارئو توت فرنگی',
              price: '۵۸',
              desc: '',
            },
            {
              name: 'کارامل نسکافه',
              price: '۵۵',
              desc: '',
            },
            {
              name: 'کوکی',
              price: '۴۹',
              desc: '',
            },
          ],
        },
        cake: {
          cakes: [
            {
              name: `کافه فردا یه بیکری هم داره!
بنابراین هر روز اینجا کیک‌های تازه،جذاب و متنوعی پخته و سرو می‌شه.
پس حتماً به ویترین کیک کافه سر بزنید یا از ما سوال بپرسید.
قیمت کیک‌هامون هم از ۲۵ تومان شروع می‌شه.
در ضمن یک لیوان جای سیاه هم کنار کیک‌تون مهمون ما هستید!!
(البته اگر در زمان سفارش بهمون بگید)`,
            },
          ],
        },
        breakfast: {
          break: [
            {
              name: 'کلت سیب',
              price: '۶۸',
              desc: '',
            },
            {
              name: 'کلت ژامبون و پنیر',
              price: '۷۵',
              desc: '',
            },
            {
              name: 'اوتمپل',
              price: '۷۹',
              desc: '',
            },
            {
              name: 'کورن فلکس',
              price: '۴۵',
              desc: '',
            },
            {
              name: 'وافل',
              price: '۷۰',
              desc: '',
            },
            {
              name: 'پنکیک',
              price: '۷۵',
              desc: '',
            },
            {
              name: 'املت فنجونی',
              price: '۴۵',
              desc: '',
            },
            {
              name: 'اگ پوتیتو',
              price: '۵۰',
              desc: '',
            },
            {
              name: 'پوره سیب زمینی و ژامبون مرغ',
              price: '۶۰',
              desc: '',
            },
            {
              name: 'اسکرامبلر اگ پنیری',
              price: '۵۵',
              desc: '',
            },
            {
              name: 'فرنی زعفرانی',
              price: '۴۰',
              desc: '',
            },
            {
              name: 'سالاد میوه',
              price: '۶۰',
              desc: '',
            },
          ],
        },
      },
    }
  },
  computed: {
    products() {
      const keys = Object.keys(this.menuData[this.$route.params.slug])
      return this.menuData[this.$route.params.slug][keys[this.selectedChip]]
    },
  },
}
</script>
<style></style>

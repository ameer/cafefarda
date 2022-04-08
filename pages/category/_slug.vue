<template>
  <v-row justify-md="center">
    <product-details-dialog
      :open="dialogOpen"
      :product="selectedProduct"
      :image="image"
      @close="dialogOpen = false"
    />
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
      <v-row
        v-if="products && $route.params.slug !== 'cake'"
        class="mt-4"
        align="stretch"
      >
        <v-col v-for="(item, i) in products" :key="i" cols="6" md="4">
          <v-card
            elevation="1"
            min-height="160"
            style="border-radius: 24px"
            class="product-card mx-auto pt-2 h-100"
            @click="openDetailDialog(item)"
          >
            <v-img
              :src="calcImage(i)"
              max-width="90%"
              max-height="90%"
              style="border-radius: 24px"
              class="mx-auto"
              aspect-ratio="1"
            >
              <v-btn
                icon
                :color="$store.state.favs.includes(item.name) ? 'red' : 'white'"
                @click.stop="toggleFavs(item.name)"
                ><v-icon>mdi-heart</v-icon></v-btn
              >
            </v-img>
            <v-card-title>
              <div class="font-weight-bold text-body-1 brown--text">
                {{ item.name }}
              </div>
            </v-card-title>
            <v-card-actions>
              <p
                v-if="item.isVariable"
                class="text--primary font-weight-bold text-h5 mb-0"
              >
                <span class="text--secondary text-caption"
                  >مشاهده گزینه‌ها</span
                >
              </p>
              <p v-else class="text--primary font-weight-bold text-h5 mb-0">
                <span class="price faNum">{{ item.price }}</span>
                <span class="text--secondary text-caption price-unit"
                  >هــزار تومان</span
                >
              </p>
              <v-spacer></v-spacer>
              <v-btn fab icon small color="cGreen"
                ><v-icon>mdi-plus-circle</v-icon></v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-else class="mt-4" align="stretch" justify="center">
        <v-col v-for="(item, i) in products" :key="i" cols="12" md="6">
          <v-card
            elevation="1"
            min-height="160"
            style="border-radius: 24px"
            class="product-card mx-auto pt-2 h-100"
          >
            <v-img
              src="/cake.jpg"
              max-width="90%"
              max-height="90%"
              style="border-radius: 24px"
              class="mx-auto"
              aspect-ratio="1"
            ></v-img>
            <v-card-title>
              <div class="font-weight-bold text-body-1 brown--text">
                {{ item.name }}
              </div>
            </v-card-title>
            <v-card-actions>
              <p class="text--primary font-weight-bold text-h5 mb-0">
                <span class="price faNum">{{ item.price }}</span>
                <span class="text--secondary text-caption price-unit"
                  >هــزار تومان</span
                >
              </p>
              <v-spacer></v-spacer>
              <v-btn fab icon small color="cGreen"
                ><v-icon>mdi-plus-circle</v-icon></v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script>
import productDetailsDialog from '~/components/productDetailsDialog.vue'
export default {
  components: { productDetailsDialog },
  layout: 'default',
  data() {
    return {
      dialogOpen: false,
      selectedChip: 0,
      selectedProduct: {},
      menuData: {
        hot: {
          espersso: [
            {
              name: 'اسپرسو کامرشیال',
              price: 32,
              images: [''],
              desc: ' قهوه عصاره گیری شده با دستگاه اسپرسو',
              etc: {
                mem: ['بادام تلخ', 'کارامل', 'شکلاتی'],
                cafein: 'H',
              },
              ingredients: ['عربیکا ۷۰٪', 'روبوستا ۳۰٪'],
            },
            {
              name: 'اسپرسو پریمیوم',
              price: 39,
              images: [''],
              desc: ' قهوه عصاره گیری شده با دستگاه اسپرسو',
              etc: {
                mem: [' گلی و میوه ای'],
                cafein: 'M',
              },
              ingredients: ['عربیکا ۱۰۰٪'],
            },
            {
              name: 'اسپرسو اسپشیالتی',
              price: 45,
              images: [''],
              desc: 'قهوه عصاره گیری شده با دستگاه اسپرسو',
              etc: {
                mem: ['گلی و میوه ای'],
                cafein: 'M',
              },
              ingredients: ['عربیکا ۱۰۰٪'],
            },
            {
              name: 'آمریکانو کامرشیال',
              price: 35,
              images: [''],
              desc: 'قهوه عصاره گیری شده با دستگاه اسپرسو',
              etc: {
                mem: ['گلی و میوه ای'],
                cafein: 'M',
              },
              ingredients: ['اسپرسو کامرشیال', 'آب جوش'],
            },
            {
              name: 'آمریکانو پریمیوم',
              price: 42,
              images: [''],
              desc: 'قهوه عصاره گیری شده با دستگاه اسپرسو',
              etc: {
                mem: ['گلی و میوه ای'],
                cafein: 'M',
              },
              ingredients: ['اسپرسو پریمیوم', 'آب جوش'],
            },
            {
              name: 'کاپوچینو',
              price: 42,
              images: [''],
              desc: 'قهوه عصاره گیری شده با دستگاه اسپرسو',
              etc: {
                mem: ['بادام تلخ', 'کارامل', 'شکلاتی'],
                cafein: 'H',
              },
              ingredients: ['اسپرسو کامرشیال', 'شیر', 'فوم شیر'],
            },
            {
              name: 'لاته',
              price: 44,
              images: [''],
              desc: 'قهوه عصاره گیری شده با دستگاه اسپرسو',
              etc: {
                mem: ['بادام تلخ', 'کارامل', 'شکلاتی'],
                cafein: 'H',
              },
              ingredients: ['اسپرسو کامرشیال', 'شیر', 'فوم شیر'],
            },
            {
              name: 'موکا ',
              price: 46,
              images: [''],
              desc: 'قهوه عصاره گیری شده با دستگاه اسپرسو',
              etc: {
                mem: ['بادام تلخ', 'کارامل', 'شکلاتی'],
                cafein: 'H',
              },
              ingredients: ['اسپرسو کامرشیال', 'شکلات', 'شیر', 'فوم شیر'],
            },
            {
              name: 'كارامل ماکیاتو ',
              price: 46,
              images: [''],
              desc: 'قهوه عصاره گیری شده با دستگاه اسپرسو',
              etc: {
                mem: ['بادام تلخ', 'کارامل', 'شکلاتی'],
                cafein: 'H',
              },
              ingredients: [
                'اسپرسو کامرشیال',
                'سیروپ کارامل',
                'شیر',
                'فوم شیر',
              ],
            },
            {
              name: 'رد آی',
              price: 50,
              images: [''],
              desc: 'قهوه عصاره گیری شده با دستگاه اسپرسو و فرنچ‌پرس',
              etc: {
                cafein: 'VH',
              },
              ingredients: ['فرنچ‌پرس', 'اسپرسو کامرشیال'],
            },
            {
              name: 'کافه اوله',
              price: 46,
              images: [''],
              desc: 'نسکافه حل شده در شیر',
              etc: {
                cafein: 'H',
              },
              ingredients: ['نسکافه گلد', 'شیر', 'فوم شیر'],
            },
            {
              name: 'آفوگاتو',
              price: 45,
              images: [''],
              desc: 'قهوه عصاره گیری شده با دستگاه اسپرسو و بستنی',
              ingredients: ['اسپرسو کامرشیال', 'بستنی وانیلی'],
            },
            {
              name: 'پامکین لاته',
              price: 50,
              images: [''],
              desc: 'قهوه عصاره گیری شده با دستگاه اسپرسو',
              ingredients: [
                'اسپرسو کامرشیال',
                'سیروپ کدو تنبل',
                'شیر',
                'فوم شیر',
              ],
            },
            {
              name: 'اسپنیش لاته',
              price: 50,
              images: [''],
              desc: 'قهوه عصاره گیری شده با دستگاه اسپرسو',
              ingredients: ['اسپرسو کامرشیال', 'شیر عسلی', 'شیر', 'فوم شیر'],
            },
            {
              name: 'مونگو لاته',
              price: 50,
              images: [''],
              desc: '',
              ingredients: ['اسپرسو کامرشیال', 'آب انبه', 'شیر', 'فوم شیر'],
            },
            {
              name: 'کوکی لاته',
              price: 48,
              images: [''],
              desc: '',
              ingredients: ['اسپرسو کامرشیال', 'کوکی', 'شیر', 'فوم شیر'],
            },
            {
              name: 'وایت موکا لاته',
              price: 50,
              images: [''],
              desc: '',
              ingredients: ['اسپرسو کامرشیال', 'وایت چاکلت', 'شیر', 'فوم شیر'],
            },
          ],
          browing: [
            {
              name: 'V60',
              price: '',
              images: [''],
              desc: '',
              isVariable: true,
              variables: [
                {
                  name: 'برزیل',
                  price: 60,
                  height: '۲۰۰۰ متر',
                  method: 'روش فرآوری',
                  type: 'گونه',
                  mem: ['طعم یادها'],
                },
                {
                  name: 'اروگوئه',
                  price: 60,
                  height: '۲۰۰۰ متر',
                  method: 'روش فرآوری',
                  type: 'گونه',
                  mem: ['طعم یادها'],
                },
              ],
            },
            {
              name: 'کمکس',
              price: '',
              images: [''],
              desc: '',
              isVariable: true,
              variables: [
                {
                  name: 'برزیل',
                  price: 60,
                  height: '۲۰۰۰ متر',
                  method: 'روش فرآوری',
                  type: 'گونه',
                  mem: ['طعم یادها'],
                },
                {
                  name: 'اروگوئه',
                  price: 60,
                  height: '۲۰۰۰ متر',
                  method: 'روش فرآوری',
                  type: 'گونه',
                  mem: ['طعم یادها'],
                },
              ],
            },
            {
              name: 'Gem',
              price: '',
              images: [''],
              desc: '',
              isVariable: true,
              variables: [
                {
                  name: 'برزیل',
                  price: 60,
                  height: '۲۰۰۰ متر',
                  method: 'روش فرآوری',
                  type: 'گونه',
                  mem: ['طعم یادها'],
                },
                {
                  name: 'اروگوئه',
                  price: 60,
                  height: '۲۰۰۰ متر',
                  method: 'روش فرآوری',
                  type: 'گونه',
                  mem: ['طعم یادها'],
                },
              ],
            },
            {
              name: 'کالیتا',
              price: '',
              images: [''],
              desc: '',
              isVariable: true,
              variables: [
                {
                  name: 'برزیل',
                  price: 60,
                  height: '۲۰۰۰ متر',
                  method: 'روش فرآوری',
                  type: 'گونه',
                  mem: ['طعم یادها'],
                },
                {
                  name: 'اروگوئه',
                  price: 60,
                  height: '۲۰۰۰ متر',
                  method: 'روش فرآوری',
                  type: 'گونه',
                  mem: ['طعم یادها'],
                },
              ],
            },
            {
              name: 'کلور',
              price: '',
              images: [''],
              desc: '',
              isVariable: true,
              variables: [
                {
                  name: 'برزیل',
                  price: 60,
                  height: '۲۰۰۰ متر',
                  method: 'روش فرآوری',
                  type: 'گونه',
                  mem: ['طعم یادها'],
                },
                {
                  name: 'اروگوئه',
                  price: 60,
                  height: '۲۰۰۰ متر',
                  method: 'روش فرآوری',
                  type: 'گونه',
                  mem: ['طعم یادها'],
                },
              ],
            },
            {
              name: 'فرنچ پرس',
              price: '',
              images: [''],
              desc: '',
              isVariable: true,
              variables: [
                {
                  name: 'برزیل',
                  price: 60,
                  height: '۲۰۰۰ متر',
                  method: 'روش فرآوری',
                  type: 'گونه',
                  mem: ['طعم یادها'],
                },
                {
                  name: 'اروگوئه',
                  price: 60,
                  height: '۲۰۰۰ متر',
                  method: 'روش فرآوری',
                  type: 'گونه',
                  mem: ['طعم یادها'],
                },
              ],
            },
            {
              name: 'سایفون',
              price: '',
              images: [''],
              desc: '',
              isVariable: true,
              variables: [
                {
                  name: 'برزیل',
                  price: 60,
                  height: '۲۰۰۰ متر',
                  method: 'روش فرآوری',
                  type: 'گونه',
                  mem: ['طعم یادها'],
                },
                {
                  name: 'اروگوئه',
                  price: 60,
                  height: '۲۰۰۰ متر',
                  method: 'روش فرآوری',
                  type: 'گونه',
                  mem: ['طعم یادها'],
                },
              ],
            },
            {
              name: 'ائروپرس',
              price: '',
              images: [''],
              desc: '',
              isVariable: true,
              variables: [
                {
                  name: 'برزیل',
                  price: 60,
                  height: '۲۰۰۰ متر',
                  method: 'روش فرآوری',
                  type: 'گونه',
                  mem: ['طعم یادها'],
                },
                {
                  name: 'اروگوئه',
                  price: 60,
                  height: '۲۰۰۰ متر',
                  method: 'روش فرآوری',
                  type: 'گونه',
                  mem: ['طعم یادها'],
                },
              ],
            },
            {
              name: 'فیلترکافی',
              price: '',
              images: [''],
              desc: '',
              isVariable: true,
              variables: [
                {
                  name: 'برزیل',
                  price: 60,
                  height: '۲۰۰۰ متر',
                  method: 'روش فرآوری',
                  type: 'گونه',
                  mem: ['طعم یادها'],
                },
                {
                  name: 'اروگوئه',
                  price: 60,
                  height: '۲۰۰۰ متر',
                  method: 'روش فرآوری',
                  type: 'گونه',
                  mem: ['طعم یادها'],
                },
              ],
            },
            {
              name: 'قهوه ترک',
              price: 35,
              images: [''],
              desc: '',
              ingredients: ['متد ایبریک'],
            },
            {
              name: 'قهوه یونانی',
              price: 42,
              images: [''],
              desc: '',
              ingredients: ['قهوه ترک', 'شیر', 'فوم شیر'],
            },
            {
              name: 'کلدبرو',
              price: 65,
              images: [''],
              desc: '',
              ingredients: ['قهوه ی سرد دم'],
            },
            {
              name: 'کاسکارا',
              price: 60,
              images: [''],
              desc: '',
              ingredients: ['دمنوش گیالس قهوه'],
            },
          ],
          chocolate: [
            {
              name: 'پرمیوم چاکلت',
              price: 58,
              images: [''],
              desc: '',
              etc: {
                cafein: '',
              },
              ingredients: ['هات چاکلت', 'گردو', 'کیت کت', 'بستنی شکالتی'],
            },
            {
              name: 'فروت چاکلت',
              price: '50',
              images: [''],
              desc: '',
              ingredients: ['هات چاکلت', 'موز'],
            },
            {
              name: 'آمریکن استایل',
              price: 52,
              images: [''],
              desc: '',
              ingredients: ['هات چاکلت', 'بادام زمینی', 'خامه'],
            },
            {
              name: 'ویسکوزی چاکلت',
              price: 52,
              images: [''],
              desc: '',
              ingredients: ['وایت چاکلت', 'بیسکوئیت', 'موز'],
            },
            {
              name: 'شیر نوتلا',
              price: 55,
              images: [''],
              desc: '',
              ingredients: ['نوتال', 'شیر', 'فوم شیر'],
            },
            {
              name: 'هات چاکلت',
              price: 40,
              images: [''],
              desc: '',
              ingredients: [
                'پودر کاکائو',
                'شکر',
                'قوام دهنده',
                'شیر',
                'فوم شیر',
              ],
            },
            {
              name: 'وایت چاکلت',
              price: 40,
              images: [''],
              desc: '',
              ingredients: [
                'پودر شکالت سفید',
                'شکر',
                'وانیل',
                'قوام دهنده',
                'شیر',
                'فوم شیر',
              ],
            },
            {
              name: 'دارک چاکلت',
              price: 45,
              images: [''],
              desc: '',
              ingredients: ['هات چاکلت غلیظ'],
            },
          ],
          hotbar: [
            {
              name: 'سلپ',
              price: 44,
              images: [''],
              desc: '',
              ingredients: [
                'پودر سلپ ترکی',
                'دارچین',
                'وانیل',
                'گوارگام',
                'شیر',
                'فوم شیر',
              ],
            },
            {
              name: 'ماسالا',
              price: 40,
              images: [''],
              desc: '',
              ingredients: [
                'میخک',
                'جوزهندی',
                'دارچین',
                'هل',
                'رازیانه',
                'بادیان',
                'شیر',
                'فوم شیر',
              ],
            },
            {
              name: 'چای لاته',
              price: '38',
              images: [''],
              desc: '',
              ingredients: ['چای سیاه دمی', 'سیروپ دارچین', 'شیر', 'فوم شیر'],
            },
            {
              name: 'شیر عسل دارچین',
              price: '40',
              images: [''],
              desc: '',
              ingredients: [
                'عسل',
                'پودر دارچین',
                'سیروپ دارچین',
                'شیر',
                'فوم شیر',
              ],
            },
          ],
          dami: [
            {
              name: 'کویین بری',
              price: 62,
              images: [''],
              desc: '',
              ingredients: [
                'چای ترش',
                'توت فرنگی',
                'گل سرخ',
                'کرن بری',
                'زرشک',
              ],
            },
            {
              name: 'ویکتوریا سان ست',
              price: 50,
              images: [''],
              desc: '',
              ingredients: [
                'شیرین بیان',
                'رازیانه',
                'زنجبیل',
                'دارچین',
                'فلفل',
                'زردچوبه',
              ],
            },
            {
              name: 'گلدن وانیلا',
              price: 48,
              images: [''],
              desc: '',
              ingredients: ['سیب', 'میخک', 'وانیل', 'شیرین بیان'],
            },
            {
              name: 'مولن رژ',
              price: 48,
              images: [''],
              desc: '',
              ingredients: ['لبو', 'به', 'چای ترش'],
            },
            {
              name: 'سیب دارچین',
              price: 46,
              images: [''],
              desc: '',
              ingredients: ['سیب', 'سیروپ دارچین', 'چوب دارچین'],
            },
            {
              name: 'سیب زعفران',
              price: 48,
              images: [''],
              desc: '',
              ingredients: ['سیب', 'زعفران', 'گل محمدی'],
            },
            {
              name: 'کهربا',
              price: 50,
              images: [''],
              desc: '',
              ingredients: ['چای ترش', 'آب آلبالو', 'دارچین دودی'],
            },
            {
              name: 'دمنوش فردا',
              price: 45,
              images: [''],
              desc: '',
              ingredients: [' برگ گیاهان طبیعی)محتواش رو خودت بگو('],
            },
          ],
          tea: [
            {
              name: 'چای سیاه معطر',
              price: 30,
              images: [''],
              desc: '',
              ingredients: [
                'چای سیاه دمی',
                'چوب دارچین',
                'گل محمدی',
                'قند',
                'نبات',
              ],
            },
            {
              name: 'چای دشتی',
              price: 40,
              images: [''],
              desc: '',
              ingredients: [
                'چای بهاره دستچین لاهیجان',
                'سرو به همراه مربا بالنگ',
              ],
            },
            {
              name: 'چای راگا',
              price: '',
              images: [''],
              desc: '',
              isVariable: true,
              variables: [
                {
                  name: 'ارتفاعات هندوستان',
                  price: 45,
                  height: '۲۰۰۰ متر',
                  method: 'ارتودکس',
                  type: 'آسامیک',
                  mem: ['چوب وانیل', 'خرما خارک', '- آب نبات پولک ی'],
                },
              ],
            },
          ],
        },
        cold: {
          ice: [
            {
              name: 'آیس آمریکانو',
              price: 37,
              images: [''],
              desc: '',
              ingredients: ['اسپرسو کامرشیال', 'آب', 'یخ'],
            },
            {
              name: 'آیس لاته',
              price: 46,
              images: [''],
              desc: '',
              ingredients: ['اسپرسو کامرشیال', 'شیر', 'یخ'],
            },
            {
              name: 'آیس کافی',
              price: 48,
              images: [''],
              desc: '',
              ingredients: ['سپرسو کامرشیال', 'شیر', 'سیروپ کارامل', 'یخ'],
            },
            {
              name: 'ساور چری تونیک',
              price: 58,
              images: [''],
              desc: '',
              ingredients: [
                'اسپرسو کامرشیال',
                'اسپرسو کامرشیال',
                'سودا',
                'سیروپ بادام تلخ',
                'یخ',
              ],
            },
            {
              name: 'منگو تونیک',
              price: 52,
              images: [''],
              desc: '',
              ingredients: ['اسپرسو کامرشیال', 'آب انبه', 'یخ'],
            },
            {
              name: 'هایپرسو',
              price: 52,
              images: [''],
              desc: '',
              ingredients: ['اسپرسو کامرشیال', 'هایپ', 'یخ'],
            },
            {
              name: 'بلک آیس',
              price: 48,
              images: [''],
              desc: '',
              ingredients: ['اسپرسو کامرشیال', 'کوکاکولا', 'یخ'],
            },
          ],
          nectar: [
            {
              name: 'زعفران',
              price: 46,
              images: [''],
              desc: '',

              ingredients: ['زعفران', 'لیمو', 'عصاره رز'],
            },
            {
              name: 'نشاط',
              price: 50,
              images: [''],
              desc: '',

              ingredients: [
                'زعفران',
                'عسل',
                'لیمو',
                'عرق بیدمشک',
                'عرق کاسنی',
                'سیروپ نارگیل',
              ],
            },
            {
              name: 'خاک شیر',
              price: 42,
              images: [''],
              desc: '',

              ingredients: ['عرق بیدمشک', 'گلاب', 'خاکشیر'],
            },
            {
              name: 'خیار سکنجبین',
              price: 44,
              images: [''],
              desc: '',

              ingredients: ['خیار', 'شربت سکنجبین'],
            },
          ],
          smoothie: [
            {
              name: 'تروپیکال اسموتی ',
              price: 70,
              images: [''],
              desc: '',
              ingredients: ['موز', 'آناناس', 'انبه'],
            },
            {
              name: 'رد اسموتی',
              price: 65,
              images: [''],
              desc: '',
              ingredients: ['موز', 'توت فرنگی', 'شاهتوت', 'آلبالو'],
            },
            {
              name: 'سوییت اسموتی',
              price: 60,
              images: [''],
              desc: '',
              ingredients: ['موز', 'هلو', 'آلوئه ورا', 'سیب'],
            },
          ],
          mocktail: [
            {
              name: 'لیموناد',
              price: 44,
              images: [''],
              desc: '',
              ingredients: [' لیمو ترش', 'سیروپ لیمو', 'سودا'],
            },
            {
              name: 'موهیتو',
              price: 46,
              images: [''],
              desc: '',
              ingredients: ['نعنا یخی', 'لیمو ترش', 'سیروپ نعنا', 'سودا'],
            },
            {
              name: 'بلواسکای',
              price: 46,
              images: [''],
              desc: '',
              ingredients: ['سیروپ بلو کارسائو', 'لیمو ترش', 'سودا'],
            },
            {
              name: 'مارون',
              price: 55,
              images: [''],
              desc: '',
              ingredients: ['هلو', 'آلوئه ورا', 'توت فرنگی'],
            },
            {
              name: 'رابی',
              price: 58,
              images: [''],
              desc: '',
              ingredients: ['هندوانه', 'شاهتوت', 'نعنا'],
            },
            {
              name: 'هاوایی',
              price: 60,
              images: [''],
              desc: '',
              ingredients: ['آناناس', 'انبه', 'پرتقال'],
            },
            {
              name: 'پینک',
              price: 65,
              images: [''],
              desc: '',
              ingredients: ['موز', 'شاهتوت', 'انبه', 'آلوئه ورا'],
            },
            {
              name: 'فراستی',
              price: 50,
              images: [''],
              desc: '',
              ingredients: [
                'خیار',
                'لیمو',
                'زنجبیل',
                'نعنا',
                'سیروپ لیمو',
                'سودا',
                'نمک',
              ],
            },
            {
              name: 'ردلایت',
              price: 50,
              images: [''],
              desc: '',
              ingredients: ['هندوانه', 'بستنی'],
            },
            {
              name: 'آبمیوه طبیعی',
              price: 45,
              images: [''],
              desc: '',
              ingredients: ['آبمیوه طبیعی'],
            },
          ],
          shake: [
            {
              name: 'کلاسیک (وانیل / شکلات)',
              price: 50,
              images: [''],
              desc: '',
              ingredients: ['بستنی شکالتی یا وانیلی', 'شیر'],
            },
            {
              name: 'نوتلا',
              price: 68,
              images: [''],
              desc: '',
              ingredients: ['بستنی وانیلی', 'نوتلا', 'شیر'],
            },
            {
              name: 'کیت کت',
              price: 68,
              images: [''],
              desc: '',
              ingredients: ['بستنی وانیلی', 'کیت کت', 'شیر'],
            },
            {
              name: 'اسپرسو',
              price: 60,
              images: [''],
              desc: '',
              ingredients: ['بستنی وانیلی', 'اسپرسو', 'شیر'],
            },
            {
              name: 'بادام زمینی',
              price: 62,
              images: [''],
              desc: '',
              ingredients: [
                'بستنی وانیلی',
                'کره بادام زمینی',
                'بادام زمینی',
                'شیر',
              ],
            },
            {
              name: 'موز گردو',
              price: 70,
              images: [''],
              desc: '',
              ingredients: ['بستنی وانیلی', 'موز', 'گردو', 'شیر'],
            },
            {
              name: 'ارئو توت فرنگی',
              price: 65,
              images: [''],
              desc: '',
              ingredients: [
                'بستنی وانیلی',
                'بیسکوییت اورئو',
                'توت فرنگی',
                'شیر',
              ],
            },
            {
              name: 'کارامل نسکافه',
              price: 60,
              images: [''],
              desc: '',
              ingredients: ['بستنی وانیلی', 'نسکافه', 'سیروپ کارامل'],
            },
            {
              name: 'کوکی',
              price: 60,
              images: [''],
              desc: '',
              ingredients: ['بستنی وانیلی', 'کوکی', 'شیر'],
            },
          ],
        },
        cake: {
          cakes: [
            {
              name: `کافه فردا یه بیکری هم داره!
بنابراین هر روز اینجا کیک‌های تازه،جذاب و متنوعی پخته و سرو می‌شه.
پس حتماً به ویترین کیک کافه سر بزنید یا از ما سوال بپرسید.
در ضمن یک لیوان چای سیاه هم کنار کیک‌تون مهمون ما هستید!!
(البته اگر در زمان سفارش بهمون بگید)`,
              price: 'از ۲۵',
            },
          ],
        },
        sandwiches: {
          sandwiches: [
            {
              name: 'سوییت میل',
              price: 44,
              images: [''],
              desc: '',
              ingredients: ['نان تست', 'شکلات فندقی', 'موز', 'توت فرنگی'],
            },
            {
              name: 'پارادوکس',
              price: 40,
              images: [''],
              desc: '',
              ingredients: [
                'نان تست',
                'مربای انجیر',
                'مغز تخمه',
                'پنیرلبنه',
                'زیتون',
                'کره بادام زمینی نمکی',
              ],
            },
            {
              name: 'فرش تست',
              price: 40,
              images: [''],
              desc: '',
              ingredients: [
                'نان تست',
                'پنیر لبنه',
                'سبزی معطر',
                'خیار',
                'کنجد',
                'گردو',
              ],
            },
            {
              name: 'رزبری و گرانول',
              price: 44,
              images: [''],
              desc: '',
              ingredients: [
                'نان تست',
                'خامه صبحانه',
                'مارماالد رزبری',
                'گرانول غالت ',
              ],
            },
            {
              name: 'سوپر ژامبون',
              price: 45,
              images: [''],
              desc: '',
              ingredients: [
                'نان تست',
                'ژامبون لیونر',
                'پنیر گودا',
                'سس خردل مالیم',
              ],
            },
            {
              name: 'بوقلمون و سس آووکادو',
              price: 55,
              images: [''],
              desc: '',
              ingredients: [
                'نان تست',
                'بیکن بوقلمون',
                'پرک بادام',
                'سس آووکادو',
              ],
            },
            {
              name: 'استیک مرغ و سس پستو',
              price: 55,
              images: [''],
              desc: '',
              ingredients: ['نان تست', 'استیک مرغ', 'سس پستو', 'بادام زمینی'],
            },
            {
              name: 'پپرونی و پنیر',
              price: 50,
              images: [''],
              desc: '',
              ingredients: ['نان تست', 'پپرونی', 'پنیرلبنه', 'ذرت', 'گودا'],
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
    image() {
      if (this.$route.params.slug === 'hot') {
        return `/new (${Math.floor(Math.random() * 23)}).jpeg`
      } else if (this.$route.params.slug === 'cold') {
        return '/ice.jpg'
      } else if (this.$route.params.slug === 'cake') {
        return '/cake.jpg'
      } else if (this.$route.params.slug === 'breakfast') {
        return '/breakfast.jpg'
      } else {
        return '/coffee-1.jpg'
      }
    },
  },
  methods: {
    calcImage(i) {
      return `/new (${Math.floor(Math.random() * 22) + 1}).jpeg`
    },
    openDetailDialog(item) {
      this.selectedProduct = item
      this.dialogOpen = true
    },
    toggleFavs(name) {
      this.$store.commit('toggleFavs', name)
    },
  },
}
</script>
<style></style>

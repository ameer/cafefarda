<template>
  <v-row justify-md="center">
    <product-details-dialog
      :open="dialogOpen"
      :product="selectedProduct"
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
              :src="'/images/' + item.image + '.jpg'"
              max-width="90%"
              max-height="90%"
              style="border-radius: 24px"
              class="mx-auto"
              aspect-ratio="1"
              lazy-src="/cafe-farda-logo.jpg"
            >
              <!-- <v-btn
                icon
                class="backdrop-filter"
                left
                :color="$store.state.favs.includes(item.name) ? 'red' : 'white'"
                @click.stop="toggleFavs(item.name)"
                ><v-icon>mdi-heart</v-icon></v-btn
              > -->
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
              <!-- <v-btn fab icon small color="cGreen"
                ><v-icon>mdi-plus-circle</v-icon></v-btn
              > -->
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
          espresso: [
            {
              name: 'اسپرسو کامرشیال',
              image: 'commercial-espresso',
              price: 32,
              images: [''],
              desc: ' نوعی قهوه عصاره گیری شده غلیظ که حسابی به شما انرژی میده.',
              etc: {
                mem: ['بادام تلخ', 'کارامل', 'شکلاتی'],
                cafein: 'H',
              },
              ingredients: ['عربیکا ۷۰٪', 'روبوستا ۳۰٪'],
            },
            {
              name: 'اسپرسو پریمیوم',
              image: 'premium-espresso',
              price: 39,
              images: [''],
              desc: ' نوعی قهوه عصاره گیری شده غلیظ که هم از عطر و طعمش لذت میبرین هم از کافئینش.',
              etc: {
                mem: [' گلی و میوه ای'],
                cafein: 'M',
              },
              ingredients: ['عربیکا ۱۰۰٪'],
            },
            {
              name: 'اسپرسو اسپشیالتی',
              image: 'commercial-espresso',
              price: 45,
              images: [''],
              desc: 'نوعی قهوه عصاره گیری شده غلیظ که عطر و طعمش شمارو دقیقا به زادگاه خودش میبره.',
              etc: {
                mem: ['گلی و میوه ای'],
                cafein: 'M',
              },
              ingredients: ['عربیکا ۱۰۰٪'],
            },
            {
              name: 'آمریکانو کامرشیال',
              image: 'americano-commercial',
              price: 35,
              images: [''],
              desc: 'اگر دوس داری چند دقیقه ای از قهوه خوردن لذت ببری ترکیب اسپرسو کامرشیال با آب جوش بهترین انتخابه.',
              etc: {
                mem: ['گلی و میوه ای'],
                cafein: 'M',
              },
              ingredients: ['اسپرسو کامرشیال', 'آب جوش'],
            },
            {
              name: 'آمریکانو پریمیوم',
              image: 'americano-commercial',
              price: 42,
              images: [''],
              desc: 'اگر دوس داری چند دقیقه ای از قهوه خوردن لذت ببری ترکیب اسپرسو پریمیوم با آب جوش بهترین انتخابه.',
              etc: {
                mem: ['گلی و میوه ای'],
                cafein: 'M',
              },
              ingredients: ['اسپرسو پریمیوم', 'آب جوش'],
            },
            {
              name: 'کاپوچینو',
              image: 'cappuccino',
              price: 42,
              images: [''],
              desc: 'اگر از قهوه ات انتظار یک طعم و عطر بی نظیر و ملایم داری ترکیب اسپرسو با حجم کمی شیر(120 سی سی) بهترین انتخابه',
              etc: {
                mem: ['بادام تلخ', 'کارامل', 'شکلاتی'],
                cafein: 'H',
              },
              ingredients: ['اسپرسو کامرشیال', 'شیر', 'فوم شیر'],
            },
            {
              name: 'لاته',
              image: 'latte',
              price: 44,
              images: [''],
              desc: 'اگر دوس داری امروز فقط کمی عطر و طعم قهوه رو با شیر(180 سی سی)داشته باشی بهترین انتخابت میتونه لته باشه.',
              etc: {
                mem: ['بادام تلخ', 'کارامل', 'شکلاتی'],
                cafein: 'H',
              },
              ingredients: ['اسپرسو کامرشیال', 'شیر', 'فوم شیر'],
            },
            {
              name: 'موکا',
              image: 'latte',
              price: 46,
              images: [''],
              desc: 'هم شیر قهوه دوس داری هم طعم شکلات رو؟ پس منتظر چی هستی ؟!',
              etc: {
                mem: ['بادام تلخ', 'کارامل', 'شکلاتی'],
                cafein: 'H',
              },
              ingredients: ['اسپرسو کامرشیال', 'شکلات', 'شیر', 'فوم شیر'],
            },
            {
              name: 'كارامل ماکیاتو ',
              image: 'latte',
              price: 46,
              images: [''],
              desc: 'هم شیر قهوه دوس داری هم طعم کارامل رو؟ پس منتظر چی هستی ؟!',
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
              image: 'red-eye',
              price: 50,
              images: [''],
              desc: 'یکی از هیجان انگیزترین نوشدنی های، چرا که هم خواب رو حسابی ازتون دور می کنه و هم ترکیب قهوه دم شده با اسپرسو یک طعم عجیب بهتون هدیه میده.',
              etc: {
                cafein: 'VH',
              },
              ingredients: ['فرنچ‌پرس', 'اسپرسو کامرشیال'],
            },
            {
              name: 'کافه اوله',
              image: 'latte',
              price: 46,
              images: [''],
              desc: 'حالت کلاسیک یک آدم کافه باز، نسکافه و شیر حرفی برای گفتن باقی نمیذاره.',
              etc: {
                cafein: 'H',
              },
              ingredients: ['نسکافه گلد', 'شیر', 'فوم شیر'],
            },
            {
              name: 'آفوگاتو',
              image: 'affogato',
              price: 45,
              images: [''],
              desc: 'طعم شیرین بستنی وانیل وقتی با اسپرسو همراه بشه اونقدری خوشمزه و باحاله که اصلا امتحان کردنش واجب میشه.',
              ingredients: ['اسپرسو کامرشیال', 'بستنی وانیلی'],
            },
            {
              name: 'پامکین لاته',
              image: 'latte',
              price: 50,
              images: [''],
              desc: 'یک شیر قهوه طعم دار شده با کدو تنبل! یک شیرینی بی نظیر به نوشیدنیتون میده که تا جرئه آخر فقط لذت به همراه داره.',
              ingredients: [
                'اسپرسو کامرشیال',
                'سیروپ کدو تنبل',
                'شیر',
                'فوم شیر',
              ],
            },
            {
              name: 'اسپنیش لاته',
              image: 'latte',
              price: 50,
              images: [''],
              desc: 'شیر عسلی به لته اضافه شد که هم غلیظ ترش کنه هم شیرین. این یعنی خود خود خوشحالی!',
              ingredients: ['اسپرسو کامرشیال', 'شیر عسلی', 'شیر', 'فوم شیر'],
            },
            {
              name: 'مونگو لاته',
              image: 'latte',
              price: 50,
              images: [''],
              desc: 'ترکیب انبه با هرچیزی کلی هیجان به همراه داره. فکر کن عصاره این میوه جذاب چاشنی شیر قهوه شما بشه!',
              ingredients: ['اسپرسو کامرشیال', 'آب انبه', 'شیر', 'فوم شیر'],
            },
            {
              name: 'کوکی لاته',
              image: 'cookie-latte',
              price: 48,
              images: [''],
              desc: 'طرفدارای کوکی خوب دقت کنین! تصور کن داری شیر قهوتو نوش جان میکنی که تیکه های کوکی با کلی طعم جذاب میاد و وارد بازی میشه!',
              ingredients: ['اسپرسو کامرشیال', 'کوکی', 'شیر', 'فوم شیر'],
            },
            {
              name: 'وایت موکا لاته',
              image: 'latte',
              price: 50,
              images: [''],
              desc: 'طعم بی نظیر شکلات سفید، شیرینی و مزه غیر قابل وصفی به شیر قهوتون میده!',
              ingredients: ['اسپرسو کامرشیال', 'وایت چاکلت', 'شیر', 'فوم شیر'],
            },
          ],
          browing: [
            {
              name: 'V60',
              image: 'browing',
              price: '',
              images: [''],
              desc: '',
              isVariable: true,
              variables: [
                {
                  name: 'هند - مالابار',
                  image: 'india-malabar',
                  price: 50,
                  height: '1100/1200 متر از سطح دریا',
                  method: 'شسته',
                  type: 'کاتیمور',
                  mem: ['شکلات تلخ/ بادام/ نیشکر'],
                  addmore: 35,
                },
                {
                  name: 'اتیوپی- لیمو',
                  image: 'ethiopia-lemon',
                  price: 60,
                  height: '1900/2200 متر از سطح دریا',
                  method: 'شسته',
                  type: 'بوربون',
                  mem: ['هلو/ کارامل/ شکر قهوه ای/ گلی'],
                  addmore: 40,
                },
                {
                  name: 'کنگو',
                  image: 'congo',
                  price: 60,
                  height: '1400/2000 متر از سطح دریا',
                  method: 'شسته',
                  type: 'بوربون',
                  mem: ['فلفل سفید/ دارچین/شکر قهوه ای /نارنگی/شکلات'],
                  addmore: 40,
                },
                {
                  name: 'اتیوپی- کوچره',
                  image: 'ethiopia-kochere',
                  price: 60,
                  height: '1700/2200 متر از سطح دریا',
                  method: 'طبیعی',
                  type: 'هیرلیوم',
                  mem: ['یاسمین/ بلوبری/مرکبات/پشن فروت/لیمو'],
                  addmore: 40,
                },
                {
                  name: 'اتیوپی- گوجی',
                  image: 'ethiopia-goji',
                  price: 60,
                  height: '1500/2200 متر از سطح دریا',
                  method: 'طبیعی',
                  type: 'هیرلیوم',
                  mem: ['وانیل/ شلیل/ شکوفه/ زردالو'],
                  addmore: 40,
                },
                {
                  name: 'اتیوپی-سیدامو',
                  image: 'ethiopia-sidamo',
                  price: 60,
                  height: '1700 متر از سطح دریا',
                  method: 'شسته',
                  type: 'هیرلیوم',
                  mem: ['توت فرنگی/ مرکبات/شکوفه پرتقال/شکلات تلخ'],
                  addmore: 40,
                },
                {
                  name: 'ال سالوادور',
                  image: 'elsalvador',
                  price: 60,
                  height: '1200 الی 1500 متر از سطح دریا',
                  method: 'شسته',
                  type: 'کاتورا',
                  mem: ['نارنج/هلو/رزبری/گریپ فروت'],
                  addmore: 40,
                },
                {
                  name: 'بوروندی-نیاگیشیرو',
                  image: 'burundi-niagishiro',
                  price: 60,
                  height: '1900 متر از سطح دریا',
                  method: 'طبیعی',
                  type: 'بوربون قرمز',
                  mem: ['انار/انگور سبز/ آلو سیاه'],
                  addmore: 40,
                },
                {
                  name: 'پاناما- بوکه چیریکی',
                  image: 'panama-bokeh',
                  price: 70,
                  height: '1600 متر',
                  method: 'شسته',
                  type: 'کاتورا',
                  mem: ['پرتقال/شکلات/زردالو/فندوق'],
                  addmore: 45,
                },
                {
                  name: 'اتیوپی-هامبلا',
                  image: 'ethiopia-hambala',
                  price: 70,
                  height: '1900/2200 متر از سطح دریا',
                  method: 'شسته',
                  type: 'خودرو',
                  mem: ['چای ارل گری/لیمو/ شکلات پرتقالی'],
                  addmore: 45,
                },
                {
                  name: 'نیکاراگوئه-نوئوو سگوویا',
                  image: 'nicaragua-nuvo',
                  price: 50,
                  height: '1100/1700 متر از سطح دریا',
                  method: 'شسته',
                  type: 'کاتوآی',
                  mem: ['شکلات/وانیل'],
                  addmore: 35,
                },
                {
                  name: 'برزیل-سانتوس',
                  image: 'brazil-santos',
                  price: 50,
                  height: '900/1200 متر از سطح دریا',
                  method: 'شسته',
                  type: 'کاتوآی',
                  mem: ['آجیل/وانیل/شکلات'],
                  addmore: 35,
                },
              ],
            },
            {
              name: 'کمکس',
              image: 'cascara',
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
                  mem: [],
                },
                {
                  name: 'اروگوئه',
                  image: 'uruguay',
                  price: 60,
                  height: '۲۰۰۰ متر',
                  method: 'روش فرآوری',
                  type: 'گونه',
                  mem: [],
                },
              ],
            },
            {
              name: 'Gem',
              image: 'browing',
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
                  mem: [],
                },
                {
                  name: 'اروگوئه',
                  price: 60,
                  height: '۲۰۰۰ متر',
                  method: 'روش فرآوری',
                  type: 'گونه',
                  mem: [],
                },
              ],
            },
            {
              name: 'کالیتا',
              image: 'cascara',
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
                  mem: [],
                },
                {
                  name: 'اروگوئه',
                  price: 60,
                  height: '۲۰۰۰ متر',
                  method: 'روش فرآوری',
                  type: 'گونه',
                  mem: [],
                },
              ],
            },
            {
              name: 'کلور',
              image: 'browing',
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
                  mem: [],
                },
                {
                  name: 'اروگوئه',
                  price: 60,
                  height: '۲۰۰۰ متر',
                  method: 'روش فرآوری',
                  type: 'گونه',
                  mem: [],
                },
              ],
            },
            {
              name: 'فرنچ پرس',
              image: 'cascara',
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
                  mem: [],
                },
                {
                  name: 'اروگوئه',
                  price: 60,
                  height: '۲۰۰۰ متر',
                  method: 'روش فرآوری',
                  type: 'گونه',
                  mem: [],
                },
              ],
            },
            {
              name: 'سایفون',
              image: 'browing',
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
                  mem: [],
                },
                {
                  name: 'اروگوئه',
                  price: 60,
                  height: '۲۰۰۰ متر',
                  method: 'روش فرآوری',
                  type: 'گونه',
                  mem: [],
                },
              ],
            },
            {
              name: 'ائروپرس',
              image: 'cascara',
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
                  mem: [],
                },
                {
                  name: 'اروگوئه',
                  price: 60,
                  height: '۲۰۰۰ متر',
                  method: 'روش فرآوری',
                  type: 'گونه',
                  mem: [],
                },
              ],
            },
            {
              name: 'فیلترکافی',
              image: 'browing',
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
                  mem: [],
                },
                {
                  name: 'اروگوئه',
                  price: 60,
                  height: '۲۰۰۰ متر',
                  method: 'روش فرآوری',
                  type: 'گونه',
                  mem: [],
                },
              ],
            },
            {
              name: 'قهوه ترک',
              image: 'turkish-coffee',
              price: 35,
              images: [''],
              desc: 'دانه های آسیاب شده قهوه که تنها وظیفشون هدیه دادن عطر و طعم کلاسیک قهوه است توی قهوه ترک این کار رو تا فنجان شما انجام میدن! پس مواظب باش لرد قهوه رو نخوری !',
              ingredients: ['متد ایبریک'],
            },
            {
              name: 'قهوه یونانی',
              image: 'greek-coffee',
              price: 42,
              images: [''],
              desc: 'اگر ترجیح میدی چند قاشق اول از نوشیدنیت ترکیب قهوه و کف شیر باشه هیچ چیزی نباید فاصله ای بین تو و یونینی بندازه.',
              ingredients: ['قهوه ترک', 'شیر', 'فوم شیر'],
            },
            {
              name: 'کلدبرو',
              image: 'cold-brew',
              price: 65,
              images: [''],
              desc: 'وقتی قهوه آسیاب شده مدت زمان طولانی ای با آب در تماس باشه (حدود 12 ساعت)، قهوه عصاره گیری شده بسیار خوش طعم و عطر میشه و دارای کافئین بالایی هم هست. از طرفی اسیدیته کمتری هم داره بنابراین برای دوستانی که معده حساسی دارن پیشنهاد میکنیم.',
              ingredients: ['قهوه ی سرد دم'],
            },
            {
              name: 'کاسکارا',
              image: 'cascara',
              price: 60,
              images: [''],
              desc: 'دمنوش گیلاس قهوه یک نوشیدنی گرم با طعم ملایم میوه قهوه است که کمی شیرینی داره و حاوی مقدار کمی کافئین هم هست.',
              ingredients: ['دمنوش گیلاس قهوه'],
            },
          ],
          chocolate: [
            {
              name: 'پرمیوم چاکلت',
              image: 'premium-chocolate',
              price: 58,
              images: [''],
              desc: 'اگر نوشیدنی گرم بر پایه شکلات دوست داری، شک به دلت راه نده، فک کن تیکه های کیت کت و گردو تو یک نوشیدنی  غلیظ شکلاتی چه حس و حالی رو برات میسازه!',
              etc: {
                cafein: '',
              },
              ingredients: ['هات چاکلت', 'گردو', 'کیت کت', 'بستنی شکالتی'],
            },
            {
              name: 'فروت چاکلت',
              image: 'fruit-chocolate',
              price: '50',
              images: [''],
              desc: 'ترکیب هات چاکلت با موز یک طعم خاص و غلیظ و شیرین می سازه. از دستش نده!',
              ingredients: ['هات چاکلت', 'موز'],
            },
            {
              name: 'آمریکن استایل',
              image: 'american-style',
              price: 52,
              images: [''],
              desc: 'تیکه های بادام زمینی و چربی خامه که با هات چاکلت همراه میشه تجربه نوشیدن شکلاتی خاص رو بهت هدیه میده.',
              ingredients: ['هات چاکلت', 'بادام زمینی', 'خامه'],
            },
            {
              name: 'ویسکوزی چاکلت',
              image: 'viscose-chocolate',
              price: 52,
              images: [''],
              desc: 'اگر نوشیدنی غلیظ رو دوس داری این آیتم جز بهترین انتخاب هاست. طعم بیسکوئیت و موز وقتی چاشنی شکلات سفید شه نه حرف داره و نه حریف.',
              ingredients: ['وایت چاکلت', 'بیسکوئیت', 'موز'],
            },
            {
              name: 'شیر نوتلا',
              image: 'nutella-milk',
              price: 55,
              images: [''],
              desc: 'این برای طرفدارای نوتلا ساخته شده، 250 سی سی شیر داغ که نوتلا توش حل میشه.',
              ingredients: ['نوتال', 'شیر', 'فوم شیر'],
            },
            {
              name: 'هات چاکلت',
              image: 'hot-chocolate',
              price: 40,
              images: [''],
              desc: 'کسی که شکلات دوس داره سرما و گرمای هوا براش فرقی نمیکنه! این هات چاکلت همیشه پیش ما بده و هست و خواهد بود.',
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
              image: 'white-chocolate',
              price: 40,
              images: [''],
              desc: 'ترکیب شکلات سفید با شیر یک نوشیدنی بسیار خوش عطر و طعو و شیرین رو به ارمغان میاره. از انتخابت لذت ببر!',
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
              image: 'dark-chocolate',
              price: 45,
              images: [''],
              desc: 'یک نوشیدنی شکلاتی غلیظ برای عاشقان شکلات.',
              ingredients: ['هات چاکلت غلیظ'],
            },
          ],
          hotbar: [
            {
              name: 'سلب',
              image: 'celeb',
              price: 44,
              images: [''],
              desc: 'یک نوشیدنی غلیظ ترکی که طعم ثعلب و دارچینش باعث شده با ذائقه ما ایرانی ها جور در بیاد. از طرفی وانیل و گوارگام(از گیاه گوار استخراج میشه و در ترکیب با مایعات غلظت رو به همراه داره) عطر و طعم خوبی بهش داده.',
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
              image: 'masala',
              price: 40,
              images: [''],
              desc: 'این نوشیدنی حسابی جاشو تو منوی کافه ها باز کرده. طعم شیرین و طبع گرم اون با عطر و بوی خوبی که داری باعث میشه از بودنش تا لحظه اخر لذت ببرین.',
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
              image: 'latte-tea',
              price: 38,
              images: [''],
              desc: 'ترکیب شیر گرم و کف شیر با چای سیاه دمی یک طعم بی نظیر کلاسیک رو داره که البته با اضافه شدن کمی شربت دارچین عطر و بوی خیلی خوبی هم به همراه داره!',
              ingredients: ['چای سیاه دمی', 'سیروپ دارچین', 'شیر', 'فوم شیر'],
            },
            {
              name: 'شیر عسل دارچین',
              image: 'milk-honey-cinnamon',
              price: 40,
              images: [''],
              desc: 'یک نوشیدنی عجین شده با فرهنگ ایرانی با عطر و طعم و بافت شیرین و جذاب که تو هر ساعت و هر حالتی نه گفتن رو سخت میکنه.',
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
              image: 'queen-berry',
              price: 62,
              images: [''],
              desc: 'یک دمنوش طبیعی که وصفش واقعا کار سختیه بسیار بسیار خوش عطر و طعمش هم که ترکیب میوه های قرمز رنگه ، زرشک و چای ترش هم که کلی به جذابیت داستان اضافه کرده.',
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
              image: 'victoria-sunset',
              price: 50,
              images: [''],
              desc: 'این دمنوش بر هر درد بی درمان دواست! خوش عطر و طعم وسراسر حس تازگی و شادابی!',
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
              image: 'golden-vanilla',
              price: 48,
              images: [''],
              desc: 'این دمنوش سریع ترین راه برای بردن ما به خاطره ها و خونه مامان بزرگامونه، طعم میخک و سیب، عطر وانیل و شیرین بیان حرفی برای گفتن نمیزاره بمونه!',
              ingredients: ['سیب', 'میخک', 'وانیل', 'شیرین بیان'],
            },
            {
              name: 'مولن رژ',
              image: 'molen-rozh',
              price: 48,
              images: [''],
              desc: 'بسیار خوش رنگ، پیچیدگی طعمی بین ترش و شیرین همراه با عطر خوش زندگی.',
              ingredients: ['لبو', 'به', 'چای ترش'],
            },
            {
              name: 'سیب دارچین',
              image: 'cinnamon-apple',
              price: 46,
              images: [''],
              desc: 'عطر سیب و دارچین توی فنجون از ادکلن هم جذاب تره، پر از خاصیت و انرژی همراه با عطری غیر قابل وصف.',
              ingredients: ['سیب', 'سیروپ دارچین', 'چوب دارچین'],
            },
            {
              name: 'سیب زعفران',
              image: 'saffron-apple',
              price: 48,
              images: [''],
              desc: 'یک دمنوش پر از انرژی که با زعفرون و گل محمدی لبخند رو بهتون هدیه میده! هم خوش طعم و عطر و هم شادی آور، چیز دیگه ای هم لازم داره ؟!',
              ingredients: ['سیب', 'زعفران', 'گل محمدی'],
            },
            {
              name: 'کهربا',
              image: 'amber',
              price: 50,
              images: [''],
              desc: 'یکی از خاص ترین دمنوش ها چراکه عطر و طعم پیچیده داره. از رنگ ظاهر تا عطر و طعم هیچی براتون کم نمیزاره. البته باید عاشق طعم ترش باشی تا درک کنی چی دارم بهت میگم.',
              ingredients: ['چای ترش', 'آب آلبالو', 'دارچین دودی'],
            },
            {
              name: 'دمنوش فردا',
              image: 'farda-herbal',
              price: 45,
              images: [''],
              desc: 'توی این دمنوش شما حق انتخاب داری! این یعنی میتونی بین گیاهان دارویی مثل گل گاو زبان و چای سبز و ... بهمون بگی چی هوس کردی.',
              ingredients: [' برگ گیاهان طبیعی)محتواش رو خودت بگو('],
            },
          ],
          tea: [
            {
              name: 'چای سیاه معطر',
              image: 'aromatic-black-tea',
              price: 30,
              images: [''],
              desc: ' ترکیب چای سیاه ساده و معطر دم شده که تو هر حالتی روح رو تازه میکنه. ',
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
              image: 'dashti-tea',
              price: 40,
              images: [''],
              desc: 'به برگ های بالایی چای که نور و آفتاب بیشتری جذب میکنن، چای سرگل میگن. سراسر عطر و طعم دلنشین چای با گسی ملموس و خاص!',
              ingredients: [
                'چای بهاره دستچین لاهیجان',
                'سرو به همراه مربا بالنگ',
              ],
            },
            {
              name: 'چای راگا',
              image: 'raga-tea',
              price: '',
              images: [''],
              desc: 'این چای دارای گسی متوسط و تلخی کم است. نوشیدن این چای شیرینی و گسی مشابه خرما خارک را برای شما تداعی میکنه! از خواص این چای میشه به آرام بخس بودن و نشاط آور بودن هم اشاره کرد.',
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
              image: 'americano-ice',
              price: 37,
              images: [''],
              desc: '',
              ingredients: ['اسپرسو کامرشیال', 'آب', 'یخ'],
            },
            {
              name: 'آیس لاته',
              image: 'latte-ice',
              price: 46,
              images: [''],
              desc: '',
              ingredients: ['اسپرسو کامرشیال', 'شیر', 'یخ'],
            },
            {
              name: 'آیس کافی',
              image: 'coffee-ice',
              price: 48,
              images: [''],
              desc: '',
              ingredients: ['سپرسو کامرشیال', 'شیر', 'سیروپ کارامل', 'یخ'],
            },
            {
              name: 'ساور چری تونیک',
              image: 'sour-cherry-tonic',
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
              image: 'mango-tonic',
              price: 52,
              images: [''],
              desc: '',
              ingredients: ['اسپرسو کامرشیال', 'آب انبه', 'یخ'],
            },
            {
              name: 'هایپرسو',
              image: 'hype-espresso',
              price: 52,
              images: [''],
              desc: '',
              ingredients: ['اسپرسو کامرشیال', 'هایپ', 'یخ'],
            },
            {
              name: 'بلک آیس',
              image: 'black-ice',
              price: 48,
              images: [''],
              desc: '',
              ingredients: ['اسپرسو کامرشیال', 'کوکاکولا', 'یخ'],
            },
          ],
          nectar: [
            {
              name: 'زعفران',
              image: 'saffron-nectar',
              price: 46,
              images: [''],
              desc: 'یک نوشیدنی شیرین همراه با عطر و طعم زعفران و رز که کلی به شما انرژی میده و تقویت کننده حافظه و قلبتونه!',
              ingredients: ['زعفران', 'لیمو', 'عصاره رز'],
            },
            {
              name: 'نشاط',
              image: 'joy-nectar',
              price: 50,
              images: [''],
              desc: 'یکی از خوش طعم ترین و پر خاصیت ترین نوشیدنی های فردا! جوری که اگر ساختمون بود اسمش بیمارستان میشد! فک کن داری از نشتن تو کافه لذت میبری که همزمان کم خونی ازت دور میشه، پوستت زیباتر میشه و با دیابت قهر میکنی کلی به قلبت کمک میکنی.',
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
              image: 'khakshir',
              price: 42,
              images: [''],
              desc: 'سریع ترین راه برای فرار ازگرمای تابستون نوشیدن خاک شیر! طعم نوستالژی گلاب و عرق بیدمشک بازی رو برات جذاب تر هم میکنه.',
              ingredients: ['عرق بیدمشک', 'گلاب', 'خاکشیر'],
            },
            {
              name: 'خیار سکنجبین',
              image: 'khiar-sekanjebin',
              price: 44,
              images: [''],
              desc: 'خیار سکنجبین علاوه بر ظاهر جذاب و خواص مهمی مثل رفع عطش و تب هم داره، یک نوشیدنی ئر از فیبر به حساب میاد که خودش به دنیا می ارزه.',
              ingredients: ['خیار', 'شربت سکنجبین'],
            },
          ],
          smoothie: [
            {
              name: 'تروپیکال اسموتی',
              image: 'tropical-smoothie',
              price: 70,
              images: [''],
              desc: '',
              ingredients: ['موز', 'آناناس', 'انبه'],
            },
            {
              name: 'رد اسموتی',
              image: 'red-smoothie',
              price: 65,
              images: [''],
              desc: '',
              ingredients: ['موز', 'توت فرنگی', 'شاهتوت', 'آلبالو'],
            },
            {
              name: 'سوییت اسموتی',
              image: 'sweet-smoothie',
              price: 60,
              images: [''],
              desc: '',
              ingredients: ['موز', 'هلو', 'آلوئه ورا', 'سیب'],
            },
          ],
          mocktail: [
            {
              name: 'لیموناد',
              image: 'lemonade-mocktail',
              price: 44,
              images: [''],
              desc: 'یک نوشیدنی بسیار خنک که عطر و طعم لیمو بهش بهش جذابیت خاصی داده، طعمش نه خیل ترش نه خیلی شیرین، برای تابستون ساخته شده و نقش کولر رو داره!',
              ingredients: [' لیمو ترش', 'سیروپ لیمو', 'سودا'],
            },
            {
              name: 'موهیتو',
              image: 'mohito-mocktail',
              price: 46,
              images: [''],
              desc: 'رقص برگ های تازه نعنا فلفلی بین لیمو و یخ سراسر حس تازگی و خنکی رو هدیه میده! این نوشیدنی جذاب وپر طرفدارو تحت هیچ عنوان از دست نده.',
              ingredients: ['نعنا یخی', 'لیمو ترش', 'سیروپ نعنا', 'سودا'],
            },
            {
              name: 'بلواسکای',
              image: 'blue-sky-mocktail',
              price: 46,
              images: [''],
              desc: 'یک نوشیدنی بسیار خوش رنگ که رنگ خودش رو از شربت بلوکاراسائو گرفته، در واقع عصاره پوست پرتقالی که طی یک فراوری شیمیایی به رنگ آبی در میاد. حالا ترکیب این عصاره با لیمو ترش حرفایی واسه گفتن داره!',
              ingredients: ['سیروپ بلو کارسائو', 'لیمو ترش', 'سودا'],
            },
            {
              name: 'مارون',
              image: 'maroon-mocktail',
              price: 55,
              images: [''],
              desc: 'یک نوشیدنی پر از میوه های میکس شده که بافت جذاب و طعم شیرینش نه گفتن رو برای هممون سخت میکنه!',
              ingredients: ['هلو', 'آلوئه ورا', 'توت فرنگی'],
            },
            {
              name: 'رابی',
              image: 'robbie-mocktail',
              price: 58,
              images: [''],
              desc: 'فکر کن داری از ترکیب خوش رنگ و طعم شاتوت و هندونه لذت میبری که این وسط نعنا میاد و کلی طراوت و شادابیه داستان و بیشتر میکنه.',
              ingredients: ['هندوانه', 'شاهتوت', 'نعنا'],
            },
            {
              name: 'هاوایی',
              image: 'hawaiian-mocktail',
              price: 60,
              images: [''],
              desc: 'مقرون به صرفه ترین حالت برای رسیدن به هاوایی! میوه های استوایی با طعم شیرین و طبع گرمشون حس یک سفر به دنیای هاوایی در سریع ترین زمان ممکن به شما میده!',
              ingredients: ['آناناس', 'انبه', 'پرتقال'],
            },
            {
              name: 'پینک',
              image: 'pink-mocktail',
              price: 65,
              images: [''],
              desc: 'اگر شیرین بودن نوشیدنی و از طرفی حس طراوت و تازگی  و خاصیت میوه براتون مهمه چه چیزی میتونه جلوتونو بگیره که بهش نرسین؟!',
              ingredients: ['موز', 'شاهتوت', 'انبه', 'آلوئه ورا'],
            },
            {
              name: 'فراستی',
              image: 'frasti-limo-khiar',
              price: 50,
              images: [''],
              desc: 'یک نوشیدنی با طعم عجیب، خیلی خنک و تازه است و حس طراوت و شادابی رو از همون نگاه اول میتونین حس کنین!',
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
              image: 'red-light-mocktail',
              price: 50,
              images: [''],
              desc: 'ترکیب هندوانه با بستنی وانیلی یک طعم شیرین و دلچسب بی نظیر رو بهتون میرسونه! برای گرمای تابستون آیتم جذابیه!',
              ingredients: ['هندوانه', 'بستنی'],
            },
            {
              name: 'آبمیوه طبیعی',
              image: 'natural-mocktail',
              price: 45,
              images: [''],
              desc: 'ساده ترین حالت سالم زندگی کردن، هم لذت بخش هم جذاب به همراه کلی خاصیت و ویتامین!',
              ingredients: ['آبمیوه طبیعی'],
            },
          ],
          shake: [
            {
              name: 'کلاسیک (وانیل / شکلات)',
              image: 'shake-classic-chocolate',
              price: 50,
              images: [''],
              desc: 'چه شیک وانیل رو انتخاب کنی چه شیک شکلاتی کلی بستنی میکس شده با شیر داری که حسابی بهت میچسبه!',
              ingredients: ['بستنی شکالتی یا وانیلی', 'شیر'],
            },
            {
              name: 'نوتلا',
              image: 'shake-nutella',
              price: 68,
              images: [''],
              desc: 'ترکیب بستنی وانیل و نوتلا خیلی دوس داشتنی میشه! هم طعم شکلاتی و هم طعم فندوقی و هم طعم وانیلی رو داری!',
              ingredients: ['بستنی وانیلی', 'نوتلا', 'شیر'],
            },
            {
              name: 'کیت کت',
              image: 'shake-kitkat',
              price: 68,
              images: [''],
              desc: 'تیکه های کیت کت رو وقتی توی بستنی وانیلی داشته باشی تازه متوجه میشی خفن یعنی چی!',
              ingredients: ['بستنی وانیلی', 'کیت کت', 'شیر'],
            },
            {
              name: 'اسپرسو',
              image: 'shake-espresso',
              price: 60,
              images: [''],
              desc: 'رگه تلخی اسپرسو وقتی با شیرینی بستنی وانیلی همراه شه یک طعم فوق العاده رو تشکیل میده!',
              ingredients: ['بستنی وانیلی', 'اسپرسو', 'شیر'],
            },
            {
              name: 'بادام زمینی',
              image: 'shake-badamzamini',
              price: 62,
              images: [''],
              desc: 'ترکیب کره بادام زمینی و بستنی وانیل به همراه تکه های بادام زمینی یک طعم بینظیر و حس خوب رو بهتون میده!',
              ingredients: [
                'بستنی وانیلی',
                'کره بادام زمینی',
                'بادام زمینی',
                'شیر',
              ],
            },
            {
              name: 'موز گردو',
              image: 'shake-moz-gerdo',
              price: 70,
              images: [''],
              desc: 'موز و گردوی میکس شده تو بستنی وانیل یک بافت غلیظ و جذاب خوش طعم داره که تا قطره آخرش رو با لذت نوش جان میکنی.',
              ingredients: ['بستنی وانیلی', 'موز', 'گردو', 'شیر'],
            },
            {
              name: 'ارئو توت فرنگی',
              image: 'shake-oreo-totfarangi',
              price: 65,
              images: [''],
              desc: 'بیسکوئیت معروف اورئو یک تنه کلی حرف برای گفتن داره وقتی توت فرنگی عزیز و بستنی وانیل باهاش باشن که دیگه هیچی جلودارشون نیست.',
              ingredients: [
                'بستنی وانیلی',
                'بیسکوییت اورئو',
                'توت فرنگی',
                'شیر',
              ],
            },
            {
              name: 'کارامل نسکافه',
              image: 'shake-caramel-nescafee',
              price: 60,
              images: [''],
              desc: 'طعم شیرین کارامل و تلخی نسکافه وقتی کنار بستنی وانیل میاد کلا داستان پر هیجان و ضد و نقیض میشه.',
              ingredients: ['بستنی وانیلی', 'نسکافه', 'سیروپ کارامل'],
            },
            {
              name: 'کوکی',
              image: 'shake-cookie',
              price: 60,
              images: [''],
              desc: 'تکه های کوکی با بستنی وانیل پکیج خوشحالی و حس خوبن!',
              ingredients: ['بستنی وانیلی', 'کوکی', 'شیر'],
            },
          ],
        },
        cake: {
          cakes: [
            {
              name: 'کافه فردا یه بیکری هم داره!\nبنابراین هر روز اینجا کیک‌های تازه،جذاب و متنوعی پخته و سرو می‌شه.\n پس حتماً به ویترین کیک کافه سر بزنید یا از ما سوال بپرسید.\nدر ضمن یک لیوان چای سیاه هم کنار کیک‌تون مهمون ما هستید!\n(البته اگر در زمان سفارش بهمون بگید)',
              image: 'cake-1',
              price: 'از ۲۵',
            },
          ],
        },
        breakfast: {
        sandwiches: [
          {
            name: 'سوییت میل',
            image: 'sweet-meal',
            price: 44,
            images: [''],
            desc: '',
            ingredients: ['نان تست', 'شکلات فندقی', 'موز', 'توت فرنگی'],
          },
          {
            name: 'پارادوکس',
            image: 'paradox',
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
            image: 'fresh-toast',
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
            image: 'raspberry-and-granul-sandwich',
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
            image: 'super-jambon-sandwich',
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
            image: 'turkey-avocado-sandwich',
            price: 55,
            images: [''],
            desc: '',
            ingredients: ['نان تست', 'بیکن بوقلمون', 'پرک بادام', 'سس آووکادو'],
          },
          {
            name: 'استیک مرغ و سس پستو',
            image: 'chicken-steak-sandwich',
            price: 55,
            images: [''],
            desc: '',
            ingredients: ['نان تست', 'استیک مرغ', 'سس پستو', 'بادام زمینی'],
          },
          {
            name: 'پپرونی و پنیر',
            image: 'pepperoni-and-cheese-sandwich',
            price: 50,
            images: [''],
            desc: '',
            ingredients: ['نان تست', 'پپرونی', 'پنیرلبنه', 'ذرت', 'گودا'],
          },
        ]}
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
    imgError(item) {
      console.log(item);
    }
  },
}
</script>
<style></style>

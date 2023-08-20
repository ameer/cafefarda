import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  pageTransition: 'page-transition',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - کافه فردا',
    title: 'کافه فردا',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/main.css', '~/assets/farda-cafe-fonticon.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxtjs/google-analytics'
  ],
  googleAnalytics: {
    id: process.env.GOOGLE_ANALYTICS_ID // Use as fallback if no runtime config is provided
  },
  publicRuntimeConfig: {
    googleAnalytics: {
      id: process.env.GOOGLE_ANALYTICS_ID
    },
    gtm: {
      id: process.env.GOOGLE_TAG_MANAGER_ID
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/i18n',
    '@nuxtjs/gtm'
  ],
  gtm: {
    id: 'GTM-KN2BKP3' // Used as fallback if no runtime config is provided
  },
  auth: {
    strategies: {
      laravelSanctum: {
        provider: 'laravel/sanctum',
        url: process.env.baseUrl || '//api.fardacafe.ir'
      }
    },
    redirect: {
      login: '/auth/login',
      logout: '/logout',
      callback: '/login',
      home: '/'
    }
  },
  i18n: {
    locales: [
      {
        dir: 'rtl',
        lang: 'fa-IR',
        code: 'fa',
        name: 'فا',
        file: 'fa-IR.js'
      },
      {
        dir: 'ltr',
        lang: 'en-US',
        code: 'en',
        name: 'EN',
        file: 'en-US.js'
      }
    ],
    defaultLocale: 'fa',
    lazy: true,
    detectBrowserLanguage: false,
    langDir: 'lang/',
    vueI18n: {
      fallbackLocale: 'fa'
    }
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.baseUrl || '//fardacafe.ir',
    withCredentials: true
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'fa'
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    rtl: true,
    defaultAssets: {
      font: false,
      icons: false
    },
    theme: {
      dark: false,
      themes: {
        light: {
          cGreen: '#00522e',
          fardaGreen: '#386864',
          spanishGrey: '#949291'
        },
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['@nuxtjs/auth-next', 'vuetify']
  }
}

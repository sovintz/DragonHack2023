import colors from 'vuetify/es5/util/colors'
import sl from './localization/sl.json'
import en from './localization/en.json'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  // target: 'static',

  // Router base for GitHub Pages
  router: {
    base: '/',
    trailingSlash: true
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - sovinc.com',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover'},
      // {name: 'format-detection', content: 'telephone=no'},
      {name: 'theme-color', content: '#1565c0'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: '~/plugins/vue-gtag',}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    [
      '@nuxtjs/i18n',
      {
        baseUrl: 'https://sovinc.com',
        locales: [
          {
            code: 'sl',
            iso: 'sl-SI',
            name: 'Slovenščina',
            file: 'sl.json'
          },
          {
            code: 'en',
            iso: 'en',
            name: 'English',
            file: 'en.json'
          }
        ],
        lazy: true,
        langDir: "localization/",
        defaultLocale: 'en',
        detectBrowserLanguage: {
          alwaysRedirect: false,
          fallbackLocale: 'en',
          redirectOn: 'root',
          useCookie: false,
        },
        strategy: 'prefix',
        vueI18n: {
          fallbackLocale: 'en',
          silentTranslationWarn: process.env.NODE_ENV === 'production',
          messages: {
            sl,
            en
          }
        }
      }
    ],
    [
      '@nuxtjs/recaptcha',
      {
        siteKey: "6LckRXAcAAAAAJZBXZHcVVUoGSS7Nnc-KGBJkKt4",
        version: 3
      }
    ],
    [
      '@nuxtjs/axios'
    ]
  ],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    theme: {
      dark: false,
      themes: {
        light: {
          primary: colors.blue.darken3,
          accent: colors.pink.darken2,
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
    // TODO: a to kaj dela
    publicPath: '/assets/',
  },

}

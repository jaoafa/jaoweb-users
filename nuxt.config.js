import { execSync } from 'child_process'

const shortHash = execSync('git rev-parse --short HEAD').toString()

export default {
  telemetry: false,
  srcDir: 'src/',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'jMS Users',
    meta: [
      {
        charset: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        name: 'msapplication-TileColor',
        content: '#ffb41d',
      },
      {
        name: 'msapplication-config',
        content: '/favicons/browserconfig.xml',
      },
      {
        name: 'theme-color',
        content: '#ffb41d',
      },
      {
        hid: 'description',
        name: 'description',
        content: 'jao Minecraft Server Users Site',
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'jMS Users',
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'article',
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://users.jaoafa.com',
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'jMS Users',
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'jao Minecraft Server Users Site',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://users.jaoafa.com/icon.png',
      },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        hid: 'twitter:site',
        name: 'twitter:site',
        content: '@jaoafa',
      },
    ],
    link: [
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/favicons/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicons/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicons/favicon-16x16.png',
      },
      {
        rel: 'mask-icon',
        href: '/favicons/safari-pinned-tab.svg',
        color: '#ffb41d',
      },
      {
        rel: 'shortcut icon',
        type: 'image/x-icon',
        href: '/favicons/favicon.ico',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['ress', '@mdi/font/css/materialdesignicons.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/axios-accessor'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    '@nuxtjs/recaptcha',
  ],

  styleResources: {},

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'ja',
    },
    workbox: {
      cacheNames: {
        suffix: shortHash,
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // SSR無効
  ssr: false,

  recaptcha: {
    siteKey: '6Lfx01oaAAAAAEpbNZxACNq6O1S722415hpcDDF8',
    version: 3,
    hideBadge: true,
  },

  env: {
    ShortHash: shortHash,
  },
}

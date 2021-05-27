import { execSync } from 'child_process'

const shortHash = execSync('git rev-parse --short HEAD').toString()
const tag = execSync('git describe --tags --abbrev=0').toString().trim()

export default {
  telemetry: false,
  srcDir: 'src/',

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
        id: 'favicon-ico',
      },
    ],
  },

  css: ['ress', '@mdi/font/css/materialdesignicons.css'],

  plugins: ['~/plugins/axios-accessor'],

  components: true,

  buildModules: ['@nuxt/typescript-build', '@nuxtjs/stylelint-module'],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',
    '@nuxtjs/recaptcha',
  ],

  styleResources: {},

  axios: {},

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

  build: {
    extend(config) {
      config.node = {
        fs: 'empty',
      }
    },
  },

  ssr: false,

  recaptcha: {
    siteKey: '6Lfx01oaAAAAAEpbNZxACNq6O1S722415hpcDDF8',
    version: 3,
    hideBadge: true,
  },

  env: {
    ShortHash: shortHash,
    Tag: tag,
  },
}

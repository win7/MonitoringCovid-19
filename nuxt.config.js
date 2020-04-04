
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/img/virus.png' },
      { rel: "stylesheet", type: "text/css", href: "https://unpkg.com/leaflet@1.5.1/dist/leaflet.css", integrity: "sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ==", crossorigin: "" },
    ],
    script: [
      // External JS
      { src: "https://unpkg.com/leaflet@1.5.1/dist/leaflet.js", integrity: "sha512-GffPMF3RvMeYyc1LWMHtK8EbPv0iNZ8/oTtHPx9/cc2ILxQ+u905qIwdpULaqDkyBKgOaB57QTMg7ztg8Jm2Og==", crossorigin: "" },
      // /External Js

      { src: "/vendors/@coreui/coreui/js/coreui.bundle.min.js" },
      { src: "/vendors/@coreui/icons/js/svgxuse.min.js" },
      { src: "/vendors/@coreui/chartjs/js/coreui-chartjs.bundle.js" },
      { src: "/vendors/@coreui/utils/js/coreui-utils.js" },
      // { src: "/js/main.js" },
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    "@/static/css/style.css",
    "@/static/vendors/@coreui/chartjs/css/coreui-chartjs.css",
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: "https://covid19.mathdro.id/api",
    progress: false,
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}

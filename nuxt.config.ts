// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },

  app: {
    head: {
      charset: "UTF-8",
      viewport: "width=device-width, initial-scale=1",
      bodyAttrs: {
        class: 'small-navigation',
      },
      link: [
        { rel: "icon",type:'image/x-icon', href: "/favicon.ico" },
        { rel: "stylesheet", href: "/vendors/bundle.css" },
        { rel: "stylesheet", href: "/files/css/app.css" },
        { rel: "stylesheet", href: "/vendors/datepicker-jalali/bootstrap-datepicker.min.css" },
        { rel: "stylesheet", href: "/vendors/datepicker/daterangepicker.css" },
        { rel: "stylesheet", href: "/vendors/select2/css/select2.min.css"},
      ],
      script: [
        {
          src: "/vendors/bundle.js",
        },
        {
          src: "/files/js/examples/dashboard.js",
        },
        {
          src: "/files/js/app.js",
        },
        {
          src: "/vendors/charts/chartjs/chart.min.js",
        },
        {
          src: "/vendors/circle-progress/circle-progress.min.js",
        },
        {
          src: "/vendors/dataTable/jquery.dataTables.min.js",
        },
        {
          src: "/vendors/dataTable/dataTables.bootstrap4.min.js",
        },
        {
          src: "/vendors/dataTable/dataTables.responsive.min.js",
        },
        {
          src: "/files/js/examples/datatable.js",
        },
        {
          src: "/vendors/lightbox/jquery.magnific-popup.min.js",
        },
        {
          src: "/files/js/examples/lightbox.js",
        },
        {
          src: "/vendors/ckeditor/ckeditor.js",
        },
        {
          src: "/files/js/examples/ckeditor.js",
        },
        {
          src: "/vendors/datepicker-jalali/bootstrap-datepicker.min.js",
        },
        {
          src: "/vendors/datepicker-jalali/bootstrap-datepicker.fa.min.js",
        },
        {
          src: "/vendors/datepicker/daterangepicker.js",
        },
        {
          src: "/vendors/select2/js/select2.min.js",
        }
      ],
    },
  },

  // runtimeConfig:{
  //   public:{
  //     ticketingUrl:"http://172.16.11.131:5255",
  //     ssoUrl:"http://172.16.11.131:7004",
  //     loginUrl:"http://172.16.11.131:7062"
  //   }
  // },

  runtimeConfig:{
    public:{
      ticketingUrl:"http://localhost:5255",
      ssoUrl:"https://localhost:7004",
      loginUrl:"https://localhost:7062"
    }
  },
  modules: [
    '@pinia/nuxt',
  ],

  compatibilityDate: "2024-09-23"
});
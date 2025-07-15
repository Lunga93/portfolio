export default defineNuxtConfig({
  css: ['@/assets/css/tailwind.css'],
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
      autoprefixer: {},
    },
  },
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_KEY,
    }
  },
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/supabase',
  ]
})

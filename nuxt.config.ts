// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    modules: ["@nuxt/ui"],
    runtimeConfig: {
        // The private keys which are only available within server-side
        api: "",
    },
});

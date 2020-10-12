import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader version "^2.1.1" ,
Vue.use(Vuetify)

export default ctx => {
    const vuetify = new Vuetify({
        theme: {
            themes: {
                light: {
                    primary: '#C23616',
                    secondary: '#015F75',
                    success: '#19751F',
                    accent: '#0C9FC2',
                    error: '#b71c1c',
                    warning: '#f6b93b',
                    danger: '#c23616',
                    info: '#E8E9ED',
                    block: '#353b48',
                    card: '#FFFFFF'
                }
            }
        }
    })
    ctx.app.vuetify = vuetify
    ctx.$vuetify = vuetify.framework
}
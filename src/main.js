import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';

import Tooltip from 'primevue/tooltip';

createApp(App).directive('tooltip', Tooltip).use(PrimeVue).mount('#app')

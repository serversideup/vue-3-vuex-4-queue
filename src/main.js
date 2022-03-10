import { createApp } from 'vue'
import { createStore } from 'vuex'

import AppLayout from './App.vue'

/**
 * Vuex Queue Set Up
 */
import { queue } from './modules/queue.js';

const store = createStore({
    modules: {
        queue
    }
});

const app = createApp(AppLayout);

app.use(store);
app.mount('#app');
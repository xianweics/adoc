import { createApp } from 'vue';
import App from './App';
import entry from './entry';
const app = createApp(App);
entry(app);
app.mount('#app');

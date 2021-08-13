require('./bootstrap');

require('alpinejs');

import Vue from 'vue';
import MessageArea from "./components/MessageArea.vue";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
import VueChatScroll from 'vue-chat-scroll';

Vue.use(VueChatScroll);
const app = new Vue({
    el: '#app',
    components: { MessageArea },
    data() {
        return {
            message: '',
            messages: []
        }
    },
    methods: {
        send() {
            if (this.message.length) {
                this.messages.push(this.message);
            }
            axios.post('/send', {message: this.message})
                .then(res => {
                    console.log(res);
                })
            this.message = '';
        }
    }
})

require('./bootstrap');

require('alpinejs');

import Vue from 'vue';
import MessageArea from "./components/MessageArea.vue";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Toaster from 'v-toaster'


Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
import VueChatScroll from 'vue-chat-scroll';

Vue.use(VueChatScroll);
// You need a specific loader for CSS files like https://github.com/webpack/css-loader
import 'v-toaster/dist/v-toaster.css'

// optional set default imeout, the default is 10000 (10 seconds).
Vue.use(Toaster, {timeout: 5000})

const app = new Vue({
    el: '#app',
    components: { MessageArea },
    data() {
        return {
            message: '',
            messages: [],
            typing: '',
            userJoined: '',
            userLeaved: '',
            numberOfUsers: 0
        }
    },
    methods: {
        send() {
            if (this.message.length) {
                this.messages.push({message: this.message});
            }
            axios.post('/send', {message: this.message, time: new Date().getHours() + ':' + new Date().getMinutes()})
                .then(res => {
                    console.log(res);
                })
            this.message = '';
        }
    },
    mounted() {
        axios.get('/chats')
            .then(res => {
                res.data.data.forEach(data => {

                    this.messages.push({
                        message: data.message,
                        time: data.created_at,
                        user: data.user
                    })
                })
            })
        Echo.private('chat')
            .listen('ChatEvent', (e) => {
                this.messages.push(e);
            })
            .listenForWhisper('typing', (e) => {
                if (e.name.length) {
                   this.typing = 'typing...'
                } else {
                    this.typing = '';
                }
            });

        Echo.join('chat')
            .here(users => {
                this.numberOfUsers = users.length;
            })
            .joining(user => {
                this.$toaster.success(`${user.name} joined`)
                this.numberOfUsers++;
            })
            .leaving(user => {
                this.$toaster.error(`${user.name} left`)
                this.numberOfUsers--;
            })
    },
    watch: {
        message() {
            Echo.private('chat')
                .whisper('typing', {
                    name: this.message
                })

        }
    }
})

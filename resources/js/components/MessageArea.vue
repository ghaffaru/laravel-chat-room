<template>
    <div class="app" >
        <div>

            <li class="list-group-item" :class="className"><slot></slot></li>
            <small v-if="user.id != authuser.id" style="">{{ user.name }} at {{ time }}</small>
            <small v-else>You at {{ new Date().getHours() + ':' + new Date().getMinutes() }}</small>
            <b-badge variant="primary">Yh</b-badge>
        </div>
    </div>
</template>
<script>
export default {
    name: 'message-area',
    props: [ 'user', 'time', 'authuser'],
    data() {
        return {

        }
    },
    computed: {
        className() {
            if (this.user.id != this.authuser.id) {
                return 'list-group-item-warning';
            }else {
                return 'list-group-item-success';
            }
        },
        badgeClass() {
            return  this.color;
        }
    },
    methods: {

    },
    mounted() {
        console.log(this.authuser)
    }
}
</script>

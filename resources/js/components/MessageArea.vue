<template>
    <div class="app" >
        <div>

            <li class="list-group-item" :class="className"><slot></slot></li>
            <small>You</small>
            <b-badge variant="primary">Yh</b-badge>
        </div>
    </div>
</template>
<script>
export default {
    name: 'message-area',
    props: ['color'],
    data() {
        return {

        }
    },
    computed: {
        className() {
            return 'list-group-item-' + this.color;
        },
        badgeClass() {
            return  this.color;
        }
    },
    mounted() {

    }
}
</script>

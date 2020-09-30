<template>
    <div class="container">
        <vue-header></vue-header>
        <router-view></router-view>
        <vue-footer></vue-footer>
        <right-content />
    </div>
</template>

<script>
import {
    reactive,
    ref,
    computed
} from "vue";
import VueHeader from './components/header'
import VueFooter from './components/footer'
import rightContent from "../components/content/right.vue"

export default {
    name: 'header',
    components: {
        VueHeader,
        VueFooter,
        rightContent
    },
    setup(props) {
        // 
    }
}
</script>

<style lang="less">
.container{
    height: 100vh;
    position: relative;
    &>div:nth-child(2){
        min-height: calc(~"100% - 260px");
        background: #F2F6FC;
        padding: 10px;
    }
}
</style>
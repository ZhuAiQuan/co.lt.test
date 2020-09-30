<template>
    <div class="header">
        <div class="left-logo">
            <img :src="logo" alt="migu">
        </div>
        <div v-for="item in router" :key="item.path" class="router-content">
            <router-link :to="item.path">{{ item.name }}</router-link>
        </div>
    </div>
</template>

<script>
import {
    reactive,
    ref,
    computed
} from "vue";
import { useRouter } from "vue-router";
import logo from '../../assets/images/logo-white.png'

export default {
    name: 'vue-header',
    setup() {
        const route = useRouter();
        const router = reactive(route.getRoutes().filter(item => !item.redirect));
        return {
            router,
            logo
        }
    }
}
</script>

<style lang="less" scope>
.header{
    min-height: 60px;
    background: rgb(0, 21, 41);
    display: flex;
    padding-left: 100px;
    position: relative;
    .router-content{
        padding: 5px 10px;
        line-height: 50px;
        a{
            color: #fff;
        }
        a:hover{
            color: #1890ff;
        }
    }
    .left-logo{
        position: absolute;
        left: 5px;
        top: 50%;
        transform: translate(0, -50%);
    }
}
</style>
<template>
    <!-- app -->
    <div class="layout">
        <el-container class="container"
                      v-if="state.showMenu">
            <el-aside class="aside">
                <div class="head">
                    <img src="./assets/cart.png"
                         alt="logo">
                    <span>乐购后台管理</span>
                </div>
                <div class="line">
                    <el-menu :default-openeds="state.defaultOpen"
                             background-color="#222832"
                             text-color="#fff"
                             :router="true"
                             :default-active='state.currentPath'>
                        <el-submenu index="1">
                            <template #title>
                                <span>Dashboard</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="/introduce"><i class="el-icon-data-line">系统介绍</i></el-menu-item>
                                <el-menu-item index="/dashboard"><i class="el-icon-odometer">Dashboard</i></el-menu-item>
                                <el-menu-item index="/add"><i class="el-icon-plus">添加商品</i></el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-submenu index="2">
                            <template #title>
                                <span>首页配置</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="/swiper"><i class="el-icon-picture">轮播图配置</i></el-menu-item>
                                <el-menu-item index="/hotConfig"><i class="el-icon-star-on">热销商品配置</i></el-menu-item>
                                <el-menu-item index="/new"><i class="el-icon-sell">新品上线配置</i></el-menu-item>
                                <el-menu-item index="/recommend"><i class="el-icon-thumb">为你推荐配置</i></el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-submenu index="3">
                            <template #title>
                                <span>模块管理</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="/category"><i class="el-icon-menu">分类管理</i></el-menu-item>
                                <el-menu-item index="/good"><i class="el-icon-s-goods">商品管理</i></el-menu-item>
                                <el-menu-item index="/guest"><i class="el-icon-user-solid">会员管理</i></el-menu-item>
                                <el-menu-item index="/order"><i class="el-icon-s-order">订单管理</i></el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-submenu index="4">
                            <template #title>
                                <span>系统管理</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="/account"><i class="el-icon-lock">修改密码</i></el-menu-item>
                                <!-- <el-menu-item ><i class="el-icon-lock" />修改密码</el-menu-item> -->
                                <!-- <el-menu-item><i class="el-icon-upload2" />安全退出</el-menu-item> -->
                            </el-menu-item-group>
                        </el-submenu>
                    </el-menu>
                </div>
            </el-aside>
            <el-container class="content">
                <Header />
                <div class="main">
                    <router-view />
                </div>
                <Footer />
            </el-container>
        </el-container>
        <el-container v-else
                      class="container">
            <router-view />
        </el-container>
    </div>
</template>

<script>
// reactive 是 Vue3 中提供的实现数据响应式的方法 必须是对象
import { reactive } from 'vue'
// 需要引进 header与 footer 组件
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { useRouter } from 'vue-router'
import { pathMap,localGet } from '@/utils'
export default {
    name: 'App',
    components: {
        Header,
        Footer
    },
    setup() {
        const noMenu=['/login'];
        const router=useRouter();
        const state=reactive({
            defaultOpen: ['1','2','3','4'],
            showMenu: true,
            currentPath: '/introduce',
            count: {
                number: 1
            }
        });
        // 全局路由拦截
        router.beforeEach((to,from,next) => {
            if(to.path=='/login') {
                // 如果是要登录页，则正常执行
                next();
            } else {
                //如果不是要进login页面，需要判断是否有token
                if(!localGet('token')) {
                    //如果没有，则需要重新调至登录页面
                    next({ path: '/login' });
                } else {
                    //条件符合，可继续执行，进入路由
                    next();
                }
            }
            state.showMenu=!noMenu.includes(to.path);
            state.currentPath=to.path;
            document.title=pathMap[to.name];
        })

        //响应式数据需要return 出去，类似于vue2中的data
        return {
            state
        }
    }
}
</script>

<style scoped>
.layout {
    min-height: 100vh;
    background-color: #fff;
}
.container {
    height: 100vh;
}
.aside {
    width: 200px !important;
    background-color: #222832;
    overflow: hidden;
    overflow-y: auto;
    -ms-overflow-style: none;
    overflow: -moz-scrollbars-none;
}
.aside::-webkit-scrollbar {
    display: none;
}
.head {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
}
.head > div {
    display: flex;
    align-items: center;
}
.head img {
    width: 30px;
    height: 30px;
    margin-right: 10px;
}
.head span {
    font-size: 20px;
    color: #ffffff;
}
.line {
    border-top: 1px solid hsla(0, 0%, 100%, 0.05);
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
.content {
    display: flex;
    flex-direction: column;
    max-height: 100vh;
    overflow: hidden;
}
.main {
    height: calc(100vh - 100px);
    overflow: auto;
    padding: 10px;
}
</style>
<style>
body {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-size: 14px;
}
.el-menu {
    border-right: none !important;
    /* font-size: 16px; */
}
.el-submenu {
    border-top: 1px solid hsla(0, 0%, 100%, 0.05);
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
.el-submenu:first-child {
    border-top: none;
}
.el-submenu [class^="el-icon-"] {
    vertical-align: -1px !important;
}
.el-submenu__title {
    font-size: 16px !important;
}
.el-menu-item.is-active {
    color: #1baeae;
}
a {
    color: #409eff;
    text-decoration: none;
}
.el-pagination {
    text-align: center;
    margin-top: 20px;
}
.el-popper__arrow {
    display: none;
}
</style>

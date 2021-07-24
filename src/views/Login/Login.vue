<template>
    <div class="login-body">
        <div class="login-container">
            <div class="head">
                <img class="logo"
                     src="../../assets/cart.png" />
                <div class="name">
                    <div class="title">乐购商城</div>
                    <div class="tips">Vue3.0 后台管理系统</div>
                </div>
            </div>
            <!-- 表单内容 -->
            <el-form label-position="top"
                     :rules="rules"
                     :model="ruleForm"
                     ref="loginForm"
                     class="login-form">
                <el-form-item label="账号"
                              prop="username">
                    <el-input type="text"
                              v-model.trim="ruleForm.username"
                              autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码"
                              prop="password">
                    <el-input type="password"
                              v-model.trim="ruleForm.password"
                              autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <div style="color: #333">登录表示您已同意<a>《服务条款》</a></div>
                    <el-button style="width: 100%"
                               type="primary"
                               @click="submitForm">立即登录</el-button>
                    <el-checkbox v-model="checked"
                                 @change="!checked">下次自动登录</el-checkbox>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import axios from '@/utils/axios';
import md5 from 'js-md5';
// toRefs()将响应式的对象变为普通对象 再解构，在模板中就可以直接使用属性，不用state.name
import { reactive,ref,toRefs } from 'vue';
import { localSet } from '@/utils';
export default {
    name: 'Login',
    setup() {
        const loginForm=ref(null);
        const state=reactive({
            ruleForm: {
                username: '',
                password: '',
            },
            checked: true,
            rules: {
                username: [
                    {
                        required: 'true',message: '账户不能为空',trigger: 'blur'
                    }
                ],
                password: [
                    { required: 'true',message: '密码不能为空',trigger: 'blur' }
                ]

            }
        });

        // 提交表单
        const submitForm=async () => {
            loginForm.value.validate((valid) => {
                if(valid) {
                    axios.post('/login',{
                        userName: state.ruleForm.username||'',
                        passwordMd5: md5(state.ruleForm.password)
                    }).then(res => {
                        console.log("登录，获取token",res.key)
                        // return;
                        localSet('token',res.key);
                        window.location.href='/';
                    })
                } else {
                    console.log("error submit");
                    return false;
                }
            })
        }

        const resetForm=() => {
            loginForm.value.resetFields();
        }

        return {
            ...toRefs(state),
            loginForm,
            submitForm,
            resetForm
        }

    }
}
</script>

<style scoped>
.login-body {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: #fff;
    background-image: linear-gradient(
        25deg,
        #187772,
        #479e8c,
        #6ec7a7,
        #94f1c3
    );
}
.login-container {
    width: 420px;
    height: 500px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0px 21px 41px 0px rgba(0, 0, 0, 0.2);
}
.head {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 0 20px 0;
}
.head img {
    width: 80px;
    height: 80px;
    margin-right: 20px;
}
.head .title {
    font-size: 28px;
    color: #1baeae;
    font-weight: bold;
}
.head .tips {
    font-size: 12px;
    color: #999;
}
.login-form {
    width: 70%;
    margin: 0 auto;
}
</style>
<style>
.el-form--label-top .el-form-item__label {
    padding: 0;
}
.login-form .el-form-item {
    margin-bottom: 12px;
}
</style>
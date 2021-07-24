import axios from 'axios';
import { ElMessage } from 'element-plus';
import router from '@/router/index';
import { localGet } from './index';
import config from '~/config';

//设置默认 URL
axios.defaults.baseURL = config[import.meta.env.MODE].baseUrl;
// 是否携带 cookie 目前没啥用，使用的是 token 鉴权
axios.defaults.withCreadentials = true;
// 请求头 headers 信息
// 请求头，headers 信息
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';
const tokenKey = localGet('token') || ''
axios.defaults.headers['authorization'] ='Bearer '+tokenKey;
// 默认 post 请求，使用 application/json 形式
axios.defaults.headers.post['Content-Type'] = 'application/json';

// 请求拦截器，内部根据返回值，重新组装，统一管理
axios.interceptors.response.use(res=>{
     console.log("返回类型")
    // if(typeof res.data !== 'object'){
       
    //     ElMessage.error('服务端异常，请稍后重试！');
    //     return Promise.reject(res);
    // }
    // 如果接口返回的状态码不是200
    if(res.data.resultCode != 200){
        // console.log("res",res)
        if(res.data.errMessage){
             ElMessage.error(res.data.errMessage);
        }
        if(res.data.resultCode == 401){
            // 状态码为419 说明登录过期或者未登录
            router.push({path:'/login'});
        }
        return Promise.reject(res.data);
    }
    return res.data.data;
})

export default axios;

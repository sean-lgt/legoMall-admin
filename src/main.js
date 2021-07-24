import { createApp } from 'vue'
import { ElButton, ElContainer, ElAside, ElHeader, ElMain, ElFooter, ElMenu, ElSubmenu, ElMenuItemGroup, ElMenuItem, ElForm, ElFormItem, ElInput, ElPopover, ElTag, ElCard, ElTable, ElTableColumn, ElPagination, ElDialog, ElPopconfirm, ElUpload, ElLoading, ElSelect, ElOption, ElRadioGroup, ElRadio, ElCascader, ElCheckbox, ElInputNumber } from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css';  //引入样式
import App from './App.vue'
import router from './router/index'
import './index.css'



const orderStatus = {
    0:'待支付',
    1:'已支付',
    2:'配货成功',
    3:'出库成功',
    4:'交易成功',
    '-1':'手动关闭',
    '-2':'超时关闭',
    '-3':'商家关闭'
}
const app = createApp(App)
// 全局过滤器 vue3挂载全局属性和方法
// 全局过滤器
app.config.globalProperties.$filters = {
  orderMap(status) {
    return orderStatus[status] || '未知状态'
  },
  prefix(url) {
      if(url && url.startsWith('http://127.0.0.1:4002')){
        // console.log("aaaa",url)
        let newUrl = url.replace("http://127.0.0.1:4002","http://mobile.seantao5.xyz/server/api");
        // console.log("aaaa",newUrl)
        return newUrl;

    }else if (url && url.startsWith('http')) {

      return url
    } else {
      url = `http://backend-api-02.newbee.ltd${url}`
      return url
    }
  },
  resetImgUrl(imgObj, imgSrc, maxErrorNum) {  
    if (maxErrorNum > 0) { 
      imgObj.onerror = function() {  
        resetImgUrl(imgObj, imgSrc, maxErrorNum - 1) 
      }
      setTimeout(function() {  
        imgObj.src = imgSrc  
      }, 500)
    } else {  
      imgObj.onerror = null  
      imgObj.src = imgSrc
    }  
  }  
}


app.use(ElButton)
    .use(ElContainer)
    .use(ElAside)
    .use(ElHeader)
    .use(ElMain)
    .use(ElFooter)
    .use(ElMenu)
    .use(ElSubmenu)
    .use(ElMenuItemGroup)
    .use(ElMenuItem)
    .use(ElForm)
    .use(ElFormItem)
    .use(ElInput)
    .use(ElPopover)
    .use(ElTag)
    .use(ElCard)
    .use(ElTable)
    .use(ElTableColumn)
    .use(ElPagination)
    .use(ElDialog)
    .use(ElPopconfirm)
    .use(ElUpload)
    .use(ElLoading)
    .use(ElSelect)
    .use(ElOption)
    .use(ElRadioGroup)
    .use(ElRadio)
    .use(ElCascader)
    .use(ElCheckbox)
    .use(ElInputNumber)
app.use(router)
app.mount('#app')

import { defineConfig } from 'vite'; //增加配置
import vue from '@vitejs/plugin-vue'; 
import vitePluginImport from 'vite-plugin-babel-import';
import path from 'path';

// 项目基础url
const baseUrl ={
    development:'./',
    beta:'./',
    release:'./'
}

// 配置 vite
export default ({mode}) => defineConfig({
    plugins: [
        vue(),
        vitePluginImport([
            {
                libraryName:'element-plus',
                libraryDirectory:'es',
                style(name){
                    return `element-plus/lib/theme-chalk/${name}.css`
                }
            }
        ])
    ],
    base: baseUrl[mode],
    resolve:{
        alias:{
             '~': path.resolve(__dirname, './'),
             '@': path.resolve(__dirname, 'src')
        }
    },
    server: {
         // 设置接口代理
         proxy: {
           '/api': {
            //  target: 'http://backend-api-02.newbee.ltd/manage-api/v1',
            //  target: 'http://127.0.0.1:4002/v1/api/admin',
             target: 'http://mobile.seantao5.xyz/server/api/v1/api/admin',
             changeOrigin: true,
             rewrite: path => path.replace(/^\/api/, '')
           }
         }
   }
})

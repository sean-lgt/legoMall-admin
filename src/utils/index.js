// 从浏览器缓存中获取信心
export function localGet(key){
    const value = window.localStorage.getItem(key);
    try{
        return JSON.parse(window.localStorage.getItem(key))
    }catch(error){
        return value;
    }
}

// 存储信息到浏览器缓存中
export function localSet(key,value) {
    window.localStorage.setItem(key,JSON.stringify(value));
}

// 删除浏览器缓存中的某个key值
export function localRemove(key){
    window.localStorage.removeItem(key);
}

// 判断内容是否含有表情字符，现有数据库不支持。
export function hasEmoji (str = '') {
  const reg = /[^\u0020-\u007E\u00A0-\u00BE\u2E80-\uA4CF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF\u0080-\u009F\u2000-\u201f\u2026\u2022\u20ac\r\n]/g;
  return str.match(reg) && str.match(reg).length
}

// 单张图片上传 地址
// http://127.0.0.1:4002/v1/api/admin/upload/img
// export const uploadImgServer = 'http://backend-api-02.newbee.ltd/manage-api/v1/upload/file'
    // baseUrl:"http://mobile.seantao5.xyz/server/api/v1/api/admin"

export const uploadImgServer = 'http://mobile.seantao5.xyz/server/api/v1/api/admin/upload/img'
// 多张图片上传 地址
export const uploadImgsServer = 'http://mobile.seantao5.xyz/server/api/v1/api/admin/upload/img'
// export const uploadImgsServer = 'http://backend-api-02.newbee.ltd/manage-api/v1/upload/files'


// 根据路劲 映射页面标题名称
export const pathMap = {
  login: '登录',
  introduce: '系统介绍',
  dashboard: '大盘数据',
  add: '添加商品',
  swiper: '轮播图配置',
  hotConfig: '热销商品配置',
  new: '新品上线配置',
  recommend: '为你推荐配置',
  category: '分类管理',
  level2: '分类二级管理',
  level3: '分类三级管理',
  good: '商品管理',
  guest: '会员管理',
  order: '订单管理',
  order_detail: '订单详情',
  account: '修改账户'
}
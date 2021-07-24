<template>
    <el-card class="index-container">
        <!-- 卡片头部插槽 -->
        <template #header>
            <div class="header">
                <el-button type="primary"
                           size="small"
                           icon="el-icon-plus"
                           @click="handleAdd">增加</el-button>
                <!-- 二次确认弹框删除 -->
                <el-popconfirm title="确定删除吗？"
                               @confirm="handleDelete">
                    <template #reference>
                        <el-button type="danger"
                                   size="small"
                                   icon="el-icon-delete">批量删除</el-button>
                    </template>
                </el-popconfirm>
            </div>
        </template>
        <el-table v-loading="loading"
                  ref="multipleTable"
                  :data="tableData"
                  tooltip-effect="dark"
                  style="width: 100%"
                  @selection-change="handleSelectionChange">
            <el-table-column type="selection"
                             width="55">
            </el-table-column>
            <el-table-column prop="configName"
                             label="商品名称">
            </el-table-column>
            <el-table-column label="跳转链接">
                <template #default="scope">
                    <a target="_blank"
                       :href="scope.row.redirectUrl">{{ scope.row.redirectUrl }}</a>
                </template>
            </el-table-column>
            <el-table-column prop="configRank"
                             label="排序值"
                             width="120">
            </el-table-column>
            <el-table-column prop="goodsId"
                             label="商品编号"
                             width="200">
            </el-table-column>
            <el-table-column prop="createTime"
                             label="添加时间"
                             width="200">
            </el-table-column>
            <el-table-column label="操作"
                             width="100">
                <template #default="scope">
                    <a style="cursor: pointer; margin-right: 10px"
                       @click="handleEdit(scope.row.configId)">修改</a>
                    <!-- 涉及操作均需要二次确认 -->
                    <el-popconfirm title="确定删除吗？"
                                   @confirm="handleDeleteOne(scope.row.configId)">
                        <template #reference>
                            <a style="cursor: pointer">删除</a>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <!--总数超过一页，再展示分页器-->
        <el-pagination background
                       layout="prev, pager, next"
                       :total="total"
                       :page-size="pageSize"
                       :current-page="currentPage"
                       @current-change="changePage" />
    </el-card>
    <!-- 自定义组件 -->
    <DialogAddGood ref='addGood'
                   :reload="getIndexConfig"
                   :type="type"
                   :configType="configType" />
</template>

<script>
import { getCurrentInstance,onMounted,onUnmounted,reactive,ref,toRefs } from 'vue'
import { ElMessage } from 'element-plus'
import DialogAddGood from '@/components/DialogAddGood.vue'
import { useRoute,useRouter } from 'vue-router'
import axios from '@/utils/axios'

// 首页配置类型参数  //3热销商品 4新品上线 5为你推荐
const configTypeMap={
    hotConfig: 3,
    new: 4,
    recommend: 5
}

export default {
    name: 'hotConfig',
    components: {
        DialogAddGood
    },
    setup() {
        const router=useRouter();
        const route=useRoute();
        const multipleTable=ref(null);
        const addGood=ref(null);
        const state=reactive({
            loading: false,
            tableData: [],//数据列表
            multipleSelection: [],//选中项
            total: 0,//总条数
            currentPage: 1,//当前页
            pageSize: 10,//分页大小
            type: 'add',//操作类型
            configType: 3, //3热销商品 4新品上线 5为你推荐
        });
        // 监听路由变化  路由拦截  == 与 onMounted 是否重复  ->避免bug
        const unwatch=router.beforeEach((to) => {
            console.log("to>>",to)
            if(['hotConfig','new','recommend'].includes(to.name)) {
                state.configType=configTypeMap[to.name]
                state.currentPage=1
                getIndexConfig()
            }
        })
        // 初始化
        onMounted(() => {
            console.log("路由",route.name)
            state.configType=configTypeMap[route.name]
            getIndexConfig()
        })
        //组件销毁时 监听unwatch
        onUnmounted(() => {
            unwatch();
        })
        // 首页热销商品列表
        const getIndexConfig=() => {
            state.loading=true;
            const getUrl={
                3: "/getHotConfig",//热销商品 
                4: "/getNewGoodsOnlineConfig",//新品上线 
                5: "/recommendedForYou",//为你推荐
            }
            axios.get(getUrl[state.configType],{
                params: {
                    pageNumber: state.currentPage,
                    pageSize: state.pageSize,
                    // configType: state.configType
                }
            }).then(res => {
                // 拿取数据赋值
                state.tableData=res.list
                state.total=res.totalCount
                state.currentPage=res.currPage
                state.loading=false
            })
        };
        // 添加商品
        const handleAdd=() => {
            state.type='add';
            // 调用子组件中的方法 -> 比vue2更便捷
            addGood.value.open();
        };
        // 修改商品
        const handleEdit=(id) => {
            state.type='edit';
            // 调用子组件的方法
            addGood.value.open(id);
        };
        // 选择项
        const handleSelectionChange=(val) => {
            state.multipleSelection=val
        }
        // 删除操作
        const handleDelete=() => {
            if(!state.multipleSelection.length) {
                ElMessage.error("至少选择一项再进行删除");
                return
            }
            axios.post('/getHotConfig/delete',{
                ids: state.multipleSelection.map(i => i.configId)
            }).then(() => {
                ElMessage.success("删除成功");
                getIndexConfig()
            })
        };
        //单个删除
        const handleDeleteOne=(id) => {
            axios.post('/getHotConfig/delete',{
                ids: [id]
            }).then(() => {
                ElMessage.success("删除成功")
                getIndexConfig();
            })
        }
        // 页码改变时
        const changePage=(val) => {
            state.currentPage=val;
            getIndexConfig();
        }
        return {
            ...toRefs(state),
            multipleTable,
            handleSelectionChange,
            addGood,
            handleAdd,
            handleEdit,
            handleDelete,
            handleDeleteOne,
            getIndexConfig,
            changePage
        }

    },

}
</script>

<style scoped>
.index-container {
    min-height: 100%;
}
.el-card.is-always-shadow {
    min-height: 100% !important;
}
</style>
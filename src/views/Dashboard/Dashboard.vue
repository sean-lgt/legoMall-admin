<template>
    <el-card class="dashboard">
        <div class="order">
            <el-card class="order-item">
                <template #header>
                    <div class="card-header">
                        <span>今日订单数</span>
                    </div>
                </template>
                <div class="item">{{todayOrders}}</div>
            </el-card>
            <el-card class="order-item">
                <template #header>
                    <div class="card-header">
                        <span>今日日活</span>
                    </div>
                </template>
                <div class="item">{{todayActive}}</div>
            </el-card>
            <el-card class="order-item">
                <template #header>
                    <div class="card-header">
                        <span>转化率</span>
                    </div>
                </template>
                <div class="item">{{conversionRate}}</div>
            </el-card>
        </div>
        <div id="zoom"></div>

    </el-card>
</template>

<script>
import { onMounted,onUnmounted,reactive,ref,toRefs } from 'vue'
import axios from '@/utils/axios'
let myChart=null

export default {
    name: 'Dashboard',
    setup() {

        const state=reactive({
            xAxisData: [],//echart x轴数据
            seriesData: [],// 具体值
            todayOrders: '--',//今日订单数
            todayActive: '--',//今日日活
            conversionRate: '--',//转化率
        })

        // 获取分类列表
        const getdashboardData=() => {
            axios.get('/getDashboardList').then(res => {
                console.log("获取到看板数据",res)
                // return;
                state.xAxisData=res.xAxisData
                state.seriesData=res.seriesData
                state.todayOrders=res.todayOrders
                state.todayActive=res.todayActive
                state.conversionRate=res.conversionRate

                initEchart();
            })
        }

        const initEchart=() => {
            // 判断是否引进了echart
            if(window.echarts) {
                // 基于准备好的dom 初始化echarts实例
                myChart=window.echarts.init(document.getElementById('zoom'));

                //指定图标配置项
                const option={
                    // 表头标题
                    title: {
                        text: '数据折线图'
                    },
                    // 提示框内容
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    // 图例
                    legend: {
                        data: ['新增注册','付费用户','活跃用户','订单数','当日总收入']
                    },
                    // 工具栏
                    toolbar: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    // 布局
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    // x轴数据
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: state.xAxisData
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    // y 轴数据
                    series: [
                        {
                            name: '新增注册',
                            type: 'line',
                            stack: '总量',
                            areaStyle: {},
                            emphasis: {
                                focus: 'series'
                            },
                            data: state.seriesData.addRegistered
                        },
                        {
                            name: '付费用户',
                            type: 'line',
                            stack: '总量',
                            areaStyle: {},
                            emphasis: {
                                focus: 'series'
                            },
                            data: state.seriesData.payUser
                        },
                        {
                            name: '活跃用户',
                            type: 'line',
                            stack: '总量',
                            areaStyle: {},
                            emphasis: {
                                focus: 'series'
                            },
                            data: state.seriesData.activeUser
                        },
                        {
                            name: '订单数',
                            type: 'line',
                            stack: '总量',
                            areaStyle: {},
                            emphasis: {
                                focus: 'series'
                            },
                            data: state.seriesData.ordersNum
                        },
                        {
                            name: '当日总收入',
                            type: 'line',
                            stack: '总量',
                            label: {
                                show: true,
                                position: 'top'
                            },
                            areaStyle: {},
                            emphasis: {
                                focus: 'series'
                            },
                            data: state.seriesData.incomeCount
                        }
                    ]
                }

                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option)
            }
        }

        //生命周期函数
        onMounted(() => {
            getdashboardData();
            window.onresize=function() {
                myChart&&myChart.resize()
            }

        })
        // vue2中的destroyed
        onUnmounted(() => {
            // 将其销毁
            myChart.dispose()
        })
        return {
            ...toRefs(state),
            getdashboardData
        }
    }
}
</script>

<style scoped>
.dashboard .order {
    display: flex;
    margin-bottom: 50px;
}
.dashboard .order .order-item {
    flex: 1;
    margin-right: 20px;
}
.dashboard .order .order-item:last-child {
    margin-right: 0;
}
#zoom {
    min-height: 300px;
}
</style>
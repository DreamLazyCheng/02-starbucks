<template>
    <div class="home-page">
        <!-- 公共Header -->
        <MyHeader title="加班/休假"></MyHeader>
        <!-- 任务状态 -->
        <div class="status-box">
            <div class="status" :class="{ active : status_actives[0] }" @click="changeStatus(0)">
                <span class="iconfont icon-daiban"></span>
                <span>待处理</span>
            </div>
            <div class="status" :class="{ active : status_actives[1] }" @click="changeStatus(1)">
                <span class="iconfont icon-zhifeiji"></span>
                <span>已发起</span>
            </div>
            <div class="status" :class="{ active : status_actives[2] }" @click="changeStatus(2)">
                <span class="iconfont icon-wancheng"></span>
                <span>已处理</span>
            </div>
        </div>
        <!-- 任务类型 -->
        <div class="type-box">
            <div :class="{active: type_actives[0] }" @click="changeType(0)">加班</div>
            <div :class="{active: type_actives[1] }" @click="changeType(1)">休假</div>
        </div>
        <!-- 任务列表 -->
        <div class="list" v-if="list.length>0">
            
            <div class="task" @click="gotoDetail(task.applicationNumber)" v-for="(task,index) in list" :key="index">
                
                <div class="title">
                    <span>{{task.applicationNumber}}</span>

                    <!-- 渲染对应status的状态 -->
                    <p v-if="task.status == 0"><span class="iconfont icon-73dengdai"></span> 待审批</p>
                    <p v-else-if="task.status == 1"> <span class="iconfont icon-73dengdai"></span> 已发起</p>
                    <p v-else> <span class="iconfont icon-73dengdai"></span> 已处理</p>
                </div>
                <div class="desc">
                    <div class="block">
                        <div><span>申请人</span><span>{{task.nickname}}</span></div>
                        <div><span>加班日期</span><span>{{new Date(task.startTime).toLocaleDateString()}}</span></div>
                    </div>
                    <div class="block">

                        <!-- 处理加班类型 -->
                        <div v-if="task.type == 1"><span>加班类型</span><span>工作日加班</span></div>
                        <div v-else-if="task.type == 2"><span>加班类型</span><span>双休日加班</span></div>
                        <div v-else><span>加班类型</span><span>假期加班</span></div>

                        <div><span>加班时数</span><span>{{ ( ( new Date(task.endTime)-new Date(task.startTime) ) / 3600000 ).toFixed(1) }}</span></div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="empty">还没有对应的任务.</div>

        <div class="btn" @click="showMask=true"><span class="iconfont icon-jia"></span>发起任务</div>

        <!-- 需要添加 .native 修饰符, click事件才能生效 -->
        <!-- 参考: https://cn.vuejs.org/v2/guide/components-custom-events.html#%E5%B0%86%E5%8E%9F%E7%94%9F%E4%BA%8B%E4%BB%B6%E7%BB%91%E5%AE%9A%E5%88%B0%E7%BB%84%E4%BB%B6 -->
        <MyMask v-show="showMask" @click.native="showMask=false"></MyMask>  

    </div>
</template>

<script>

import Vue from 'vue';
//导入Header组件
import Header from './common/Header'
import Mask from './common/Mask'

//注册成全局组件
Vue.component('MyHeader',Header);
Vue.component('MyMask',Mask);

export default {
    data(){
        return {
            showMask:false,//控制透明层的显示/隐藏
            status_actives:[true,false,false],
            type_actives:[true,false],
            current_status:0,//当前任务的状态
            current_type: 'overtime',//当前任务类型
            list:[]
        }
    },
    methods:{
        gotoDetail(id){
            console.log(id);
            this.$router.push("/vacation_form/detail/"+id)
        },
        changeStatus:function(index){

            //维护状态高亮
            for(var i =0;i < this.status_actives.length;i++)
            {
                if(i == index)
                {
                    //this.status_actives[i] = true;
                    this.$set( this.status_actives,i,true );
                }
                else
                {
                    //this.status_actives[i] = false;
                    this.$set( this.status_actives,i,false );
                }
            }

            //保存任务状态到 data
            this.current_status = index;

            //请求任务列表
            this.request_task_list( this.current_status,this.current_type );
            //console.log(this.current_status,this.current_type );
            
        },
        changeType:function(type){
            
            //维护任务类型的高亮
            for(var i =0;i < this.type_actives.length;i++)
            {
                if(i == type)
                {
                    this.$set( this.type_actives,i,true );
                }
                else
                {
                    this.$set( this.type_actives,i,false );
                }
            }

            //将当前点击的任务类型 保存到data
            this.current_type = type==0?'overtime':'vacation';

            //请求任务列表
            this.request_task_list( this.current_status,this.current_type );

            //console.log(this.current_status,this.current_type );
        },
        //封装 请求任务列表 方法
        request_task_list:function( status,type ){
            //请求对应状态的任务列表
            this.axios.defaults.headers.common['token'] = localStorage.getItem('token');
            this.axios.get('http://localhost:3000/api/task/list',{ params:{status,type,create_at:0,pageSize:20 } }).then((res)=>{
                console.log(res.data.data);
                res.data.data.forEach((item)=>{
                    console.log(item.describes);
                    
                })
                //将获取到的任务列表,,存入当前组件实例
                this.list = res.data.data;
            })
        }
    },
    mounted:function(){
        this.request_task_list( this.current_status,this.current_type );
    }
}
</script>

<style scoped >
    .home-page{
        height: 100%;
    }
    .status-box{
        background-color: white;
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 30px 0;
    }
    .status-box .status{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .status-box .status.active{
        color: darkgreen;
    }
    .status-box .status .iconfont{
        margin-bottom: 15px;
        font-size: 25px;
    }

    /* 任务类型 */
    .type-box{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 25px 0;
    }
    .type-box div{
        background-color: white;
        color: darkgreen;
        border: 1px solid darkgreen;
        line-height: 30px;
        width: 100px;
        text-align: center;
        border-radius: 15px 0 0 15px;
    }
    .type-box div.active{
        background-color: darkgreen;
        color: white;
    }
    .type-box div:last-child{
        border-radius: 0 15px 15px 0 ;

    }

    /* 任务列表 */
    .list .task{
        background-color: white;
        margin-bottom: 20px;
        padding: 0 20px;
    }
    .list .task .title{
        display: flex;
        justify-content: space-between;
        align-items: center;
        line-height: 50px;
    }
    .list .task .desc{
        display: flex;
    }
    .list .task .desc .block{
        flex: 1;
    }
    .list .task .desc .block>div{
        margin-bottom: 15px;
    }
    .list .task .desc .block>div span:first-child{
        width: 40%;
        display: inline-block;
    }
    .list .task .desc .block>div span:last-child{
        color: black;
    }

    .empty{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 50px 0;
    }

    .btn{
        position: fixed;
        bottom: 20px;
        right: 10px;
        background-color: darkgreen;
        color: white;
        text-align: center;
        line-height: 40px;
        padding: 0 30px;
        border-radius: 20px;
    }
</style>
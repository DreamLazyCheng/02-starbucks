<template>
    <div class="overtime-page">

        <div class="cell">
            <span>加班类型</span>
            <select name="" id="" v-model="type">
                <option value="1">工作日加班</option>
                <option value="2">双休日加班</option>
                <option value="3">假期加班</option>
            </select>
        </div>

        <div class="cell">
            <span>加班起始时间</span>
            <input type="text" v-model="startTime" @click="$refs.startTimePicker.open()">
        </div>

        <div class="cell">
            <span>加班截止时间</span>
            <input type="text" v-model="endTime" @click="$refs.endTimePicker.open()">
        </div>

        <div class="cell">
            <span>加班事由</span>
            <input type="text" v-model="desc">
        </div>

        <div class="bar">
            <div class="cancel" @click="$router.go(-1)">取消</div>
            <div class="submit" @click="submit_overtime">提交</div>
        </div>


        <!-- 演示 datetime-picker组件的使用 -->
        <mt-datetime-picker ref="startTimePicker" @confirm="getStartTime"></mt-datetime-picker>
        <mt-datetime-picker ref="endTimePicker" @confirm="getEndTime"></mt-datetime-picker>

    
    </div>
</template>

<script>

import { Toast } from 'mint-ui'

export default {
    data(){
        return {
            startTime:'',
            endTime:'',
            type:1,
            desc:''
        }
    },
    methods:{
        /* 选择日期,点击确定按钮时调用 */
        getStartTime:function(date){
            //console.log(date.toLocaleDateString());
            this.startTime = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        },
        getEndTime:function(date){

            //console.log(new Date(date) - new Date(this.startTime));
            
            if(new Date(date) - new Date(this.startTime) < 0)
            {
                //alert('日期选择错误!');
                //Toast('日期选择错误!');
                Toast({
                    message:'日期选择错误!',
                    duration:4000,
                    iconClass:'iconfont icon-diannao'
                });
                return;
            }
            //console.log(date.toLocaleDateString());
            this.endTime = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        },
        /* 提交 加班申请 */
        submit_overtime:function(){

            console.log({ annex:'',describes: this.desc, startTime:this.startTime,endTime:this.endTime,type:this.type });
            
            //添加token请求头 
            this.axios.defaults.headers.common['token'] = localStorage.getItem('token');
            //发起ajax请求, 提交加班记录
            this.axios.post('http://localhost:3000/api/apply/overtime',{ annex:'',describe: this.desc, startTime:this.startTime,endTime:this.endTime,type:this.type }).then((res)=>{
                console.log(res.data);
                
            })
        }
    }
}
</script>

<style scoped  lang="">
    .cell{
        display: flex;
        justify-content: space-between;
        margin: 20px;
    }
    .cell input{
        height: 50px;
        padding-left: 15px;
        border: none;
        outline: none;
    }

    .bar{
        position: fixed;
        bottom: 0;
        width: 100%;
        line-height: 50px;
        display: flex;
        border-top: 1px solid #f0f0f0;
    }

    .bar>div{
        flex: 1;
        text-align: center;
    }
    .bar>div:first-child{
        background-color: white;
    }
    .bar>div:last-child{
        background-color: darkgreen;
        color: white;
    }


</style>
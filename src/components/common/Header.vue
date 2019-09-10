<template>
    <div class="header">
        <div @click="goBack"><span class="iconfont icon-fanhui"></span></div>
        <div>{{title}}</div>
        <div><span class="iconfont icon-shijian"></span> <span class="iconfont icon-fangdajing"></span></div>
    </div>
</template>

<script>

export default {
    data(){
        return {

        }
    },
    props:['title'],
    methods:{
        goBack:function(){
            //返回上一页
            this.$router.go(-1);
        }
    }
}
</script>
<style scoped  lang="">
    .header{
        background-color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        border-bottom: 1px solid #f0f0f0;
    }
</style>
<template>
    <div class="mask">
        <div class="content">
            <div class="block" @click="$router.push('/overtime_form')">
                <span class="iconfont icon-diannao"></span>
                <p>加班</p>
            </div>
            <div class="block" @click="$router.push('/vacation_form')">
                <span class="iconfont icon-dujia"></span>
                <p>休假</p>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data(){
        return {

        }
    }
}
</script>
<style scoped >
    .mask{
        position: fixed;
        top: 0;
        width: 100%;
        height: 100%;
        width: 100%;
        background-color: rgba(0,0,0,0.2);
    }
    .mask .content{
        padding: 30px 0;
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        background-color: white;
        position: absolute;
        bottom: 0;
    
    }
    .mask .content .block{
        text-align: center;
    }
    .mask .content .block .iconfont{
        margin-bottom: 10px;
        display: inline-block;
    }

</style>
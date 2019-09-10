<template>
    <div class="login-page">
        <div class="phone">
            <input type="text" v-model="phone" placeholder="手机号码">    
        </div>   
        <div class="password">
            <input type="text" v-model="password" placeholder="密码">
        </div>
        <div class="btn">
            <button @click="toHome">登陆</button>
        </div>
    </div>
</template>

<script>

export default {
    data(){
        return {
            phone:'',
            password:''
        }
    },
    methods:{
        toHome:function(){
            //向服务器发请求(登陆请求)
            this.axios.post('http://localhost:3000/api/login',{ phone:this.phone,password:this.password  }).then((res)=>{
                console.log(res.data);
                if(res.data.code == 1)//登陆成功
                {
                    //立即将获取的token值存入localStorage
                    localStorage.setItem('token',res.data.token);

                    //跳转到首页
                    this.$router.push('/home');
                }
            })
        }
    }
}
</script>
<style scoped>
    .login-page{
        margin: 40px 20px;
    }
    .login-page>div{
        margin-bottom: 20px;
    }
    .login-page input{
        height: 50px;
        outline: none;
        border: none;
        border-bottom: 1px solid #f0f0f0;
        font-size: 18px;
        width: 100%;
    }
    .login-page button{
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        border: none;
        color:white;
        background-color: #999999;
        border-radius: 25px;
    }

</style>
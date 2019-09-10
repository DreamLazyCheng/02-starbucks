<template>
  <div>
    <MyHeader title="办公室加班申请表"></MyHeader>
    {{list}}
  </div>
</template>

<script>
export default {
  created() {
    this.axios.get("http://localhost:3000/api/task/list").then(res => {
      // console.log(this.$parent.$parent._route.params.id);
      // console.log(res.data.data);

      this.list = res.data.data.filter(item => {
        if (item.applicationNumber == this.$parent.$parent._route.params.id) {
          return item;
        }
      })
      console.log(this.list);
      
    })
  },
  data() {
    return {
      list: []
    };
  }
};
</script>
<style scoped  lang="">
</style>
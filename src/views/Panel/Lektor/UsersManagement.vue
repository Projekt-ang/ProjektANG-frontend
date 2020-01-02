<template>

</template>

<script>

export default{
  name:"UsersManagement",
  data(){
    return{
        users:[]
    }
  },
  methods:{

  },
  mounted(){
    this.$req.get("/Users").then(response =>{
      this.users = response.data._embedded.users;
    });
    console.log(this.users);
  }
}
</script>
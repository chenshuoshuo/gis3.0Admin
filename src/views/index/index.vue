<template>
  <div class="app-container">
    <iframe :src="src" width="100%" height="100%"></iframe>
  </div>
</template>

<script>
	import {login} from "@/api/mylogin";
  export default {
    name: 'index',
    data() {
      return {
        src:''
      }
    },
    methods: {
      
    },
    mounted() {
			
		this.src = window.g.ApiUrl + "admin#/applications";
    }

  }
</script>
<style scoped>
  .app-container{
  	width: 100%;
  	height: 600px;
  }
</style>


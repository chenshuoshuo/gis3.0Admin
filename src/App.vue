<template>
  <div id="app">
    <router-view></router-view>
    <systemMessage></systemMessage>
  </div>
</template>

<script>
	import {systemMessage} from "@/components/systemMessage"
  export default{
    name: 'App',
    components: {
      systemMessage
    }
  }
</script>

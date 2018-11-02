<template>
    <div class="IdentityBinding-box">
    	<div style="width: 100px;height: 100px;background: red;">
    		
    	</div>
    </div>
</template>

<script>
	export default{
		mounted(){
		  this.initWebpack();
		},
	     methods:{
			  initWebpack(){//初始化websocket
			  	console.log(window.g.ApiUrl.split("://")[1])
			    const wsuri = "ws://"+window.g.ApiUrl.split("://")[1]+"gis/map/task";
			    this.websock = new WebSocket(wsuri);//这里面的this都指向vue
			    this.websock.onopen = this.websocketopen;
			    this.websock.onmessage = this.websocketonmessage;
			    this.websock.onclose = this.websocketclose;
			    this.websock.onerror = this.websocketerror;
			  },
			  websocketopen(){//打开
			    console.log("WebSocket连接成功")
			  },
			  websocketonmessage(e){ //数据接收
			    console.log(e)
			    this.productinfos = JSON.parse(e.data);
			  },
			  websocketclose(){  //关闭
			    console.log("WebSocket关闭");
			  },
			  websocketerror(){  //失败
			    console.log("WebSocket连接失败");
			  }
			}
	}
</script>

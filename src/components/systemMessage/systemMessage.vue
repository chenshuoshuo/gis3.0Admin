<template>
    <div class="systemMessage">
    	<!--<div style="width: 100px;height: 100px;background: red;position: fixed;top: 0;right: 0;color: #333;font-size: 14px;">
    		<h4>题目</h4>
    		<p></p>
    	</div>-->
    </div>
</template>

<script>
	export default{
		name: 'systemMessage',
		data() {
		    return {
		      productinfos: []
		    }
		  },
		//props: ['value'],
		mounted(){
		  this.initWebpack();
		},
	     methods:{
			  initWebpack(){//初始化websocket
			  	let wsUrl=window.g.ApiUrl.split("://")[1]
			    const wsuri = "ws://"+wsUrl+"map/task";
			    this.websock = new WebSocket(wsuri);//这里面的this都指向vue
			    this.websock.onopen = this.websocketopen;
			    this.websock.onmessage = this.websocketonmessage;
			    this.websock.onclose = this.websocketclose;
			    this.websock.onerror = this.websocketerror;
			  },
			  websocketopen(){//打开
			    console.log("WebSocket连接成功")
//			    this.$notify({
//		          title: '提示',
//		          message: 'WebSocket连接成功',
//		          duration: 0
//		        });
			  },
			  websocketonmessage(e){ //数据接收
			    
			    let arr = JSON.parse(e.data);
			    
			    console.log(arr);
			    if (arr.length>0) {
			    	var _this=this;
		    	
			    	let index=0;
			    	let list=setInterval(function(){
			    		console.log(arr[index])
			    		console.log(arr[index].state)
			    		if (arr[index].state == 0) {
				    		_this.$notify.info({
					          title: arr[index].name,
					          message: arr[index].message,
					          duration: 1000
					        });
				    	} else{
				    		_this.$notify({
					          title: arr[index].name,
					          message: arr[index].message,
					          type: 'success',
					          duration: 0
					        });
				    	}
				    	index++;
				    	
				    	if (index==arr.length) {
				    		
				    		clearInterval(list)
				    	}
			    	},1000)
			    }
			    
			  },
			  websocketclose(){  //关闭
			    console.log("WebSocket关闭");
			    this.$notify({
		          title: '提示',
		          message: 'WebSocket关闭',
		          duration: 0
		        });
			  },
			  websocketerror(){  //失败
			    console.log("WebSocket连接失败");
			    this.$notify({
		          title: '提示',
		          message: 'WebSocket连接失败',
		          duration: 0
		        });
			  }
			}
	}
</script>

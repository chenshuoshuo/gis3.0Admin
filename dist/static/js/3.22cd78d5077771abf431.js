webpackJsonp([3],{"6TRM":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("Zv1W"),n=i("rfHw"),o={name:"upTitle",data:function(){return{options:[],upText:"上传文件",formUpTitle:{zoneid:"",file:"",name:"",fileid:""},listQuery:{page:1,pageSize:20}}},methods:{getFile:function(t){this.formUpTitle.file=document.getElementById("upload").files[0],this.upText=document.getElementById("upload").files[0].name},getZoneList:function(){var t=this;Object(a.h)(this.listQuery).then(function(e){t.options=e.data.data.list})},handleUpload:function(){for(var t=this,e=this.$loading(),i=0;i<this.options.length;i++)if(this.options[i].id==this.formUpTitle.zoneid){this.formUpTitle.name=this.options[i].name;break}var a=new FormData;a.append("zipFile",this.formUpTitle.file),a.append("zoneid",this.formUpTitle.zoneid),a.append("name",this.formUpTitle.name),this.formUpTitle.fileid?(a.append("fileid",this.formUpTitle.fileid),Object(n.f)(a).then(function(i){0===i.data.code&&(t.formUpTitle.zoneid="",t.upText="上传文件",e.close(),t.$alert("3d瓦片更新成功！","消息提示",{confirmButtonText:"确定"}).then(function(){t.$router.push({path:"/3dTileMannger/3dlist"})}))})):Object(n.a)(a).then(function(i){t.formUpTitle.zoneid="",t.upText="上传文件",e.close(),t.$alert("3d瓦片创建成功！","消息提示",{confirmButtonText:"确定"}).then(function(){t.$router.push({path:"/3dTileMannger/3dlist"})})})}},mounted:function(){var t=this;this.getZoneList(),this.$route.params.id&&Object(n.d)(this.$route.params.id).then(function(e){e.data&&(t.formUpTitle.fileid=e.data.data.fileid,t.formUpTitle.name=e.data.data.name,t.formUpTitle.zoneid=e.data.data.zoneid)})}},l={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"app-wrap"},[i("div",{staticClass:"form-item"},[i("span",{staticClass:"label"},[t._v("地图名称：")]),t._v(" "),i("el-select",{attrs:{placeholder:"请选择"},model:{value:t.formUpTitle.zoneid,callback:function(e){t.$set(t.formUpTitle,"zoneid",e)},expression:"formUpTitle.zoneid"}},t._l(t.options,function(t){return i("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}))],1),t._v(" "),i("div",{staticClass:"form-item"},[i("div",{staticClass:"updec"},[i("span",{staticClass:"label"},[t._v("上传文件：")]),t._v(" "),i("el-button",{staticStyle:{position:"relative",background:"#42b983",border:"none"},attrs:{type:"primary",icon:"el-icon-upload2"}},[i("input",{ref:"upload",staticStyle:{position:"absolute",left:"0",top:"0",width:"100%",height:"100%",opacity:"0"},attrs:{type:"file",accept:".zip",id:"upload"},on:{change:function(e){t.getFile(e)}}}),t._v(t._s(t.upText)+"\n      ")]),t._v(" "),i("span",{staticClass:"formdesc"},[t._v("仅支持扩展名：.zip")])],1)]),t._v(" "),i("div",{staticClass:"form-item",staticStyle:{margin:"70px"}},[i("el-button",{attrs:{type:"primary"},on:{click:t.handleUpload}},[t._v("提交")]),t._v(" "),i("el-button",[t._v("重置")])],1)])},staticRenderFns:[]};var r=i("VU/8")(o,l,!1,function(t){i("JsXo")},"data-v-1ccc7ea6",null);e.default=r.exports},AiEw:function(t,e,i){(t.exports=i("FZ+f")(!1)).push([t.i,"\n.app-wrap[data-v-1ccc7ea6] {\n  margin: 40px;\n}\n.form-item[data-v-1ccc7ea6] {\n  margin-bottom: 30px;\n  position: relative;\n}\n.label[data-v-1ccc7ea6] {\n  font-size: 14px;\n  color: #666;\n}\n.formdesc[data-v-1ccc7ea6] {\n  font-size: 12px;\n  color: #ccc;\n  margin-left: 20px;\n}\n",""])},JsXo:function(t,e,i){var a=i("AiEw");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);i("rjj0")("4d2ba2f0",a,!0)},rfHw:function(t,e,i){"use strict";e.e=function(t){return Object(a.a)({url:"/map/v1/tile/page",method:"post",params:t})},e.c=function(t){return Object(a.a)({url:"/map/v1/tile/"+t,method:"delete"})},e.d=function(t){return Object(a.a)({url:"/map/v1/tile/"+t,method:"get"})},e.f=function(t){return Object(a.a)({url:"/map/v1/tile/"+t.get("fileid"),method:"post",data:t,headers:{"Content-Type":"multipart/form-data"}})},e.a=function(t){return Object(a.a)({url:"/map/v1/tile",method:"put",data:t,headers:{"Content-Type":"multipart/form-data"}})},e.b=function(t){return Object(a.a)({url:"/map/v1/tile/download/"+t,method:"get"})};var a=i("vLgD")}});
webpackJsonp([21],{Gged:function(e,o,t){(e.exports=t("FZ+f")(!1)).push([e.i,"\n.create-room {\n  position: absolute;\n  top: 84px;\n  right: 0;\n  left: 0;\n  bottom: 0;\n}\n.create-room .el-form-item.is-required .el-form-item__label:before {\n    display: none;\n}\n.create-room .avatar-uploader .el-upload {\n    border: 1px dashed #d9d9d9;\n    border-radius: 6px;\n    cursor: pointer;\n    position: relative;\n    overflow: hidden;\n}\n.create-room .avatar-uploader .el-upload:hover {\n    border-color: #409EFF;\n}\n.create-room .el-upload__tip {\n    margin-left: 20px;\n    display: inline-block;\n    color: #8c939d;\n}\n.create-room .avatar-uploader-icon {\n    font-size: 28px;\n    color: #8c939d;\n    width: 62px;\n    height: 62px;\n    line-height: 62px;\n    text-align: center;\n}\n.create-room .el-upload-list--picture-card .el-upload-list__item-status-label i {\n    vertical-align: top;\n}\n.create-room .el-upload-list--picture-card .el-upload-list__item, .create-room .el-upload--picture-card {\n    width: 62px;\n    height: 62px;\n    line-height: 62px;\n}\n.create-room .map-box {\n    position: absolute;\n    top: 0;\n    right: 0;\n    left: 0;\n    bottom: 0;\n}\n.create-room #slider-height {\n    position: absolute;\n    top: 20px;\n    bottom: 60px;\n}\n.create-room .slider-over {\n    bottom: 60px;\n    padding-bottom: 0 !important;\n}\n.create-room .slider {\n    position: absolute;\n    top: 20px;\n    left: 40px;\n    width: 410px;\n    padding-bottom: 20px;\n    border: 1px solid #FDFEFF;\n    -webkit-box-shadow: 0 2px 4px rgba(4, 4, 4, 0.2);\n            box-shadow: 0 2px 4px rgba(4, 4, 4, 0.2);\n    overflow-x: hidden;\n    background: #fff;\n}\n.create-room .el-scrollbar__wrap {\n    overflow-x: hidden;\n}\n.create-room .slider-content {\n    width: 100%;\n    background: #fff;\n    padding: 16px 20px;\n}\n.create-room .required .el-form-item__content::after {\n    content: '*';\n    display: inline-block;\n    color: #f56c6c;\n    margin-left: 4px;\n    vertical-align: top;\n}\n.create-room .el-input {\n    width: 90%;\n}\n.create-room .el-textarea {\n    width: 90%;\n}\n.create-room .required .el-select {\n    width: 90%;\n}\n.create-room .required .el-select .el-input {\n      width: 100%;\n}\n.create-room .btn-sub {\n    display: inline-block;\n    padding: 10px 60px;\n    margin-left: 40px;\n}\n.create-room label {\n    font-weight: normal;\n}\n.create-room .btn-item {\n    margin-bottom: 0;\n}\n.create-room .tool-box {\n    position: absolute;\n    bottom: 50px;\n    right: 30px;\n    width: 40px;\n}\n.create-room .zoom-box {\n    width: 40px;\n    background: #fff;\n    border: 1px solid rgba(4, 4, 4, 0.1);\n    -webkit-box-shadow: 0 2px 4px rgba(4, 4, 4, 0.2);\n            box-shadow: 0 2px 4px rgba(4, 4, 4, 0.2);\n    border-radius: 3px;\n}\n.create-room .zoom-box .item {\n      height: 40px;\n      line-height: 40px;\n      font-size: 20px;\n      text-align: center;\n      background: #fff;\n      border-radius: 3px;\n      color: #666;\n      cursor: pointer;\n}\n.create-room .zoom-box .item:active {\n      color: #999;\n}\n.create-room .zoom-box .line {\n      margin: 0 auto;\n      width: 20px;\n      border-bottom: 1px solid rgba(4, 4, 4, 0.2);\n}\n",""])},vxy2:function(e,o,t){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var r=t("kuNG"),n=t("VEpC"),a=t("R/UA"),s=t("zL8q"),i=t("TIfe"),l={inject:["baseUrl"],components:{LevelSelector:r.a},data:function(){return{isOver:!1,isFisrt:!0,types:[],campusId:null,campus:[],id:null,state:"",loaddingMap:!0,token:Object(i.d)(),fileList:[],postForm:{brief:"",location:"",typeCode:"",mapRoomExtendsList:[],mapRoomImgList:[],extendsFields:[]},floor:{minLevel:0,maxLevel:0,floorShow:!1,currentLevel:0},vectorMap:null,currentLayer:null,geoJson:{type:"Feature",geometry:{coordinates:[[]],type:"Polygon"}},rules:{roomName:[{required:!0,message:"请输入房间名称",trigger:"blur"}],hourseNumber:[{required:!0,message:"请输入门牌号",trigger:"blur"}],typeCode:[{required:!0,message:"请选择房间类别",trigger:"change"}]}}},methods:{setLevel:function(e){this.vectorMap.setLevel(e)},getTotalLevel:function(){return this.vectorMap.getMaxLevel()-this.vectorMap.getMinLevel()},zoomIn:function(){this.vectorMap.zoomIn()},zoomOut:function(){this.vectorMap.zoomOut()},addLayer:function(){this.get,this.vectorMap.getSource("polygonSource")?this.vectorMap.getSource("polygonSource").setData(this.geoJson):this.vectorMap.addSource("polygonSource",{type:"geojson",data:this.geoJson}),null===this.currentLayer?this.currentLayer={type:"fill-extrusion",source:"polygonSource",id:"polygonLayer",paint:{"fill-extrusion-color":"rgb(255,81,4)","fill-extrusion-height":1}}:this.vectorMap.removeLayer(this.currentLayer.id),this.vectorMap.addLayer(this.currentLayer)},handleRemove:function(e,o){var t=this;e.id?this.postForm.mapRoomImgList.forEach(function(o,r){o.imgId===e.id&&(t.postForm.mapRoomImgList.splice(r,1),t.fileList.splice(r,1))}):e.url&&this.postForm.mapRoomImgList.forEach(function(o,r){window.g.BASE_IPS+o.imgUrl===e.url&&(t.postForm.mapRoomImgList.splice(r,1),t.fileList.splice(r,1))})},handleSuccess:function(e){e.status?(this.fileList.push({url:window.g.BASE_IPS+e.data}),this.postForm.mapRoomImgList.push({imgUrl:e.data})):this.$message({type:"error",message:"图片上传失败"})},handleSub:function(){var e=this;this.$refs.ruleForm.validate(function(o){o&&("add"===e.state||"update"===e.state&&(e.postForm.mapRoomImgList.forEach(function(o){o.roomCode=e.postForm.roomCode}),e.postForm.mapRoomExtendsList=[],e.postForm.extendsFields.forEach(function(o){e.postForm.mapRoomExtendsList.push({roomCode:e.postForm.roomCode,columnId:o.columnId,typeCode:e.postForm.typeCode,extendsValue:o.extendsValue})}),delete e.postForm.mapRoomType,Object(a.A)(e.postForm).then(function(o){o.data.status?(e.$message({type:"success",message:"更新成功"}),e.$router.go(-1)):e.$message({type:"error",message:"更新失败"})})))})},getRoomTypeList:function(){var e=this;Object(n.N)({campusCode:this.campusId}).then(function(o){o.data.status?e.types=o.data.data:e.$message({type:"error",message:"机构类别获取失败"})})},initExtendsDefine:function(){var e=this;this.postForm.typeCode&&Object(n.D)(this.postForm.typeCode).then(function(o){o.data.status?(e.postForm.mapRoomExtendsList&&e.postForm.mapRoomExtendsList.length>0?(e.postForm.mapRoomExtendsList.forEach(function(e){o.data.data.forEach(function(o){e.columnId===o.columnId&&(o.extendsValue=e.extendsValue)})}),e.postForm.extendsFields=o.data.data):e.postForm.extendsFields=o.data.data,e.$forceUpdate()):e.$message({type:"error",message:"扩展属性获取失败"})})},initMap:function(){var e=this;this.vectorMap.on("load",function(){setTimeout(function(){e.vectorMap.flyTo({center:e.postForm.geoJson.geometry.coordinates[0][0],zoom:18}),e.vectorMap.on("moveend",function(){e.vectorMap.floorComponent.onCameraMoveEnd(),e.vectorMap.getZoom()>=15&&Number(e.vectorMap.getMinLevel())!==Number(e.vectorMap.getMaxLevel())?(e.floor.currentLevel&&!e.floor.maxLevel?(e.floor.minLevel=Number(e.vectorMap.getMinLevel()),e.floor.maxLevel=Number(e.vectorMap.getMaxLevel()),e.setLevel(e.floor.currentLevel)):(e.floor.currentLevel=e.vectorMap.floorComponent.nowLevelIndex,e.floor.minLevel=Number(e.vectorMap.getMinLevel()),e.floor.maxLevel=Number(e.vectorMap.getMaxLevel()),e.$refs.level&&e.$refs.level.setCurrentFloor(e.vectorMap.floorComponent.nowLevelIndex)),e.floor.floorShow=!0):e.floor.floorShow=!1,console.log("this.floor.currentLevel",e.floor.currentLevel)})},200),e.addLayer(),e.$refs.ruleForm.clearValidate(),e.loaddingMap=!1})}},watch:{typeCode:function(){this.postForm.extendsFields=[],this.initExtendsDefine()}},computed:{typeCode:function(){return this.postForm.typeCode}},beforeMount:function(){var e=this;this.getRoomTypeList(),this.state=this.$route.query.method,("add"===this.state?function(){e.$router.back(-1)}:function(){e.$route.query.id||(e.$router.back(-1),Object(s.Message)({type:"error",message:"错误的请求方式"})),e.postForm.roomCode=e.$route.query.id})(),this.state||(this.$router.back(-1),Object(s.Message)({type:"error",message:"错误的请求方式"}))},mounted:function(){var e=this;Object(a.q)(this.postForm.roomCode).then(function(o){o.data.status?(e.postForm=o.data.data,o.data.data.mapRoomImgList.forEach(function(o){e.fileList.push({id:o.imgId,url:""+window.g.BASE_IPS+o.imgUrl})}),e.geoJson=o.data.data.geoJson,e.floor.currentLevel=null===e.postForm.leaf?0:e.postForm.leaf,e.vectorMap=new window.creeper.VectorMap("map",e.postForm.campusCode,window.g.MAP_URL),e.initMap()):(e.$message({type:"warning",message:"系统内该地图不存在"}),e.$router.back(-1))})},updated:function(){this.isOver=document.getElementById("slider-content").offsetHeight-document.getElementById("slider-height").offsetHeight>0}},m={render:function(){var e=this,o=e.$createElement,t=e._self._c||o;return t("div",{staticClass:"create-room"},[t("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loaddingMap,expression:"loaddingMap"}],staticClass:"map-box",attrs:{id:"map","element-loading-text":"加载中...","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(0, 0, 0, 0.7)"}}),e._v(" "),t("div",{attrs:{id:"slider-height"}}),e._v(" "),t("div",{staticClass:"slider",class:{"slider-over":e.isOver}},[t("el-scrollbar",{staticStyle:{height:"100%"}},[t("div",{staticClass:"slider-content",attrs:{id:"slider-content"}},[t("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.postForm,rules:e.rules,"status-icon":"","label-width":"80px",required:""}},[t("el-form-item",{staticClass:"required",attrs:{label:"房间名称:",prop:"roomName"}},[t("el-input",{attrs:{id:"name"},model:{value:e.postForm.roomName,callback:function(o){e.$set(e.postForm,"roomName",o)},expression:"postForm.roomName"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"别名:",prop:"alias","show-message":!1}},[t("el-input",{attrs:{id:"alias"},model:{value:e.postForm.alias,callback:function(o){e.$set(e.postForm,"alias",o)},expression:"postForm.alias"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"英文名:",prop:"enName","show-message":!1}},[t("el-input",{attrs:{id:"enName"},model:{value:e.postForm.enName,callback:function(o){e.$set(e.postForm,"enName",o)},expression:"postForm.enName"}})],1),e._v(" "),t("el-form-item",{staticClass:"required",attrs:{label:"门牌号:",prop:"hourseNumber"}},[t("el-input",{attrs:{id:"roomNumber"},model:{value:e.postForm.hourseNumber,callback:function(o){e.$set(e.postForm,"hourseNumber",o)},expression:"postForm.hourseNumber"}})],1),e._v(" "),t("el-form-item",{staticClass:"required",attrs:{label:"房间类别:",prop:"typeCode"}},[t("el-select",{attrs:{placeholder:"请选择房间类别"},model:{value:e.postForm.typeCode,callback:function(o){e.$set(e.postForm,"typeCode",o)},expression:"postForm.typeCode"}},e._l(e.types,function(e){return t("el-option",{key:e.typeCode,attrs:{label:e.typeName,value:e.typeCode}})}))],1),e._v(" "),t("el-form-item",{attrs:{label:"图片:",prop:"region"}},[t("el-upload",{ref:"avatar",staticClass:"avatar",attrs:{accept:".jpg,.png",action:e.baseUrl+"/mapOrganization/uploadImg",headers:{Authorization:"Bearer "+e.token},"on-success":e.handleSuccess,"on-remove":e.handleRemove,"file-list":e.fileList,"list-type":"picture-card"}},[t("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),e._v(" "),e._l(e.postForm.extendsFields,function(o,r){return o.show?t("el-form-item",{key:r,class:{required:o.required},attrs:{label:o.columnCnname+":",rules:{required:o.required,trigger:"blur"},"show-message":!1,prop:"extendsFields["+r+"].extendsValue"}},[0===o.columnType?t("el-input",{attrs:{type:"text"},model:{value:o.extendsValue,callback:function(t){e.$set(o,"extendsValue",t)},expression:"item.extendsValue"}}):e._e(),e._v(" "),2===o.columnType?t("el-input",{attrs:{type:"textarea",rows:3},model:{value:o.extendsValue,callback:function(t){e.$set(o,"extendsValue",t)},expression:"item.extendsValue"}}):e._e()],1):e._e()}),e._v(" "),t("el-form-item",{attrs:{label:"排序:",prop:"orderId"}},[t("el-input",{model:{value:e.postForm.orderId,callback:function(o){e.$set(e.postForm,"orderId",o)},expression:"postForm.orderId"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"备注:",prop:"memo"}},[t("el-input",{model:{value:e.postForm.memo,callback:function(o){e.$set(e.postForm,"memo",o)},expression:"postForm.memo"}})],1),e._v(" "),t("el-form-item",{attrs:{label:"简介:",prop:"brief"}},[t("el-input",{attrs:{type:"textarea",rows:3},model:{value:e.postForm.brief,callback:function(o){e.$set(e.postForm,"brief",o)},expression:"postForm.brief"}})],1),e._v(" "),t("el-form-item",{staticClass:"btn-item"},[t("el-button",{staticClass:"btn-sub",attrs:{type:"primary"},on:{click:e.handleSub}},[e._v("提交")])],1)],2)],1)])],1),e._v(" "),t("div",{staticClass:"tool-box"},[t("div",{staticClass:"level-box"},[e.floor.floorShow?t("level-selector",{attrs:{minLevel:e.floor.minLevel,maxLevel:e.floor.maxLevel,currentFloor:e.floor.currentLevel,size:5},on:{"change-level":e.setLevel}}):e._e()],1),e._v(" "),t("div",{staticClass:"zoom-box"},[t("div",{staticClass:"item",on:{click:e.zoomIn}},[t("i",{staticClass:"el-icon-ips-jia"})]),e._v(" "),t("div",{staticClass:"line"}),e._v(" "),t("div",{staticClass:"item",on:{click:e.zoomOut}},[t("i",{staticClass:"el-icon-ips-jian"})])])])])},staticRenderFns:[]};var p=t("VU/8")(l,m,!1,function(e){t("yKJ4")},null,null);o.default=p.exports},yKJ4:function(e,o,t){var r=t("Gged");"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);t("rjj0")("600d325f",r,!0)}});
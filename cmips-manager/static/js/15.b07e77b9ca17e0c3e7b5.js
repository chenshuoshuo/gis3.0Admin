webpackJsonp([15],{VKGA:function(e,t,o){var n=o("uphR");"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);o("rjj0")("dd6ac788",n,!0)},ibVz:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o("//Fk"),a=o.n(n),i=o("mvHQ"),r=o.n(i),s=o("kuNG"),l=o("VEpC"),p=o("R/UA"),d=o("QJuQ"),c=o("zL8q"),m={inject:["baseUrl"],components:{LevelSelector:s.a},data:function(){return{isOver:!1,isFisrt:!0,types:[],campusId:null,campus:[],id:null,state:"",fileList:[],floor:{minLevel:0,maxLevel:0,floorShow:!1,currentLevel:0},postForm:{leaf:!1,brief:"",location:"",campusCode:null,typeCode:"",officialWebsite:"http://",mapOrganizationExtendsList:[],mapOrganizationImgList:[],extendsFields:[]},loaddingMap:!0,vectorMap:null}},methods:{setLevel:function(e){this.vectorMap.setLevel(e)},zoomIn:function(){this.vectorMap.zoomIn()},zoomOut:function(){this.vectorMap.zoomOut()},handleRemove:function(e,t){var o=this;e.id?this.postForm.mapOrganizationImgList.forEach(function(t,n){t.imgId===e.id&&(o.postForm.mapOrganizationImgList.splice(n,1),o.fileList.splice(n,1))}):e.url&&this.postForm.mapOrganizationImgList.forEach(function(t,n){window.g.BASE_IPS+t.imgUrl===e.url&&(o.postForm.mapOrganizationImgList.splice(n,1),o.fileList.splice(n,1))})},handleSuccess:function(e){200===e.code?(this.fileList.push({url:window.g.BASE_IPS+e.data}),this.postForm.mapOrganizationImgList.push({imgUrl:e.data})):this.$message({type:"error",message:"图片上传失败"})},handleSub:function(){var e=this;this.$refs.ruleForm.validate(function(t){t&&e.saveInfo()})},saveInfo:function(){var e=this;this.postForm.leaf=this.postForm.leaf?this.vectorMap.floorComponent.nowLevelIndex:null,"add"===this.state?(this.postForm.extendsFields.forEach(function(t){e.postForm.mapOrganizationExtendsList.push({columnId:t.columnId,typeCode:e.postForm.typeCode,extendsValue:t.extendsValue})}),Object(p.a)(this.postForm).then(function(t){200===t.data.code?(e.$message({type:"success",message:"添加成功"}),e.resetForm()):e.$message({type:"error",message:"添加失败"})})):"update"===this.state&&(this.postForm.mapOrganizationImgList.forEach(function(t){t.organizationCode=e.postForm.organizationCode}),this.postForm.mapOrganizationExtendsList=[],this.postForm.extendsFields.forEach(function(t){e.postForm.mapOrganizationExtendsList.push({organizationCode:e.postForm.organizationCode,columnId:t.columnId,typeCode:e.postForm.typeCode,extendsValue:t.extendsValue})}),delete this.postForm.mapOrganizationType,Object(p.x)(this.postForm).then(function(t){200===t.data.code?(e.$message({type:"success",message:"更新成功"}),e.$router.go(-1)):e.$message({type:"error",message:"更新失败"})}))},getOrganizationTypeList:function(){var e=this;Object(l.K)({campusCode:this.campusId}).then(function(t){200===t.data.code?e.types=t.data.data:e.$message({type:"error",message:"机构类别获取失败"})})},initExtendsDefine:function(){var e=this;this.postForm.typeCode&&Object(l.B)(this.postForm.typeCode).then(function(t){200===t.data.code?(e.postForm.mapOrganizationExtendsList&&e.postForm.mapOrganizationExtendsList.length>0?(e.postForm.mapOrganizationExtendsList.forEach(function(e){t.data.data.forEach(function(t){e.columnId===t.columnId&&(t.extendsValue=e.extendsValue)})}),e.postForm.extendsFields=t.data.data):e.postForm.extendsFields=t.data.data,e.$forceUpdate()):e.$message({type:"error",message:"扩展属性获取失败"})})},setPostForm:function(e){var t=this.vectorMap.queryRenderedFeatures(e.point),o=null;t.length>0&&(o=t[0]),this.postForm.location=""+(o&&o.properties.name?o.properties.name:"未知位置"),this.postForm.lngLatString=e.lngLat.lng+","+e.lngLat.lat,this.postForm.codeIsBuilding=!(!o||!o.properties)&&/building/.test(r()(o.properties)),this.postForm.mapCode=o&&o.properties?o.properties.id:null},initMap:function(){var e=this;console.log(1);var t=null;this.vectorMap.on("load",function(){e.vectorMap.on("zoom",function(){e.vectorMap.getZoom()>17&&Number(e.vectorMap.getMinLevel())!==Number(e.vectorMap.getMaxLevel())?(e.floor.floorShow=!0,e.floor.minLevel=Number(e.vectorMap.getMinLevel()),e.floor.maxLevel=Number(e.vectorMap.getMaxLevel())):e.floor.floorShow=!1}),e.vectorMap.on("click",function(o){null!==t&&t.remove(),(t=new window.creeper.Marker({draggable:!0}).setLngLat(o.lngLat).addTo(e.vectorMap)).on("dragend",function(){var o=e.vectorMap.queryRenderedFeatures(t._pos),n=null;o.length>0&&(n=o[0]),e.postForm.location=""+(n.properties&&n.properties.name?n.properties.name:"未知位置"),e.postForm.lngLatString=t.getLngLat().lng+","+t.getLngLat().lat,e.postForm.codeIsBuilding=!(!n||!n.properties)&&/building/.test(r()(n.properties)),e.postForm.mapCode=n.properties.id}),e.setPostForm(o)}),setTimeout(function(){if(e.postForm.lngLatString){var o=e.postForm.lngLatString.split(",");(t=new window.creeper.Marker({draggable:!0}).setLngLat(o).addTo(e.vectorMap)).on("dragend",function(){var o=e.vectorMap.queryRenderedFeatures(t._pos),n=null;o.length>0&&(n=o[0]),e.postForm.location=""+(n&&n.properties.name?n.properties.name:"未知位置"),e.postForm.lngLatString=t.getLngLat().lng+","+t.getLngLat().lat,e.postForm.codeIsBuilding=!(!n||!n.properties)&&/building/.test(r()(n.properties)),e.postForm.mapCode=n.properties.id}),e.vectorMap.flyTo({center:o,zoom:17}),setTimeout(function(){e.floor.currentLevel&&e.setLevel(e.floor.currentLevel)},1e3)}},500),e.loaddingMap=!1})},resetForm:function(){this.postForm={leaf:!1,brief:"",location:"",typeCode:"",officialWebsite:"http://",mapOrganizationExtendsList:[],mapOrganizationImgList:[]},this.$refs.avatar.clearFiles(),this.$refs.ruleForm.clearValidate()},getCampusList:function(){var e=this;return new a.a(function(t,o){Object(d.a)().then(function(n){if(0===n.data.code){var a=n.data.data.content.filter(function(e){return e.zones.filter(function(e){return e.mapZoneByZoneId.is2D}).length>0});e.campus=a.map(function(e){return e.zones=e.zones.filter(function(e){return e.mapZoneByZoneId.is2D}),e}),"add"===e.state&&(e.campusId=e.campus[0].zones[e.campus[0].zones.length-1].mapZoneByZoneId.id),t()}else o()}).catch(function(){o()})})}},watch:{campusId:function(e){this.postForm.campusCode=e,"update"===this.state&&this.isFisrt?(this.isFisrt=!1,this.getOrganizationTypeList()):(this.postForm.typeCode=null,this.getOrganizationTypeList(),this.loaddingMap=!0,this.resetForm(),this.vectorMap=new window.creeper.VectorMap("map",this.campusId,window.g.MAP_URL),this.initMap())},typeCode:function(){this.postForm.extendsFields=[],this.initExtendsDefine()},isOver:function(){this.$forceUpdate()}},computed:{typeCode:function(){return this.postForm.typeCode}},beforeMount:function(){var e=this;this.getOrganizationTypeList(),this.state=this.$route.query.method,("add"===this.state?function(){}:function(){e.$route.query.id||(e.$router.back(-1),Object(c.Message)({type:"error",message:"错误的请求方式"})),e.postForm.organizationCode=e.$route.query.id})(),this.state||(this.$router.back(-1),Object(c.Message)({type:"error",message:"错误的请求方式"}))},mounted:function(){var e=this;"update"===this.state?(Object(p.n)(this.postForm.organizationCode).then(function(t){200===t.data.code?(e.postForm=t.data.data,t.data.data.mapOrganizationImgList.forEach(function(t){e.fileList.push({id:t.imgId,url:""+window.g.BASE_IPS+t.imgUrl})}),e.campusId=t.data.data.mapOrganizationType.campusCode,e.floor.currentLevel=null===e.postForm.leaf?0:e.postForm.leaf,e.postForm.leaf=!!e.postForm.leaf,e.vectorMap=new window.creeper.VectorMap("map",e.campusId,window.g.MAP_URL),e.initMap()):(e.$message({type:"warning",message:"应用信息获取失败"}),e.$router.back(-1))}),this.getCampusList()):this.getCampusList().then(function(){e.vectorMap=new window.creeper.VectorMap("map",e.campusId,window.g.MAP_URL)})},updated:function(){this.isOver=document.getElementById("slider-content").offsetHeight-document.getElementById("slider-height").offsetHeight>0}},u={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"create-organization"},[o("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loaddingMap,expression:"loaddingMap"}],staticClass:"map-box",attrs:{id:"map","element-loading-text":"加载中...","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(0, 0, 0, 0.7)"}}),e._v(" "),o("div",{attrs:{id:"slider-height"}}),e._v(" "),o("div",{staticClass:"slider",class:{"slider-over":e.isOver}},[o("el-scrollbar",{staticStyle:{height:"100%"}},[o("div",{staticClass:"slider-content",attrs:{id:"slider-content"}},[o("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.postForm,"status-icon":"","label-width":"80px"}},[o("el-form-item",{staticClass:"required",attrs:{label:"机构名称:",prop:"organizationName",required:"","show-message":!1}},[o("el-input",{model:{value:e.postForm.organizationName,callback:function(t){e.$set(e.postForm,"organizationName",t)},expression:"postForm.organizationName"}})],1),e._v(" "),o("el-form-item",{staticClass:"required",attrs:{label:"校区:",prop:"campusCode","show-message":!1}},[o("el-select",{attrs:{placeholder:"请选择校区"},model:{value:e.campusId,callback:function(t){e.campusId=t},expression:"campusId"}},e._l(e.campus,function(e){return o("el-option",{key:e.groupId,attrs:{label:e.name,value:e.zones[e.zones.length-1].mapZoneByZoneId.id}})}))],1),e._v(" "),o("el-form-item",{staticClass:"required",attrs:{label:"机构类别:",prop:"typeCode",required:"","show-message":!1}},[o("el-select",{attrs:{placeholder:"请选择机构类别"},model:{value:e.postForm.typeCode,callback:function(t){e.$set(e.postForm,"typeCode",t)},expression:"postForm.typeCode"}},e._l(e.types,function(e){return o("el-option",{key:e.typeCode,attrs:{label:e.typeName,value:e.typeCode}})}))],1),e._v(" "),o("el-form-item",{staticClass:"required",attrs:{label:"楼层:",prop:"leaf",required:"","show-message":!1}},[o("el-select",{attrs:{placeholder:"请选择楼层"},model:{value:e.postForm.leaf,callback:function(t){e.$set(e.postForm,"leaf",t)},expression:"postForm.leaf"}},[o("el-option",{attrs:{label:"室外",value:!1}}),e._v(" "),o("el-option",{attrs:{label:"室内",value:!0}})],1)],1),e._v(" "),o("el-form-item",{attrs:{label:"图片:",prop:"region"}},[o("el-upload",{ref:"avatar",staticClass:"avatar",attrs:{accept:".jpg,.png",action:e.baseUrl+"/mapOrganization/uploadImg","on-success":e.handleSuccess,"on-remove":e.handleRemove,"file-list":e.fileList,"list-type":"picture-card"}},[o("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),e._v(" "),o("el-form-item",{staticClass:"required",attrs:{label:"位置绑定:",prop:"location",required:"","show-message":!1}},[o("el-input",{attrs:{disabled:"",placeholder:"请在地图上选择"},model:{value:e.postForm.location,callback:function(t){e.$set(e.postForm,"location",t)},expression:"postForm.location"}})],1),e._v(" "),e._l(e.postForm.extendsFields,function(t,n){return t.show?o("el-form-item",{key:n,class:{required:t.required},attrs:{label:t.columnCnname+":",rules:{required:t.required,trigger:"blur"},"show-message":!1,prop:"extendsFields["+n+"].extendsValue"}},[0===t.columnType?o("el-input",{attrs:{type:"text"},model:{value:t.extendsValue,callback:function(o){e.$set(t,"extendsValue",o)},expression:"item.extendsValue"}}):e._e(),e._v(" "),2===t.columnType?o("el-input",{attrs:{type:"textarea",rows:3},model:{value:t.extendsValue,callback:function(o){e.$set(t,"extendsValue",o)},expression:"item.extendsValue"}}):e._e()],1):e._e()}),e._v(" "),o("el-form-item",{attrs:{label:"官网地址:",prop:"officialWebsite"}},[o("el-input",{model:{value:e.postForm.officialWebsite,callback:function(t){e.$set(e.postForm,"officialWebsite",t)},expression:"postForm.officialWebsite"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"排序:",orderIdprop:"orderId"}},[o("el-input",{model:{value:e.postForm.orderId,callback:function(t){e.$set(e.postForm,"orderId",t)},expression:"postForm.orderId"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"备注:",prop:"memo"}},[o("el-input",{model:{value:e.postForm.memo,callback:function(t){e.$set(e.postForm,"memo",t)},expression:"postForm.memo"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"简介:",prop:"brief"}},[o("el-input",{attrs:{type:"textarea",rows:3},model:{value:e.postForm.brief,callback:function(t){e.$set(e.postForm,"brief",t)},expression:"postForm.brief"}})],1),e._v(" "),o("el-form-item",{staticClass:"btn-item"},[o("el-button",{staticClass:"btn-sub",attrs:{type:"primary"},on:{click:e.handleSub}},[e._v("提交")])],1)],2)],1)])],1),e._v(" "),o("div",{staticClass:"tool-box"},[o("div",{staticClass:"level-box"},[e.floor.floorShow&&e.postForm.leaf?o("level-selector",{attrs:{minLevel:e.floor.minLevel,maxLevel:e.floor.maxLevel,currentFloor:e.floor.currentLevel,size:5},on:{"change-level":e.setLevel}}):e._e()],1),e._v(" "),o("div",{staticClass:"zoom-box"},[o("div",{staticClass:"item",on:{click:e.zoomIn}},[o("i",{staticClass:"el-icon-ips-jia"})]),e._v(" "),o("div",{staticClass:"line"}),e._v(" "),o("div",{staticClass:"item",on:{click:e.zoomOut}},[o("i",{staticClass:"el-icon-ips-jian"})])])])])},staticRenderFns:[]};var g=o("VU/8")(m,u,!1,function(e){o("VKGA")},null,null);t.default=g.exports},uphR:function(e,t,o){(e.exports=o("FZ+f")(!1)).push([e.i,"\n.create-organization {\n  position: absolute;\n  top: 84px;\n  right: 0;\n  left: 0;\n  bottom: 0;\n}\n.create-organization .el-form-item.is-required .el-form-item__label:before {\n    display: none;\n}\n.create-organization .avatar-uploader .el-upload {\n    border: 1px dashed #d9d9d9;\n    border-radius: 6px;\n    cursor: pointer;\n    position: relative;\n    overflow: hidden;\n}\n.create-organization .avatar-uploader .el-upload:hover {\n    border-color: #409EFF;\n}\n.create-organization .el-upload__tip {\n    margin-left: 20px;\n    display: inline-block;\n    color: #8c939d;\n}\n.create-organization .avatar-uploader-icon {\n    font-size: 28px;\n    color: #8c939d;\n    width: 62px;\n    height: 62px;\n    line-height: 62px;\n    text-align: center;\n}\n.create-organization .el-upload-list--picture-card .el-upload-list__item-status-label i {\n    vertical-align: top;\n}\n.create-organization .el-upload-list--picture-card .el-upload-list__item, .create-organization .el-upload--picture-card {\n    width: 62px;\n    height: 62px;\n    line-height: 62px;\n}\n.create-organization .map-box {\n    position: absolute;\n    top: 0;\n    right: 0;\n    left: 0;\n    bottom: 0;\n}\n.create-organization #slider-height {\n    position: absolute;\n    top: 20px;\n    bottom: 60px;\n}\n.create-organization .slider-over {\n    bottom: 60px;\n    padding-bottom: 0 !important;\n}\n.create-organization .slider {\n    position: absolute;\n    top: 20px;\n    left: 40px;\n    width: 410px;\n    padding-bottom: 20px;\n    border: 1px solid #FDFEFF;\n    -webkit-box-shadow: 0 2px 4px rgba(4, 4, 4, 0.2);\n            box-shadow: 0 2px 4px rgba(4, 4, 4, 0.2);\n    overflow-x: hidden;\n    background: #fff;\n}\n.create-organization .el-scrollbar__wrap {\n    overflow-x: hidden;\n}\n.create-organization .slider-content {\n    width: 100%;\n    background: #fff;\n    padding: 16px 20px;\n}\n.create-organization .required .el-form-item__content::after {\n    content: '*';\n    display: inline-block;\n    color: #f56c6c;\n    margin-left: 4px;\n    vertical-align: top;\n}\n.create-organization .el-input {\n    width: 90%;\n}\n.create-organization .el-textarea {\n    width: 90%;\n}\n.create-organization .required .el-select {\n    width: 90%;\n}\n.create-organization .required .el-select .el-input {\n      width: 100%;\n}\n.create-organization .btn-sub {\n    display: inline-block;\n    padding: 10px 60px;\n    margin-left: 40px;\n}\n.create-organization label {\n    font-weight: normal;\n}\n.create-organization .btn-item {\n    margin-bottom: 0;\n}\n.create-organization .tool-box {\n    position: absolute;\n    bottom: 50px;\n    right: 30px;\n    width: 40px;\n}\n.create-organization .zoom-box {\n    width: 40px;\n    background: #fff;\n    border: 1px solid rgba(4, 4, 4, 0.1);\n    -webkit-box-shadow: 0 2px 4px rgba(4, 4, 4, 0.2);\n            box-shadow: 0 2px 4px rgba(4, 4, 4, 0.2);\n    border-radius: 3px;\n}\n.create-organization .zoom-box .item {\n      height: 40px;\n      line-height: 40px;\n      font-size: 20px;\n      text-align: center;\n      background: #fff;\n      border-radius: 3px;\n      color: #666;\n      cursor: pointer;\n}\n.create-organization .zoom-box .item:active {\n      color: #999;\n}\n.create-organization .zoom-box .line {\n      margin: 0 auto;\n      width: 20px;\n      border-bottom: 1px solid rgba(4, 4, 4, 0.2);\n}\n",""])}});
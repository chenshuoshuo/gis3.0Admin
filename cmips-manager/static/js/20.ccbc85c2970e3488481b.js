webpackJsonp([20],{"1NdZ":function(e,t,n){var a=n("dE2Q");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);n("rjj0")("1406bda4",a,!0)},JzG1:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("cAgV"),o=n("R/UA"),i=n("QJuQ"),l=n("TZKF"),s=n("oTRi"),r=n("2VPV"),c=n("VEpC"),u=n("Zhbd"),d={inject:["baseUrl"],directives:{waves:a.a},components:{"import-dialog":u.a},data:function(){return{downloading:!1,isImport:!1,isExport:!1,isRefreash:!1,multipleSelection:[],list:null,total:0,listLoading:!1,listQuery:{page:1,pageSize:10},campus:[],categories:[]}},methods:{getList:function(){var e=this;this.listQuery.page--,this.listLoading=!0,Object(o.v)(this.listQuery).then(function(t){e.listQuery.page++,e.listLoading=!1,200===t.data.code?(e.list=t.data.data.content,e.total=t.data.data.totalElements):e.$message({type:"warning",message:"机构信息列表获取失败"})})},getCampus:function(){var e=this;Object(i.a)().then(function(t){if(0===t.data.code){var n=t.data.data.content.filter(function(e){return e.zones.filter(function(e){return e.mapZoneByZoneId.is2D}).length>0});e.campus=n.map(function(e){return e.zones=e.zones.filter(function(e){return e.mapZoneByZoneId.is2D}),e})}})},handleSelectionChange:function(e){this.multipleSelection=e},handleRefreash:function(){var e=this;this.isRefreash=!0,Object(r.c)({userId:window.cmips_userId}).then(function(t){e.isRefreash=!1,0===t.data.code?e.$notify({title:"成功",message:"房间数据刷新成功",type:"success"}):e.$notify.error({title:"错误",message:"房间信息刷新失败"})})},handlerSearch:function(){this.listQuery.page=1,this.getList()},handleSizeChange:function(e){this.listQuery.pageSize=e,this.getList()},handleCurrentChange:function(e){this.listQuery.page=e,this.getList()},handleDeletMany:function(){var e=this;this.multipleSelection.length>0?this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(o.g)(e.multipleSelection.map(function(e){return e.roomCode}).join(",")).then(function(t){200===t.data.code?(e.$message({type:"success",message:"删除成功"}),e.getList()):e.$message({type:"error",message:"删除失败"})})}):this.$alert("请选择要删除的数据","消息提示",{confirmButtonText:"确定",type:"warning"})},downloadTemplate:function(){var e=this;this.downloading=!0,Object(l.i)().then(function(t){if(e.downloading=!1,t.data){var n=new Blob([t.data],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"}),a=window.URL.createObjectURL(n),o=document.createElement("a");o.style.display="none",o.href=a,o.setAttribute("download","房间信息template-"+(new Date).toLocaleString()+".xlsx"),document.body.appendChild(o),o.click(),document.body.removeChild(o),window.URL.revokeObjectURL(a)}})},handleImportExecel:function(){this.$refs.upload.openUpload()},handleExport:function(){var e=this;this.isExport=!0,Object(s.i)({userId:window.cmips_userId}).then(function(t){if(e.isExport=!1,t.data){var n=new Blob([t.data],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"}),a=window.URL.createObjectURL(n),o=document.createElement("a");o.style.display="none",o.href=a,o.setAttribute("download","房间信息-"+(new Date).toLocaleString()+".xlsx"),document.body.appendChild(o),o.click(),document.body.removeChild(o),window.URL.revokeObjectURL(a)}})},handleModifyStatus:function(e){var t=this;this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(o.l)(e).then(function(e){200===e.data.code?(t.$message({type:"success",message:"删除成功"}),t.getList()):t.$message({type:"error",message:"删除失败"})})})}},beforeMount:function(){var e=this;this.getList(),this.getCampus(),Object(c.N)().then(function(t){200===t.data.code?e.categories=t.data.data:e.$message({type:"error",message:"房间类别获取失败"})})}},p={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-container info-room"},[n("div",{staticClass:"filter-container"},[n("el-form",{ref:"form",attrs:{"label-position":"left",inline:!0}},[n("el-form-item",{attrs:{label:e.$t("form.campus")+":"}},[n("el-select",{attrs:{placeholder:"请选择校区",clearable:""},model:{value:e.listQuery.campusCode,callback:function(t){e.$set(e.listQuery,"campusCode",t)},expression:"listQuery.campusCode"}},e._l(e.campus,function(e){return n("el-option",{key:e.groupId,attrs:{label:e.name,value:e.zones[e.zones.length-1].mapZoneByZoneId.id}})}))],1),e._v(" "),n("el-form-item",{attrs:{label:"房间类别:"}},[n("el-select",{attrs:{placeholder:"请选择类别",clearable:""},model:{value:e.listQuery.typeCode,callback:function(t){e.$set(e.listQuery,"typeCode",t)},expression:"listQuery.typeCode"}},e._l(e.categories,function(e){return n("el-option",{key:e.typeCode,attrs:{label:e.typeName,value:e.typeCode}})}))],1),e._v(" "),n("el-form-item",{attrs:{label:"房间名称:"}},[n("el-input",{staticClass:"filter-item",model:{value:e.listQuery.roomName,callback:function(t){e.$set(e.listQuery,"roomName",t)},expression:"listQuery.roomName"}})],1),e._v(" "),n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handlerSearch}},[e._v(e._s(e.$t("button.search")))]),e._v(" "),n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticStyle:{"margin-left":"10px"},attrs:{type:"danger",icon:"el-icon-delete"},on:{click:e.handleDeletMany}},[e._v("批量删除")]),e._v(" "),n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticStyle:{"margin-left":"10px"},attrs:{type:"temp",icon:"el-icon-ips-shuju",loading:e.downloading},on:{click:e.downloadTemplate}},[e._v("下载导入模板")]),e._v(" "),n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{type:"import",icon:"el-icon-ips-daoru",loading:e.isImport},on:{click:e.handleImportExecel}},[e._v("导入")]),e._v(" "),n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{type:"export",icon:"el-icon-ips-daochu",loading:e.isExport},on:{click:e.handleExport}},[e._v("导出")]),e._v(" "),n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{type:"warning",icon:"el-icon-ips-shuaxin",loading:e.isRefreash},on:{click:e.handleRefreash}},[e._v("地图刷新")])],1)],1),e._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:e.list,"element-loading-text":"加载中...",border:"",fit:"","highlight-current-row":""},on:{"selection-change":e.handleSelectionChange}},[n("el-table-column",{attrs:{type:"selection",width:"55"}}),e._v(" "),n("el-table-column",{attrs:{width:"100",align:"center",label:e.$t("table.number")},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.roomCode))])]}}])}),e._v(" "),n("el-table-column",{attrs:{width:"150",align:"center",label:"图片"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[n("img",{attrs:{src:t.row.mapRoomImgList[0]?e.baseUrl+t.row.mapRoomImgList[0].imgUrl:"",alt:"",width:"60px"}})])]}}])}),e._v(" "),n("el-table-column",{attrs:{align:"center",label:"房间名称","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.roomName))])]}}])}),e._v(" "),n("el-table-column",{attrs:{align:"center",label:"英文名称"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.enName))])]}}])}),e._v(" "),n("el-table-column",{attrs:{align:"center",label:"别名"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.alias))])]}}])}),e._v(" "),n("el-table-column",{attrs:{align:"center",label:"门牌号"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.roomCode))])]}}])}),e._v(" "),n("el-table-column",{attrs:{align:"center",label:"校区"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.campusName))])]}}])}),e._v(" "),n("el-table-column",{attrs:{align:"center",label:"房间类别"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.mapRoomType.typeName))])]}}])}),e._v(" "),n("el-table-column",{attrs:{align:"center",label:e.$t("table.option"),"class-name":"small-padding fixed-width",width:"160"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("router-link",{attrs:{to:{path:"/information-manager/createRoom",query:{method:"update",id:t.row.roomCode}}}},[n("el-button",{attrs:{type:"success",size:"mini"}},[e._v(e._s(e.$t("button.edit")))])],1),e._v(" "),n("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(n){e.handleModifyStatus(t.row.roomCode)}}},[e._v(e._s(e.$t("button.delete")))])]}}])})],1),e._v(" "),n("div",{staticClass:"pagination-container"},[n("el-pagination",{attrs:{background:"","current-page":e.listQuery.page,"page-sizes":[10,20,30,50],"page-size":e.listQuery.limit,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),e._v(" "),n("import-dialog",{ref:"upload",attrs:{uploadUrl:"/mapRoom/upload",update:e.getList}})],1)},staticRenderFns:[]};var m=n("VU/8")(d,p,!1,function(e){n("1NdZ")},null,null);t.default=m.exports},dE2Q:function(e,t,n){(e.exports=n("FZ+f")(!1)).push([e.i,"\n.info-room {\n  padding: 20px;\n}\n.info-room .el-form-item {\n    margin-bottom: 14px;\n}\n",""])}});
webpackJsonp([7],{"2W/3":function(e,t,n){var a=n("lqyZ");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);n("rjj0")("2d948e31",a,!0)},"6L64":function(e,t,n){(e.exports=n("FZ+f")(!1)).push([e.i,"\n.map-correction {\n  padding: 20px;\n}\n.map-correction .fixed-width .el-button--mini {\n    display: inline-block;\n    width: auto;\n}\n.map-correction .el-dialog {\n    padding: 4px;\n    border: 1px solid #909399;\n}\n.map-correction .el-carousel__item {\n    text-align: center;\n    line-height: 480px;\n}\n.map-correction .el-carousel__item img {\n      max-height: 480px;\n}\n.map-correction .el-dialog__headerbtn {\n    z-index: 999;\n}\n.map-correction .el-dialog__headerbtn .el-dialog__close {\n    color: #eee;\n    padding: 4px;\n    background: rgba(144, 147, 153, 0.6);\n    border-radius: 50%;\n}\n.map-correction .el-dialog__header {\n    padding: 0;\n}\n.map-correction .el-dialog__body {\n    padding: 0;\n}\n",""])},GyiH:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("cAgV"),i=n("vLgD");var l=n("QJuQ"),o={inject:["baseUrl"],directives:{waves:a.a},data:function(){return{multipleSelection:[],list:null,pos:"",total:0,listLoading:!1,pic:[],showPos:!1,showPic:!1,vectorMap:null,marker:null,initMap:!0,campus:[],listQuery:{page:1,pageSize:10},formData:{}}},methods:{getList:function(){var e,t=this;this.listQuery.page--,(e=this.listQuery,Object(i.a)({url:"/correct/search",method:"get",params:e})).then(function(e){t.listQuery.page++,e.data.status?(t.list=e.data.data.content,t.total=e.data.data.totalElements):t.$message({type:"warning",message:"列表获取失败"})})},getCampus:function(){var e=this;Object(l.a)().then(function(t){if(t.data.status){var n=t.data.data.content.filter(function(e){return e.zones.filter(function(e){return e.mapZoneByZoneId.is2D}).length>0});e.campus=n.map(function(e){return e.zones=e.zones.filter(function(e){return e.mapZoneByZoneId.is2D}),e})}})},handleSelectionChange:function(e){this.multipleSelection=e},handleClose:function(){this.formData={},this.$refs.postForm.resetFields()},handlerSearch:function(){this.listQuery.page=1,this.getList()},handleSizeChange:function(e){this.listQuery.pageSize=e,this.getList()},handleView:function(e){this.showPic=!0,this.pic=e},addMaker:function(){var e=this;setTimeout(function(){e.marker=(new window.creeper.Marker).setLngLat(e.pos).addTo(e.vectorMap),e.vectorMap.flyTo({center:e.pos,zoom:16})},200)},handlePos:function(e){var t=this;this.showPos=!0,this.pos=e.coordinates,this.initMap?(this.initMap=!1,setTimeout(function(){window.creeper.CreeperConfig.token="cWluY2hlbmdqaWU6MTIzNDU2",t.vectorMap=new window.creeper.VectorMap("map",1,window.g.MAP_URL),t.addMaker()},200)):this.addMaker()},handleRemoveMaker:function(e){this.marker.remove(),e()},handleCurrentChange:function(e){this.listQuery.page=e,this.getList()},handleDeletMany:function(){var e=this;this.multipleSelection.length>0?this.$confirm("此操作将永久删除选中的纠错, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var t;(t=e.multipleSelection.map(function(e){return e.errorId}),Object(i.a)({url:"/correct/deleteAll",method:"delete",data:t})).then(function(t){t.data.status?(e.$message({type:"success",message:"删除成功"}),e.getList()):e.$message({type:"warning",message:"删除失败"})})}):this.$alert("请选择要删除的数据","消息提示",{confirmButtonText:"确定",type:"warning"})},handleModifyStatus:function(e){var t=this;this.$confirm("此操作将永久删除该纠错, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var n;(n=e,Object(i.a)({url:"/correct/delete/"+n,method:"delete"})).then(function(e){e.data.status?(t.$message({type:"success",message:"删除成功"}),t.getList()):t.$message({type:"warning",message:"删除失败"})})})}},mounted:function(){this.getList(),this.getCampus()}},s={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-container map-correction"},[n("div",{staticClass:"filter-container"},[n("el-form",{ref:"form",attrs:{"label-position":"left",inline:!0}},[n("el-form-item",{attrs:{label:e.$t("form.positionName")+":"}},[n("el-input",{staticClass:"filter-item",model:{value:e.listQuery.locationName,callback:function(t){e.$set(e.listQuery,"locationName",t)},expression:"listQuery.locationName"}})],1),e._v(" "),n("el-form-item",{attrs:{label:e.$t("form.campus")+":"}},[n("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:e.listQuery.mapCode,callback:function(t){e.$set(e.listQuery,"mapCode",t)},expression:"listQuery.mapCode"}},e._l(e.campus,function(e){return n("el-option",{key:e.groupId,attrs:{label:e.name,value:e.zones[e.zones.length-1].mapZoneByZoneId.id}})}))],1),e._v(" "),n("el-form-item",{attrs:{label:e.$t("form.mapType")+":"}},[n("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:e.listQuery.mapIs2d,callback:function(t){e.$set(e.listQuery,"mapIs2d",t)},expression:"listQuery.mapIs2d"}},[n("el-option",{attrs:{label:"2D",value:1}}),e._v(" "),n("el-option",{attrs:{label:"3D",value:0}})],1)],1),e._v(" "),n("el-form-item",{attrs:{label:e.$t("form.username")+":"}},[n("el-input",{staticClass:"filter-item",model:{value:e.listQuery.userName,callback:function(t){e.$set(e.listQuery,"userName",t)},expression:"listQuery.userName"}})],1),e._v(" "),n("el-form-item",{attrs:{label:e.$t("form.workNumber")+":"}},[n("el-input",{staticClass:"filter-item",model:{value:e.listQuery.userCode,callback:function(t){e.$set(e.listQuery,"userCode",t)},expression:"listQuery.userCode"}})],1),e._v(" "),n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handlerSearch}},[e._v(e._s(e.$t("button.search"))+"\n            ")]),e._v(" "),n("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"danger",icon:"el-icon-delete"},on:{click:e.handleDeletMany}},[e._v(e._s(e.$t("button.delete"))+"\n            ")])],1)],1),e._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:e.list,"element-loading-text":"加载中...",border:"",fit:"","highlight-current-row":""},on:{"selection-change":e.handleSelectionChange}},[n("el-table-column",{attrs:{type:"selection",width:"55"}}),e._v(" "),n("el-table-column",{attrs:{align:"center",width:"160",label:e.$t("table.position")},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.locationName))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:e.$t("table.campus"),align:"center",width:"160"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.campusName))])]}}])}),e._v(" "),n("el-table-column",{attrs:{align:"center",label:e.$t("table.mapType"),width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.mapIs2D?"2D":"3D"))])]}}])}),e._v(" "),n("el-table-column",{attrs:{align:"center",label:e.$t("table.correctContent"),"show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.description))])]}}])}),e._v(" "),n("el-table-column",{attrs:{align:"center",label:e.$t("table.username"),width:"160"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.userName))])]}}])}),e._v(" "),n("el-table-column",{attrs:{align:"center",label:e.$t("table.workNumber"),width:"160"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.userCode))])]}}])}),e._v(" "),n("el-table-column",{attrs:{align:"center",label:"联系方式",width:"160"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.contact))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:e.$t("table.commitTime"),align:"center",width:"240"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(e._f("parseTime")(t.row.submissionTime,"{y}-{m}-{d} {h}:{i}")))])]}}])}),e._v(" "),n("el-table-column",{attrs:{width:"300",align:"center",label:e.$t("table.option"),"class-name":"small-padding fixed-width"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{type:"primary",size:"mini",disabled:!t.row.lngLat},on:{click:function(n){e.handlePos(t.row.lngLat)}}},[e._v(e._s(e.$t("button.viewPos")))]),e._v(" "),n("el-button",{attrs:{type:"warning",size:"mini",disabled:!t.row.hasImg},on:{click:function(n){e.handleView(t.row.imgList)}}},[e._v(e._s(e.$t("button.viewPic")))]),e._v(" "),n("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(n){e.handleModifyStatus(t.row.errorId)}}},[e._v(e._s(e.$t("button.delete")))])]}}])})],1),e._v(" "),n("div",{staticClass:"pagination-container"},[n("el-pagination",{attrs:{background:"","current-page":e.listQuery.page,"page-sizes":[10,20,30,50],"page-size":e.listQuery.limit,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),e._v(" "),n("el-dialog",{attrs:{title:"",visible:e.showPic,width:"800px"},on:{"update:visible":function(t){e.showPic=t}}},[n("div",{staticClass:"block"},[n("el-carousel",{attrs:{height:"480px","indicator-position":"none",loop:!1,autoplay:!1}},e._l(e.pic,function(t){return n("el-carousel-item",{key:t.imgId},[n("img",{attrs:{src:e.baseUrl+t.imgUrl,alt:""}})])}))],1)]),e._v(" "),n("el-dialog",{attrs:{title:"",visible:e.showPos,"before-close":e.handleRemoveMaker,width:"800px"},on:{"update:visible":function(t){e.showPos=t}}},[n("div",{staticClass:"map-box",staticStyle:{height:"500px"},attrs:{id:"map"}})])],1)},staticRenderFns:[]};var r=n("VU/8")(o,s,!1,function(e){n("S9aE"),n("2W/3")},"data-v-39935c52",null);t.default=r.exports},S9aE:function(e,t,n){var a=n("6L64");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);n("rjj0")("d2ac85f2",a,!0)},lqyZ:function(e,t,n){(e.exports=n("FZ+f")(!1)).push([e.i,"\n.form-box[data-v-39935c52] {\n  padding-right: 30px;\n  padding-left: 10px;\n}\n",""])}});
webpackJsonp([3],{"4X8X":function(t,e,a){(t.exports=a("FZ+f")(!1)).push([t.i,"\n.form-box[data-v-b713354e] {\n  padding-right: 30px;\n  padding-left: 10px;\n}\n",""])},Iz4F:function(t,e,a){var n=a("SMvL");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a("rjj0")("2df84b9e",n,!0)},MthA:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("cAgV"),s=a("Hadi"),o=a("QJuQ"),i={name:"ground-panorama",directives:{waves:n.a},data:function(){return{state:"",showForm:!1,multipleSelection:[],list:[],total:0,campus:[],listLoading:!1,listQuery:{page:1,pageSize:10,roamType:2},formData:{roamType:2}}},methods:{getList:function(){var t=this;this.listLoading=!0,this.listQuery.page--,Object(s.f)(this.listQuery).then(function(e){e.data.status?(t.list=e.data.data.content,t.total=e.data.data.totalElements):t.$message({type:"error",message:"列表获取失败"})}).finally(function(){t.listLoading=!1,t.listQuery.page++})},handleSelectionChange:function(t){this.multipleSelection=t},getCampus:function(){var t=this;Object(o.a)().then(function(e){if(e.data.status){var a=e.data.data.content.filter(function(t){return t.zones.filter(function(t){return t.mapZoneByZoneId.is2D}).length>0});t.campus=a.map(function(t){return t.zones=t.zones.filter(function(t){return t.mapZoneByZoneId.is2D}),t})}})},handleAdd:function(){this.state="add",this.showForm=!0},handleClose:function(){this.formData={roamType:2},this.$refs.postForm.resetFields()},handleEdit:function(t){var e=this;this.state="edit",Object(s.d)(t).then(function(t){t.data.status?(e.formData=t.data.data,e.showForm=!0):e.$message({type:"error",message:"航拍信息获取失败"})})},handlerSearch:function(){this.listQuery.page=1,this.getList()},handleSizeChange:function(t){this.listQuery.pageSize=t,this.getList()},handleCurrentChange:function(t){this.listQuery.page=t,this.getList()},handleDeletMany:function(){var t=this;this.multipleSelection.length>0?this.$confirm("此操作将永久删除选中的地面全景, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(s.b)(t.multipleSelection.map(function(t){return t.roamId})).then(function(e){e.data.status?(t.$message({type:"success",message:"删除成功"}),t.getList()):t.$message({type:"warning",message:"删除失败"})})}):this.$alert("请选择要删除的数据","消息提示",{confirmButtonText:"确定",type:"warning"})},handleSubmit:function(){var t=this;this.isSub=!0,"add"===this.state?Object(s.a)(this.formData).then(function(e){e.data.status?(t.$message({type:"success",message:"添加成功"}),t.getList(),t.showForm=!1):t.$message({type:"warning",message:"添加失败"})}).finally(function(){t.isSub=!1}):"edit"===this.state&&(delete this.formData.lngLat,Object(s.g)(this.formData.roamId,this.formData).then(function(e){e.data.status?(t.$message({type:"success",message:"更新成功"}),t.getList(),t.showForm=!1):t.$message({type:"warning",message:"更新失败"}).finally(function(){t.isSub=!1})}))},handleModifyStatus:function(t){var e=this;this.$confirm("此操作将永久删除该全景, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(s.c)(t).then(function(t){t.data.status?(e.$message({type:"success",message:"删除成功"}),e.getList()):e.$message({type:"warning",message:"删除失败"})})})}},beforeMount:function(){this.getList(),this.getCampus()}},r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container campus-aerial"},[a("div",{staticClass:"filter-container"},[a("el-form",{ref:"form",attrs:{"label-position":"left",model:t.listQuery,inline:!0}},[a("el-form-item",{attrs:{label:t.$t("form.roamCamName")+":"}},[a("el-input",{staticClass:"filter-item",model:{value:t.listQuery.roamName,callback:function(e){t.$set(t.listQuery,"roamName",e)},expression:"listQuery.roamName"}})],1),t._v(" "),a("el-form-item",{attrs:{label:t.$t("form.campus")+":",prop:"campusCode"}},[a("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:t.listQuery.campusCode,callback:function(e){t.$set(t.listQuery,"campusCode",e)},expression:"listQuery.campusCode"}},t._l(t.campus,function(t){return a("el-option",{key:t.groupId,attrs:{label:t.name,value:t.zones[t.zones.length-1].mapZoneByZoneId.id}})}))],1),t._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.handlerSearch}},[t._v(t._s(t.$t("button.search"))+"\n            ")]),t._v(" "),a("router-link",{attrs:{to:{path:"/panoramic-roaming/creategroundPanorama",query:{method:"add"}}}},[a("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"success",icon:"el-icon-edit"}},[t._v(t._s(t.$t("button.add"))+"\n            ")])],1),t._v(" "),a("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"danger",icon:"el-icon-delete"},on:{click:t.handleDeletMany}},[t._v(t._s(t.$t("button.delete"))+"\n            ")])],1)],1),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:t.list,"element-loading-text":"加载中...",border:"",fit:"","highlight-current-row":""},on:{"selection-change":t.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55",align:"center"}}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"位置"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.location))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:t.$t("table.campus"),align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.campusName))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"全景名称"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n                "+t._s(e.row.roamName)+"\n            ")]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"全景地址","show-overflow-tooltip":""},scopedSlots:t._u([{key:"default",fn:function(e){return[a("a",{staticStyle:{"text-description":"underline"},attrs:{href:e.row.roamnUrl,target:"_blank"}},[t._v(t._s(e.row.roamnUrl))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:t.$t("table.updateTime"),align:"center",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._f("parseTime")(e.row.updateTime,"{y}-{m}-{d} {h}:{i}")))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:t.$t("table.option"),"class-name":"small-padding fixed-width",width:"160"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("router-link",{attrs:{to:{path:"/panoramic-roaming/creategroundPanorama",query:{method:"update",id:e.row.roamId}}}},[a("el-button",{attrs:{type:"success",size:"mini"}},[t._v(t._s(t.$t("button.edit")))])],1),t._v(" "),a("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(a){t.handleModifyStatus(e.row.roamId)}}},[t._v(t._s(t.$t("button.delete")))])]}}])})],1),t._v(" "),a("div",{staticClass:"pagination-container"},[a("el-pagination",{attrs:{background:"","current-page":t.listQuery.page,"page-sizes":[10,20,30,50],"page-size":t.listQuery.limit,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1),t._v(" "),a("el-dialog",{attrs:{title:t.$t("button."+t.state),width:"450px",visible:t.showForm},on:{"update:visible":function(e){t.showForm=e},close:t.handleClose}},[a("el-form",{ref:"postForm",staticClass:"post-form",attrs:{model:t.formData,"label-position":"right","label-width":"100px"}},[a("el-form-item",{attrs:{label:t.$t("form.flyCamName")+":",prop:"roamName",required:""}},[a("el-input",{model:{value:t.formData.roamName,callback:function(e){t.$set(t.formData,"roamName",e)},expression:"formData.roamName"}})],1),t._v(" "),a("el-form-item",{attrs:{label:t.$t("form.campus")+":",prop:"campusCode",required:""}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:t.formData.campusCode,callback:function(e){t.$set(t.formData,"campusCode",e)},expression:"formData.campusCode"}},t._l(t.campus,function(t){return a("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}))],1),t._v(" "),a("el-form-item",{attrs:{label:t.$t("form.flyCamUrl")+":",prop:"roamnUrl",required:""}},[a("el-input",{model:{value:t.formData.roamnUrl,callback:function(e){t.$set(t.formData,"roamnUrl",e)},expression:"formData.roamnUrl"}})],1),t._v(" "),a("el-form-item",{attrs:{label:t.$t("form.sort")+":",prop:"orderId",required:""}},[a("el-input",{model:{value:t.formData.orderId,callback:function(e){t.$set(t.formData,"orderId",e)},expression:"formData.orderId"}})],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.showForm=!1}}},[t._v(t._s(t.$t("button.cancel")))]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.handleSubmit}},[t._v(t._s(t.$t("button.submit")))])],1)],1)],1)},staticRenderFns:[]};var l=a("VU/8")(i,r,!1,function(t){a("Iz4F"),a("VMNa")},"data-v-b713354e",null);e.default=l.exports},SMvL:function(t,e,a){(t.exports=a("FZ+f")(!1)).push([t.i,"\n.campus-aerial {\n  padding: 20px;\n}\n.campus-aerial .post-form .required .el-form-item__content::after {\n    content: '*';\n    display: inline-block;\n    color: #f56c6c;\n    margin-left: 4px;\n    vertical-align: top;\n}\n.campus-aerial .post-form .el-input {\n    width: 280px;\n}\n.campus-aerial .el-dialog__body {\n    padding-bottom: 0;\n}\n",""])},VMNa:function(t,e,a){var n=a("4X8X");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a("rjj0")("c88fd734",n,!0)}});
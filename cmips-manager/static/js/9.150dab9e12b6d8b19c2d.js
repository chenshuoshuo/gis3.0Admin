webpackJsonp([9],{"5NJF":function(e,t,a){var n=a("M/dX");"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);a("rjj0")("af0cb39a",n,!0)},"M/dX":function(e,t,a){(e.exports=a("FZ+f")(!1)).push([e.i,"\n.form-box[data-v-3839025e] {\n  padding-right: 30px;\n  padding-left: 10px;\n}\n",""])},g1cm:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("cAgV"),o=a("TIfe"),i=a("VEpC"),s=a("QJuQ"),r=a("TZKF"),l=a("oTRi"),c=a("YMf5"),d=a("Zhbd"),u={inject:["baseUrl"],components:{configFiled:c.a,"import-dialog":d.a},directives:{waves:n.a},data:function(){return{picUrl:"",searchIconUrl:"",typeCode:"",state:"",isSub:!1,downloading:!1,token:Object(o.d)(),isImport:!1,isExport:!1,fields:[],showForm:!1,multipleSelection:[],campus:[],rules:{campusCode:[{required:!0,message:"请选择校区"}],menuIcon:[{required:!0,message:"请上传图片"}],searchIcon:[{required:!0,message:"请上传图片"}],typeName:[{required:!0,message:"请填写类别名称",tigger:"blur"}],orderId:[{type:"number",required:!0,message:"请填写排序,必须由数字组成",tigger:"blur"}]},list:null,total:0,listLoading:!1,listQuery:{page:1,pageSize:10},showReviewer:!1,formData:{}}},methods:{getList:function(){var e=this;this.listQuery.page--,this.listLoading=!0,Object(i.P)(this.listQuery).then(function(t){e.listLoading=!1,e.listQuery.page++,200===t.data.code?(e.list=t.data.data.content,e.total=t.data.data.totalElements):e.$message({type:"warning",message:"机构类别列表获取失败，请重试"})})},getCampus:function(){var e=this;Object(s.a)().then(function(t){if(0===t.data.code){var a=t.data.data.content.filter(function(e){return e.zones.filter(function(e){return e.mapZoneByZoneId.is2D}).length>0});e.campus=a.map(function(e){return e.zones=e.zones.filter(function(e){return e.mapZoneByZoneId.is2D}),e})}})},handleSelectionChange:function(e){this.multipleSelection=e},handleAdd:function(){this.state="add",this.showForm=!0},handleClose:function(){this.picUrl="",this.searchIconUrl="",this.$refs.postForm.clearValidate(),this.formData={}},handleDelColumn:function(e){var t=this;Object(i.r)({columnId:e,typeCode:this.typeCode}).then(function(e){200===e.data.code?(t.$message({type:"success",message:"删除成功"}),t.getList()):t.$message({type:"warning",message:"删除失败"})})},handleConfigSub:function(e){var t=this;e.forEach(function(e){e.typeCode=t.typeCode}),Object(i.c)(e).then(function(e){200===e.data.code?(t.$message({type:"success",message:"提交成功"}),t.getList(),t.showForm=!1,t.$refs.config.close()):t.$message({type:"warning",message:"提交失败"})})},handleEdit:function(e){var t=this;this.state="edit",Object(i.F)(e).then(function(e){200===e.data.code?(t.formData=e.data.data,t.picUrl=t.baseUrl+t.formData.menuIcon,t.searchIconUrl=t.baseUrl+t.formData.searchIcon,t.showForm=!0):t.$message({type:"warning",message:"机构类别信息获取失败，请重试"})})},handleConfig:function(e){var t=this;this.typeCode=e,Object(i.B)(e).then(function(e){200===e.data.code?(t.fields=e.data.data,t.$refs.config.open()):t.$message({type:"warning",message:"获取扩展字段失败"})})},handlerSearch:function(){this.listQuery.page=1,this.getList()},handleSizeChange:function(e){this.listQuery.pageSize=e,this.getList()},handleCurrentChange:function(e){this.listQuery.page=e,this.getList()},handleRefreash:function(){},handleAvatarSuccess:function(e,t){this.formData.menuIcon=e.data,this.picUrl=URL.createObjectURL(t.raw)},handleSearchSuccess:function(e,t){this.formData.searchIcon=e.data,this.searchIconUrl=URL.createObjectURL(t.raw)},handleDeletMany:function(){var e=this;this.multipleSelection.length>0?this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(i.g)(e.multipleSelection.map(function(e){return e.typeCode}).join(",")).then(function(t){200===t.data.code?(e.$message({type:"success",message:"删除成功"}),e.getList()):e.$message({type:"warning",message:"删除失败"})})}):this.$alert("请选择要删除的数据","消息提示",{confirmButtonText:"确定",type:"warning"})},handleSubmit:function(){var e=this;this.$refs.postForm.validate(function(t){if(!t)return!1;e.save()})},save:function(){var e=this;this.isSub=!0,"add"===this.state?Object(i.l)(this.formData).then(function(t){200===t.data.code?(e.$message({type:"success",message:"添加成功"}),e.getList(),e.showForm=!1):e.$message({type:"warning",message:"添加失败"})}).finally(function(){e.isSub=!1}):"edit"===this.state&&Object(i.V)(this.formData).then(function(t){200===t.data.code?(e.$message({type:"success",message:"更新成功"}),e.getList(),e.showForm=!1):e.$message({type:"warning",message:"更新失败"})}).finally(function(){e.isSub=!1})},handleModifyStatus:function(e){var t=this;this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(i.v)(e).then(function(e){200===e.data.code?(t.$message({type:"success",message:"删除成功"}),t.getList()):t.$message({type:"warning",message:"删除失败"})})})},downloadTemplate:function(){var e=this;this.downloading=!0,Object(r.d)().then(function(t){if(e.downloading=!1,t.data){var a=new Blob([t.data],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"}),n=window.URL.createObjectURL(a),o=document.createElement("a");o.style.display="none",o.href=n,o.setAttribute("download","机构类别template-"+(new Date).toLocaleString()+".xlsx"),document.body.appendChild(o),o.click(),document.body.removeChild(o),window.URL.revokeObjectURL(n)}})},handleImportExecel:function(){this.$refs.upload.openUpload()},handleExport:function(){var e=this;this.isExport=!0,Object(l.d)({userId:window.cmips_userId}).then(function(t){if(e.isExport=!1,t.data){var a=new Blob([t.data],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"}),n=window.URL.createObjectURL(a),o=document.createElement("a");o.style.display="none",o.href=n,o.setAttribute("download","机构类别-"+(new Date).toLocaleString()+".xlsx"),document.body.appendChild(o),o.click(),document.body.removeChild(o),window.URL.revokeObjectURL(n)}})}},beforeMount:function(){this.getList(),this.getCampus()}},p={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container attr-organization"},[a("div",{staticClass:"filter-container"},[a("el-form",{ref:"form",attrs:{"label-position":"left",inline:!0}},[a("el-form-item",{attrs:{label:e.$t("form.campus")+":"}},[a("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:e.listQuery.campusCode,callback:function(t){e.$set(e.listQuery,"campusCode",t)},expression:"listQuery.campusCode"}},e._l(e.campus,function(e){return a("el-option",{key:e.groupId,attrs:{label:e.name,value:e.zones[e.zones.length-1].mapZoneByZoneId.id}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:e.$t("form.categoryName")+":"}},[a("el-input",{staticClass:"filter-item",model:{value:e.listQuery.typeName,callback:function(t){e.$set(e.listQuery,"typeName",t)},expression:"listQuery.typeName"}})],1),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handlerSearch}},[e._v(e._s(e.$t("button.search"))+"\n            ")]),e._v(" "),a("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"success",icon:"el-icon-edit"},on:{click:e.handleAdd}},[e._v(e._s(e.$t("button.add"))+"\n            ")]),e._v(" "),a("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"danger",icon:"el-icon-delete"},on:{click:e.handleDeletMany}},[e._v(e._s(e.$t("button.delete"))+"\n            ")]),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticStyle:{"margin-left":"10px"},attrs:{type:"temp",icon:"el-icon-ips-shuju",loading:e.downloading},on:{click:e.downloadTemplate}},[e._v("下载导入模板")]),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{type:"import",icon:"el-icon-ips-daoru",loading:e.isImport},on:{click:e.handleImportExecel}},[e._v("导入")]),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{type:"export",icon:"el-icon-ips-daochu",loading:e.isExport},on:{click:e.handleExport}},[e._v("导出")])],1)],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:e.list,"element-loading-text":"加载中...",border:"",fit:"","highlight-current-row":""},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{width:"100",label:e.$t("table.number"),align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.typeCode))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:e.$t("table.menuIcon")},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticClass:"menu-icon"},[a("img",{attrs:{src:t.row.menuIcon?e.baseUrl+t.row.menuIcon:"",alt:""}})])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:e.$t("table.searchIcon")},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticClass:"search-icon"},[a("img",{attrs:{src:t.row.searchIcon?e.baseUrl+t.row.searchIcon:"",alt:""}})])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:e.$t("table.campus"),width:"200px"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.campusName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:e.$t("table.categoryName")},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.typeName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"100",align:"center",label:e.$t("table.sort")},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.orderId))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:e.$t("table.option"),"class-name":"small-padding fixed-width",width:"260px"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(a){e.handleConfig(t.row.typeCode)}}},[e._v(e._s(e.$t("button.configField")))]),e._v(" "),a("el-button",{attrs:{type:"success",size:"mini"},on:{click:function(a){e.handleEdit(t.row.typeCode)}}},[e._v(e._s(e.$t("button.edit")))]),e._v(" "),a("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(a){e.handleModifyStatus(t.row.typeCode)}}},[e._v(e._s(e.$t("button.delete")))])]}}])})],1),e._v(" "),a("div",{staticClass:"pagination-container"},[a("el-pagination",{attrs:{background:"","current-page":e.listQuery.page,"page-sizes":[10,20,30,50],"page-size":e.listQuery.limit,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),e._v(" "),a("el-dialog",{attrs:{title:e.$t("button."+e.state),width:"550px",visible:e.showForm},on:{"update:visible":function(t){e.showForm=t},close:e.handleClose}},[a("el-form",{ref:"postForm",staticClass:"post-form",attrs:{model:e.formData,rules:e.rules,"label-position":"right","label-width":"110px"}},[a("el-form-item",{staticClass:"required",attrs:{label:e.$t("form.campus")+":",prop:"campusCode"}},[a("el-select",{attrs:{placeholder:"请选择"},model:{value:e.formData.campusCode,callback:function(t){e.$set(e.formData,"campusCode",t)},expression:"formData.campusCode"}},e._l(e.campus,function(e){return a("el-option",{key:e.groupId,attrs:{label:e.name,value:e.zones[e.zones.length-1].mapZoneByZoneId.id}})}))],1),e._v(" "),a("el-form-item",{staticClass:"required",attrs:{label:"机构类别图标:",prop:"menuIcon"}},[a("el-upload",{staticClass:"avatar-uploader",attrs:{action:e.baseUrl+"/mapOrganizationType/uploadImg",headers:{Authorization:"Bearer "+e.token},"on-success":e.handleAvatarSuccess,"show-file-list":!1}},[e.picUrl?a("img",{staticClass:"avatar",attrs:{src:e.picUrl}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),e._v(" "),a("el-form-item",{staticClass:"required",attrs:{label:"移动端图标:",prop:"searchIcon"}},[a("el-upload",{staticClass:"avatar-uploader",attrs:{action:e.baseUrl+"/mapOrganizationType/uploadImg",headers:{Authorization:"Bearer "+e.token},"on-success":e.handleSearchSuccess,"show-file-list":!1}},[e.searchIconUrl?a("img",{staticClass:"avatar",attrs:{src:e.searchIconUrl}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),e._v(" "),a("el-form-item",{ref:"typeName",staticClass:"required",attrs:{label:e.$t("form.categoryName")+":",prop:"typeName"}},[a("el-input",{model:{value:e.formData.typeName,callback:function(t){e.$set(e.formData,"typeName",t)},expression:"formData.typeName"}})],1),e._v(" "),a("el-form-item",{ref:"orderId",staticClass:"required",attrs:{label:e.$t("form.sort")+":",prop:"orderId"}},[a("el-input",{model:{value:e.formData.orderId,callback:function(t){e.$set(e.formData,"orderId",e._n(t))},expression:"formData.orderId"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.showForm=!1}}},[e._v(e._s(e.$t("button.cancel")))]),e._v(" "),a("el-button",{attrs:{type:"primary",loading:e.isSub},on:{click:e.handleSubmit}},[e._v(e._s(e.$t("button.submit")))])],1)],1),e._v(" "),a("configFiled",{ref:"config",on:{"http-request":e.handleConfigSub,"del-column":e.handleDelColumn},model:{value:e.fields,callback:function(t){e.fields=t},expression:"fields"}}),e._v(" "),a("import-dialog",{ref:"upload",attrs:{uploadUrl:"/mapOrganizationType/upload",update:e.getList}})],1)},staticRenderFns:[]};var m=a("VU/8")(u,p,!1,function(e){a("rp4n"),a("5NJF")},"data-v-3839025e",null);t.default=m.exports},ilGS:function(e,t,a){(e.exports=a("FZ+f")(!1)).push([e.i,"\n.attr-organization {\n  padding: 20px;\n}\n.attr-organization .avatar-uploader .el-upload {\n    border: 1px dashed #d9d9d9;\n    border-radius: 6px;\n    cursor: pointer;\n    position: relative;\n    overflow: hidden;\n}\n.attr-organization .avatar-uploader .el-upload:hover {\n    border-color: #409EFF;\n}\n.attr-organization .avatar-uploader-icon {\n    font-size: 28px;\n    color: #8c939d;\n    width: 66px;\n    height: 66px;\n    line-height: 66px;\n    text-align: center;\n}\n.attr-organization .avatar {\n    width: 66px;\n    height: 66px;\n    display: block;\n}\n.attr-organization .avatar-uploader {\n    display: inline-block;\n}\n.attr-organization .menu-icon {\n    display: inline-block;\n    width: 60px;\n    height: 60px;\n}\n.attr-organization .menu-icon img {\n      width: 100%;\n      height: 100%;\n}\n.attr-organization .search-icon {\n    display: inline-block;\n    width: 30px;\n    height: 30px;\n}\n.attr-organization .search-icon img {\n      width: 100%;\n      height: 100%;\n}\n.attr-organization .el-form-item.is-required .el-form-item__label:before {\n    content: '';\n}\n.attr-organization .post-form .required .el-form-item__content::after {\n    content: '*';\n    display: inline-block;\n    color: #f56c6c;\n    margin-left: 4px;\n    vertical-align: top;\n}\n.attr-organization .post-form .el-input {\n    width: 340px;\n}\n.attr-organization .fixed-width .el-button--mini {\n    width: auto;\n}\n",""])},rp4n:function(e,t,a){var n=a("ilGS");"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);a("rjj0")("8d2e191e",n,!0)}});
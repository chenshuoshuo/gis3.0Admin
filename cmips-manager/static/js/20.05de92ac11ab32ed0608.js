webpackJsonp([20],{Srj5:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("cAgV"),i=a("R/UA"),o=a("QJuQ"),s=a("TZKF"),l=a("oTRi"),r=a("VEpC"),c=a("Zhbd"),d={name:"information-label",inject:["baseUrl"],directives:{waves:n.a},components:{"import-dialog":c.a},data:function(){return{downloading:!1,isImport:!1,isExport:!1,multipleSelection:[],list:null,total:0,listLoading:!1,typeCode:[],listQuery:{page:1,pageSize:10},campus:[],parentCategories:[],categories:[]}},activated:function(){this.getList()},methods:{getList:function(){var e=this;this.listQuery.page--,this.listLoading=!0,Object(i.u)(this.listQuery).then(function(t){e.listQuery.page++,e.listLoading=!1,t.data.status?(e.list=t.data.data.content,e.total=t.data.data.totalElements):e.$message({type:"warning",message:"标注信息列表获取失败"})})},parseCascader:function(e){var t=this;return e.forEach(function(e){e.childrenMapPointTypeList.length>0?t.parseCascader(e.childrenMapPointTypeList):delete e.childrenMapPointTypeList}),e},getCampus:function(){var e=this;Object(o.a)().then(function(t){if(t.data.status){var a=t.data.data.content.filter(function(e){return e.zones.filter(function(e){return e.mapZoneByZoneId.is2D}).length>0});e.campus=a.map(function(e){return e.zones=e.zones.filter(function(e){return e.mapZoneByZoneId.is2D}),e})}})},handleSelectionChange:function(e){this.multipleSelection=e},handlerSearch:function(){this.typeCode.length>0?this.$set(this.listQuery,"typeCode",this.typeCode[1]):this.listQuery.typeCode=null,this.listQuery.page=1,this.getList()},handleSizeChange:function(e){this.listQuery.pageSize=e,this.listQuery.page=1,this.getList()},handleCurrentChange:function(e){this.listQuery.page=e,this.getList()},handleDeletMany:function(){var e=this;this.multipleSelection.length>0?this.$confirm("此操作将永久删除选中的标注, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(i.f)(e.multipleSelection.map(function(e){return e.pointCode}).join(",")).then(function(t){t.data.status?(e.$message({type:"success",message:"删除成功"}),e.getList()):e.$message({type:"error",message:"删除失败"})})}):this.$alert("请选择要删除的数据","消息提示",{confirmButtonText:"确定",type:"warning"})},downloadTemplate:function(){var e=this;this.downloading=!0,Object(s.g)().then(function(t){if(e.downloading=!1,t.data){var a=new Blob([t.data],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"}),n=window.URL.createObjectURL(a),i=document.createElement("a");i.style.display="none",i.href=n,i.setAttribute("download","标注信息template-"+(new Date).toLocaleString()+".xlsx"),document.body.appendChild(i),i.click(),document.body.removeChild(i),window.URL.revokeObjectURL(n)}})},handleImportExecel:function(){this.$refs.upload.openUpload()},handleExport:function(){var e=this;this.isExport=!0,Object(l.g)({userId:window.cmips_userId}).then(function(t){if(e.isExport=!1,t.data){var a=new Blob([t.data],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"}),n=window.URL.createObjectURL(a),i=document.createElement("a");i.style.display="none",i.href=n,i.setAttribute("download","标注信息-"+(new Date).toLocaleString()+".xlsx"),document.body.appendChild(i),i.click(),document.body.removeChild(i),window.URL.revokeObjectURL(n)}})},handleModifyStatus:function(e){var t=this;this.$confirm("此操作将永久删除该标注, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){Object(i.k)(e).then(function(e){e.data.status?(t.$message({type:"success",message:"删除成功"}),t.getList()):t.$message({type:"error",message:"删除失败"})})})}},beforeMount:function(){var e=this;this.getList(),this.getCampus(),Object(r.M)().then(function(t){t.data.status?e.categories=e.parseCascader(t.data.data):e.$message({type:"error",message:"标注分类获取失败"})}),Object(r.T)().then(function(t){t.data.status?e.parentCategories=t.data.data:e.$message({type:"error",message:"父分类获取失败"})})}},u={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container info-label"},[a("div",{staticClass:"filter-container"},[a("el-form",{ref:"form",attrs:{"label-position":"left",inline:!0}},[a("el-form-item",{attrs:{label:e.$t("form.campus")+":"}},[a("el-select",{attrs:{placeholder:"请选择校区",clearable:""},model:{value:e.listQuery.campusCode,callback:function(t){e.$set(e.listQuery,"campusCode",t)},expression:"listQuery.campusCode"}},e._l(e.campus,function(e){return a("el-option",{key:e.groupId,attrs:{label:e.name,value:e.zones[e.zones.length-1].mapZoneByZoneId.id}})}))],1),e._v(" "),a("el-form-item",{attrs:{label:"标注类别:",prop:"typeCode"}},[a("el-cascader",{attrs:{clearable:"","expand-trigger":"hover",options:e.categories,props:{value:"typeCode",label:"typeName",children:"childrenMapPointTypeList"}},model:{value:e.typeCode,callback:function(t){e.typeCode=t},expression:"typeCode"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"标注名称:"}},[a("el-input",{staticClass:"filter-item",model:{value:e.listQuery.pointName,callback:function(t){e.$set(e.listQuery,"pointName",t)},expression:"listQuery.pointName"}})],1),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handlerSearch}},[e._v(e._s(e.$t("button.search")))]),e._v(" "),a("router-link",{attrs:{to:{path:"/information-manager/createLabel",query:{method:"add"}}}},[a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticStyle:{"margin-left":"10px"},attrs:{type:"success",icon:"el-icon-edit"}},[e._v(e._s(e.$t("button.add")))])],1),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticStyle:{"margin-left":"10px"},attrs:{type:"danger",icon:"el-icon-delete"},on:{click:e.handleDeletMany}},[e._v("批量删除")]),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticStyle:{"margin-left":"10px"},attrs:{type:"temp",icon:"el-icon-ips-shuju",loading:e.downloading},on:{click:e.downloadTemplate}},[e._v("下载导入模板")]),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{type:"import",icon:"el-icon-ips-daoru",loading:e.isImport},on:{click:e.handleImportExecel}},[e._v("导入")]),e._v(" "),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{type:"export",icon:"el-icon-ips-daochu",loading:e.isExport},on:{click:e.handleExport}},[e._v("导出")])],1)],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:e.list,"element-loading-text":"加载中...",border:"",fit:"","highlight-current-row":""},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55"}}),e._v(" "),a("el-table-column",{attrs:{width:"100",align:"center",label:e.$t("table.number")},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.pointCode))])]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"150",align:"center",label:"图片"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[a("img",{attrs:{src:t.row.mapPointImgList[0]?e.baseUrl+t.row.mapPointImgList[0].imgUrl:"",alt:"",width:"30"}})])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"标注名称"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.pointName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"校区"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.campusName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"标注类别","show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.mapPointType.typeName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"120",label:e.$t("table.parentCategory"),align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.parentMapPointType.typeName))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",width:"160",label:e.$t("table.option"),"class-name":"small-padding fixed-width"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("router-link",{attrs:{to:{path:"/information-manager/createLabel",query:{method:"update",id:t.row.pointCode}}}},[a("el-button",{attrs:{type:"success",size:"mini"}},[e._v(e._s(e.$t("button.edit")))])],1),e._v(" "),a("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(a){e.handleModifyStatus(t.row.pointCode)}}},[e._v(e._s(e.$t("button.delete")))])]}}])})],1),e._v(" "),a("div",{staticClass:"pagination-container"},[a("el-pagination",{attrs:{background:"","current-page":e.listQuery.page,"page-sizes":[10,20,30,50],"page-size":e.listQuery.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.$set(e.listQuery,"page",t)}}})],1),e._v(" "),a("import-dialog",{ref:"upload",attrs:{uploadUrl:"/mapPoint/upload",update:e.getList}})],1)},staticRenderFns:[]};var p=a("VU/8")(d,u,!1,function(e){a("zX+g")},null,null);t.default=p.exports},"uQ2/":function(e,t,a){(e.exports=a("FZ+f")(!1)).push([e.i,"\n.info-label {\n  padding: 20px;\n}\n.info-label .el-form-item {\n    margin-bottom: 14px;\n}\n.info-label .input-wrap {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n}\n.info-label .input-wrap .el-form-item {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n}\n.info-label .el-form--inline .el-form-item__label {\n    width: 84px;\n    text-align: right;\n}\n",""])},"zX+g":function(e,t,a){var n=a("uQ2/");"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);a("rjj0")("30c8977e",n,!0)}});
webpackJsonp([9],{"/Ktp":function(e,t,n){var i=n("j3Ax");"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);n("rjj0")("c35117d0",i,!0)},EQip:function(e,t,n){var i=n("qlUM");"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);n("rjj0")("3e439400",i,!0)},abFs:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n("vLgD");var a={inject:["baseUrl"],directives:{waves:n("cAgV").a},data:function(){return{multipleSelection:[],list:[],showPic:!1,pic:[],total:0,listLoading:!1,listQuery:{page:1,pageSize:10},formData:{}}},methods:{getList:function(){var e,t=this;this.listQuery.page--,(e=this.listQuery,Object(i.a)({url:"/feedback/search",method:"get",params:e})).then(function(e){t.listQuery.page++,200===e.data.code?(t.list=e.data.data.content,t.total=e.data.data.totalCount):t.$message({type:"warning",message:"列表获取失败"})})},handleSelectionChange:function(e){this.multipleSelection=e},handleClose:function(){this.formData={},this.$refs.postForm.resetFields()},handlerSearch:function(){this.listQuery.page=1,this.getList()},handleSizeChange:function(e){this.listQuery.pageSize=e,this.getList()},handleCurrentChange:function(e){this.listQuery.page=e,this.getList()},handleView:function(e){this.showPic=!0,this.pic=e},handleDeletMany:function(){var e=this;this.multipleSelection.length>0?this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var t;(t=e.multipleSelection.map(function(e){return e.feedbackId}),Object(i.a)({url:"/feedback/deleteAll\n    ",method:"delete",data:t})).then(function(t){200===t.data.code?(e.$message({type:"success",message:"删除成功"}),e.getList()):e.$message({type:"warning",message:"删除失败"})})}):this.$alert("请选择要删除的数据","消息提示",{confirmButtonText:"确定",type:"warning"})},handleModifyStatus:function(e){var t=this;this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var n;(n=e,Object(i.a)({url:"/feedback/delete/"+n+"\n    ",method:"delete"})).then(function(e){200===e.data.code?(t.$message({type:"success",message:"删除成功"}),t.getList()):t.$message({type:"warning",message:"删除失败"})})})}},mounted:function(){this.getList()}},s={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app-container suggestions"},[n("div",{staticClass:"filter-container"},[n("el-form",{ref:"form",attrs:{"label-position":"right",inline:!0}},[n("el-form-item",{attrs:{label:e.$t("form.suggestion")+":"}},[n("el-input",{staticClass:"filter-item",model:{value:e.listQuery.description,callback:function(t){e.$set(e.listQuery,"description",t)},expression:"listQuery.description"}})],1),e._v(" "),n("el-form-item",{attrs:{label:e.$t("form.username")+":"}},[n("el-input",{staticClass:"filter-item",model:{value:e.listQuery.userName,callback:function(t){e.$set(e.listQuery,"userName",t)},expression:"listQuery.userName"}})],1),e._v(" "),n("el-form-item",{attrs:{label:e.$t("form.workNumber")+":"}},[n("el-input",{staticClass:"filter-item",model:{value:e.listQuery.userCode,callback:function(t){e.$set(e.listQuery,"userCode",t)},expression:"listQuery.userCode"}})],1),e._v(" "),n("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.handlerSearch}},[e._v(e._s(e.$t("button.search"))+"\n            ")]),e._v(" "),n("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"danger",icon:"el-icon-delete"},on:{click:e.handleDeletMany}},[e._v(e._s(e.$t("button.delete"))+"\n            ")])],1)],1),e._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],staticStyle:{width:"100%"},attrs:{data:e.list,"element-loading-text":"加载中...",border:"",fit:"","highlight-current-row":""},on:{"selection-change":e.handleSelectionChange}},[n("el-table-column",{attrs:{type:"selection",width:"55"}}),e._v(" "),n("el-table-column",{attrs:{align:"center",label:e.$t("table.username"),width:"160"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.userName))])]}}])}),e._v(" "),n("el-table-column",{attrs:{align:"center",label:e.$t("table.workNumber"),width:"160"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.userCode))])]}}])}),e._v(" "),n("el-table-column",{attrs:{align:"center",label:e.$t("table.suggestion"),"show-overflow-tooltip":""},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.description))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:e.$t("table.commitTime"),align:"center",width:"240"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(e._f("parseTime")(t.row.submissionTime?t.row.submissionTime:"","{y}-{m}-{d} {h}:{i}")))])]}}])}),e._v(" "),n("el-table-column",{attrs:{width:"200",align:"center",label:e.$t("table.option"),"class-name":"small-padding fixed-width"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{type:"warning",size:"mini",disabled:!t.row.hasImg},on:{click:function(n){e.handleView(t.row.imgList)}}},[e._v(e._s(e.$t("button.viewPic")))]),e._v(" "),n("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(n){e.handleModifyStatus(t.row.feedbackId)}}},[e._v(e._s(e.$t("button.delete")))])]}}])})],1),e._v(" "),n("div",{staticClass:"pagination-container"},[n("el-pagination",{attrs:{background:"","current-page":e.listQuery.page,"page-sizes":[10,20,30,50],"page-size":e.listQuery.limit,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),e._v(" "),n("el-dialog",{attrs:{title:"",visible:e.showPic,width:"800px"},on:{"update:visible":function(t){e.showPic=t}}},[n("div",{staticClass:"block"},[n("el-carousel",{attrs:{height:"480px","indicator-position":"none",loop:!1,autoplay:!1}},e._l(e.pic,function(t){return n("el-carousel-item",{key:t.id},[n("img",{attrs:{src:e.baseUrl+t.imgUrl,alt:""}})])}))],1)])],1)},staticRenderFns:[]};var l=n("VU/8")(a,s,!1,function(e){n("EQip"),n("/Ktp")},"data-v-690ca384",null);t.default=l.exports},j3Ax:function(e,t,n){(e.exports=n("FZ+f")(!1)).push([e.i,"\n.form-box[data-v-690ca384] {\n  padding-right: 30px;\n  padding-left: 10px;\n}\n",""])},qlUM:function(e,t,n){(e.exports=n("FZ+f")(!1)).push([e.i,"\n.suggestions {\n  padding: 20px;\n}\n.suggestions .el-dialog {\n    padding: 4px;\n    border: 1px solid #909399;\n}\n.suggestions .el-dialog__headerbtn {\n    z-index: 999;\n}\n.suggestions .el-carousel__item {\n    text-align: center;\n    line-height: 480px;\n}\n.suggestions .el-carousel__item img {\n      max-height: 480px;\n}\n.suggestions .el-dialog__headerbtn .el-dialog__close {\n    color: #eee;\n    padding: 4px;\n    background: rgba(144, 147, 153, 0.6);\n    border-radius: 50%;\n}\n.suggestions .el-dialog__header {\n    padding: 0;\n}\n.suggestions .el-dialog__body {\n    padding: 0;\n}\n.suggestions .fixed-width .el-button--mini {\n    display: inline-block;\n    width: auto;\n}\n",""])}});
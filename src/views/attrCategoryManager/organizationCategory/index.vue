<template>
    <div class="app-container attr-organization">
        <div class="filter-container">
            <el-form ref="form" label-position="left"  :inline="true">
                <el-form-item :label="$t('form.campus')+':'">
                    <el-select v-model="listQuery.campusCode" clearable placeholder="请选择">
                        <el-option
                        v-for="item in campus"
                        :key="item.groupId"
                        :label="item.name"
                        :value="item.zones[item.zones.length-1].mapZoneByZoneId.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('form.categoryName')+':'">
                    <el-input class="filter-item" v-model.trim="listQuery.typeName">
                    </el-input>
                </el-form-item>
                <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handlerSearch">{{$t('button.search')}}
                </el-button>
                <el-button class="filter-item" style="margin-left: 10px;" @click="handleAdd" type="success" icon="el-icon-edit">{{$t('button.add')}}
                </el-button>
                <el-button class="filter-item" style="margin-left: 10px;" type="danger"  @click="handleDeletMany" icon="el-icon-delete" >{{$t('button.delete')}}
                </el-button>
                <el-button class="filter-item" style="margin-left: 10px;" v-waves type="temp" @click="downloadTemplate" icon="el-icon-ips-shuju" :loading="downloading" >下载导入模板</el-button>
                <el-button class="filter-item" type="import" v-waves @click="handleImportExecel" icon="el-icon-ips-daoru" :loading="isImport" >导入</el-button>
                <el-button class="filter-item" type="export" v-waves @click="handleExport" icon="el-icon-ips-daochu" :loading="isExport" >导出</el-button>
                <!-- <el-button type="warning" v-waves @click="handleRefreash" icon="el-icon-ips-shuaxin" >地图刷新</el-button> -->
            </el-form>
        </div>
        <el-table :data="list" v-loading="listLoading" element-loading-text="加载中..." border fit
                highlight-current-row
                style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column
                type="selection"
                width="55" align="center">
            </el-table-column>
            <el-table-column width="100" :label="$t('table.number')" align="center">
                <template slot-scope="scope">
                <span>{{scope.row.typeCode}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('table.menuIcon')">
                <template slot-scope="scope">
                    <span class="menu-icon"><img :src="scope.row.menuIcon?baseUrl+scope.row.menuIcon:''" alt=""></span>
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('table.searchIcon')">
                <template slot-scope="scope">
                    <span class="search-icon"><img :src="scope.row.searchIcon?baseUrl+scope.row.searchIcon:''" alt=""></span>
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('table.campus')" width="200px">
                <template slot-scope="scope">
                <span>{{scope.row.campusName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('table.categoryName')">
                <template slot-scope="scope">
                <span>{{scope.row.typeName}}</span>
                </template>
            </el-table-column>
            <el-table-column width="100" align="center" :label="$t('table.sort')">
                <template slot-scope="scope">
                <span>{{scope.row.orderId}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('table.option')"  class-name="small-padding fixed-width" width="260px">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="handleConfig(scope.row.typeCode)" >{{$t('button.configField')}}</el-button>
                    <el-button type="success" size="mini" @click="handleEdit(scope.row.typeCode)" >{{$t('button.edit')}}</el-button>
                    <el-button type="danger" size="mini" @click="handleModifyStatus(scope.row.typeCode)">{{$t('button.delete')}}</el-button>
                </template>
            </el-table-column>
          </el-table>
          <div class="pagination-container">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                            :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                            layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </div>
          <el-dialog
            :title="$t('button.'+state)"
            width="550px" :visible.sync="showForm" @close="handleClose">
            <el-form :model="formData" ref="postForm" :rules="rules" label-position="right" label-width="110px" class="post-form">
              <el-form-item :label="$t('form.campus')+':'" prop="campusCode"  class="required">
                <el-select v-model="formData.campusCode" placeholder="请选择">
                    <el-option
                    v-for="item in campus"
                    :key="item.groupId"
                    :label="item.name"
                    :value="item.zones[item.zones.length-1].mapZoneByZoneId.id">
                    </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="机构类别图标:" prop="menuIcon"  class="required" ref="menuImage">
                  <el-upload
                    class="avatar-uploader"
                    :action="baseUrl+'/mapOrganizationType/uploadImg'"
                    :headers="{
                        'Authorization':'Bearer ' + token
                    }"
                    :on-success="handleAvatarSuccess"
                    :show-file-list="false">
                    <img v-if="picUrl" :src="picUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    <div slot="tip" class="el-upload__tip">图片尺寸:66px*66px</div>
                </el-upload>
              </el-form-item>
              <el-form-item label="移动端图标:" prop="searchIcon" class="required" ref="searchImage">
                  <el-upload
                    class="avatar-uploader"
                    :action="baseUrl+'/mapOrganizationType/uploadImg'"
                    :headers="{
                        'Authorization':'Bearer ' + token
                    }"
                    :on-success="handleSearchSuccess"
                    :show-file-list="false">
                    <img v-if="searchIconUrl" :src="searchIconUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    <div slot="tip" class="el-upload__tip">图片尺寸:66px*66px</div>
                </el-upload>
              </el-form-item>
              <el-form-item :label="$t('form.categoryName')+':'" class="required" prop="typeName" ref="typeName">
                  <el-input v-model="formData.typeName"></el-input>
              </el-form-item>
              <el-form-item :label="$t('form.sort')+':'" class="required" prop="orderId" ref="orderId">
                  <el-input v-model.number="formData.orderId"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showForm = false">{{$t('button.cancel')}}</el-button>
                <el-button type="primary" :loading="isSub" @click="handleSubmit">{{$t('button.submit')}}</el-button>
            </div>
        </el-dialog>
        <configFiled ref="config" v-model="fields" @http-request="handleConfigSub" @del-column="handleDelColumn" />
        <import-dialog uploadUrl="/mapOrganizationType/upload" :update="getList" ref="upload"/>
    </div>
</template>

<script src="./organization.js"></script>

<style lang='scss'>
    .attr-organization{
        padding: 20px;
        .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
        }
        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 66px;
            height: 66px;
            line-height: 66px;
            text-align: center;
        }
        .el-upload__tip {
            display: inline-block;
            margin-left: 20px;
            color: #8c939d;
        }
        .avatar {
            width: 66px;
            height: 66px;
            display: block;
        }
        .avatar-uploader{
            display: inline-block;
        }
        .menu-icon{
            display: inline-block;
            width: 60px;
            height: 60px;
            img{
                width: 100%;
                height: 100%;;
            }
        }
        .search-icon{
            display: inline-block;
            width: 30px;
            height: 30px;
            img{
                width: 100%;
                height: 100%;;
            }
        }
        .el-form-item.is-required .el-form-item__label:before{
            content: ''
        }
        .post-form{
            .required .el-form-item__content::after {
                content: '*';
                display: inline-block;
                color: #f56c6c;
                margin-left: 4px;
                vertical-align: top;
            }
            .el-input{
                width: 340px;
            }
        }
        .fixed-width .el-button--mini{
            width: auto;
        }
    }
</style>


<style scoped lang="scss">
    .form-box{
        padding-right: 30px;
        padding-left: 10px;
    }
</style>
<template>
    <div class="app-container label-category">
        <div class="filter-container">
            <el-form ref="form" label-position="left"  :inline="true">
                <el-form-item :label="$t('form.categoryName')+':'">
                    <el-input class="filter-item" v-model.trim="listQuery.typeName">
                    </el-input>
                </el-form-item>
                <el-form-item label="父类别:">
                    <el-input class="filter-item" v-model.trim="listQuery.parentTypeName">
                    </el-input>
                </el-form-item>
                <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handlerSearch">{{$t('button.search')}}
                </el-button>
                <el-button class="filter-item" style="margin-left: 10px;" @click="handleAdd" type="success" icon="el-icon-edit">{{$t('button.add')}}
                </el-button>
                <el-button class="filter-item" style="margin-left: 10px;" type="danger"  @click="handleDeletMany" icon="el-icon-delete" >{{$t('button.delete')}}
                </el-button>
                <el-button class="filter-item" style="margin-left: 10px;" v-waves type="temp"  @click="downloadTemplate" icon="el-icon-ips-shuju" :loading="downloading" >下载导入模板</el-button>
                <el-button class="filter-item" type="import" v-waves @click="handleImportExecel" icon="el-icon-ips-daoru" :loading="isImport" >导入</el-button>
                <el-button class="filter-item" type="export" v-waves @click="handleExport" icon="el-icon-ips-daochu" :loading="isExport" >导出</el-button>
                <!-- <el-button type="warning" v-waves @click="handleRefreash" icon="el-icon-ips-shuaxin" >地图刷新</el-button> -->
            </el-form>
        </div>
        <tree-table :data="list" :columns="columns" border :evalFunc="func" @change-selection="handleSelectionChange" v-loading="listLoading" element-loading-text="加载中...">
            <!-- <el-table-column align="center" :label="$t('table.click')">
                <template slot-scope="scope">
                    <span v-if="scope.row.click"><i class="el-icon-ips-gou1"></i></span>
                    <span v-else><i class="el-icon-ips-cha"></i></span>
                </template>
            </el-table-column> -->
            <el-table-column align="center" :label="$t('table.display')">
                <template slot-scope="scope">
                    <span v-if="scope.row.display"><i class="el-icon-ips-gou1"></i></span>
                    <span v-else><i class="el-icon-ips-cha"></i></span>
                </template>
            </el-table-column>
            <!-- <el-table-column align="center" :label="$t('table.search')">
                <template slot-scope="scope">
                    <span v-if="scope.row.search"><i class="el-icon-ips-gou1"></i></span>
                    <span v-else><i class="el-icon-ips-cha"></i></span>
                </template>
            </el-table-column> -->
            <el-table-column align="center" :label="$t('table.option')"  class-name="small-padding fixed-width" width="260px">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.parentCode" type="primary" size="mini" @click="handleConfig(scope.row.typeCode)" >{{$t('button.configField')}}</el-button>
                    <el-button type="success" size="mini" @click="handleEdit(scope.row.typeCode)" >{{$t('button.edit')}}</el-button>
                    <el-button type="danger" size="mini" @click="handleModifyStatus(scope.row.typeCode)">{{$t('button.delete')}}</el-button>
                </template>
            </el-table-column>
        </tree-table>
        <div class="pagination-container">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                            :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                            layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
        <el-dialog
        :title="$t('button.'+state)"
        width="720px" :visible.sync="showForm" @close="handleClose" top="5vh">
            <el-form :model="formData" ref="postForm" :rules="rules" status-icon label-position="right" label-width="140px" class="post-form">
                <el-form-item label="二维图标:" prop="vectorIcon">
                    <el-upload
                    class="avatar-uploader"
                    :action="baseUrl+'/mapPointType/uploadImg'"
                    :headers="{
                        'Authorization':'Bearer ' + token
                    }"
                    :on-success="handleVectorIcon"
                    :show-file-list="false">
                    <img v-if="vectorIcon" :src="vectorIcon" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    <div slot="tip" class="tip">图片尺寸:66x66px</div>
                </el-upload>
                </el-form-item>
                <el-form-item label="三维图标:" prop="rasterIcon">
                    <el-upload
                    class="avatar-uploader"
                    :action="baseUrl+'/mapPointType/uploadImg'"
                    :headers="{
                        'Authorization':'Bearer ' + token
                    }"
                    :on-success="handleRasterIcon"
                    :show-file-list="false">
                    <img v-if="rasterIcon" :src="rasterIcon" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    <div slot="tip" class="tip">图片尺寸:66x66px</div>
                </el-upload>
                </el-form-item>
                <el-form-item :label="$t('form.categoryName')+':'" prop="typeName" required>
                    <el-input type="text" v-model="formData.typeName"></el-input>
                </el-form-item>
                <el-form-item label="类别文字颜色选择:" prop="fontColor" ref="fontColor">
                    <el-input v-model="formData.fontColor" readonly></el-input>
                    <el-color-picker v-model="formData.fontColor"></el-color-picker>
                </el-form-item>
                <el-form-item label="文字是否加粗:" prop="fontBold" ref="fontBold">
                    <el-select v-model="formData.fontBold" placeholder="请选择">
                        <el-option label="加粗" :value="true"></el-option>
                        <el-option label="不加粗" :value="false"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('form.parentCategory')+':'">
                    <el-select v-model="formData.parentCode" placeholder="">
                    <el-option
                    v-for="item in parentCategorys"
                    :key="item.typeCode"
                    :label="item.typeName"
                    :value="item.typeCode">
                    </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('form.displayLevel')+':'" prop="displayLevel" required>
                    <el-input v-model="formData.displayLevel"></el-input>
                </el-form-item>
                <div class="radio">
                    <!-- <el-form-item :label="$t('form.click')+':'" prop="click" required label-width="80px">
                        <el-radio-group v-model="formData.click">
                            <el-radio :label="true">是</el-radio>
                            <el-radio :label="false">否</el-radio>
                        </el-radio-group>
                    </el-form-item> -->
                    <el-form-item :label="$t('form.display')+':'" prop="display" required label-width="80px">
                        <el-radio-group v-model="formData.display">
                            <el-radio :label="true">是</el-radio>
                            <el-radio :label="false">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <!-- <el-form-item :label="$t('form.search')+':'" prop="search" required label-width="80px">
                        <el-radio-group v-model="formData.search">
                            <el-radio :label="true">是</el-radio>
                            <el-radio :label="false">否</el-radio>
                        </el-radio-group>
                    </el-form-item> -->
                </div>
                <el-form-item :label="$t('form.description')+':'" prop="description">
                    <el-input v-model="formData.description"></el-input>
                </el-form-item>
                <el-form-item :label="$t('form.sort')+':'" prop="orderId">
                    <el-input v-model.number="formData.orderId"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showForm = false">{{$t('button.cancel')}}</el-button>
                <el-button type="primary" @click="handleSubmit">{{$t('button.submit')}}</el-button>
            </div>
        </el-dialog>
        <configFiled ref="config" v-model="fields" @http-request="handleConfigSub" @del-column="handleDelColumn" />
        <import-dialog uploadUrl="/mapPointType/upload" :update="getList" ref="upload"/>
    </div>
</template>

<script src="./labelCategory.js"></script>

<style lang='scss'>
    .label-category{
        padding: 20px;
        /deep/.el-dialog__body{
            max-height: 55vh;
            overflow: auto;
        }
        /deep/.el-color-picker__trigger{
            position: absolute;
            left: -39px;
            top: 12px;
            border: none;
        }
        .tip{
            position: absolute;
            top: 40px;
            left: 80px;
            font-size: 14px;
            color: #999;
        }
        .fixed-width .el-button--mini{
            width: auto;
        }
        .avatar-uploader{
            display: inline-block;
        }
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
        .avatar {
            width: 66px;
            height: 66px;
            display: block;
        }
        .el-dialog__body{
            padding-top: 20px;
        }
        .el-form-item {
            margin-bottom: 18px;
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
                width: 400px;
            }
        } 
        
    }
</style>


<style scoped lang="scss">
    .radio{
        display: flex;
    }
    .post-form{
        padding-right:100px;
    }
    .form-box{
        padding-right: 30px;
        padding-left: 10px;
    }
</style>
<template>
    <div class="app-container attr-other">
        <div class="filter-container">
            <el-form ref="form" label-position="left"  :inline="true">
                <el-form-item :label="$t('form.categoryName')+':'">
                    <el-input class="filter-item" v-model.trim="listQuery.typeName">
                    </el-input>
                </el-form-item>
                <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handlerSearch">{{$t('button.search')}}
                </el-button>
                <el-button class="filter-item" style="margin-left: 10px;" type="danger"  @click="handleDeletMany" icon="el-icon-delete" >{{$t('button.delete')}}
                </el-button>
                <!-- <el-button style="margin-left: 10px;" v-waves type="temp"  @click="downloadTemplate" icon="el-icon-ips-shuju" :loading="downloading" >下载导入模板</el-button>
                <el-button type="import" v-waves @click="handleImport" icon="el-icon-ips-daoru" :loading="isImport" >导入</el-button> -->
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
            <el-table-column align="center" :label="$t('table.categoryName')">
                <template slot-scope="scope">
                <span>{{scope.row.typeName}}</span>
                </template>
            </el-table-column>
            <!-- <el-table-column align="center" :label="$t('table.click')">
                <template slot-scope="scope">
                    <span v-if="scope.row.click"><i class="el-icon-ips-gou1"></i></span>
                    <span v-else><i class="el-icon-ips-cha"></i></span>
                </template>
            </el-table-column> -->
            <!-- <el-table-column align="center" :label="$t('table.search')">
                <template slot-scope="scope">
                    <span v-if="scope.row.search"><i class="el-icon-ips-gou1"></i></span>
                    <span v-else><i class="el-icon-ips-cha"></i></span>
                </template>
            </el-table-column> -->
            <el-table-column align="center" :label="$t('table.option')"  class-name="small-padding fixed-width">
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
            <el-form :model="formData" ref="postForm" status-icon :show-message="false" label-position="right" label-width="110px" class="post-form">
                <el-form-item :label="$t('form.categoryName')+':'" prop="typeName" required>
                    <el-input v-model="formData.typeName" ></el-input>
                </el-form-item>
                <!-- <el-form-item :label="$t('form.click')+':'" required prop="click">
                    <el-radio v-model="formData.click" :label="true">是</el-radio>
                    <el-radio v-model="formData.click" :label="false">否</el-radio>
                </el-form-item>
                <el-form-item :label="$t('form.search')+':'" required>
                    <el-radio v-model="formData.search" :label="true">是</el-radio>
                    <el-radio v-model="formData.search" :label="false">否</el-radio>
                </el-form-item> -->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showForm = false">{{$t('button.cancel')}}</el-button>
                <el-button type="primary" @click="handleSubmit">{{$t('button.submit')}}</el-button>
            </div>
        </el-dialog>
        <configFiled ref="config" v-model="fields" @http-request="handleConfigSub" @del-column="handleDelColumn" />
    </div>
</template>

<script src='./other.js'></script>
<style lang='scss'>
    .attr-other{
        padding: 20px;
        .fixed-width .el-button--mini{
            display: inline-block;
            width: auto;
        }
        .radio{
            display: flex;
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
                width: 90%;
            }
        }
    }
</style>

<style scoped lang='scss'>
    .attr-other{
        padding: 20px;
    }

</style>
<template>
    <div class="app-container info-organization">
        <div class="filter-container">
            <el-form ref="form" label-position="left"  :inline="true">
                <el-form-item label="校区:">
                    <el-select v-model="listQuery.campusCode" clearable placeholder="请选择">
                        <el-option
                        v-for="item in campus"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="机构类别:">
                    <el-select v-model="listQuery.typeCode" clearable placeholder="请选择">
                        <el-option
                        v-for="item in types"
                        :key="item.typeCode"
                        :label="item.typeName"
                        :value="item.typeCode">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="机构名称:">
                    <el-input v-model="listQuery.organizationName">
                    </el-input>
                </el-form-item>
                <el-button type="primary" v-waves icon="el-icon-search" @click="handlerSearch">{{$t('button.search')}}</el-button>
                <router-link :to="{path:'/information-manager/createOrganization',query:{method:'add'}}">
                    <el-button style="margin-left: 10px;" v-waves type="success" icon="el-icon-edit">{{$t('button.add')}}</el-button>
                </router-link>
                <el-button style="margin-left: 10px;" v-waves type="danger"  @click="handleDeletMany" icon="el-icon-delete" >批量删除</el-button>
                <el-button style="margin-left: 10px;" v-waves type="temp"  @click="downloadTemplate" icon="el-icon-ips-shuju" :loading="downloading" >下载导入模板</el-button>
                <!-- <el-button type="import" v-waves @click="handleImportExecel" icon="el-icon-ips-daoru" :loading="isImport" >导入</el-button> -->
                <el-button type="export" v-waves @click="handleExport" icon="el-icon-ips-daochu" :loading="isExport" >导出</el-button>
                <!-- <el-button type="warning" v-waves @click="handleRefreash" icon="el-icon-ips-shuaxin" >地图刷新</el-button> -->
            </el-form>
        </div>
        <el-table :data="list" v-loading="listLoading" element-loading-text="加载中..." border fit
                highlight-current-row
                style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column width="100" :label="$t('table.number')" align="center">
                <template slot-scope="scope">
                <span>{{scope.row.organizationCode}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="图片">
                <template slot-scope="scope">
                    <span><img v-if="scope.row.mapOrganizationImgList[0]" :src="baseUrl+scope.row.mapOrganizationImgList[0].imgUrl" width="26px"></span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="机构名称">
                <template slot-scope="scope">
                <span>{{scope.row.organizationName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('table.campus')">
                <template slot-scope="scope">
                <span>{{scope.row.campusName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="机构类别">
                <template slot-scope="scope">
                <span>{{scope.row.mapOrganizationType.typeName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('table.sort')" width="80">
                <template slot-scope="scope">
                <span>{{scope.row.orderId}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('table.option')"  class-name="small-padding fixed-width" width="200px">
                <template slot-scope="scope">
                    <router-link :to="{path:'/information-manager/createOrganization',query:{method:'update',id:scope.row.organizationCode}}">
                        <el-button type="success" size="mini" @click="handleEdit(scope.row.organizationCode)" >{{$t('button.edit')}}</el-button>
                    </router-link>
                    <el-button type="danger" size="mini" @click="handleModifyStatus(scope.row.organizationCode)">{{$t('button.delete')}}</el-button>
                </template>
            </el-table-column>
          </el-table>
          <div class="pagination-container">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                            :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.pageSize"
                            layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </div>
    </div>
</template>

<script src="./organization.js"></script>

<style lang='scss'>
    .info-organization{
        padding: 20px;
        .download-temp{
            background-color: #4274b9;
        }
    }
</style>
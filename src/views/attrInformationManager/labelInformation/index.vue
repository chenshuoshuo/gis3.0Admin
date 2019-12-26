<template>
    <div class="app-container info-label">
        <div class="filter-container">
            <el-form ref="form" label-position="left"  :inline="true">
                <el-form-item :label="$t('form.campus')+':'">
                    <el-select v-model="listQuery.campusCode" placeholder="请选择校区" clearable>
                        <el-option
                        v-for="item in campus"
                        :key="item.groupId"
                        :label="item.name"
                        :value="item.zones[item.zones.length-1].mapZoneByZoneId.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="标注类别:" prop="typeCode" >
                    <el-cascader
                    clearable
                    expand-trigger="hover"
                    :options="categories"
                    :props="{
                        value: 'typeCode',
                        label: 'typeName',
                        children: 'childrenMapPointTypeList'
                    }"
                    v-model="typeCode">
                    </el-cascader>
                </el-form-item>
                <el-form-item label="标注名称:">
                    <el-input class="filter-item" v-model="listQuery.pointName">
                    </el-input>
                </el-form-item>
                <el-button type="primary" v-waves icon="el-icon-search" @click="handlerSearch">{{$t('button.search')}}</el-button>
                <router-link :to="{path:'/information-manager/createLabel',query:{method:'add'}}">
                    <el-button style="margin-left: 10px;" v-waves type="success" icon="el-icon-edit">{{$t('button.add')}}</el-button>
                </router-link>
                <el-button style="margin-left: 10px;" v-waves type="danger"  @click="handleDeletMany" icon="el-icon-delete" >批量删除</el-button>
                <el-button style="margin-left: 10px;" v-waves type="temp"  @click="downloadTemplate" icon="el-icon-ips-shuju" :loading="downloading" >下载导入模板</el-button>
                <el-button type="import" v-waves @click="handleImportExecel" icon="el-icon-ips-daoru" :loading="isImport" >导入</el-button>
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
            <el-table-column width="100" align="center" :label="$t('table.number')">
                <template slot-scope="scope">
                    <span>{{scope.row.pointCode}}</span>
                </template>
            </el-table-column>
            <el-table-column width="150" align="center" label="图片">
                <template slot-scope="scope">
                    <span><img :src="scope.row.mapPointImgList[0]?baseUrl+scope.row.mapPointImgList[0].imgUrl:''" alt="" width="30"></span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="标注名称">
                <template slot-scope="scope">
                    <span>{{scope.row.pointName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="校区">
                <template slot-scope="scope">
                    <span>{{scope.row.campusName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="标注类别" show-overflow-tooltip>
                <template slot-scope="scope">
                    <span>{{scope.row.mapPointType.typeName}}</span>
                </template>
            </el-table-column>
            <el-table-column width="120" :label="$t('table.parentCategory')" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.parentMapPointType.typeName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" width="160" :label="$t('table.option')"  class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <router-link :to="{path:'/information-manager/createLabel',query:{method:'update',id:scope.row.pointCode}}">
                        <el-button type="success" size="mini" >{{$t('button.edit')}}</el-button>
                    </router-link>
                    <el-button type="danger" size="mini" @click="handleModifyStatus(scope.row.pointCode)">{{$t('button.delete')}}</el-button>
                </template>
            </el-table-column>
          </el-table>
          <div class="pagination-container">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                            :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.pageSize"
                            layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </div>
          <import-dialog uploadUrl="/mapPoint/upload" :update="getList" ref="upload"/>
    </div>
</template>

<script src="./label.js"></script>

<style lang='scss'>
    .info-label{
        padding: 20px;
        .el-form-item {
            margin-bottom: 14px;
        }
        .input-wrap{
            display: flex;
            .el-form-item{
                display: flex;
            }
        } 
        .el-form--inline .el-form-item__label{
            width: 84px;
            text-align: right;
        }
    }
</style>
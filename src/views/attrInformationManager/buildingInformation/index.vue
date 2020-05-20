<template>
    <div class="app-container attr-building">
        <div class="filter-container">
            <el-form ref="form" label-position="left"  :inline="true">
                <el-form-item label="校区:">
                    <el-select v-model="listQuery.campusCode" clearable placeholder="请选择">
                        <el-option
                        v-for="item in campus"
                        :key="item.groupId"
                        :label="item.name"
                        :value="item.zones[item.zones.length-1].mapZoneByZoneId.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="大楼类别:">
                   <el-select v-model="listQuery.typeCode" clearable placeholder="请选择类别">
                        <el-option
                        v-for="item in categories"
                        :key="item.typeCode"
                        :label="item.typeName"
                        :value="item.typeCode">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="大楼名称:">
                    <el-input class="filter-item" v-model.trim="listQuery.buildingName">
                    </el-input>
                </el-form-item>
                <el-button type="primary" v-waves icon="el-icon-search" @click="handlerSearch">{{$t('button.search')}}</el-button>
                <el-button style="margin-left: 10px;" v-waves type="danger"  @click="handleDeletMany" icon="el-icon-delete" >批量删除</el-button>
                <el-button style="margin-left: 10px;" v-waves type="temp"  @click="downloadTemplate" icon="el-icon-ips-shuju" :loading="downloading" >下载导入模板</el-button>
                <el-button type="import" v-waves @click="handleImportExecel" icon="el-icon-ips-daoru" :loading="isImport" >导入</el-button>
                <el-button type="export" v-waves @click="handleExport" icon="el-icon-ips-daochu" :loading="isExport" >导出</el-button>
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
                    <span>{{scope.row.buildingCode}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="图片">
                <template slot-scope="scope">
                    <span><img :src="scope.row.mapBuildingImgList[0]?baseUrl+scope.row.mapBuildingImgList[0].imgUrl:''" alt="" width="60"></span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="大楼名称" show-overflow-tooltip>
                <template slot-scope="scope">
                    <span>{{scope.row.buildingName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="英文名称">
                <template slot-scope="scope">
                    <span>{{scope.row.enName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="别名" width="150px">
                <template slot-scope="scope">
                    <span>{{scope.row.alias}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="校区" width="150px">
                <template slot-scope="scope">
                    <span>{{scope.row.campusName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="大楼类别" width="150px">
                <template slot-scope="scope">
                    <span>{{scope.row.mapBuildingType.typeName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('table.option')"  class-name="small-padding fixed-width" width="120">
                <template slot-scope="scope">
                    <router-link :to="{path:'/information-manager/createBuilding',query:{method:'update',id:scope.row.buildingCode}}">
                    <el-button type="success" size="mini" >{{$t('button.edit')}}</el-button>
                    </router-link>
                    <el-button type="danger" size="mini" @click="handleModifyStatus(scope.row.buildingCode)">{{$t('button.delete')}}</el-button>
                </template>
            </el-table-column>
          </el-table>
          <div class="pagination-container">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                            :current-page="listQuery.page+1" :page-sizes="[10,20,30, 50]" :page-size="listQuery.pageSize"
                            layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </div>
          <import-dialog uploadUrl="/mapBuilding/upload" :update="getList" ref="upload"/>
    </div>
</template>

<script src="./building.js"></script>

<style lang='scss'>
    .attr-building{
        padding: 20px;
        .el-dialog__body{
            padding-bottom: 0;
        }
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
                width: 340px;
            }
        }
    }
</style>
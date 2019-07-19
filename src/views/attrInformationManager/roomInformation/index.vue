<template>
    <div class="app-container info-room">
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
                <el-form-item label="房间类别:">
                    <el-select v-model="listQuery.typeCode" placeholder="请选择类别" clearable>
                        <el-option
                        v-for="item in categories"
                        :key="item.typeCode"
                        :label="item.typeName"
                        :value="item.typeCode">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="房间名称:">
                    <el-input class="filter-item" v-model="listQuery.roomName">
                    </el-input>
                </el-form-item>
                <el-button type="primary" v-waves icon="el-icon-search" @click="handlerSearch">{{$t('button.search')}}</el-button>
                <!-- <router-link :to="{path:'/information-manager/createLabel'}">
                    <el-button style="margin-left: 10px;" v-waves type="success" icon="el-icon-edit">{{$t('button.add')}}</el-button>
                </router-link> -->
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
            <el-table-column width="100" align="center" :label="$t('table.number')">
                <template slot-scope="scope">
                    <span>{{scope.row.roomCode}}</span>
                </template>
            </el-table-column>
            <el-table-column width="150" align="center" label="图片">
                <template slot-scope="scope">
                    <span><img :src="scope.row.mapRoomImgList[0]?baseUrl+scope.row.mapRoomImgList[0].imgUrl:''" alt="" width="60px"></span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="房间名称" show-overflow-tooltip>
                <template slot-scope="scope">
                    <span>{{scope.row.roomName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="英文名称">
                <template slot-scope="scope">
                    <span>{{scope.row.enName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="别名">
                <template slot-scope="scope">
                    <span>{{scope.row.alias}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="门牌号">
                <template slot-scope="scope">
                    <span>{{scope.row.hourseNumber}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="校区">
                <template slot-scope="scope">
                    <span>{{scope.row.campusName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="所属大楼">
                <template slot-scope="scope">
                    <span>{{scope.row.buildingName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="房间类别">
                <template slot-scope="scope">
                    <span>{{scope.row.mapRoomType.typeName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('table.option')"  class-name="small-padding fixed-width" width="160">
                <template slot-scope="scope">
                    <router-link :to="{path:'/information-manager/createRoom',query:{method:'update',id:scope.row.roomCode}}">
                        <el-button type="success" size="mini">{{$t('button.edit')}}</el-button>
                    </router-link>
                    <el-button type="danger" size="mini" @click="handleModifyStatus(scope.row.roomCode)">{{$t('button.delete')}}</el-button>
                </template>
            </el-table-column>
          </el-table>
          <div class="pagination-container">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                            :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                            layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </div>
          <import-dialog uploadUrl="/mapRoom/upload" :update="getList" ref="upload"/>
    </div>
</template>

<script src="./room.js"></script>

<style lang='scss'>
    .info-room{
        padding: 20px;
        .el-form-item {
            margin-bottom: 14px;
        }
    }
</style>
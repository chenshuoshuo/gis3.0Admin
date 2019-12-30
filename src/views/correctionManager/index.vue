<template>
    <div class="app-container map-correction">
        <div class="filter-container">
            <el-form ref="form" label-position="left"  :inline="true">
                <el-form-item :label="$t('form.positionName')+':'">
                    <el-input class="filter-item" v-model.trim="listQuery.locationName">
                    </el-input>
                </el-form-item>
                <el-form-item :label="$t('form.campus')+':'">
                    <el-select v-model="listQuery.mapCode" clearable placeholder="请选择">
                        <el-option
                        v-for="item in campus"
                        :key="item.groupId"
                        :label="item.name"
                        :value="item.zones[item.zones.length-1].mapZoneByZoneId.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('form.mapType')+':'">
                    <el-select v-model="listQuery.mapIs2d" clearable placeholder="请选择">
                        <el-option label="2D" :value="1"></el-option>
                        <el-option label="3D" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('form.username')+':'">
                    <el-input class="filter-item" v-model.trim="listQuery.userName">
                    </el-input>
                </el-form-item>
                <el-form-item :label="$t('form.workNumber')+':'">
                    <el-input class="filter-item" v-model.trim="listQuery.userCode">
                    </el-input>
                </el-form-item>
                <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handlerSearch">{{$t('button.search')}}
                </el-button>
                <el-button class="filter-item" style="margin-left: 10px;" type="danger"  @click="handleDeletMany" icon="el-icon-delete" >{{$t('button.delete')}}
                </el-button>
            </el-form>
        </div>
        <el-table :data="list" v-loading="listLoading" element-loading-text="加载中..." border fit
                highlight-current-row
                style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column align="center" width="160" :label="$t('table.position')">
                <template slot-scope="scope">
                <span>{{scope.row.locationName}}</span>
                </template>
            </el-table-column>
            <el-table-column :label="$t('table.campus')" align="center"  width="160" >
                <template slot-scope="scope">
                <span>{{scope.row.campusName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('table.mapType')"  width="120" >
                <template slot-scope="scope">
                    <span>{{scope.row.mapIs2D?'2D':'3D'}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('table.correctContent')" show-overflow-tooltip>
                <template slot-scope="scope">
                    <span>{{scope.row.description}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('table.username')"  width="160" >
                <template slot-scope="scope">
                    <span>{{scope.row.userName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('table.workNumber')"  width="160" >
                <template slot-scope="scope">
                    <span>{{scope.row.userCode}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="联系方式"  width="160" >
                <template slot-scope="scope">
                    <span>{{scope.row.contact}}</span>
                </template>
            </el-table-column>
            <el-table-column :label="$t('table.commitTime')" align="center"  width="240" >
                <template slot-scope="scope">
                <span>{{scope.row.submissionTime|parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
                </template>
            </el-table-column>
            <el-table-column width="300" align="center" :label="$t('table.option')"  class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini"  :disabled="!scope.row.lngLat" @click="handlePos(scope.row.lngLat)">{{$t('button.viewPos')}}</el-button>
                    <el-button type="warning" size="mini" :disabled="!scope.row.hasImg" @click="handleView(scope.row.imgList)">{{$t('button.viewPic')}}</el-button>
                    <el-button type="danger" size="mini" @click="handleModifyStatus(scope.row.errorId)">{{$t('button.delete')}}</el-button>
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
            title=""
            :visible.sync="showPic" width="800px">
            <div class="block">
                <el-carousel height="480px" indicator-position="none" :loop="false" :autoplay="false" >
                    <el-carousel-item v-for="item in pic" :key="item.imgId">
                        <img :src="baseUrl+item.imgUrl" alt=""/>
                    </el-carousel-item>
                </el-carousel>
            </div>
          </el-dialog>
          <el-dialog
            title=""
            :visible.sync="showPos"
            :before-close="handleRemoveMaker"
            width="800px" 
            >
            <div class="map-box" id="map" style="height:500px">
            </div>
          </el-dialog>
    </div>
</template>

<script src="./correctionManager.js"></script>

<style lang='scss'>
    .map-correction{
        padding: 20px;
        .fixed-width .el-button--mini{
            display: inline-block;
            width: auto;
        }
        .el-dialog{
            padding: 4px;
            border: 1px solid #909399;
        }
        .el-carousel__item{
            text-align: center;
            line-height: 480px;
            img{
                max-height: 480px;
            }
        }
        .el-dialog__headerbtn{
            z-index: 999;
        }
        .el-dialog__headerbtn .el-dialog__close {
            color: #eee;
            padding: 4px;
            background: rgba(144,147,153,.6);
            border-radius: 50%;
        }
        .el-dialog__header{
            padding: 0
        }
        .el-dialog__body{
            padding: 0
        }
    }
</style>


<style scoped lang="scss">
    .form-box{
        padding-right: 30px;
        padding-left: 10px;
    }
</style>
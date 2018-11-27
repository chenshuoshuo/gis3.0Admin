<template>
    <div class="app-container map-correction">
        <div class="filter-container">
            <el-form ref="form" label-position="left"  :inline="true">
                <el-form-item :label="$t('form.positionName')+':'">
                    <el-input class="filter-item" v-model="listQuery.positionName">
                    </el-input>
                </el-form-item>
                <el-form-item :label="$t('form.campus')+':'">
                    <el-input class="filter-item" v-model="listQuery.campus">
                    </el-input>
                </el-form-item>
                <el-form-item :label="$t('form.mapType')+':'">
                    <el-input class="filter-item" v-model="listQuery.mapType">
                    </el-input>
                </el-form-item>
                <el-form-item :label="$t('form.username')+':'">
                    <el-input class="filter-item" v-model="listQuery.usernames">
                    </el-input>
                </el-form-item>
                <el-form-item :label="$t('form.workNumber')+':'">
                    <el-input class="filter-item" v-model="listQuery.workNumber">
                    </el-input>
                </el-form-item>
                <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handlerSearch">{{$t('button.search')}}
                </el-button>
                <el-button class="filter-item" style="margin-left: 10px;" type="danger"  @click="handleDeletMany" icon="el-icon-delete" >{{$t('button.delete')}}
                </el-button>
            </el-form>
        </div>
        <el-table :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit
                highlight-current-row
                style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column align="center" width="160" :label="$t('table.position')">
                <template slot-scope="scope">
                <span>{{scope.row.position}}</span>
                </template>
            </el-table-column>
            <el-table-column :label="$t('table.campus')" align="center"  width="160" >
                <template slot-scope="scope">
                <span>{{scope.row.campus}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('table.mapType')"  width="120" >
                <template slot-scope="scope">
                    <span>{{scope.row.mapType}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('table.correctContent')" show-overflow-tooltip>
                <template slot-scope="scope">
                    <span>{{scope.row.correctContent}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('table.username')"  width="160" >
                <template slot-scope="scope">
                    <span>{{scope.row.username}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('table.workNumber')"  width="160" >
                <template slot-scope="scope">
                    <span>{{scope.row.workNumber}}</span>
                </template>
            </el-table-column>
            <el-table-column :label="$t('table.commitTime')" align="center"  width="240" >
                <template slot-scope="scope">
                <span>{{scope.row.commitTime|parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
                </template>
            </el-table-column>
            <el-table-column width="300" align="center" :label="$t('table.option')"  class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini">{{$t('button.viewPos')}}</el-button>
                    <el-button type="warning" size="mini">{{$t('button.viewPic')}}</el-button>
                    <el-button type="danger" size="mini" @click="handleModifyStatus(scope.row.id)">{{$t('button.delete')}}</el-button>
                </template>
            </el-table-column>
          </el-table>
          <div class="pagination-container">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                            :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                            layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </div>
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
    }
</style>


<style scoped lang="scss">
    .form-box{
        padding-right: 30px;
        padding-left: 10px;
    }
</style>
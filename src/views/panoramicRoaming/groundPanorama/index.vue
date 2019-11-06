<template>
    <div class="app-container campus-aerial">
        <div class="filter-container">
            <el-form ref="form" label-position="left" :model="listQuery"  :inline="true">
                <el-form-item :label="$t('form.flyCamName')+':'">
                    <el-input class="filter-item" v-model="listQuery.roamName">
                    </el-input>
                </el-form-item>
                <el-form-item :label="$t('form.campus')+':'" prop="campusCode">
                    <el-select v-model="listQuery.campusCode" clearable placeholder="请选择">
                        <el-option
                        v-for="item in campus"
                        :key="item.groupId"
                        :label="item.name"
                        :value="item.zones[item.zones.length-1].mapZoneByZoneId.id">
                        </el-option>
                    </el-select>
              </el-form-item>
                <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handlerSearch">{{$t('button.search')}}
                </el-button> 
                <router-link :to="{path:'/panoramic-roaming/creategroundPanorama',query:{method:'add'}}">
                    <el-button class="filter-item" style="margin-left: 10px;" type="success" icon="el-icon-edit">{{$t('button.add')}}
                </el-button>
                </router-link>
                <el-button class="filter-item" style="margin-left: 10px;" type="danger"  @click="handleDeletMany" icon="el-icon-delete" >{{$t('button.delete')}}
                </el-button>
            </el-form>
        </div>
        <el-table :data="list" v-loading="listLoading" element-loading-text="加载中..." border fit
                highlight-current-row
                style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column
                type="selection"
                width="55" align="center">
            </el-table-column>
            <el-table-column align="center" label="位置">
                <template slot-scope="scope">
                <span>{{scope.row.location}}</span>
                </template>
            </el-table-column>
            <el-table-column :label="$t('table.campus')" align="center">
                <template slot-scope="scope">
                <span>{{scope.row.campusName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="全景名称">
                <template slot-scope="scope">
                    {{scope.row.roamName}}
                </template>
            </el-table-column>
            <el-table-column align="center" label="全景地址" show-overflow-tooltip>
                <template slot-scope="scope">
                    <a :href="scope.row.roamnUrl" target="_blank" style="text-description:underline">{{scope.row.roamnUrl}}</a>
                </template>
            </el-table-column>
            <el-table-column :label="$t('table.updateTime')" align="center" width="180">
                <template slot-scope="scope">
                <span>{{scope.row.updateTime|parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('table.option')"  class-name="small-padding fixed-width" width="160">
                <template slot-scope="scope">
                    <router-link :to="{path:'/panoramic-roaming/creategroundPanorama',query:{method:'update',id:scope.row.roamId}}">
                        <el-button type="success" size="mini" >{{$t('button.edit')}}</el-button>
                    </router-link>
                    <el-button type="danger" size="mini" @click="handleModifyStatus(scope.row.roamId)">{{$t('button.delete')}}</el-button>
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
            width="450px" :visible.sync="showForm" @close="handleClose">
            <el-form :model="formData" ref="postForm" label-position="right" label-width="100px" class="post-form">
              <el-form-item :label="$t('form.flyCamName')+':'" prop="roamName" required>
                  <el-input v-model="formData.roamName"></el-input>
              </el-form-item>
              <el-form-item :label="$t('form.campus')+':'" prop="campusCode" required>
                    <el-select v-model="formData.campusCode" placeholder="请选择">
                        <el-option
                        v-for="item in campus"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
              </el-form-item>
              <el-form-item :label="$t('form.flyCamUrl')+':'" prop="roamnUrl" required>
                  <el-input v-model="formData.roamnUrl"></el-input>
              </el-form-item>
              <el-form-item :label="$t('form.sort')+':'" prop="orderId" required>
                  <el-input v-model="formData.orderId"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showForm = false">{{$t('button.cancel')}}</el-button>
                <el-button type="primary" @click="handleSubmit">{{$t('button.submit')}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script src="./groundPanorama.js"></script>

<style lang='scss'>
    .campus-aerial{
        padding: 20px;
        .post-form{
            .required .el-form-item__content::after {
                content: '*';
                display: inline-block;
                color: #f56c6c;
                margin-left: 4px;
                vertical-align: top;
            }
            .el-input{
                width: 280px;
            }
        } 
        .el-dialog__body{
            padding-bottom: 0;
        }
    }
</style>


<style scoped lang="scss">
    .form-box{
        padding-right: 30px;
        padding-left: 10px;
    }
</style>
<template>
    <div class="app-container campus-aerial">
        <div class="filter-container">
            <el-form ref="form" label-position="left"  :inline="true">
                <el-form-item :label="$t('form.flyCamName')+':'">
                    <el-input class="filter-item" v-model="listQuery.flyCamName">
                    </el-input>
                </el-form-item>
                <el-form-item :label="$t('form.campus')+':'">
                    <el-input class="filter-item" v-model="listQuery.campus">
                    </el-input>
                </el-form-item>
                <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handlerSearch">{{$t('button.search')}}
                </el-button>
                <el-button class="filter-item" style="margin-left: 10px;" @click="handleAdd" type="success" icon="el-icon-edit">{{$t('button.add')}}
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
            <el-table-column align="center" :label="$t('table.flyCamName')">
                <template slot-scope="scope">
                <span>{{scope.row.flyCamName}}</span>
                </template>
            </el-table-column>
            <el-table-column :label="$t('table.campus')" align="center">
                <template slot-scope="scope">
                <span>{{scope.row.campus}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('table.flyCamUrl')">
                <template slot-scope="scope">
                    <span><img :src="scope.row.flyCamUrl" alt=""></span>
                </template>
            </el-table-column>
            <el-table-column :label="$t('table.updateTime')" align="center">
                <template slot-scope="scope">
                <span>{{scope.row.updateTime|parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('table.option')"  class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button type="success" size="mini" @click="handleEdit(scope.row.id)" >{{$t('button.edit')}}</el-button>
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
          <el-dialog
            :title="$t('button.'+state)"
            width="450px" :visible.sync="showForm" @close="handleClose">
            <el-form :model="formData" ref="postForm" label-position="right" label-width="100px" class="post-form">
              <el-form-item :label="$t('form.flyCamName')+':'" prop="flyCamName" class="required">
                  <el-input v-model="formData.flyCamName"></el-input>
              </el-form-item>
              <el-form-item :label="$t('form.campus')+':'" prop="campus" class="required">
                  <el-input v-model="formData.campus"></el-input>
              </el-form-item>
              <el-form-item :label="$t('form.flyCamUrl')+':'" prop="flyCamUrl" class="required">
                  <el-input v-model="formData.flyCamUrl"></el-input>
              </el-form-item>
              <el-form-item :label="$t('form.sort')+':'" prop="sort" class="required">
                  <el-input v-model="formData.sort"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showForm = false">{{$t('button.cancel')}}</el-button>
                <el-button type="primary" @click="handleSubmit">{{$t('button.submit')}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script src="./campusAerialPhotography.js"></script>

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
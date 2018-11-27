<template>
    <div class="app-container attr-other">
        <div class="filter-container">
            <el-form ref="form" label-position="left"  :inline="true">
                <el-form-item :label="$t('form.categoryName')+':'">
                    <el-input class="filter-item" v-model="listQuery.categoryName">
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
            <el-table-column width="100" :label="$t('table.number')" align="center">
                <template slot-scope="scope">
                <span>{{scope.row.number}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('table.categoryName')">
                <template slot-scope="scope">
                <span>{{scope.row.categoryName}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('table.click')">
                <template slot-scope="scope">
                <span>{{scope.row.click}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('table.search')">
                <template slot-scope="scope">
                <span>{{scope.row.search}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('table.option')"  class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="showConfig = true" >{{$t('button.configField')}}</el-button>
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
            width="550px" :visible.sync="showForm" @close="handleClose">
            <el-form :model="formData" ref="postForm" label-position="right" label-width="110px" class="post-form">
              <el-form-item :label="$t('form.categoryName')+':'" prop="categoryName" class="required">
                  <el-input v-model="formData.categoryName" ></el-input>
              </el-form-item>
              <el-form-item :label="$t('form.number')+':'" class="required">
                  <el-input v-model="formData.number"></el-input>
              </el-form-item>
              <div class="radio">
                <el-form-item :label="$t('form.click')+':'" class="required">
                    <el-radio v-model="formData.click" label="1">是</el-radio>
                    <el-radio v-model="formData.click" label="2">否</el-radio>
                </el-form-item>
                <el-form-item :label="$t('form.search')+':'" class="required">
                    <el-radio v-model="formData.search" label="1">是</el-radio>
                    <el-radio v-model="formData.search" label="2">否</el-radio>
                </el-form-item>
              </div>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showForm = false">{{$t('button.cancel')}}</el-button>
                <el-button type="primary" @click="handleSubmit">{{$t('button.submit')}}</el-button>
            </div>
        </el-dialog>
        <el-dialog :title="$t('button.configField')" :visible.sync="showConfig">
            <el-table :data="gridData">
                <el-table-column property="date" label="日期" width="150"></el-table-column>
                <el-table-column property="name" label="姓名" width="200"></el-table-column>
                <el-table-column property="address" label="地址"></el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showConfig = false">{{$t('button.cancel')}}</el-button>
                <el-button type="primary" @click="handleSubmit">{{$t('button.submit')}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script src='./other.js'></script>
<style lang='scss'>
    .attr-other{
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

<style scoped lang='scss'>
    .attr-other{
        padding: 20px;
    }

</style>
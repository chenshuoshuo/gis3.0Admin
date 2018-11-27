<template>
    <div class="app-container attr-organization">
        <div class="filter-container">
            <el-form ref="form" label-position="left"  :inline="true">
                <el-form-item :label="$t('form.categoryName')+':'">
                    <el-input class="filter-item" v-model="listQuery.categoryName">
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
            <el-table-column width="100" align="center" :label="$t('table.number')">
                <template slot-scope="scope">
                    <span>{{scope.row.number}}</span>
                </template>
            </el-table-column>
            <el-table-column width="150" align="center" :label="$t('table.icon')">
                <template slot-scope="scope">
                    <span><img :src="scope.row.icon" alt=""></span>
                </template>
            </el-table-column>
            <el-table-column width="200" :label="$t('table.parentCategory')" align="center">
                <template slot-scope="scope">
                    <span>{{scope.row.parentCategory}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('table.categoryName')">
                <template slot-scope="scope">
                    <span>{{scope.row.categoryName}}</span>
                </template>
            </el-table-column>
            <el-table-column width="100" align="center" :label="$t('table.mapType')">
                <template slot-scope="scope">
                    <span>{{scope.row.mapType}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('table.click')">
                <template slot-scope="scope">
                    <span><img :src="scope.row.click" alt=""></span>
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('table.display')">
                <template slot-scope="scope">
                    <span><img :src="scope.row.display" alt=""></span>
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('table.search')">
                <template slot-scope="scope">
                    <span><img :src="scope.row.search" alt=""></span>
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
            width="800px" :visible.sync="showForm" @close="handleClose">
            <el-form :model="formData" ref="postForm" label-position="right" label-width="100px" class="post-form">
                <el-form-item :label="$t('form.icon')+':'" prop="icon" class="required">
                  <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false">
                    <img v-if="picUrl" :src="picUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item :label="$t('form.categoryName')+':'" prop="categoryName" class="required">
                  <el-select v-model="formData.categoryName" placeholder="">
                    <el-option
                    v-for="item in options.categoryNames"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item :label="$t('form.mapType')+':'" prop="mapType">
                  <el-radio v-model="formData.mapType" label="1">二维</el-radio>
                  <el-radio v-model="formData.mapType" label="2">三维</el-radio>
              </el-form-item>
              
              <el-form-item :label="$t('form.parentCategory')+':'">
                  <el-select v-model="formData.parentCategory" placeholder="">
                    <el-option
                    v-for="item in options.parentCategorys"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item :label="$t('form.displayLevel')+':'" class="required">
                  <el-input v-model="formData.displayLevel"></el-input>
              </el-form-item>
              <el-form-item :label="$t('form.layerDeep')+':'" class="required">
                  <el-input v-model="formData.layerDeep"></el-input>
              </el-form-item>
              <div class="radio">
                <el-form-item :label="$t('form.click')+':'" class="required">
                    <el-radio v-model="formData.click" label="1">是</el-radio>
                    <el-radio v-model="formData.click" label="2">否</el-radio>
                </el-form-item>
                <el-form-item :label="$t('form.display')+':'" class="required">
                    <el-radio v-model="formData.display" label="1">是</el-radio>
                    <el-radio v-model="formData.display" label="2">否</el-radio>
                </el-form-item>
                <el-form-item :label="$t('form.search')+':'" class="required">
                    <el-radio v-model="formData.search" label="1">是</el-radio>
                    <el-radio v-model="formData.search" label="2">否</el-radio>
                </el-form-item>
              </div>
              <el-form-item :label="$t('form.description')+':'">
                  <el-input v-model="formData.description"></el-input>
              </el-form-item>
              <el-form-item :label="$t('form.sort')+':'" class="required">
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

<script src="./labelCategory.js"></script>

<style lang='scss'>
    .attr-organization{
        padding: 20px;
        .avatar-uploader{
            display: inline-block;
        }
        .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
            border-color: #409EFF;
        }
        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 66px;
            height: 66px;
            line-height: 66px;
            text-align: center;
        }
        .avatar {
            width: 66px;
            height: 66px;
            display: block;
        }
        .el-dialog__body{
            padding-top: 0;
            padding-bottom: 0;
        }
        .el-form-item {
            margin-bottom: 14px;
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
                width: 400px;
            }
        } 
        
    }
</style>


<style scoped lang="scss">
    .radio{
        display: flex;
    }
    .post-form{
        padding-right:100px;
    }
    .form-box{
        padding-right: 30px;
        padding-left: 10px;
    }
</style>
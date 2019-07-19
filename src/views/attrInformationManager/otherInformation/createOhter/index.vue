<template>
    <div class="create-other">
        <div class="map-box" id="map" v-loading="loaddingMap" element-loading-text="加载中..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.7)"></div>
        <div id="slider-height"></div>
        <div :class="{'slider-over':isOver}" class="slider">
            <el-scrollbar style="height:100%">
                <div class="slider-content" id="slider-content">
                    <el-form :model="postForm"  ref="ruleForm" status-icon label-width="80px" class="demo-ruleForm">
                        <el-form-item label="名称:" prop="polygonName" class="required" required :show-message="false">
                            <el-input v-model="postForm.polygonName" id="name"></el-input>
                        </el-form-item>
                        <el-form-item label="别名:" prop="alias" :show-message="false">
                            <el-input v-model="postForm.alias" id="alias"></el-input>
                        </el-form-item>
                        <el-form-item label="英文名:" prop="enName" :show-message="false">
                            <el-input v-model="postForm.enName" id="enName"></el-input>
                        </el-form-item>
                        <el-form-item label="类别:" prop="category" class="required">
                            <el-select v-model="postForm.typeCode" placeholder="请选择类别">
                            <el-option
                                v-for="item in types"
                                :key="item.typeCode"
                                :label="item.typeName"
                                :value="item.typeCode">
                            </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="图片:" prop="region">
                             <el-upload
                                class="avatar"
                                ref="avatar"
                                accept=".jpg,.png"
                                :action="baseUrl
                                +'/mapOrganization/uploadImg'"
                                :headers="{
                                    'Authorization':'Bearer ' + token
                                }"
                                :on-success="handleSuccess"
                                :on-remove="handleRemove"
                                :file-list="fileList"
                                list-type="picture-card">
                                <i class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item v-for="(item,index) of postForm.extendsFields" :label="item.columnCnname+':'" :key="index" v-if="item.show" :class="{'required':item.required}" :rules="{required:item.required,trigger: 'blur'}" :show-message="false" :prop="'extendsFields['+index+'].extendsValue'">
                            <el-input v-if="item.columnType===0" v-model="item.extendsValue" type="text"></el-input>
                            <el-input v-if="item.columnType===2" v-model="item.extendsValue" type="textarea" :rows="3" ></el-input>
                        </el-form-item>
                        <el-form-item label="排序:" prop="region">
                            <el-input v-model="postForm.orderId"></el-input>
                        </el-form-item>
                        <el-form-item label="备注:" prop="region">
                            <el-input v-model="postForm.memo"></el-input>
                        </el-form-item>
                        <el-form-item label="简介:" prop="region">
                            <el-input type="textarea" :rows="3" v-model="postForm.brief"></el-input>
                        </el-form-item>
                        <el-form-item class="btn-item">
                            <el-button type="primary" class="btn-sub" @click="handleSub">提交</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-scrollbar>
        </div>
        <div class="tool-box">
            <div class="level-box">
                <level-selector v-if="floor.floorShow && postForm.leaf" :minLevel='floor.minLevel' :maxLevel='floor.maxLevel' 
                :currentFloor="floor.currentLevel" @change-level='setLevel' :size='5'  />
            </div>
            <div class="zoom-box">
                <div class="item" @click="zoomIn">
                    <i class="el-icon-ips-jia"></i>
                </div>
                <div class="line"></div>
                <div class="item" @click="zoomOut">
                    <i class="el-icon-ips-jian"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="./create.js"></script>

<style lang="scss">
    .create-other{
        position: absolute;
        top: 84px;
        right: 0;
        left: 0;
        bottom: 0;
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
        .el-upload__tip{
            margin-left: 20px;
            display: inline-block;
            color: #8c939d;
        }
        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 62px;
            height: 62px;
            line-height: 62px;
            text-align: center;
        }
        .el-upload-list--picture-card .el-upload-list__item-status-label i{
            vertical-align: top;
        }
        .el-upload-list--picture-card .el-upload-list__item,.el-upload--picture-card{
            width: 62px;
            height: 62px;
            line-height: 62px;
        }
        .map-box{
            position: absolute;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
        }
        #slider-height{
            position: absolute;
            top: 20px;
            bottom:60px;
        }
        .slider-over{
            bottom:60px;
            padding-bottom: 0 !important;
        }
        .slider{
            position: absolute;
            top: 20px;
            left: 40px;
            width: 410px;
            padding-bottom: 20px;
            border: 1px solid #FDFEFF;
            box-shadow: 0 2px 4px rgba(4, 4, 4, .2);
            overflow-x: hidden;
            background: #fff;
        }
        .el-scrollbar__wrap{
            overflow-x:hidden;
        }
        .slider-content{
            width: 100%;
            background: #fff;
            padding:16px 20px;
        }
        .required .el-form-item__content::after {
            content: '*';
            display: inline-block;
            color: #f56c6c;
            margin-left: 4px;
            vertical-align: top;
        }
        .el-input{
            width: 90%;
        }
        .el-textarea {
            width: 90%;
        }
        .required .el-select{
            width: 90%;
            .el-input{
                width: 100%;
            }
        }
        .btn-sub{
            display: inline-block;
            padding: 10px 60px;
            margin-left: 40px;
        }
        label{
            font-weight: normal;
        }
        .btn-item{
            margin-bottom: 0;
        }
        .tool-box{
            position: absolute;
            bottom: 50px;
            right: 30px;
            width: 40px;
        }
        .zoom-box{
            width: 40px;
            background: #fff;
            border: 1px solid rgba(4, 4, 4, .1);
            box-shadow: 0 2px 4px rgba(4, 4, 4, .2);
            border-radius: 3px;
            .item{
                height: 40px;
                line-height: 40px;
                font-size: 20px;
                text-align: center;
                background: #fff;
                border-radius: 3px;
                color: #666;
                cursor: pointer;
            }
            .item:active{
                color: #999;
            }
            .line{
                margin: 0 auto;
                width: 20px;
                border-bottom: 1px solid rgba(4, 4, 4, .2);
            }
        }
    }
</style>

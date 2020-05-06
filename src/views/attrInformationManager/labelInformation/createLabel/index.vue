<template>
    <div class="create-label">
        <div class="map-box" id="map" v-loading="loaddingMap" element-loading-text="加载中..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.7)"></div>
        <div id="slider-height"></div>
        <div :class="{'slider-over':isOver}" class="slider" id="slider">
            <el-scrollbar style="height:100%">
                <div class="slider-content" id="slider-content">
                    <el-form :model="postForm" status-icon ref="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="标注名称:" prop="pointName" class="required">
                            <el-input v-model="postForm.pointName" id="name"></el-input>
                        </el-form-item>
                        <el-form-item label="校区:" prop="campusId" class="required">
                            <el-select v-model="campusId" placeholder="请选择校区">
                                <el-option
                                v-for="item in campus"
                                :key="item.groupId"
                                :label="item.name"
                                :value="item.map2D[item.map2D.length-1].mapZoneByZoneId.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="标注类别:" class="required" prop="typeCode" ref="typeRef"
                        :rules="{ required: true, message: '请选择标注类别', trigger: 'change' }">
                            <el-cascader
                                expand-trigger="hover"
                                :options="types"
                                :props="{
                                    value: 'typeCode',
                                    label: 'typeName',
                                    children: 'childrenMapPointTypeList'
                                }"
                                v-model="typeArr">
                            </el-cascader>
                        </el-form-item>
                        <el-form-item label="楼层:" prop="leaf" class="required">
                            <el-select v-model="postForm.leaf" placeholder="请选择楼层">
                                <el-option label="室外" :value="false"></el-option>
                                <el-option label="室内" :value="true"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="图片:" prop="region">
                            <el-upload
                                ref="avatar"
                                accept=".jpg,.png"
                                :action="baseUrl
                                +'/mapPoint/uploadImg'"
                                :headers="{
                                    'Authorization':'Bearer ' + token
                                }"
                                :on-success="handleSuccess"
                                :on-remove="handleRemove"
                                :file-list="fileList"
                                list-type="picture-card">
                                <i class="el-icon-plus avatar-uploader-icon"></i>
                                <div slot="tip" class="el-upload__tip">建议尺寸26x26px,图片大小不超过1M</div>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="二维位置绑定:" prop="location" class="required">
                            <el-input v-model="postForm.location" placeholder="请在地图上选择" ></el-input>
                        </el-form-item>
                        <el-form-item v-if="!isIndoor" label="三维位置绑定:" prop="rasterLngLatString" class="required" ref="raster">
                            <span @click="openRaster">
                                <el-input v-model="postForm.rasterLngLatString" placeholder="点击打开三维地图"></el-input>
                            </span>
                        </el-form-item>
                        <el-form-item v-for="(item,index) of postForm.extendsFields" :label="item.columnCnname+':'" :key="index" :class="{'required':item.required}" :rules="{required:item.required,trigger: 'blur'}" :show-message="false" :prop="'extendsFields['+index+'].extendsValue'">
                            <el-input v-if="item.columnType===0" v-model="item.extendsValue" type="text"></el-input>
                            <el-input v-if="item.columnType===2" v-model="item.extendsValue" type="textarea" :rows="3" ></el-input>
                        </el-form-item>
                         <el-form-item label="排序:" prop="orderId">
                            <el-input v-model.number="postForm.orderId"></el-input>
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
        <el-dialog
        title="三维位置绑定"
        :visible.sync="isOpenRaster"
        width="90%" top="5vh"
        @close="cancelMarker"
        >
            <div id="rasterMap"></div>
            <span slot="footer" class="dialog-footer">
                <el-button type="info" @click="isOpenRaster = false;isEnsure = false" size="small">取 消</el-button>
                <el-button type="primary" @click="oldRasterLngLat = postForm.rasterLngLatString;isOpenRaster = false;postForm.rasterLngLatString?isEnsure = true:isEnsure = false;$refs.raster.clearValidate()" size="small">确 定</el-button>
            </span>
        </el-dialog>
        <div class="tool-box">
            <div class="level-box">
                <level-selector ref="level" v-if="floor.floorShow" :minLevel='floor.minLevel' :maxLevel='floor.maxLevel'
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
    .create-label{
        position: absolute;
        top: 84px;
        right: 0;
        left: 0;
        bottom: 0;
        #rasterMap{
            height: 80vh;
        }
        .el-dialog__body{
            padding: 0;
        }
        .el-dialog__header{
            padding: 6px 20px;
            .el-dialog__title{
                font-size: 14px;
                font-weight: bold;
            }
        }
        .el-dialog__headerbtn{
            top: 12px;
        }
        .el-dialog__footer{
            padding: 6px 20px;
            .el-button--small{
                padding: 6px 12px;
            }
        }
        .el-form-item.is-required .el-form-item__label:before{
            display: none;
        }
        .el-upload-list--picture-card .el-upload-list__item-status-label i{
            vertical-align: top;
        }
        .el-upload-list--picture-card .el-upload-list__item,.el-upload--picture-card{
            width: 62px;
            height: 62px;
            line-height: 62px;
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
            width: 62px;
            height: 62px;
            line-height: 62px;
            text-align: center;
        }
        .el-upload__tip {
            display: block;
            margin-left: 0px;
            margin-bottom: -20px;
            margin-top: -5px;
            color: 8c939d
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
        .required .el-cascader{
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

<template>
    <div class="create-groundPanorama">
        <div class="map-box" id="map" v-loading="loaddingMap" element-loading-text="加载中..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.7)"></div>
        <div id="slider-height"></div>
        <div :class="{'slider-over':isOver}" class="slider">
            <el-scrollbar style="height:100%">
                <div class="slider-content" id="slider-content">
                    <el-form :model="postForm" :rules="rules" status-icon ref="ruleForm" label-width="80px" class="demo-ruleForm">
                        <el-form-item label="全景名称:" prop="roamName" class="required">
                            <el-input v-model="postForm.roamName" id="name"></el-input>
                        </el-form-item>
                        <el-form-item label="全景地址:" prop="roamnUrl" class="required">
                            <el-input v-model="postForm.roamnUrl" id="name"></el-input>
                        </el-form-item>
                        <el-form-item label="全景文件:">
                            <el-upload
                                ref="upload"
                                :headers="{
                                    'Authorization':'Bearer ' + token
                                }"
                                accept=".zip,.rar"
                                :action="baseUrl + '/roam/upload'"
                                :on-success="handleSuccess"
                                :limit="1">
                                <el-button size="small" type="primary">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">支持文件格式:.rar,.zip</div>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="校区:" prop="campusId" class="required">
                            <el-select v-model="campusId"  placeholder="请选择校区">
                                <el-option
                                v-for="item in campus"
                                :key="item.groupId"
                                :label="item.name"
                                :value="item.map2D[item.map2D.length-1].mapZoneByZoneId.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="二维位置:" prop="location" class="required">
                            <el-input v-model="postForm.location" placeholder="请在地图上选择"></el-input>
                        </el-form-item>
                        <el-form-item v-if="has3D" label="三维位置:" prop="rasterLngLat" class="required">
                            <span @click="openRaster">
                                <el-input v-model="postForm.rasterLngLat" placeholder="点击打开三维地图" readonly></el-input>
                            </span>
                        </el-form-item>
                        <el-form-item label="排序:" prop="orderId">
                            <el-input v-model.number="postForm.orderId"></el-input>
                        </el-form-item>
                        <el-form-item class="btn-item">
                            <el-button type="primary" class="btn-sub" @click="handleSub">提交</el-button>
                        </el-form-item>
                    </el-form>
                    <el-dialog
                    title="三维位置绑定"
                    :visible.sync="isOpenRaster"
                    @close="rasterClose"
                    width="90%" top="5vh">
                        <div id="rasterMap"></div>
                        <span slot="footer" class="dialog-footer">
                            <el-button type="info" @click="isOpenRaster = false;saveRaster = false" size="small">取 消</el-button>
                            <el-button type="primary" @click="isOpenRaster = false;saveRaster = true" size="small">确 定</el-button>
                        </span>
                    </el-dialog>
                </div>
            </el-scrollbar>
        </div>
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
        <div class="search-box">
            <el-select
                v-model="keyWord"
                filterable
                remote
                placeholder="请输入内容"
                :remote-method="remoteMethod"
                :loading="loading">
                <el-option
                v-for="item in POIList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
                </el-option>
            </el-select>
            <span class="el-icon-search"></span>
        </div>
        <div v-if="this.state !== 'add'" class="display-ground-panorama">
            <span>显示全部地面全景</span>
            <el-switch
                v-model="display">
            </el-switch>
        </div>
    </div>
</template>

<script src="./create.js"></script>

<style lang="scss">
    .create-groundPanorama{
        position: absolute;
        top: 84px;
        right: 0;
        left: 0;
        bottom: 0;
        .display-ground-panorama{
            position: absolute;
            display: flex;
            align-items: center;
            top: 20px;
            right: 20px;
            padding: 10px;
            width: 200px;
            border-radius: 2px;
            box-shadow: 0 2px 4px rgba(4, 4, 4, .2);
            background: #fff;
            z-index: 2;
            span{
                flex: 1;
                font-size: 14px;
                text-align: center;
            }
        }
        .search-box{
            display: flex;
            align-items: center;
            position: absolute;
            top: 20px;
            left: 470px;
            width: 210px;
            box-shadow: 0 2px 4px rgba(4, 4, 4, .2);
            background: #fff;
            span{
                padding: 0 6px;
            }
            .el-input{
                height: 40px;
                width: 100%;
                .el-input__inner{
                    border: none;
                    height: 40px;
                    line-height: 40px;
                }
            }
        }
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
        .map-box{
            position: absolute;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
        }
        #slider-height{
            position: absolute;
            background: #fff;
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

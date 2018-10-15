<template>
    <div class="app-container personal-info">
        <el-form :inline="true" :model="fromDate" label-position="right" class="demo-form-inline">
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="用户名：" prop="username" required>
                        <el-input v-model="fromDate.username" placeholder="必填"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="密码：" prop="password" required>
                        <el-input v-model="fromDate.password" type="password" placeholder="必填"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="手机号码：">
                        <el-input v-model="fromDate.phone" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="部门：">
                        <el-input v-model="fromDate.department" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="邮箱地址：">
                        <el-input type="email" v-model="fromDate.email" placeholder="请输入"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col>
                    <el-form-item label="角色：" required>
                        <el-checkbox-group v-model="fromDate.roles">
                            <el-checkbox :label="1">系统管理员</el-checkbox>
                            <el-checkbox :label="2">信息发布人员</el-checkbox>
                            <el-checkbox :label="3">统计查看人员</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col>
                    <el-form-item label=" ">
                        <el-button type="primary">提  交</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                fromDate:{
                    roles:[]
                }
            }
        }
    }
</script>

<style lang="scss">
    .personal-info{
        .el-form--inline .el-form-item{
            display: flex;
        }

        .el-form-item--medium .el-form-item__label{
            width: 150px;
        }
        .el-form-item--medium .el-form-item__content{
            flex: 1;
        }
        .el-checkbox+.el-checkbox {
            margin-left: 15px;
        }
        .btn-box{
            text-align: center;
        }
    }
</style>
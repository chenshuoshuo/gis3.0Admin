<template>
    <div class="app-container personal-info">
        <el-form :inline="true" :model="fromDate" label-position="right" class="demo-form-inline">
            <el-row :gutter="20">
                <el-col :span="8">
                    <el-form-item label="学校名称：" prop="school" required>
                        <el-input v-model="fromDate.school" placeholder="必填"></el-input>
                    </el-form-item>
                </el-col>
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
                <el-col :span="8" class="btn-box">
                    <el-button type="primary">提  交</el-button>
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
            flex: 1;
        }
        .el-form-item--medium .el-form-item__content{
            flex: 2;
        }
        .btn-box{
            text-align: center;
        }
    }
</style>
<template>
    <div class="app-container add-role">
        <el-form ref="form" :model="form" label-width="150px">
            <el-form-item label="角色名称：">
                <el-col :span="4">
                    <el-input v-model="form.rolename"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="选择功能权限：">
                <el-col :span="5" class="role-box">
                    <el-tree
                        :data="data2"
                        show-checkbox
                        default-expand-all
                        node-key="id"
                        :props="defaultProps">
                    </el-tree>
                </el-col>
            </el-form-item>
            <el-form-item label="">
                <el-button type="primary">提  交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                form:{

                },
                data2: [{
                    id: 1,
                    label: '一级 1',
                    children: [{
                        id: 4,
                        label: '二级 1-1',
                        children: [{
                        id: 9,
                        label: '三级 1-1-1'
                        }, {
                        id: 10,
                        label: '三级 1-1-2'
                        }]
                    }]
                    }, {
                    id: 2,
                    label: '一级 2',
                    children: [{
                        id: 5,
                        label: '二级 2-1'
                    }, {
                        id: 6,
                        label: '二级 2-2'
                    }]
                    }, {
                    id: 3,
                    label: '一级 3',
                    children: [{
                        id: 7,
                        label: '二级 3-1'
                    }, {
                        id: 8,
                        label: '二级 3-2'
                    }]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            }
        }
    }
</script>

<style scoped>
    .role-box{
        padding: 20px;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
    }
</style>
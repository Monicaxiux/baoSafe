<template>
    <el-form :model="data.parameter" status-icon class="demo-ruleForm from">
        <template v-if="type == 1">
            <el-form-item label="IC卡号">
                <el-input class="input" v-model="data.parameter.icCardWorkNumber" clearable placeholder="请输入IC卡号" />
            </el-form-item>
            <el-form-item label="员工姓名">
                <el-input class="input" v-model="data.parameter.username" clearable placeholder="请输入员工姓名" />
            </el-form-item>
            <el-button type="primary" class="button" @click="(data.parameter.pageNum = 1), select(data)">
                <el-icon class="i">
                    <Search />
                </el-icon>查询
            </el-button>
        </template>
        <template v-if="type == 2">
            <el-card style="padding: 0 10px;margin-right:20px ;width: 50%;">
                <h1>安全教育考卷信息</h1>
                <el-form-item label="起始日期">
                    <el-date-picker style="width:205px" value-format="YYYY-MM-DD" v-model="from.trainStartDate"
                        type="date" placeholder="培训起始日期" />
                </el-form-item>
                <el-form-item label="结束日期">
                    <el-date-picker style="width:205px" value-format="YYYY-MM-DD" v-model="from.trainEndDate"
                        type="date" placeholder="培训结束日期" />
                </el-form-item>
                <el-form-item label="考试日期">
                    <el-date-picker style="width:205px" value-format="YYYY-MM-DD" v-model="from.examDate" type="date"
                        placeholder="考试日期" />
                </el-form-item>
                <el-form-item label="考试成绩">
                    <el-input class="inputx" v-model.number="from.examScore" clearable placeholder="考试成绩" />
                </el-form-item>
                <el-form-item label="考卷照片">
                    <UploadImage :upload="uploadUserPic" :url="from.examPic"></UploadImage>
                </el-form-item>
                <div v-if="store.userInfo.userAuth != 3">
                    <el-divider />
                    <h1>安全教育下级区域</h1>
                    <el-form-item label="下级区域">
                        <el-select style="width: 150px;margin-right: 20px;" v-model="from.nextSafeManageArea"
                            placeholder="请选择下级区域">
                            <el-option v-for="item in manageAreaList" :key="item.id" :label="item.value"
                                :value="item.id" />
                        </el-select>
                    </el-form-item>
                </div>

            </el-card>
            <el-card style="width: 50%;">
                <el-table max-height="400" border :data="tableDatax" class="tablex">
                    <el-table-column fixed label="考卷照片" width="100">
                        <template #default="scope">
                            <MyImg :imgUrl="scope.row.examPic"></MyImg>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="90">
                        <template #default="scope">
                            <el-button size="small" type="danger" @click="handleDelete(scope.$index)">
                                <el-icon>
                                    <Delete />
                                </el-icon>
                                删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
        </template>
    </el-form>
</template>

<script setup lang="ts">
import { Search, Plus } from '@element-plus/icons-vue'//引入elementui 图标
import { ref } from 'vue';
import UploadImage from '@/components/UploadImage.vue'//分页组件
import { getBase64 } from '@/utils/regexp'
import MyImg from '@/components/ImaPreview.vue'
import { ElMessageBox, ElNotification } from 'element-plus'
import { Delete, EditPen } from '@element-plus/icons-vue'//引入elementui 图标
import { piniaData } from '@/store';//引入pinia状态管理

const store = piniaData();
// 定义Props默认数据类型
type Props = {
    data: any,//搜索参数
    select: Function,//搜索方法
    type: number,
    manageAreaList: any,
    from: any,
    isForm: any,
    handleDelete: any,
    uploadUserPic: any,
    tableDatax: any
}
// 使用defineProps接收父组件的传递值
const props = defineProps<Props>()

</script>

<style scoped>
.input {
    width: 150px;
    margin-right: 20px;
}

.from {
    display: flex;
}

.inputx {
    width: 205px;
}
</style>
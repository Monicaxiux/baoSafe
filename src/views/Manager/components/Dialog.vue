<template>
    <el-dialog v-model="dialogVisible" title="Tips" width="30%" :before-close="handleClose">
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="handleEditT">Cancel</el-button>
                <el-button type="primary" @click="handleEditT">Confirm</el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script lang="ts" setup>
import { ref, toRefs } from 'vue'
import { ElMessageBox } from 'element-plus'
// 定义Props默认数据类型
type Props = {
    dialogVisible: boolean,
    handleEditT: Function
}
// 使用defineProps接收父组件的传递值
const props = defineProps<Props>()
const handleClose = (done: () => void) => {
    ElMessageBox.confirm('Are you sure to close this dialog?')
        .then(() => {
            props.handleEditT();
            console.log(props.dialogVisible);
        })
        .catch(() => {
            // catch error
        })
}
</script>
<style scoped>
.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>
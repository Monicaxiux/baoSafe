<template>
    <el-dialog v-model="dialogVisible" title="修改权限" width="30%" :before-close="handleClose">
        <el-card>
            <h4>选择权限</h4>
            <el-form-item>
                <el-select style="width: 150px;margin-right: 20px;" @change="change" v-model="from.userAuth"
                    placeholder="请选择权限">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <h4>选择区域</h4>
            <el-form-item>
                <el-select disabled style="width: 150px;margin-right: 20px;" v-model="authArea" placeholder="请选择一级区域">
                    <el-option v-for="item in addressList1" :key="item.id" :label="item.name || item.value"
                        :value="item.id" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select @change="change2" :disabled="disabled" style="width: 150px;margin-right: 20px;"
                    v-model="from.authArea" placeholder="请选择二级区域">
                    <el-option v-for="item in from.addressList" :key="item.id" :label="item.name || item.value"
                        :value="item.id" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select :disabled="disabled2" style="width: 150px;margin-right: 20px;" v-model="from.authArea2"
                    placeholder="请选择三级区域">
                    <el-option v-for="item in from.addressList3" :key="item.id" :label="item.name || item.value"
                        :value="item.id" />
                </el-select>
            </el-form-item>
        </el-card>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="handleEditT(2)">取消</el-button>
                <el-button type="primary" @click="handleEditT(1)">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script lang="ts" setup>
import { ref, toRefs, watch } from 'vue'
import { ElMessageBox } from 'element-plus'
import { selectAddress } from '@/api/safety';
import { EiInfo } from '@/types';
// 定义Props默认数据类型
type Props = {
    dialogVisible: boolean,
    handleEditT: Function,
    from: any
}
// 使用defineProps接收父组件的传递值
const props = defineProps<Props>()
const authArea = ref(1)
const disabled = ref(true)
const disabled2 = ref(true)
const multiple = ref(true)
const addressList1: any = ref([
    {
        name: "宝日汽车板",
        id: 1,
    },
])
const options = ref([
    {
        label: "一级安全教育",
        value: 1,
    },
    {
        label: "二级安全教育",
        value: 2,
    },
    {
        label: "三级安全教育",
        value: 3,
    },
    {
        label: "管理员",
        value: 0,
    },
    {
        label: "普通员工",
        value: -1,
    }
])

// 监听表格数据来开启提交按钮
watch(props.from, (newValue, oldValue) => {
    console.log(newValue.userAuth);

    switch (newValue.userAuth) {
        case '一级安全教育':
            disabled.value = true
            break;
        case '二级安全教育':
            multiple.value = true
            disabled2.value = true
            disabled.value = false
            break;
        case '三级安全教育':
            multiple.value = false
            disabled2.value = false
            disabled.value = true
            break;
    }
})

const change = (i: any) => {
    console.log(i);
    let eiInfo = new EiInfo
    let manageAreaType = 1
    props.from.authArea2 = ''
    props.from.authArea = ''
    props.from.addressList = []
    props.from.addressList3 = []
    let s = 0
    switch (i) {
        case 1:
            manageAreaType = 2
            disabled2.value = true
            s = 1
            disabled.value = true
            break;
        case 2:
            manageAreaType = 2
            s = 1
            multiple.value = true
            disabled2.value = true
            disabled.value = false
            break;
        case 3:
            manageAreaType = 3
            // s = 1
            multiple.value = false
            disabled2.value = false
            disabled.value = true
            break;
        case 0:
            disabled2.value = true
            disabled.value = true
            break;
        case -1:
            disabled2.value = true
            disabled.value = true
            break;
    }
    eiInfo.parameter = {
        // previousKey: s,
        manageAreaType: manageAreaType
    }

    selectAddress(eiInfo).then((res: any) => {
        if (manageAreaType == 3) {
            props.from.addressList3 = res.result.manageArea
        } else {
            props.from.addressList = res.result.manageArea
        }
    })
}

const change2 = (i: any) => {
    if (multiple.value) {

    } else {
        props.from.authArea2 = ''
        console.log(i);
        let eiInfo = new EiInfo
        eiInfo.parameter = {
            previousKey: i,
            manageAreaType: 3
        }
        selectAddress(eiInfo).then((res: any) => {
            props.from.addressList3 = res.result.manageArea
        })
    }

}

const handleClose = (done: () => void) => {
    ElMessageBox.confirm('是否取消操作?')
        .then(() => {
            props.handleEditT(2);
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
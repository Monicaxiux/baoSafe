<template>
    <div class="transfer" ref="transfer">
        <el-transfer @change="change" v-model="value" :data="data" :titles="titles">
            <template #default="{ option }">
                <div class="pannel-content">
                    <span :draggable="!option.disabled" @dragstart="drag($event, option)">{{ option.label
                    }}</span>
                </div>
            </template>
        </el-transfer>
    </div>
</template>

<script lang="ts" setup>
import { ElMessageBox, TransferDataItem } from 'element-plus'
import Sortable from 'sortablejs'
import { ref, onMounted, computed, watch } from 'vue'
const props = withDefaults(defineProps<{
    data: TransferDataItem[],
    titles?: [string, string]
}>(), {
    data: () => [{
        key: 1,
        label: `选项1`,
        disabled: false,
    }, {
        key: 2,
        label: `选项2`,
        disabled: false,
    }, {
        key: 3,
        label: `选项3`,
        disabled: false,
    }, {
        key: 4,
        label: `选项4`,
        disabled: false,
    }],
    titles: () => ['待选列表', '已选列表']
})
const data = computed(() => props.data)
const titles = computed(() => props.titles)

const value: any = ref([])
const old: any = ref([])
watch(value, (newValue, oldValue) => {
    console.log(newValue, '新值');

    old.value = oldValue
})
const draggingKey = ref(null as any)
const transfer = ref<HTMLDivElement | null>(null)
const drag = (ev: DragEvent, option: any) => {
    draggingKey.value = option.key
}
const change = (val: any, val2: any, val3: any) => {
    ElMessageBox.confirm('确定移动?')
        .then(() => {

        }).catch(() => {
            value.value = old.value
        })
}
onMounted(() => {
    const leftPanel = transfer?.value?.getElementsByClassName("el-transfer-panel")[0].getElementsByClassName("el-transfer-panel__body")[0] as any;
    const rightPanel = transfer?.value?.getElementsByClassName("el-transfer-panel")[1].getElementsByClassName("el-transfer-panel__body")[0] as any;
    const leftEl = leftPanel?.getElementsByClassName("el-transfer-panel__list")[0]
    const rightEl = rightPanel?.getElementsByClassName("el-transfer-panel__list")[0]
    Sortable.create(rightEl, {
        onEnd: (evt: any) => {
            const { oldIndex, newIndex } = evt;
            const temp = value.value[oldIndex]
            if (!temp || temp === 'undefined') return;// 解决右边最后一项从右边拖左边，有undefined的问题
            value.value[oldIndex] = value.value[newIndex]
            value.value[newIndex] = temp
        }
    })
    Sortable.create(leftEl, {
        onEnd: (evt: any) => {
            const { oldIndex, newIndex } = evt;
            if (oldIndex === newIndex) return;
            const temp = data.value[oldIndex]
            if (!temp || (temp as any) === 'undefined') return;// 解决右边最后一项从右边拖左边，有undefined的问题
            data.value[oldIndex] = data.value[newIndex]
            data.value[newIndex] = temp
        }
    })
    leftPanel.ondragover = (ev: any) => {
        ev.preventDefault()
    }
    leftPanel.ondrop = (ev: any) => {
        ev.preventDefault();
        const index = value.value.indexOf(draggingKey.value)
        if (index !== -1) {
            ElMessageBox.confirm('确定移动?')
                .then(() => {
                    value.value.splice(index, 1)
                }).catch(() => {

                })
        }
    }
    rightPanel.ondragover = (ev: any) => {
        ev.preventDefault()
    }
    rightPanel.ondrop = (ev: any) => {
        ev.preventDefault();
        if (value.value.indexOf(draggingKey.value) === -1) {
            ElMessageBox.confirm('确定移动?')
                .then(() => {
                    value.value.push(draggingKey.value)
                }).catch(() => {

                })
        }
    }
})
</script>
<style scoped>
:deep(.el-transfer__button) {
    width: 30px;
}
</style>
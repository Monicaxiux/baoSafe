<!-- <template>
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
</style> -->



<template>
    <div class="app-container home">
        <el-table class="t1" ref="dragTable" :data="tableData" row-key="id" border :row-class-name="tableRowClassName">
            <el-table-column prop="date" label="日期"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button class="move" type="text" size="small">拖 拽</el-button>
                </template>
            </el-table-column>
        </el-table>
        <br><br><br>
        <el-table class="t2" ref="dragTable" :data="tableData" row-key="id" border :row-class-name="tableRowClassName">
            <el-table-column prop="date" label="日期"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button class="move" type="text" size="small">拖 拽</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script setup lang="ts">
import Sortable from "sortablejs";
import { onMounted, reactive, toRefs } from "vue";
const data = reactive({
    tableData: [
        {
            id: "1",
            name: "text_1",
            date: "1111-11-11",
            address: "测试_1",
        },
        {
            id: "2",
            name: "text_2_不可拖拽",
            date: "2222-22-22",
            address: "测试_2_不可拖拽",
            disabled: true,
        },
        {
            id: "3",
            name: "text_3",
            date: "3333-33-33",
            address: "测试_3",
        },
        {
            id: "4",
            name: "text_4",
            date: "4444-44-44",
            address: "测试_4",
        },
        {
            id: "5",
            name: "text_5",
            date: "5555-55-55",
            address: "测试_5",
        }
    ]

});

const { tableData } = toRefs(data);

// 创建sortable实例
function initSortable(className) {
    // 获取表格row的父节点
    const table = document.querySelector('.' + className + ' .el-table__body-wrapper tbody');
    // 创建拖拽实例
    let dragTable = Sortable.create(table, {
        animation: 150, //动画
        disabled: false, // 拖拽不可用? false 启用（刚刚渲染表格的时候起作用，后面不起作用）
        handle: ".move", //指定拖拽目标，点击此目标才可拖拽元素(此例中设置操作按钮拖拽)
        filter: ".disabled", //指定不可拖动的类名（el-table中可通过row-class-name设置行的class）
        dragClass: "dragClass", //设置拖拽样式类名
        ghostClass: "ghostClass", //设置拖拽停靠样式类名
        chosenClass: "chosenClass", //设置选中样式类名
        // 开始拖动事件
        onStart: () => {
            console.log("开始拖动");
        },
        // 结束拖动事件
        onEnd: ({ newIndex, oldIndex }) => {
            console.log(
                "结束拖动",
                `拖动前索引${oldIndex}---拖动后索引${newIndex}`
            );
            const currRow = tableData.value.splice(oldIndex, 1)[0];
            tableData.value.splice(newIndex, 0, currRow);
            console.log(
                "结束拖动", tableData.value);
        },
    });
};
// 创建sortable实例
function initSortable2(className) {
    // 获取表格row的父节点
    const table = document.querySelector('.' + className + ' .el-table__body-wrapper tbody');
    // 创建拖拽实例
    let dragTable = Sortable.create(table, {
        animation: 150, //动画
        disabled: false, // 拖拽不可用? false 启用（刚刚渲染表格的时候起作用，后面不起作用）
        handle: ".move", //指定拖拽目标，点击此目标才可拖拽元素(此例中设置操作按钮拖拽)
        filter: ".disabled", //指定不可拖动的类名（el-table中可通过row-class-name设置行的class）
        dragClass: "dragClass", //设置拖拽样式类名
        ghostClass: "ghostClass", //设置拖拽停靠样式类名
        chosenClass: "chosenClass", //设置选中样式类名
        // 开始拖动事件
        onStart: () => {
            console.log("开始拖动");
        },
        // 结束拖动事件
        onEnd: ({ newIndex, oldIndex }) => {
            console.log(
                "结束拖动",
                `拖动前索引${oldIndex}---拖动后索引${newIndex}`
            );
            const currRow = tableData.value.splice(oldIndex, 1)[0];
            tableData.value.splice(newIndex, 0, currRow);
            console.log(
                "结束拖动", tableData.value);
        },
    });
};
// 设置表格row的class
function tableRowClassName({ row }) {
    if (row.disabled) {
        return "disabled";
    }
    return "";
};
onMounted(() => {
    initSortable('t1')
    initSortable2('t2')
})

</script>
 
<style scope>
/* .dragClass {
  background: rgba($color: #41c21a, $alpha: 0.5) !important;
}
// 停靠
.ghostClass {
  background: rgba($color: #6cacf5, $alpha: 0.5) !important;
}
// 选择
.chosenClass:hover > td {
  background: rgba($color: #f56c6c, $alpha: 0.5) !important;
} */
</style>
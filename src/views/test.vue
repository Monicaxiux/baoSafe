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
        <el-table name="A" class="t1" ref="dragTable" :data="tableData" row-key="id" border
            :row-class-name="tableRowClassName">
            <el-table-column label="磨床" width="110">
                <el-table-column label="" width="70">
                    <template #default="scope">
                        <el-button class="move" type="text" size="small"><i
                                class="iconfont icon-guanwangguanli_yidongguandian"></i></el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="date" label="日期" width="110"></el-table-column>
                <el-table-column prop="name" label="姓名" width="110"></el-table-column>
                <el-table-column prop="address" label="地址"></el-table-column>
            </el-table-column>
        </el-table>
        <el-table name="B" class="t2" ref="dragTable" :data="tableData2" row-key="id" border
            :row-class-name="tableRowClassName">
            <el-table-column label="磨床" width="110">
                <el-table-column label="" width="70">
                    <template #default="scope">
                        <el-button class="move" type="text" size="small"><i
                                class="iconfont icon-guanwangguanli_yidongguandian"></i></el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="date" label="日期" width="110"></el-table-column>
                <el-table-column prop="name" label="姓名" width="110"></el-table-column>
                <el-table-column prop="address" label="地址"></el-table-column>
            </el-table-column>
        </el-table>
        <el-table name="C" class="t3" ref="dragTable" :data="tableData3" row-key="id" border
            :row-class-name="tableRowClassName">
            <el-table-column label="人工检测" width="110">
                <el-table-column label="" width="70">
                    <template #default="scope">
                        <el-button class="move" type="text" size="small"><i
                                class="iconfont icon-guanwangguanli_yidongguandian"></i></el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="date" label="日期" width="110"></el-table-column>
                <el-table-column prop="name" label="姓名" width="110"></el-table-column>
                <el-table-column prop="address" label="地址"></el-table-column>
            </el-table-column>
        </el-table>
        <el-table name="C" class="t4" ref="dragTable" :data="tableData3" row-key="id" border
            :row-class-name="tableRowClassName">
            <el-table-column label="辊架" width="110">
                <el-table-column label="" width="70">
                    <template #default="scope">
                        <el-button class="move" type="text" size="small"><i
                                class="iconfont icon-guanwangguanli_yidongguandian"></i></el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="date" label="日期" width="110"></el-table-column>
                <el-table-column prop="name" label="姓名" width="110"></el-table-column>
                <el-table-column prop="address" label="地址"></el-table-column>
            </el-table-column>
        </el-table>
        <el-table name="C" class="t5" ref="dragTable" :data="tableData3" row-key="id" border
            :row-class-name="tableRowClassName">
            <el-table-column label="机器人" width="110">
                <el-table-column label="" width="70">
                    <template #default="scope">
                        <el-button class="move" type="text" size="small"><i
                                class="iconfont icon-guanwangguanli_yidongguandian"></i></el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="date" label="日期" width="110"></el-table-column>
                <el-table-column prop="name" label="姓名" width="110"></el-table-column>
                <el-table-column prop="address" label="地址"></el-table-column>
            </el-table-column>
        </el-table>
        <el-table name="C" class="t6" ref="dragTable" :data="tableData3" row-key="id" border
            :row-class-name="tableRowClassName">
            <el-table-column label="AGV1" width="110">
                <el-table-column label="" width="70">
                    <template #default="scope">
                        <el-button class="move" type="text" size="small"><i
                                class="iconfont icon-guanwangguanli_yidongguandian"></i></el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="date" label="日期" width="110"></el-table-column>
                <el-table-column prop="name" label="姓名" width="110"></el-table-column>
                <el-table-column prop="address" label="地址"></el-table-column>
            </el-table-column>
        </el-table>
        <el-table name="C" class="t7" ref="dragTable" :data="tableData3" row-key="id" border
            :row-class-name="tableRowClassName">
            <el-table-column label="AGV2" width="110">
                <el-table-column label="" width="70">
                    <template #default="scope">
                        <el-button class="move" type="text" size="small"><i
                                class="iconfont icon-guanwangguanli_yidongguandian"></i></el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="date" label="日期" width="110"></el-table-column>
                <el-table-column prop="name" label="姓名" width="110"></el-table-column>
                <el-table-column prop="address" label="地址"></el-table-column>
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
            name: "text_2",
            date: "2222-22-22",
            address: "测试_2",
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
    ],
    tableData2: [
        {
            id: "8",
            name: "text_8",
            date: "8888-88-88",
            address: "测试_8",
        }
    ],
    tableData3: [
        {
            id: "9",
            name: "text_9",
            date: "9999-99-99",
            address: "测试_9",
        }
    ]
});

const { tableData } = toRefs(data);
const { tableData2 } = toRefs(data);
const { tableData3 } = toRefs(data);

// 创建sortable实例
const initSortable = (className) => {
    // 获取表格row的父节点
    const table = document.querySelector('.' + className + ' .el-table__body-wrapper tbody');
    // 创建拖拽实例
    let dragTable = Sortable.create(table, {
        animation: 150, //动画
        group: "t2",
        disabled: false, // 拖拽不可用? false 启用（刚刚渲染表格的时候起作用，后面不起作用）
        handle: ".move", //指定拖拽目标，点击此目标才可拖拽元素(此例中设置操作按钮拖拽)
        filter: ".disabled", //指定不可拖动的类名（el-table中可通过row-class-name设置行的class）
        dragClass: "dragClass", //设置拖拽样式类名
        ghostClass: "ghostClass", //设置拖拽停靠样式类名
        chosenClass: "chosenClass", //设置选中样式类名
        // 开始拖动事件
        onStart: (evt) => {
            // console.log(evt.oldIndex);
        },
        // 元素从列表中移除进入另一个列表
        onRemove: (/**Event*/evt) => {
            console.log(evt, 'A表打印');
            var index = evt.oldIndex;
            var arr = dragTable.toArray();
            // console.log("新的顺序是：" + JSON.stringify(arr) + "，你移除了");
            // console.log(evt.item);

        },
        onAdd: (evt) => {
            // console.log(evt);
        },
        // 结束拖动事件
        onEnd: ({ newIndex, oldIndex }) => {
            // console.log(
            //     "结束拖动", tableData.value, "A表数据");
        },
    });
};
// 设置表格row的class
const tableRowClassName = ({ row }) => {
    if (row.disabled) {
        return "disabled";
    }
    return "";
};
onMounted(() => {
    initSortable('t1')
    initSortable('t2')
    initSortable('t3')
    initSortable('t4')
    initSortable('t5')
    initSortable('t6')
    initSortable('t7')
})

</script>
 <style>
 .move {
     cursor: move;
 }
 
 .home {
     height: 80vh;
 }
 
 .t1 {
     position: absolute;
     top: 50px;
     height: 500px;
     width: 300px;
 }
 
 .t2 {
     position: absolute;
     top: 50px;
     right: 50px;
     height: 500px;
     width: 300px;
 }
 
 .t3 {
     position: absolute;
     top: 50px;
     left: 370px;
     height: 200px;
     width: 300px;
 }
 
 .t4 {
     position: absolute;
     top: 280px;
     left: 370px;
     height: 200px;
     width: 300px;
 }
 
 .t5 {
     position: absolute;
     top: 510px;
     left: 370px;
     height: 200px;
     width: 300px;
 }
 
 .t6 {
     position: absolute;
     top: 600px;
     height: 180px;
     left: 35px;
     width: 300px;
 }
 
 .t7 {
     position: absolute;
     top: 600px;
     right: 50px;
     height: 180px;
     width: 300px;
 }
 </style>
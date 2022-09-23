<template>
  <div>
    <br>
    <el-pagination v-if="hide" background @size-change="handleSizeChange" @current-change="handlePageChange"
      :page-sizes="[10, 30, 100]" :current-page="currentpage" :page-size="pagesize"
      layout="total,prev, pager, next, jumper" :total="total">
    </el-pagination>
  </div>
</template>

<script lang="ts" setup>
// 定义Props默认数据类型
type Props = {
  pagesize: number,//一页多少条
  currentpage: number,//当前页
  total: number,//总页数
  options: any,  // 分页发生变化赋值给options
  render: Function, // 跳转触发的请求
  hide: boolean //控制显示隐藏
}
// 使用defineProps接收父组件的传递值
const props = defineProps<Props>()
// 分页导航
const handlePageChange = (val) => {
  props.options.parameter.pageNum = val;
  // 调用从父组件传来的查询方法
  props.render(props.options);
}
//切换分页条数
const handleSizeChange = (val) => {
  props.options.parameter.pageNum = val;
  props.render(props.options);
}
</script>

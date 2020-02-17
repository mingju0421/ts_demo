<template>
  <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      prop="date"
      label="日期"
      :render-header="render_header"
      prefix-icon="el-icon-edit"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址">
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }

    },
    methods: {
        render_header (h, { column, $index }) {
            console.log(column, $index )
            return h('span', {}, [
                h('span', {}, '时间片段'),
                h('el-popover', { props: { placement: 'top-start', width: '200', trigger: 'hover', content: '领先/落后品类=单店平均单量-该品类城市店均单量' }}, [
                h('i', { slot: 'reference', class:'el-icon-question'}, '')
                ]),
                h('i', {  class:'el-icon-question'}, 'sss')
            ])
        }
    }
    
  }
</script>
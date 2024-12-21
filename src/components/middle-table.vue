<template>
    <div >
      <el-table :header-cell-style="{background:'#f2f2f2',color:'#666',fontWeight:'bold',fontSize:'16px'}" :data="listTagClass"  class="tableDiv" border>
        <el-table-column
            v-for="item in this.listType"
            align="center"
            :key="item.id"
            :label="item.x"
            width="45"
        >
          <template slot-scope="scope">
            <span v-for="(i, index) in scheduleList" :key="index">
              <span style="width:60" v-if="scope.row.z===i.z && item.x===i.x">
                <div>{{ i.箱号 }}</div>
                <div>{{ i.箱尺 }}</div>
              </span>
            </span>
          </template>
        </el-table-column>
      </el-table>
      <div style="clear: both;"></div>
      <div class="listDiv">
        <span v-for="item in listType" :key="item.x"> {{ item.x }}</span>
      </div>
      <div style="clear: both;"></div>
    </div>
</template>
<script>
  export default {
    name: 'MyChart',
    data() {
      return {
        scheduleList: [],
        listTagClass:[
            {z:'5'},
            {z:'4'},
            {z:'3'},
            {z:'2'},
            {z:'1'},
        ],
        listType: [
            {x:'01'},
            {x:'02'},
            {x:'03'},
            {x:'04'},
            {x:'05'},
            {x:'06'},
            {x:'07'},
            {x:'08'},
            {x:'09'},
            {x:'10'},
            {x:'11'},
        ],
      };
    },
    mounted() {
        this.fetchData()
    },
    methods: {
        async fetchData() {
          this.scheduleList = [
            {"z":"1","x":"01","箱号":"MU5400",'箱尺':'20寸'},
            {"z":"1","x":"02","箱号":"MU7348",'箱尺':'20寸'},
            {"z":"3","x":"04","箱号":"MU2816",'箱尺':'20寸'},
            {"z":"2","x":"10","箱号":"MU6821",'箱尺':'20寸'},
            {"z":"2","x":"07","箱号":"GA7775",'箱尺':'20寸'},
            {"z":"2","x":"08","箱号":"GA7881",'箱尺':'20寸'},
            {"z":"2","x":"09","箱号":"GA7834",'箱尺':'20寸'},
            {"z":"3","x":"04","箱号":"GA8120",'箱尺':'20寸'},
            {"z":"3","x":"01","箱号":"GA7342",'箱尺':'20寸'},
            {"z":"4","x":"01","箱号":"KU7251",'箱尺':'20寸'},
            {"z":"4","x":"03","箱号":"KU6105",'箱尺':'20寸'},
            {"z":"3","x":"11","箱号":"KU8103",'箱尺':'20寸'},
            {"z":"5","x":"01","箱号":"KU7324",'箱尺':'20寸'},
            {"z":"5","x":"02","箱号":"KU7215",'箱尺':'20寸'},
            {"z":"3","x":"03","箱号":"KU6104",'箱尺':'20寸'}
          ]
        }
    }
  };
  
  
</script>
<style scoped>
/deep/.el-table .cell {
    line-height: 10px !important;
    font-size: 8px !important;
    padding-left: 3px !important;
    padding-right: 3px !important;
}
/deep/.el-table .el-table__cell{
     padding: 7px 0 !important;
 }
/deep/.el-table thead {
    display: none !important;
}


/deep/.el-table thead.is-group th.el-table__cell {
    background: #dfdfe0;
}
/**改变边框颜色*/
/deep/.el-table--border, .el-table--group {
    border: 1px solid #c3c5c900!important;
    border-bottom: 1px solid #c3c5c9!important;
}
/**改变表格内竖线颜色*/
/deep/.el-table--border  td, .el-table--border th, .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed {
    border-right: 1px solid #c3c5c9!important;
}
/**改变合并单元格中横线颜色 */
/deep/.el-table--border th.el-table__cell {
    border-bottom: 1px solid #c3c5c9;
}
/**改变表格内常规行线颜色*/
/deep/.el-table  td, .el-table th.is-leaf  {
    /* border-bottom: 1px solid #c3c5c9!important; */
    border-left: 1px solid #c3c5c9 !important;
    border-top: 1px solid #c3c5c9 !important;
}
/deep/.el-table--border::after, .el-table--group::after {
    width: 0px !important;
}
.tableDiv{
    width: 497px;
    margin-top: 130px;
    float: right;
    margin-right: 20px;
}
.listDiv{
    width: 497px;
    float: right;
    margin-right: 20px;
    span{
        display: inline-block;
        width: 45px;
        text-align: center;
    }
}
/deep/.el-table__body{
  border-spacing: 2px 0px !important;
}
/deep/.el-table__body, .el-table__footer, .el-table__header {
    table-layout: auto !important;
}
</style>
  
  
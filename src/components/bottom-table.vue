<template>
    <div class="tableBody">
      <div class="xScale" style="margin-left: 25px;">
        <span class="scale" v-for="(x) in xScale" :key="x">{{x}}</span>
      </div>
      <div v-for="(cols, cindex) in formatData" :key="cindex">
        <div class="lineBody">
          <span style="margin-right:10px;">0{{cindex + 1}}</span>
          <div v-for="(row, rindex) in cols" :key="row.code">
            <bottomtablechild :info="cols[cols.length - rindex - 1]" />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import bottomtablechild from "./bottom-table-child";
  const MAXY = 6; 
  export default {
    components: { bottomtablechild },
    data() {
      return {
        xScale: [
          '1','3','5','7','9',
          '11','13','15','17','19',
          '21','23','25','27','29',
          '31','33','35','37','39',
          '41','43','45','47','49',
          '51'
        ],

        yScale: 6,
        originData: [
          { x: 1, y: 1, z: 1, code: "1", size: 40 },
          { x: 7, y: 1, z: 1, code: "2", size: 20 },
          { x: 9, y: 1, z: 1, code: "2", size: 20 },
          { x: 5, y: 3, z: 3, code: "5", size: 40 },
          { x: 3, y: 2, z: 2, code: "3", size: 20 },
          { x: 7, y: 4, z: 3, code: "6", size: 20 },
          { x: 5, y: 2, z: 1, code: "4", size: 20 },
          { x: 11, y: 2, z: 1, code: "8", size: 20 },
          { x: 31, y: 5, z: 1, code: "8", size: 40 },
          { x: 27, y: 6, z: 3, code: "8", size: 40 },

        ],
        formatData: []
      };
    },
    mounted() {
      this.formatDataArr()
      this.initData();
    },
    methods: {
      formatDataArr(){
        this.originData.sort(function (a,b) {
          if(a.y>b.y){
            return 1
          }else if(a.y == b.y){
            return a.x>b.x?1:-1
          }else{
            return -1
          }
        })
      },
      initData() {
        let formatDataTemp = [];
        let index = 0;
        for (let j = 1; j <= MAXY; j++) {
          let rowTemp = [];
          for (let i = 1; i <= this.xScale[this.xScale.length-1]; ) {
            if (this.originData[index] && this.originData[index].x == i && this.originData[index].y == j) {
              let width = this.originData[index].size / 10;
              rowTemp.push(this.originData[index]);
              i += width;
              index++;
            } else {
              rowTemp.push({
                x: i,
                y: j,
                z: 1,
                code: "empty" + "_" + i + "_" + j,
                size: 20
              });
              i += 2;
            }
          }
          rowTemp.reverse()
          formatDataTemp.push(rowTemp);
        }
        this.formatData = formatDataTemp;
      }
    }
  };
  </script>
  
  <style lang="less" scoped>
  .tableBody {
      font-size: 12px;
    // 这里与box保持一致
    .scale {
      width: 31.67px;
      display: inline-block;
      text-align: center;
    }
    .lineBody {
      display: flex;
    }
  }
  </style>
  
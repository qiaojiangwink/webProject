<template>
    <div class="boxBody" :style="getWH">
      <span v-for="(item, index) in info.z" :key="info.code + '_' + index" :style="getSize"></span>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      info: Object
    },
    data() {
      return {
        boxWidth: 30,
        boxHeight: 20,
        appendWidth: 1//margin + border
      };
    },
    mounted(){
    },
    computed: {
      getWH() {
        let bgColor;
        if (this.info.code.indexOf("empty") != -1) {
          bgColor = "background-color: #ffffff;";
        } else {
          bgColor = "background-color: #ff0000;";
        }
        return (
          `width: ${(this.info.size / 20) * this.boxWidth + (this.info.size / 20 - 1) * this.appendWidth}px; 
          height: ${this.boxHeight}px;` + bgColor
        );
      },
      getSize() {
        return `width:${(1 / this.info.z) * 100}%`;
      }
    }
  };
  </script>
  
  <style lang="less" scoped>
  .boxBody {
    display: flex;
    justify-content: space-between;
    border: 1px solid rgb(193 193 193 / 50%);
    span:nth-child(n + 2) {
      display: inline-block;
      height: 100%;
      border-left: 1px solid #fff;
    }
  }
  </style>
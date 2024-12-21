<template>
  <div>
    <button @click="testBackendLog">测试后端日志</button>
    <div class="banner">
      <div class="logo">
        <span>远程智能控制系统</span>
      </div>
      <div class="userInfo">
        <span>工号：yk001</span>
        <span>用户名：yk001</span>
        <span>操作台编号：CONSOLE17</span>
        <span>时间：2024-08-09 10:22:44</span>
      </div>
    </div>
    <div class="title">
        <div  class="titleDiv">
          <div class="item"  v-for="(item,index) in collectInfo1" :key="index">
            <span class="lab">{{item.label}}:</span>
            <span class="num">{{item.value}}</span>
          </div>
        </div>
        <div  class="titleDiv">
          <div :span="4" class="item"  v-for="(item,index) in collectInfo2" :key="index">
            <span class="lab">{{item.label}}:</span>
            <span class="num">{{item.value}}</span>
          </div>
        </div>
    </div>
    <div class="container">
      <!-- 这里展示的图标列表，根据imgList的状态动态更新 -->
      <!-- 图片列表 -->
      <el-row :gutter="0">
        <el-col :span="2">
          <div class="left">
            <el-row>
              <el-col :span="12" v-for="(item, index) in imgList" :key="index">
                <div style="text-align: center;">
                  <!-- 动态绑定图片路径 -->
                  <img :src="item.active ? require('@/assets/greenIcon.png') : require('@/assets/grayIcon.png')" alt="" class="iconpng">
                  <span style="font-size: 12px;">{{ item.title }}</span>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="14">
          <div class="middle">
            <div class="table">
              <middletable></middletable>
            </div>
            <div class="cardList">
              <div class="card">
                <div>作业的集卡号:</div>
                <div class="greenFont">T001</div>
                <div>识别的集卡号:</div>
                <div class="greenFont">T</div>
              </div>
              <div class="card">
                <div>作业的箱号:</div>
                <div class="greenFont">MSNU5241459</div>
                <div>识别的箱号:</div>
                <div class="greenFont">MSNU5241459</div>
              </div>
              <div class="card" style="text-align: center;">
                <img src="../assets//LOGO2.png" alt="" srcset="" style="width: 100px;height: 120px;">
                <div>
                  风速（m/s）: <span class="greenFont">2.0</span>
                </div>
              </div>
            </div>
          </div>
          <div style="text-align: center;font-size: 12px;">
              上条指令信息（524511）：<span style="color: green;">SEGU2008545 22GP 79.9.5.1->79.9.2.1 移箱</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="right">
            <div class="buttons">
              <span @click="handleClick(item)" class="btnItem" v-for="(item,index) in btnList" :key="index">
                <span :class="item.active?'clickBtn':'btn'">{{ item.btnName }}</span>
              </span>
            </div>
            <div class="tableList">
              <el-row>
                <el-col :span="18">
                  <el-table :data="tableData1" stripe class="tableDiv">
                    <el-table-column prop="type" label="" width="60"></el-table-column>
                    <el-table-column prop="target" label="目标位置" width="80"></el-table-column>
                    <el-table-column prop="current" label="当前位置" width="80"></el-table-column>
                    <el-table-column prop="dvalue" label="差值" width="80"></el-table-column>
                    <el-table-column prop="speed" label="速度" width="60"></el-table-column>
                  </el-table>
                </el-col>
                <el-col :span="6">
                  <div class="listDiv">
                    <ul>
                      <li v-for="(item,index) in differenceList" :key="index">
                        {{ item.label }}
                        <el-input v-model="item.value"></el-input>
                      </li>
                    </ul>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div class="table2">
              <el-table :data="tableData2" stripe class="tableDiv" :row-class-name="tableRowClassName">
                <el-table-column prop="index" label="行号" width="60"></el-table-column>
                <el-table-column prop="type" label="类型" width="60"></el-table-column>
                <el-table-column prop="boxNumber" label="箱号" width="120"></el-table-column>
                <el-table-column prop="old" label="原位置" width="80"></el-table-column>
                <el-table-column prop="target" label="目标位置" width="80"></el-table-column>
                <el-table-column prop="number" label="箱车编号" width="80"></el-table-column>
                <el-table-column prop="operation" fixed="right" label="操作" width="100">
                  <el-button  size="small">更多操作</el-button>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="bottom" style="margin-top: 10px;">
      <el-row :gutter="0">
        <el-col :span="16">
          <bottomtable></bottomtable>
        </el-col>
        <el-col :span="8" class="breakListDiv">
           <ul >
              <li style="text-align: center;background-color: #fafafa;font-size: 14px;font-weight: 600;">故障列表</li>
              <li v-for="(item,index) in breakList" :key="index">
                <span style="margin: 0 10px;">{{ index+1 }}</span>{{ item }}
              </li>
           </ul>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import bottomtable from "./bottom-table.vue"
import middletable from "./middle-table.vue"
import axios from 'axios';

export default {
  name: 'homePge',
  props: {},
  components:{bottomtable,middletable},
  data () {
    return {
      collectInfo1:[
        {label:"抓箱位置",value:"79.36.3.4"},
        {label:"指令类型",value:"装船"},
        {label:"箱号",value:"MSNUS5241459"},
        {label:"箱型尺寸",value:"45GP"},
        {label:"箱门朝向",value:"-"},
      ],
      collectInfo2:[
        {label:"放箱位置",value:"T001"},
        {label:"拖车",value:"T001"},
        {label:"拖车池",value:"T001，T239"},
        {label:"车架位置",value:"中"},
        {label:"作业线",value:"CRQ31"},
      ],
      btnList:[
        {btnName:"手动",key:"1",active:true},
        {btnName:"半自动",key:"2",active:false},
        {btnName:"自动",key:"3",active:false},
        {btnName:"维修",key:"4",active:false},
        {btnName:"层高",key:"5",active:false},
        {btnName:"自动行走",key:"6",active:false},
        {btnName:"终止行走",key:"7",active:false},
      ],
      tableData1:[
        {type:"大车",target:"124789",current:'124797',dvalue:"-8",speed:"0%"},
        {type:"小车",target:"18432",current:'18366',dvalue:"66",speed:"0%"},
        {type:"吊具",target:"0",current:'12095',dvalue:"-12095",speed:"0%"},
      ],
      tableData2:[
      {index:"1",type:"装船",boxNumber:'MSNU5241459',old:"79.36.3.4",target:"CRQ31",number:"T00"},
      {index:"2",type:"装船",boxNumber:'GCXU5822749',old:"79.36.3.2",target:"CRQ31",number:"T23"},
      {index:"3",type:"装船",boxNumber:'MSDU6573186',old:"79.36.3.1",target:"CRQ31",number:"T36"},

      ],
      differenceList:[
        {label:"左纠偏值",value:"18674"},
        {label:"佑纠偏值",value:"16257"},
        {label:"偏移差值",value:"29836"},
        {label:"引导差值",value:"12345"},
      ],
      breakList:[
        "[远控警告73]当前贝线下人工操作"
      ],
      imgList:[
        {id:"1",title:"投光灯",active:false},
        {id:"2",title:"大车运行",active:true},
        {id:"3",title:"主电源",active:false},
        {id:"4",title:"小车运行",active:false},
        {id:"5",title:"开锁",active:false},
        {id:"6",title:"吊具运行",active:false},
        {id:"7",title:"闭锁",active:false},
        {id:"8",title:"故障",active:false},
        {id:"9",title:"着箱",active:false},
        {id:"10",title:"急停",active:false},
        {id:"11",title:"20尺",active:false},
        {id:"12",title:"40尺",active:false},
      ]
    }
  },
  mounted() {
    this.initWebSocket();  // 在页面加载时初始化 WebSocket 连接
  },

  methods: {
    initWebSocket() {
      // 连接到 WebSocket 服务
      const socket = new WebSocket("ws://localhost:9003/ws/status");

      socket.onopen = () => {
        console.log("WebSocket连接成功");
      };

      socket.onmessage = (event) => {
        console.log("收到消息: ", event.data);

        // 处理来自后端的UDP数据
        const data = event.data.split(',');  // 后端发送的数据是以逗号分隔的字符串
        data.forEach((item, index) => {
          // 根据 UDP 数据更新 imgList 中的 active 状态
          this.imgList[index].active = item === '1';  // 如果是 '1' 就设置为 true，否则为 false
        });
      };

      socket.onerror = (error) => {
        console.error("WebSocket连接错误: ", error);
      };

      socket.onclose = () => {
        console.log("WebSocket连接关闭");
      };
  },
    testBackendLog() {
      axios.post('/dev-api/znyk-test/log', {
        message: 'Test message from frontend'
      })
          .then((response) => {
            console.log('Response from backend:', response.data);
            alert('请求成功，后端日志已记录');
          })
          .catch((error) => {
            console.error('Error:', error);
            alert('请求失败，请检查后端或网络');
          });
    },
    handleClick(item){
      let active = item.active
      if(item.active == false){
        this.btnList.forEach(ee=>{
          if(ee.key == item.key){
            ee.active = !active
          }else{
            ee.active = active
          }
        })
      }
    },
    tableRowClassName({row}){
      if(row.index == 1){
        return 'warning-row'
      }
    },
    handlemouseenter(element){
      this.imgList.map(item=>{
        if(item.id == element.id){
          item.active = true
        }else{
          item.active = false
        }
      })
    },
    handlemouseleave(element){
      this.imgList.map(item=>{
        if(item.id == element.id){
          item.active = false
        }
      })
    },
  },
}
</script>

<style scoped>
.banner{
  /* width: 100%; */
  background: linear-gradient(#409effb0, #5485e5f5);
  padding: 10px 5px;
  color: white;
  display: flex;
  align-items: center;
  .logo{
    font-size: 18px;
    font-weight: 600;
    flex: 1;
  }
  .userInfo{
    text-align: right;
    font-size: 12px;
    span{
      margin-right: 20px;
    }
  }
}
.title{
  border: 1px solid #00000033;
  border-radius: 5px;
  margin-top: 5px;
  padding: 5px;
  .titleDiv{
    display: flex;
  }
  .item{
    text-align: left;
    font-size: 14px;
    font-weight: 600;
    line-height: 22px;
    width: 20%;
    .lab{
      display: inline-block;
      width: 80px;
    }
    .num{
      color: green;
    }
  }
}
.container{
  margin-top: 10px;
  .left{
    .pngDiv{
      text-align: center;
      width: 55px;
      float: left;
      margin-bottom: 10px;
      span{
        font-size: 14px;
      }
    }
    .pngDivRight{
      text-align: center;
      width: 70px;
      float: right;
      margin-bottom: 10px;
      span{
        font-size: 14px;
      }
    }
    .iconpng{
      height: 36px;
    }
    span{
      display: block;
    }
  }
  .middle{
    display: flex;
    justify-content: right;
    .table{
      width: 670px;
    }
    .cardList{
      /* width: 130px; */
      margin-right: 10px;
    }
    .card{
      width: 130px;
      padding: 5px;
      border: 1px solid #00000033;
      border-radius: 5px;
      font-size: 14px;
      margin-bottom: 10px;
      min-height: 60px;
      line-height: 20px;
    }
  }
  .right{
    .btnItem{
      display: inline-block;
      width: 90px;
      text-align: center;
      margin-right: 10px;
      margin-bottom: 10px;
      flex: 1;
      font-size: 12px;
    }
    .btn{
      display: inline-block;
      width: 90px;
      color: gray;
      border-radius: 5px;
      background: linear-gradient(white, #80808033);
      line-height: 26px;
      border-top: 1px solid #f5f7fa;
    }
    .clickBtn{
      color: white;
      display: inline-block;
      width: 90px;
      border-radius: 5px;
      background:linear-gradient(#3a9afc73, #5485e5f5) ;
      line-height: 26px;
      border-top: 1px solid #f5f7fa;
    }
    .tableList{
      .tableDiv{
        width: 363px;
        border: 1px solid #ebeef5;
        border-bottom: none;
      }
      .listDiv{
        ul{
          list-style: none;
          margin: 0;
          padding: 0;
          font-size: 13px;
          border: 1px solid #ebeef5;
          li{
            height: 34px;
            line-height: 34px;
            padding: 0 5px;
            display: flex;
            font-size: 12px;
            justify-content: space-around;
          }
          li:nth-child(odd){
            background-color: #fafafa ;
          }
        }
      }

    }
    .table2{
      margin-top: 10px;
      .tableDiv{
        border: 1px solid #ebeef5;
        border-bottom: none;
      }
    }
    /deep/.el-table th.el-table__cell {
        background-color: #fafafa !important;
        padding: 5px 0 !important;
        color: gray !important;
        font-size: 12px !important;
        font-weight: 600 !important;
        text-align: center !important;
    }
    /deep/.el-table--enable-row-transition .el-table__body td.el-table__cell {
        padding: 5px 0 !important;
        font-size: 12px !important;
        text-align: center !important;
    }
    /deep/.el-table .warning-row{
      color:red !important;
    }
  }
  /deep/.el-input__inner {
      padding: 0 !important;
      margin: 0 !important;
      height: 20px !important;
      line-height: 20px !important;
      font-size: 12px !important;
      border-radius: 0px !important;
  }
  /deep/.el-input {
      width: 40px !important;
  }
}
.greenFont{
  color: green;
  font-weight: 600;
}
.bottom{
  .breakListDiv{
    ul{
      list-style:none;
      margin:0;
      padding: 0;
      height: 140px;
      border: 1px solid #e4e4e4;
      li{
        height: 30px;
        line-height: 30px;
        background-color: #ffa50069;
        font-size: 12px;
      }
    }

  }
}


</style>

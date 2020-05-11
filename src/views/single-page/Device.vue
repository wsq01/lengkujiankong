<template>
  <div>
    <Row :gutter="20" type="flex" justify="space-between" align="middle">
      <!-- <i-col :span="16">中集冷云</i-col> -->
      <i-col :span="8">
        <!-- <RadioGroup style="float: right" v-model="switchBtn" type="button">
          <Radio label="关机"></Radio>
          <Radio label="开机"></Radio>
        </RadioGroup> -->
        <!-- <Dropdown style="float: right">
          <Button type="primary">
            {{dropdownMenuOptions.title}}
            <Icon type="ios-arrow-down"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem v-for="(item, index) in dropdownMenuOptions.list" :key="index">{{item}}</DropdownItem>
          </DropdownMenu>
        </Dropdown> -->
      </i-col>
    </Row>
    <Row :gutter="20" class="lkstatistics">
      <i-col :lg="12" :md="24">
        <my-card>
          <p slot="title" class="title">
            <span>冷库温度统计</span>
            <span>2020-05-03</span>
          </p>
          <div class="modelbg">
            <img src="../../assets/images/model@2x.png" class="modelimg" />
          </div>
          <div class="showtotal">
            <div class="item">
              <i-circle :percent="80" stroke-color="#FFE167">
                <span class="demo-Circle-inner cricleborder" style="font-size:24px">25℃</span>
              </i-circle>
              <span class="itemdesc">冷库温度</span>
            </div>
            <div class="item">
              <i-circle :percent="80" stroke-color="#67E4FF">
                <span class="demo-Circle-inner cricleborder" style="font-size:24px">85W</span>
              </i-circle>
              <span class="itemdesc">实时功率</span>
            </div>
            <div class="item">
              <i-circle :percent="80" stroke-color="#67FF95">
                <span class="demo-Circle-inner cricleborder" style="font-size:24px">无</span>
              </i-circle>
              <span class="itemdesc">报警情况</span>
            </div>
          </div>
        </my-card>
      </i-col>
      <i-col :lg="12" :md="24">
        <my-card :isShowTitle="true">
          <p class="title" slot="title">{{ deviceDesc.title }}</p>
          <ul class="detail-list">
            <li v-for="(item, index) in deviceDesc.desc" :key="index">
              <div>{{ item.name }}</div>
              <div>{{ item.value }}</div>
            </li>
          </ul>
        </my-card>
      </i-col>
    </Row>
    <Row :gutter="20">
      <i-col :lg="12" :md="24">
        <my-card>
          <charts :option="lineChartOption" style="height: 350px"></charts>
        </my-card>
      </i-col>
      <i-col :lg="12" :md="24">
        <my-card>
          <charts :option="BarChartOption" style="height: 350px"></charts>
        </my-card>
      </i-col>
    </Row>
  </div>
</template>

<script>
import Charts from '_c/Charts'
import MyCard from '_c/MyCard'
import { getDeviceModel, getDevice } from '@/api/user'

export default {
  name: 'Device',
  data () {
    return {
      deviceModel: [],
      switchBtn: '开机',
      dropdownMenuOptions: {
        title: '基本信息',
        list: ['常用设置', '报警信息', '详细状态', '参数设置', '历史数据']
      },
      lineChartOption: {},
      BarChartOption: {},
      deviceDesc: {
        title: '设备信息',
        desc: [
          { key: 'deviceId', name: '设备ID', value: '' },
          { key: 'name', name: '设备名称', value: '' },
          { key: 'type', name: '类型', value: '' },
          { key: 'model', name: 'model', value: '' },
          { key: 'SN', name: 'SN', value: '' }
        ]
      }
    }
  },
  props: ['deviceId'],
  components: {
    Charts,
    MyCard
  },
  methods: {
    async getDevice () {
      const params = { deviceId: this.deviceId }
      const res = await getDevice(params)
      console.log(res)
      if (res.data.code === 0) {
        // this.deviceDesc = res.data.data.list[0]
        this.initDeviceDesc(res.data.data.list[0])
      }
    },
    initDeviceDesc (deviceList) {
      this.deviceDesc.desc.forEach((item, index) => {
        Object.keys(deviceList).forEach((sItem, sIndex) => {
          if (item.key === sItem) {
            this.$set(this.deviceDesc.desc[index], 'value', deviceList[sItem])
          }
        })
      })
    },
    initLineChart () {
      this.lineChartOption = {
        title: {
          text: '温度变化统计(单位°C)',
          textStyle: {
            color: '#A3FFFE'
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          right: '2%',
          top: '2%',
          textStyle: {
            color: '#A3FFFE'
          },
          data: ['冷库', '风机', '报警']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          splitLine: {
            show: false
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff',
              fontSize: 14
            }
          },
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff',
              fontSize: 14
            }
          }
        },
        series: [
          {
            name: '冷库',
            type: 'line',
            stack: '总量',
            symbol: 'none',
            smooth: true,
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '风机',
            type: 'line',
            stack: '总量',
            symbol: 'none',
            smooth: true,
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '报警',
            type: 'line',
            stack: '总量',
            symbol: 'none',
            smooth: true,
            data: [150, 232, 201, 154, 190, 330, 410]
          }
        ]
      }
    },
    barinit () {
      this.BarChartOption = {
        title: {
          text: '耗电量统计(单位W)：',
          textStyle: {
            color: '#A3FFFE'
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          right: '2%',
          top: '2%',
          textStyle: {
            color: '#A3FFFE'
          },
          data: ['降水量']
        },
        calculable: true,
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            splitLine: {
              show: false
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff',
                fontSize: 14
              }
            },
            data: [
              '1月',
              '2月',
              '3月',
              '4月',
              '5月',
              '6月',
              '7月',
              '8月',
              '9月',
              '10月',
              '11月',
              '12月'
            ]
          }
        ],
        yAxis: [
          {
            type: 'value',
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.1)'
              }
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff',
                fontSize: 14
              }
            }
          }
        ],
        series: [
          {
            name: '降水量',
            type: 'bar',
            barWidth: 20,
            data: [
              52.6,
              5.9,
              9.0,
              26.4,
              28.7,
              70.7,
              175.6,
              182.2,
              48.7,
              18.8,
              6.0,
              2.3
            ],
            itemStyle: {
              // 柱形图圆角，鼠标移上去效果，如果只是一个数字则说明四个参数全部设置为那么多
              emphasis: {
                barBorderRadius: 10
              },
              normal: {
                color: '#12FFFF',
                // 柱形图圆角，初始化效果
                barBorderRadius: [10, 10, 0, 0]
              }

            }
          }
        ]
      }
    },
    async getDeviceModel () {
      const params = { deviceId: this.deviceId }
      const res = await getDeviceModel(params)
      console.log(res)
      if (res.data.code === 0) {
        this.deviceModel = res.data.data.list[0]
      }
    }
  },
  mounted () {
    this.initLineChart()
    this.barinit()
    // this.deviceId = this.$store.state.app.deviceId
    this.getDevice()
    this.getDeviceModel()
  }
}
</script>

<style  lang="less">
@import "../../assets/styles/color.less";
.home .topright .ivu-dropdown-item {
  background: #182e84;
  color: @yellow-text-color;
}
.home .topright .ivu-dropdown-item:hover {
  color: @yellow-text-color;
}
.topright .ivu-select-dropdown {
  width: inherit;
  max-height: 200px;
  overflow: auto;
  margin: 5px 0;
  background: #182e84;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  position: absolute;
  color: @white-color;
  z-index: 900;
  .ivu-dropdown-item {
    color: @white-color;
  }
}
</style>
<style lang="less" scoped>
@import "../../assets/styles/color.less";
.titletop {
  display: flex;
  justify-items: center;
  height: 40px;
}
.cur-title {
  margin-right: 30px;
  font-size: 16px;
}
.topleft {
  display: flex;
  height: 40px;
  align-items: center;
  justify-content: flex-start;
}
.topright {
  display: flex;
  height: 40px;
  align-items: center;
  justify-content: flex-end;
  .ivu-btn-primary {
    color: @yellow-text-color;
    background-color: #182e84;
    border-color: #182e84;
  }
  .ivu-dropdown {
    .ivu-dropdown-item {
      margin: 0;
      line-height: normal;
      padding: 7px 16px;
      clear: both;
      color: #a2e9fd;
      font-size: 14px !important;
      white-space: nowrap;
      list-style: none;
      cursor: pointer;
      -webkit-transition: background 0.2s ease-in-out;
      transition: background 0.2s ease-in-out;
    }
  }
  .ivu-radio-wrapper {
    background: #182e84;
    color: @yellow-text-color;
    border: none;
  }
  .ivu-radio-wrapper-checked {
    border: none;
    color: #a3fffe;
  }
}
.topright .ivu-btn {
  margin: 0 15px;
}
.lkstatistics {
  .title {
    color: @my-text-color;
    display: flex;
    justify-content: space-between;
  }
  .modelbg {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modelbg .modelimg {
    height: 273px;
    width: auto;
  }
  .showtotal {
    display: flex;
    justify-content: space-around;
    align-items: center;
    .cricleborder {
      font-size: 24px;
      display: inline-block;
      width: 80px;
      height: 80px;
      line-height: 80px;
      border: 2px solid #ccc;
      border-radius: 50%;
      color: @white-color;
    }
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      .itemdesc {
        margin-top: 15px;
        color: @white-color;
      }
    }
  }
}
.title {
  color: @my-text-color;
}

.detail-list {
  color: #fff;
  font-size: 18px;
  padding: 0 20px;
  li {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    line-height: 73px;
    margin: 0 auto 10px;
  }
}
</style>

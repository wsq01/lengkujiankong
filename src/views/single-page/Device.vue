<template>
  <div>
    <Row :gutter="20" class="lkstatistics">
      <i-col :lg="12" :md="24">
        <my-card>
          <div class="modelbg">
            <img src="../../assets/images/model@2x.png" />
          </div>
          <div class="showtotal">
            <div class="item" v-if="deviceModel.cmStartTemp">
              <i-circle :percent="80" stroke-color="#FFE167">
                <span class="cricleborder" style="font-size:24px">{{deviceModel.cmStartTemp}}°C</span>
              </i-circle>
              <span class="itemdesc">冷机开机温度</span>
            </div>
            <div class="item" v-if="deviceModel.cmStopTemp">
              <i-circle :percent="80" stroke-color="#67E4FF">
                <span class="cricleborder" style="font-size:24px">{{deviceModel.cmStopTemp}}°C</span>
              </i-circle>
              <span class="itemdesc">冷机停机温度</span>
            </div>
            <div class="item" v-if="deviceModel.fanStartTemp">
              <i-circle :percent="80" stroke-color="#67FF95">
                <span class="cricleborder" style="font-size:24px">{{deviceModel.fanStartTemp === '0' ? '无' : '有'}}</span>
              </i-circle>
              <span class="itemdesc">风机启动温度</span>
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
      <i-col :lg="24" :md="24" v-show="leftChartList.length != 0">
        <my-card>
          <charts :option="lineChartOption" style="height: 350px"></charts>
        </my-card>
      </i-col>
      <!-- <i-col :lg="12" :md="24" v-if="leftChartList.length != 0">
        <my-card>
          <charts :option="BarChartOption" style="height: 350px"></charts>
        </my-card>
      </i-col> -->
    </Row>
  </div>
</template>

<script>
import Charts from '_c/Charts'
import MyCard from '_c/MyCard'
import { getDeviceModel, getDevice } from '@/api/user'
import { getHDeviceDataTrend } from '@/api/rt'

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
      },
      leftChartList: []
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
    async getHDeviceDataTrend () {
      const params = { deviceId: this.deviceId, value: 'm' }
      const res = await getHDeviceDataTrend(params)
      if (res.data.code === 0) {
        this.leftChartList = res.data.data.list
        const xAxisData = res.data.data.list.map((item, index) => {
          return new Date(item.time).toTimeString().split(' ')[0]
        })
        const seriesData = res.data.data.list.map((item, index) => {
          return item.storageTemp
        })
        const seriesData2 = res.data.data.list.map((item, index) => {
          return item.enviTemp
        })
        this.initLineChart(xAxisData, seriesData, seriesData2)
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
    initLineChart (xAxisData = [], seriesData = [], seriesData2 = []) {
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
          data: ['冷库温度', '环境温度']
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
          data: xAxisData
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
            name: '冷库温度',
            type: 'line',
            symbol: 'none',
            smooth: true,
            data: seriesData
          },
          {
            name: '环境温度',
            type: 'line',
            symbol: 'none',
            smooth: true,
            data: seriesData2
          }
        ]
      }
    },
    async getDeviceModel () {
      const params = { deviceId: this.deviceId }
      const res = await getDeviceModel(params)
      if (res.data.code === 0) {
        this.deviceModel = res.data.data.list[0] || {}
      }
    }
  },
  mounted () {
    // this.deviceId = this.$store.state.app.deviceId
    this.getDevice()
    this.getDeviceModel()
    this.getHDeviceDataTrend()
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
    img {
      display: block;
      width: 100%;
      max-width: 500px;
    }
  }
  .showtotal {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 17px 0 30px;
    .cricleborder {
      font-size: .8rem;
      display: inline-block;
      width: 6rem;
      height: 6rem;
      line-height: 6rem;
      border: 2px solid #ccc;
      border-radius: 50%;
      color: @white-color;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 0 5px;
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

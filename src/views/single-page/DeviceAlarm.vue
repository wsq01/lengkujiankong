<template>
<div class="container">
  <Row :gutter="10">
    <i-col style="width: 20%;float: left;" :md="24" :lg="4" v-for="(item, index) in alarmList" :key="index">
      <my-card>
        <div class="box" @click="bindSelectAlarm(item.column)">
          <div class="box-title">{{item.name}}</div>
          <div class="box-content">
            <div class="content-left">
              <img :src="item.dayCount === 0 ? require('../../assets/images/alarm-bg@2x.png') : require('../../assets/images/alarm-bg2@2x.png')" alt="">
              <img :src="item.dayCount === 0 ? require('../../assets/images/alarm@2x.png') : require('../../assets/images/alarm2@2x.png')">
              <span>报警</span>
            </div>
            <div class="content-right">
              <p>今日告警</p>
              <span>{{item.dayCount}}次</span>
              <p>本月告警</p>
              <span>{{item.monthCount}}次</span>
            </div>
          </div>
          <div class="box-footer">
            <p>告警所占总故障总比例：</p>
            <Progress :percent="item.persent.split('%')[0] * 1" :stroke-width="5" :stroke-color="['#4631F8', '#54FFF1']"  />
          </div>
        </div>
      </my-card>
    </i-col>
  </Row>
  <Row v-if="tableData.length !== 0">
    <i-col :span="24">
      <my-card>
        <Scroll ref="scrollDom" class="scroll-container" :on-reach-bottom="handleReachBottom" :distance-to-edge="[1, 1]">
          <div>详细信息</div>
          <div class="list-item" v-for="(item, index) in tableData" :key="index">
            <span>警报</span>
            <span>{{item.name}}</span>
            <span>{{item.dateTime}}</span>
          </div>
        </Scroll>
      </my-card>
    </i-col>
  </Row>
</div>
</template>

<script>
import MyCard from '_c/MyCard'
import { getDeviceAlarmColumn, getAlarmCount } from '@/api/hd'
import { getDate } from '@/libs/tools'
export default {
  components: {
    MyCard
  },
  name: 'DeviceAlarm',
  data () {
    return {
      columns: [
        {
          title: '设备ID',
          key: 'deviceId',
          width: 150,
          align: 'center'
        },
        {
          title: '外部报警信息',
          key: 'extraAlarm',
          width: 130,
          align: 'center'
        },
        {
          title: '欠压报警信息',
          key: 'overvoltAlarm',
          width: 130,
          align: 'center'
        },
        {
          title: '温度超限报警信息',
          key: 'tempAlarm',
          width: 160,
          align: 'center'
        },
        {
          title: '电流不平衡报警信息',
          key: 'currentUnbalanceAlarm',
          width: 180,
          align: 'center'
        },
        {
          title: '电压不平衡报警信息',
          key: 'voltageUnbalanceAlarm',
          width: 180,
          align: 'center'
        },
        {
          title: '过载电流报警信息',
          key: 'currentAlarm',
          width: 160,
          align: 'center'
        },
        {
          title: '库门没关报警信息',
          key: 'doorOpenAlarm',
          width: 160,
          align: 'center'
        },
        {
          title: '库温探头坏报警信息',
          key: 'storageDetectorAlarm',
          width: 180,
          align: 'center'
        },
        {
          title: '蒸发器探头坏报警信息',
          key: 'defrostDetectorAlarm',
          width: 190,
          align: 'center'
        },
        {
          title: '环境温度探头坏报警信息',
          key: 'enviDetectorAlarm',
          width: 210,
          align: 'center'
        },
        {
          title: '时间',
          key: 'dateTime',
          width: 210,
          align: 'center'
        },
        {
          title: '操作',
          slot: 'action',
          align: 'center'
        }
      ],
      size: 10,
      loading: false,
      pageIndex: 1,
      tableData: [],
      deviceId: '',
      alarmList: [],
      scrollHeight: 0,
      selectedItem: ''
    }
  },
  methods: {
    // 获取列表
    async getItems (params, name) {
      const res = await getDeviceAlarmColumn(params)
      if (res.data && res.data.code === 0) {
        this.tableData.push(...res.data.data.list.map(item => {
          return Object.assign(item, { name })
        }))
      }
    },
    bindSelectAlarm (column) {
      console.log(column)
      this.tableData = []
      this.getItems({ column, deviceId: this.deviceId, index: ++this.pageIndex }, this.selectedItem)
    },
    handleReachBottom () {
      return new Promise(resolve => {
        setTimeout(() => {
          this.getItems({ column: this.alarmList[0].column, deviceId: this.deviceId, index: ++this.pageIndex }, this.selectedItem)
          resolve()
        }, 2000)
      })
    },
    async getAlarmCount (params) {
      const res = await getAlarmCount(params)
      if (res.data && res.data.code === 0) {
        // this.alarmList = res.data.data.list
        this.alarmList = [{
          name: 'xxx', dayCount: 2, monthCount: 3, persent: '98%'
        }, {
          name: 'xxx', dayCount: 2, monthCount: 3, persent: '14%', column: 'temp_alarm'
        }, {
          name: 'xxx', dayCount: 2, monthCount: 3, persent: '14%'
        }, {
          name: 'xxx', dayCount: 2, monthCount: 3, persent: '14%'
        }, {
          name: 'xxx', dayCount: 2, monthCount: 3, persent: '14%'
        }, {
          name: 'xxx', dayCount: 2, monthCount: 3, persent: '14%'
        }]
        if (this.alarmList.length !== 0) {
          this.selectedItem = this.alarmList[0].name
          this.getItems({ column: this.alarmList[0].column, deviceId: this.deviceId }, this.selectedItem)
        } else {
          this.$Message.info({ background: true, content: '暂无数据' })
        }
      }
    },
    transferData (dataList) {
      return dataList.map((item, index) => {
        return {
          deviceId: item.deviceId,
          extraAlarm: item.extraAlarm === '0' ? '无' : '有',
          overvoltAlarm: item.overvoltAlarm === '0' ? '无' : '有',
          tempAlarm: item.tempAlarm === '0' ? '无' : item.tempAlarm === '1' ? '下线报警' : '上线报警',
          currentUnbalanceAlarm: item.currentUnbalanceAlarm === '0' ? '无' : '有',
          voltageUnbalanceAlarm: item.voltageUnbalanceAlarm === '0' ? '无' : '有',
          currentAlarm: item.currentAlarm === '0' ? '无' : item.currentAlarm === '1' ? '下线报警' : '上线报警',
          doorOpenAlarm: item.doorOpenAlarm === '0' ? '无' : '有',
          storageDetectorAlarm: item.storageDetectorAlarm === '0' ? '无' : '有',
          defrostDetectorAlarm: item.defrostDetectorAlarm === '0' ? '无' : '有',
          enviDetectorAlarm: item.enviDetectorAlarm === '0' ? '无' : '有',
          dateTime: getDate(item.dateTime / 1000, 'year')
        }
      })
    }
  },
  mounted () {
    // this.deviceId = '100000000003'
    this.deviceId = this.$route.params.deviceId
    this.getAlarmCount(this.deviceId)
  }
}
</script>

<style lang="less" scoped>
  .box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    cursor: pointer;
    .box-title {
      align-self: flex-start;
      color:rgba(163,255,254,1);
      font-size: 18px;
    }
    .box-content {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 10px auto;
      .content-left {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        width: 70px;
        height: 49px;
        margin: 0 20px 0 0;
        position: relative;
        img:nth-child(1) {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          width: 100%;
          bottom: 0;
        }
        img:nth-child(2) {
          display: block;
          width: 22px;
          height: 22px;
          position: absolute;
          z-index: 2;
        }
        span {
          display: block;
          margin: 50px 0 0;
          position: relative;
          z-index: 2;
        }
      }
      .content-right {
        p {
          color: rgba(215, 215, 215, 1);
          line-height: 30px;
        }
        span {
          text-decoration: underline;
        }
      }
    }
  }
  .list-item {
    line-height: 36px;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom:2px solid rgba(255,255,255,1);
    opacity:0.7;
  }
</style>

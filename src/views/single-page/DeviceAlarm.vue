<template>
<div class="container">
  <Row>
    <i-col :span="8">
      <my-card>
        <div class="box">
          <div class="box-title">双库温探头偏差告警</div>
          <div class="box-content">
            <div class="content-left">
              <img src="../../assets/images/alarm@2x.png" alt="">
              <span>报警</span>
            </div>
            <div class="content-right">
              <p>今日告警</p>
              <span>29次</span>
              <p>本月告警</p>
              <span>326次</span>
            </div>
          </div>
          <div class="box-footer">
            <p>告警所占总故障总比例：</p>

          </div>
        </div>
      </my-card>
    </i-col>
  </Row>

  <Row>
    <i-col :span="24">
      <my-card>
        <div>详细信息</div>
        <div class="list-item">
          <span>警报</span>
          <span>双库温探头偏差告警</span>
          <span>2020-04-16  17:11:58</span>
        </div>
      </my-card>
    </i-col>
  </Row>
</div>
</template>

<script>
import MyCard from '_c/MyCard'
import { getDeviceAlarm } from '@/api/hd'
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
      btnList: [],
      size: 10,
      loading: false,
      tableData: [],
      deviceId: ''
    }
  },
  methods: {
    // 获取列表
    async getItems (params) {
      const res = await getDeviceAlarm(params)
      if (res.data && res.data.code === 0) {
        this.tableData = this.transferData(res.data.data.list)
        this.total = res.data.data.total
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
    this.deviceId = this.$route.params.deviceId
    this.getItems()
  }
}
</script>

<style lang="less" scoped>
  .box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .box-title {
      align-self: flex-start;
      color:rgba(163,255,254,1);
      font-size: 18px;
    }
    .box-content {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 50px auto 40px;
      .content-left {
        background: url('../../assets/images/alarm-bg@2x.png') no-repeat center center;
        background-size: 100% 100%;
        display: flex;
        justify-content: flex-end;
        flex-direction: column;
        align-items: center;
        width: 120px;
        height: 99px;
        margin: 0 20px 0 0;
        img {
          display: block;
          width: 44px;
          height: 44px;
        }
        span {
          display: block;
          margin: 15px 0 0;
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

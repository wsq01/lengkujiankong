<template>
  <my-card>
    <Row>
      <i-col :span="24">
        <Tabs @on-click="handleClickTab" :value="tabOption[0].name">
          <TabPane v-for="item in tabOption" :label="item.label" :key="item.name" :name="item.name">
            <Row v-if="item.name === 'realData'">
              <i-col :span="24">
                <Form :model="realSearchForm" inline :label-width="0">
                  <FormItem>
                    <Select v-model="realSearchForm.key" @on-change="handleChangeRealSearchKey">
                      <template v-for="item in realSearchKeyList">
                        <Option :value="item.key" :key="`search-${item.key}`">{{item.name}}</Option>
                      </template>
                    </Select>
                  </FormItem>
                  <FormItem>
                    <Input @on-clear="handleClearRealInput" clearable placeholder="请输入关键字" v-model="realSearchForm.value" />
                  </FormItem>
                  <FormItem>
                    <Button @click="handleSearchReal" type="primary" icon="md-search">搜索</Button>
                  </FormItem>
                </Form>

                <Table :loading="loading" :disabled-hover="true" border :columns="columns" :data="realTableData"></Table>

                <Page :total="total" show-sizer show-total show-elevator @on-change="handleChangeRealPage" @on-page-size-change="handleChangeRealPageSize" :transfer="true" style="margin: 10px 0 0"></Page>
              </i-col>
            </Row>
            <Row v-else>
              <i-col :span="24">
                <Form :model="historySearchForm" inline :label-width="0">
                  <FormItem>
                    <Select v-model="historySearchForm.key" @on-change="handleChangeRealSearchKey">
                      <template v-for="item in historySearchKeyList">
                        <Option :value="item.key" :key="`search-${item.key}`">{{item.name}}</Option>
                      </template>
                    </Select>
                  </FormItem>
                  <FormItem>
                    <Input clearable placeholder="请输入关键字" v-model="historySearchForm.value" />
                  </FormItem>
                  <FormItem label="时间范围:" :label-width="80">
                    <DatePicker v-model="historySearchForm.time" type="datetimerange" placeholder="请选择范围" transfer></DatePicker>
                  </FormItem>
                  <FormItem>
                    <Button @click="handleSearchHistory" type="primary" icon="md-search">搜索</Button>
                  </FormItem>
                </Form>
                <Table :loading="loading" :disabled-hover="true" border :columns="columns2" :data="historyTableData"></Table>

                <Page :total="historyTotal" show-sizer show-total show-elevator :transfer="true" @on-change="handleChangeHistoryPage" @on-page-size-change="handleChangePageSizeHistory" style="margin: 10px 0 0"></Page>
              </i-col>
            </Row>
          </TabPane>
        </Tabs>
      </i-col>
    </Row>
  </my-card>
</template>

<script>
import MyCard from '_c/MyCard'
import { getRTDeviceData } from '@/api/hd'
import { getHDeviceData } from '@/api/rt'
import { getDate } from '@/libs/tools'
export default {
  name: 'DeviceHistory',
  data () {
    return {
      tabOption: [
        {
          label: '实时数据',
          name: 'realData'
        },
        {
          label: '历史数据',
          name: 'historyData'
        }
      ],
      loading: false,
      total: 0,
      size: 10,
      historyTotal: 0,
      historySize: 10,
      realSearchForm: {},
      historySearchForm: {},
      realSearchKeyList: [
        { key: 'deviceId', name: '设备ID' }
      ],
      historySearchKeyList: [
        { key: 'deviceId', name: '设备ID' }
      ],
      columns: [
        {
          title: '设备ID',
          key: 'deviceId',
          width: 150,
          align: 'center'
        },
        {
          title: '库门状态',
          key: 'doorState',
          width: 100,
          align: 'center'
        },
        {
          title: '风机状态',
          key: 'fanState',
          width: 100,
          align: 'center'
        },
        {
          title: '化霜状态',
          key: 'defrState',
          width: 100,
          align: 'center'
        },
        {
          title: '滴水状态',
          key: 'dripState',
          width: 100,
          align: 'center'
        },
        {
          title: '冷机状态',
          key: 'coolerState',
          width: 100,
          align: 'center'
        },
        {
          title: '冷库温度',
          key: 'storageTemp',
          width: 100,
          align: 'center'
        },
        {
          title: '环境温度',
          key: 'enviTemp',
          width: 100,
          align: 'center'
        },
        {
          title: '化霜温度',
          key: 'defrostingTemp',
          width: 100,
          align: 'center'
        },
        {
          title: '交流相电压A',
          key: 'phaseVoltageA',
          width: 130,
          align: 'center'
        },
        {
          title: '交流相电压B',
          key: 'phaseVoltageB',
          width: 130,
          align: 'center'
        },
        {
          title: '交流相电压C',
          key: 'phaseVoltageC',
          width: 130,
          align: 'center'
        },
        {
          title: '交流线电压A',
          key: 'lineVoltageA',
          width: 130,
          align: 'center'
        },
        {
          title: '交流线电压B',
          key: 'lineVoltageB',
          width: 130,
          align: 'center'
        },
        {
          title: '交流线电压C',
          key: 'lineVoltageC',
          width: 130,
          align: 'center'
        },
        {
          title: '交流三相电流A',
          key: 'runCurrentA',
          width: 140,
          align: 'center'
        },
        {
          title: '交流三相电流B',
          key: 'runCurrentB',
          width: 140,
          align: 'center'
        },
        {
          title: '交流三相电流C',
          key: 'runCurrentC',
          width: 140,
          align: 'center'
        },
        {
          title: '外部报警信息',
          key: 'extraAlarm',
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
          title: '库门没关报警信息',
          key: 'doorOpenAlarm',
          width: 160,
          align: 'center'
        },
        {
          title: '电压不平衡报警信息',
          key: 'voltageUnbalanceAlarm',
          width: 180,
          align: 'center'
        },
        {
          title: '欠压报警信息',
          key: 'overvoltAlarm',
          width: 130,
          align: 'center'
        },
        {
          title: '过载电流报警信息',
          key: 'currentAlarm',
          width: 160,
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
          width: 200,
          align: 'center'
        },
        {
          title: '库温探头坏报警信息',
          key: 'storageDetectorAlarm',
          width: 180,
          align: 'center'
        }
      ],
      columns2: [
        {
          title: '设备ID',
          key: 'deviceId',
          width: 150,
          align: 'center'
        },
        {
          title: '库门状态',
          key: 'doorState',
          width: 100,
          align: 'center'
        },
        {
          title: '风机状态',
          key: 'fanState',
          width: 100,
          align: 'center'
        },
        {
          title: '化霜状态',
          key: 'defrState',
          width: 100,
          align: 'center'
        },
        {
          title: '滴水状态',
          key: 'dripState',
          width: 100,
          align: 'center'
        },
        {
          title: '冷机状态',
          key: 'coolerState',
          width: 100,
          align: 'center'
        },
        {
          title: '冷库温度',
          key: 'storageTemp',
          width: 100,
          align: 'center'
        },
        {
          title: '环境温度',
          key: 'enviTemp',
          width: 100,
          align: 'center'
        },
        {
          title: '化霜温度',
          key: 'defrostTemp',
          width: 100,
          align: 'center'
        },
        {
          title: '交流相电压A',
          key: 'phaseVoltageA',
          width: 130,
          align: 'center'
        },
        {
          title: '交流相电压B',
          key: 'phaseVoltageB',
          width: 130,
          align: 'center'
        },
        {
          title: '交流相电压C',
          key: 'phaseVoltageC',
          width: 130,
          align: 'center'
        },
        {
          title: '交流线电压A',
          key: 'lineVoltageA',
          width: 130,
          align: 'center'
        },
        {
          title: '交流线电压B',
          key: 'lineVoltageB',
          width: 130,
          align: 'center'
        },
        {
          title: '交流线电压C',
          key: 'lineVoltageC',
          width: 130,
          align: 'center'
        },
        {
          title: '交流三相电流A',
          key: 'runCurrentA',
          width: 140,
          align: 'center'
        },
        {
          title: '交流三相电流B',
          key: 'runCurrentB',
          width: 140,
          align: 'center'
        },
        {
          title: '交流三相电流C',
          key: 'runCurrentC',
          width: 140,
          align: 'center'
        }
      ],
      realTableData: [],
      historyTableData: [],
      isShowScene: true,
      sceneList: [],
      deviceId: ''
    }
  },
  methods: {
    // tab切换
    handleClickTab (name) {
      if (name === 'historyData') {
        this.getHistoryItems({ size: this.size, deviceId: this.deviceId })
      } else {
        this.getRealItems({ size: this.size, deviceId: this.deviceId })
      }
    },
    transferData (dataList) {
      return dataList.map((item, index) => {
        return {
          deviceId: item.deviceId,
          doorState: item.doorState === '0' ? '关' : '开',
          fanState: item.fanState === '0' ? '停机' : '开机',
          defrState: item.defrState === '0' ? '不化霜' : '正在化霜',
          dripState: item.dripState === '0' ? '不滴水' : '正在滴水',
          coolerState: item.coolerState === '0' ? '停机' : '开机',
          storageTemp: item.storageTemp + '°C',
          enviTemp: item.enviTemp + '°C',
          defrostingTemp: item.defrostingTemp + '°C',
          phaseVoltageA: item.phaseVoltageA + 'V',
          phaseVoltageB: item.phaseVoltageB + 'V',
          phaseVoltageC: item.phaseVoltageC + 'V',
          lineVoltageA: item.lineVoltageA + 'V',
          lineVoltageB: item.lineVoltageB + 'V',
          lineVoltageC: item.lineVoltageC + 'V',
          runCurrentA: item.runCurrentA + 'A',
          runCurrentB: item.runCurrentB + 'A',
          runCurrentC: item.runCurrentC + 'C',
          extraAlarm: item.extraAlarm === '0' ? '无' : '有',
          tempAlarm: item.tempAlarm === '0' ? '无' : item.tempAlarm === '1' ? '下限报警' : '上限报警',
          currentUnbalanceAlarm: item.currentUnbalanceAlarm === '0' ? '无' : '有',
          doorOpenAlarm: item.doorOpenAlarm === '0' ? '无' : '有',
          overvoltAlarm: item.overvoltAlarm === '0' ? '无' : '有',
          voltageUnbalanceAlarm: item.voltageUnbalanceAlarm === '0' ? '无' : '有',
          currentAlarm: item.currentAlarm === '0' ? '无' : item.currentAlarm === '1' ? '下线报警' : '上限报警',
          storageDetectorAlarm: item.storageDetectorAlarm === '0' ? '无' : '有',
          defrostDetectorAlarm: item.defrostDetectorAlarm === '0' ? '无' : '有',
          enviDetectorAlarm: item.enviDetectorAlarm === '0' ? '无' : '有',
          dateTime: getDate(item.dateTime / 1000, 'year')
        }
      })
    },
    transferData2 (dataList) {
      return dataList.map((item, index) => {
        return {
          deviceId: item.deviceId,
          doorState: item.doorState === '0' ? '关' : '开',
          fanState: item.fanState === '0' ? '停机' : '开机',
          defrState: item.defrState === '0' ? '不化霜' : '正在化霜',
          dripState: item.dripState === '0' ? '不滴水' : '正在滴水',
          coolerState: item.coolerState === '0' ? '停机' : '开机',
          storageTemp: item.storageTemp + '°C',
          enviTemp: item.enviTemp + '°C',
          defrostTemp: item.defrostTemp + '°C',
          phaseVoltageA: item.phaseVoltageA + 'V',
          phaseVoltageB: item.phaseVoltageB + 'V',
          phaseVoltageC: item.phaseVoltageC + 'V',
          lineVoltageA: item.lineVoltageA + 'V',
          lineVoltageB: item.lineVoltageB + 'V',
          lineVoltageC: item.lineVoltageC + 'V',
          runCurrentA: item.runCurrentA + 'A',
          runCurrentB: item.runCurrentB + 'A',
          runCurrentC: item.runCurrentC + 'C',
          dateTime: getDate(item.dateTime / 1000, 'year')
        }
      })
    },
    async getRealItems (params) {
      const res = await getRTDeviceData(params)
      if (res.data && res.data.code === 0) {
        this.realTableData = this.transferData(res.data.data.list)
        this.total = res.data.data.total
      }
    },
    async getHistoryItems (params) {
      const res = await getHDeviceData(params)
      if (res.data && res.data.code === 0) {
        this.historyTableData = this.transferData2(res.data.data.list)
        this.historyTotal = res.data.data.total
      }
    },
    handleChangeRealSearchKey () {},
    handleClearRealInput (e) {
      this.getRealItems()
    },
    handleChangeRealPage () {},
    handleSearchReal () {
      const obj = {}
      obj[this.realSearchForm.key] = this.realSearchForm.value
      this.getRealItems(obj)
    },
    handleSearchHistory () {
      const obj = {}
      obj[this.historySearchForm.key] = this.historySearchForm.value
      if (this.historySearchForm.time[0]) {
        this.historySearchForm.time = this.historySearchForm.time.map((item, index) => new Date(item).getTime())
        obj.startTime = this.historySearchForm.time[0]
        obj.stopTime = this.historySearchForm.time[1]
      }
      this.getHistoryItems(obj)
    },
    // page size改变
    handleChangeRealPageSize (e) {
      this.size = e
      const searchObj = { size: this.size, [this.realSearchForm.key]: this.realSearchForm.value }
      this.getRealItems(searchObj)
    },
    handleChangePageSizeHistory (e) {
      this.size = e
      const obj = { size: this.size, [this.historySearchForm.key]: this.historySearchForm.value }
      if (this.historySearchForm.time[0]) {
        this.historySearchForm.time = this.historySearchForm.time.map((item, index) => new Date(item).getTime())
        obj.startTime = this.historySearchForm.time[0]
        obj.stopTime = this.historySearchForm.time[1]
      }
      this.getHistoryItems(obj)
    },
    handleChangeHistoryPage () {},
    // 设置默认搜索项
    setDefaultSearchKey () {
      this.$set(this.historySearchForm, 'key', this.historySearchKeyList[0].key)
      this.$set(this.realSearchForm, 'key', this.realSearchKeyList[0].key)
      this.$set(this.historySearchForm, 'value', this.deviceId)
      this.$set(this.realSearchForm, 'value', this.deviceId)
    }
  },
  components: {
    MyCard
  },
  mounted () {
    const deviceId = this.$route.params.deviceId
    this.deviceId = deviceId
    this.getRealItems({ deviceId })
    this.setDefaultSearchKey()
  }
}
</script>

<style>

</style>

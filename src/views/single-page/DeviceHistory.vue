<template>
  <my-card>
    <Row>
      <i-col :span="24">
        <Row>
          <i-col :span="24">
            <Form :model="historySearchForm" inline :label-width="80">
              <FormItem label="查看类型">
                <Select v-model="selectedItem" style="width:120px" @on-change="handleSelectedChange">
                  <Option v-for="item in selectList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
              <FormItem label="时间范围:">
                <DatePicker v-model="historySearchForm.time" type="datetimerange" placeholder="请选择范围" transfer></DatePicker>
              </FormItem>
              <FormItem :label-width="0">
                <Button @click="handleSearchHistory" type="primary" icon="md-search">搜索</Button>
              </FormItem>
            </Form>
            <Table :loading="loading" :disabled-hover="true" border :columns="columns" :data="historyTableData"></Table>

            <Page :total="historyTotal" show-sizer show-total show-elevator :transfer="true" @on-change="handleChangeHistoryPage" @on-page-size-change="handleChangePageSizeHistory" style="margin: 10px 0 0"></Page>
          </i-col>
        </Row>
      </i-col>
    </Row>
  </my-card>
</template>

<script>
import MyCard from '_c/MyCard'
import { getHDeviceData } from '@/api/rt'
import { getDate } from '@/libs/tools'
export default {
  name: 'DeviceHistory',
  data () {
    return {
      loading: false,
      total: 0,
      size: 10,
      historyTotal: 0,
      historySize: 10,
      historySearchForm: {},
      columns: [
        {
          type: '0',
          title: '设备ID',
          key: 'deviceId',
          minWidth: 150,
          align: 'center'
        },
        {
          type: 'state',
          title: '库门状态',
          key: 'doorState',
          minWidth: 100,
          align: 'center'
        },
        {
          type: 'state',
          title: '风机状态',
          key: 'fanState',
          minWidth: 100,
          align: 'center'
        },
        {
          type: 'state',
          title: '化霜状态',
          key: 'defrState',
          minWidth: 100,
          align: 'center'
        },
        {
          type: 'state',
          title: '滴水状态',
          key: 'dripState',
          minWidth: 100,
          align: 'center'
        },
        {
          type: 'state',
          title: '冷机状态',
          key: 'coolerState',
          minWidth: 100,
          align: 'center'
        },
        {
          type: 'temp',
          title: '冷库温度',
          key: 'storageTemp',
          minWidth: 100,
          align: 'center'
        },
        {
          type: 'temp',
          title: '环境温度',
          key: 'enviTemp',
          minWidth: 100,
          align: 'center'
        },
        {
          type: 'temp',
          title: '化霜温度',
          key: 'defrostTemp',
          minWidth: 100,
          align: 'center'
        },
        {
          type: 'phase',
          title: '交流相电压A',
          key: 'phaseVoltageA',
          minWidth: 130,
          align: 'center'
        },
        {
          type: 'phase',
          title: '交流相电压B',
          key: 'phaseVoltageB',
          minWidth: 130,
          align: 'center'
        },
        {
          type: 'phase',
          title: '交流相电压C',
          key: 'phaseVoltageC',
          minWidth: 130,
          align: 'center'
        },
        {
          type: 'phase',
          title: '交流线电压A',
          key: 'lineVoltageA',
          minWidth: 130,
          align: 'center'
        },
        {
          type: 'phase',
          title: '交流线电压B',
          key: 'lineVoltageB',
          minWidth: 130,
          align: 'center'
        },
        {
          type: 'phase',
          title: '交流线电压C',
          key: 'lineVoltageC',
          minWidth: 130,
          align: 'center'
        },
        {
          type: 'phase',
          title: '交流三相电流A',
          key: 'runCurrentA',
          minWidth: 140,
          align: 'center'
        },
        {
          type: 'phase',
          title: '交流三相电流B',
          key: 'runCurrentB',
          minWidth: 140,
          align: 'center'
        },
        {
          type: 'phase',
          title: '交流三相电流C',
          key: 'runCurrentC',
          minWidth: 140,
          align: 'center'
        }
      ],
      columns1: [
        {
          type: '0',
          title: '设备ID',
          key: 'deviceId',
          minWidth: 150,
          align: 'center'
        },
        {
          type: 'state',
          title: '库门状态',
          key: 'doorState',
          minWidth: 100,
          align: 'center'
        },
        {
          type: 'state',
          title: '风机状态',
          key: 'fanState',
          minWidth: 100,
          align: 'center'
        },
        {
          type: 'state',
          title: '化霜状态',
          key: 'defrState',
          minWidth: 100,
          align: 'center'
        },
        {
          type: 'state',
          title: '滴水状态',
          key: 'dripState',
          minWidth: 100,
          align: 'center'
        },
        {
          type: 'state',
          title: '冷机状态',
          key: 'coolerState',
          minWidth: 100,
          align: 'center'
        },
        {
          type: 'temp',
          title: '冷库温度',
          key: 'storageTemp',
          minWidth: 100,
          align: 'center'
        },
        {
          type: 'temp',
          title: '环境温度',
          key: 'enviTemp',
          minWidth: 100,
          align: 'center'
        },
        {
          type: 'temp',
          title: '化霜温度',
          key: 'defrostTemp',
          minWidth: 100,
          align: 'center'
        },
        {
          type: 'phase',
          title: '交流相电压A',
          key: 'phaseVoltageA',
          minWidth: 130,
          align: 'center'
        },
        {
          type: 'phase',
          title: '交流相电压B',
          key: 'phaseVoltageB',
          minWidth: 130,
          align: 'center'
        },
        {
          type: 'phase',
          title: '交流相电压C',
          key: 'phaseVoltageC',
          minWidth: 130,
          align: 'center'
        },
        {
          type: 'phase',
          title: '交流线电压A',
          key: 'lineVoltageA',
          minWidth: 130,
          align: 'center'
        },
        {
          type: 'phase',
          title: '交流线电压B',
          key: 'lineVoltageB',
          minWidth: 130,
          align: 'center'
        },
        {
          type: 'phase',
          title: '交流线电压C',
          key: 'lineVoltageC',
          minWidth: 130,
          align: 'center'
        },
        {
          type: 'phase',
          title: '交流三相电流A',
          key: 'runCurrentA',
          minWidth: 140,
          align: 'center'
        },
        {
          type: 'phase',
          title: '交流三相电流B',
          key: 'runCurrentB',
          minWidth: 140,
          align: 'center'
        },
        {
          type: 'phase',
          title: '交流三相电流C',
          key: 'runCurrentC',
          minWidth: 140,
          align: 'center'
        }
      ],
      historyTableData: [],
      deviceId: '',
      selectedItem: 'temp',
      selectList: [{
        label: '温度类',
        value: 'temp'
      }, {
        label: '系统状态',
        value: 'state'
      }, {
        label: '电压类',
        value: 'phase'
      }]
    }
  },
  methods: {
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
    handleSelectedChange () {
      const obj = JSON.parse(JSON.stringify(this.columns1))
      const result = obj.filter(item => item.type === this.selectedItem)
      this.columns.splice(0, this.columns.length, ...result)
    },
    async getHistoryItems (params) {
      const res = await getHDeviceData(params)
      if (res.data && res.data.code === 0) {
        this.historyTableData = this.transferData2(res.data.data.list)
        this.historyTotal = res.data.data.total
      }
    },
    handleChangeRealPage () {},
    handleSearchHistory () {
      const obj = {}
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
      const searchObj = { size: this.size }
      this.getRealItems(searchObj)
    },
    handleChangePageSizeHistory (e) {
      this.size = e
      const obj = { size: this.size }
      if (this.historySearchForm.time[0]) {
        this.historySearchForm.time = this.historySearchForm.time.map((item, index) => new Date(item).getTime())
        obj.startTime = this.historySearchForm.time[0]
        obj.stopTime = this.historySearchForm.time[1]
      }
      this.getHistoryItems(obj)
    },
    handleChangeHistoryPage (e) {
      const obj = { size: this.historySize, index: e, deviceId: this.deviceId }
      if (this.historySearchForm.time[0]) {
        this.historySearchForm.time = this.historySearchForm.time.map((item, index) => new Date(item).getTime())
        obj.startTime = this.historySearchForm.time[0]
        obj.stopTime = this.historySearchForm.time[1]
      }
      this.getHistoryItems(obj)
    }
  },
  components: {
    MyCard
  },
  mounted () {
    const deviceId = this.$route.params.deviceId
    this.deviceId = deviceId
    this.handleSelectedChange()
    this.getHistoryItems({ deviceId })
  }
}
</script>

<style>

</style>

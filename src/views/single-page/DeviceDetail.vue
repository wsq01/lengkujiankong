<template>
  <my-card :isShowTitle="false">
    <Form :model="deviceModelForm" :inline="true" label-position="left">
      <List>
        <ListItem v-for="(item, index) in deviceModel" :key="index" v-show="!item.isHidden">
          <FormItem :label="item.label" class="list-item">
            <Input v-model="deviceModelForm[item.key]" />
          </FormItem>
        </ListItem>
      </List>
    </Form>
  </my-card>
</template>

<script>
import MyCard from '_c/MyCard'
import { getDeviceModel, editDeviceModel } from '@/api/user'
import { debounce } from '@/libs/tools'

export default {
  data () {
    return {
      deviceModel: [
        { key: 'deviceId', label: '设备ID', value: '', isHidden: true },
        { key: 'cmStopIntv', label: '压机停机保护时间', value: '' },
        { key: 'defrostCycle', label: '化霜周期时间', value: '' },
        { key: 'fanStartTemp', label: '风机启动温度', value: '' },
        { key: 'alarmDelay', label: '超温告警延时时间', value: '' },
        { key: 'enviDetectorFix', label: '环境温度探头修正', value: '' },
        { key: 'cmRunMax', label: '压机最长运行时间', value: '' },
        { key: 'powerMode', label: '峰谷电模式', value: '' },
        { key: 'defrostDrip', label: '化霜滴水时间', value: '' },
        { key: 'defrostMode', label: '化霜模式', value: '' },
        { key: 'fanStopDelay', label: '风机停机延时时间', value: '' },
        { key: 'cmOpenMode', label: '冷机开机模式', value: '' },
        { key: 'masterToggle', label: '总开关', value: '' },
        { key: 'cmStopTemp', label: '冷机停机温度', value: '' },
        { key: 'fanOpenMode', label: '风机开机模式', value: '' },
        { key: 'lowTempAlarm', label: '低温告警温度', value: '' },
        { key: 'storageDetectorFix', label: '库温探头修正', value: '' },
        { key: 'defrostBJT1', label: '化霜北京时间1', value: '' },
        { key: 'defrostBJT2', label: '化霜北京时间2', value: '' },
        { key: 'defrostBJT3', label: '化霜北京时间3', value: '' },
        { key: 'fanStartDelay', label: '风机开机延时时间', value: '' },
        { key: 'defrostDuring', label: '化霜持续时间', value: '' },
        { key: 'cmStartTemp', label: '冷机开机温度', vlaue: '' },
        { key: 'highTempAlarm', label: '高温告警温度', value: '' },
        { key: 'defrostDetectorFix', label: '化霜温度探头修正', value: '' },
        { key: 'defrostStopTemp', label: '化霜终止温度', value: '' },
        { key: 'cmOnOffIntv', label: '压机启停间隔时间', value: '' }
      ],
      isShowModal: false,
      deviceModelForm: {}
    }
  },
  props: ['deviceId'],
  components: {
    MyCard
  },
  watch: {
    deviceModelForm: {
      handler () {
        this.debounced()
      },
      deep: true
    }
  },
  methods: {
    async getDeviceModel () {
      const params = { deviceId: this.deviceId }
      const res = await getDeviceModel(params)
      console.log(res)
      if (res.data.code === 0 && res.data.data.list.length !== 0) {
        this.initDeviceModel(res.data.data.list[0], this.deviceModel)
        this.deviceModelForm = res.data.data.list[0]
      }
    },
    async editDeviceModel () {
      console.log('xxxx')
      const res = await editDeviceModel(this.deviceModelForm)
      console.log(res)
    },
    initDeviceModel (reqDeviceModel, dataDeviceModel) {
      dataDeviceModel.forEach((item, index) => {
        if (reqDeviceModel[item.key]) {
          const { [item.key]: value } = reqDeviceModel
          this.$set(this.deviceModel[index], 'value', value)
        }
      })
    }
  },
  created () {
    this.getDeviceModel()
    this.debounced = debounce(this.editDeviceModel, 1000)
  }
}
</script>

<style lang="less" scoped>
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.list-item {
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0;
}
</style>
<style lang="less">
.list-item {
  label {
    flex: 1;
  }
  .ivu-input {
    background: transparent;
    text-align: center;
    border: none;
    border-radius: 0;
    // border-bottom: 1px solid #fff;
  }
}
</style>

<template>
  <my-card :isShowTitle="false">
    <Form :model="deviceModelForm" :inline="true" label-position="left">
      <List>
        <ListItem v-for="(item, index) in deviceModel" :key="index" v-show="!item.isHidden">
          <FormItem :label="item.label" class="list-item" v-if="item.type === 'input' || item.type === undefined">
            <Input v-model="deviceModelForm[item.key]" />
          </FormItem>
          <FormItem :label="item.label" class="list-item" v-else-if="item.type === 'select'">
            <Select v-model="deviceModelForm[item.key]">
              <Option v-for="(sItem, sIndex) in item.option" :value="sItem.key" :key="sIndex">{{sItem.name}}</Option>
            </Select>
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
        { key: 'masterToggle', label: '总开关', value: '', type: 'select', option: [{ name: '开', key: '1' }, { name: '关', key: '0' }] },
        { key: 'cmOpenMode', label: '冷机开机模式', value: '', type: 'select', option: [{ name: '先开冷机再开风机', key: '1' }, { name: '同时开冷机和风机', key: '2' }] },
        { key: 'fanOpenMode', label: '风机开机模式', value: '', type: 'select', option: [{ name: '受控开', key: '1' }, { name: '一直开', key: '2' }] },
        { key: 'powerMode', label: '峰谷电模式', value: '', type: 'select', option: [{ name: '无效', key: '0' }, { name: '有效', key: '1' }] },
        { key: 'defrostMode', label: '化霜模式', value: '', type: 'select', option: [{ name: '固定周期化霜', key: '1' }, { name: '固定北京时间化霜', key: '0' }] },
        { key: 'cmStartTemp', label: '冷机开机温度', vlaue: '' },
        { key: 'highTempAlarm', label: '高温告警温度', value: '' },
        { key: 'defrostStopTemp', label: '化霜终止温度', value: '' },
        { key: 'fanStartTemp', label: '风机启动温度', value: '' },
        { key: 'lowTempAlarm', label: '低温告警温度', value: '' },
        { key: 'cmStopTemp', label: '冷机停机温度', value: '' },
        { key: 'defrostBJT1', label: '化霜北京时间1', value: '' },
        { key: 'defrostBJT2', label: '化霜北京时间2', value: '' },
        { key: 'defrostBJT3', label: '化霜北京时间3', value: '' },
        { key: 'cmStopIntv', label: '压机停机保护时间', value: '' },
        { key: 'defrostCycle', label: '化霜周期时间', value: '' },
        { key: 'alarmDelay', label: '超温告警延时时间', value: '' },
        { key: 'cmRunMax', label: '压机最长运行时间', value: '' },
        { key: 'defrostDrip', label: '化霜滴水时间', value: '' },
        { key: 'fanStopDelay', label: '风机停机延时时间', value: '' },
        { key: 'fanStartDelay', label: '风机开机延时时间', value: '' },
        { key: 'defrostDuring', label: '化霜持续时间', value: '' },
        { key: 'cmOnOffIntv', label: '压机启停间隔时间', value: '' },
        { key: 'defrostDetectorFix', label: '化霜温度探头修正', value: '' },
        { key: 'enviDetectorFix', label: '环境温度探头修正', value: '' },
        { key: 'storageDetectorFix', label: '库温探头修正', value: '' }
      ],
      isShowModal: false,
      deviceModelForm: null
    }
  },
  props: ['deviceId'],
  components: {
    MyCard
  },
  watch: {
    deviceModelForm: {
      handler (newVal, oldVal) {
        if (oldVal) {
          this.debounced()
        }
      },
      deep: true
    }
  },
  methods: {
    async getDeviceModel (params) {
      const res = await getDeviceModel(params)
      console.log(res)
      if (res.data.code === 0 && res.data.data.list.length !== 0) {
        this.initDeviceModel(res.data.data.list[0], this.deviceModel)
        this.deviceModelForm = res.data.data.list[0]
      }
    },
    async editDeviceModel () {
      const res = await editDeviceModel(this.deviceModelForm)
      console.log(res)
      if (res.data.code === 0) {
        this.$Message.success('修改成功！')
      } else {
        this.$Message.error('修改失败！')
      }
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
    this.getDeviceModel({ deviceId: this.deviceId })
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
    border-bottom: 1px solid;
  }
}
</style>

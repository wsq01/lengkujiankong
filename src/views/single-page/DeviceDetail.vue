<template>
  <my-card :isShowTitle="false">
    <Form :model="deviceModelForm" :inline="true" label-position="left">
      <List>
        <ListItem v-for="(item, index) in deviceModel" :key="index" v-show="!item.isHidden">
          <FormItem :label="item.label" class="list-item" v-if="item.type === 'input' || item.type === undefined">
            <Input v-model="deviceModelForm[item.key]">
              <span v-if="item.append" slot="append">{{item.append}}</span>
            </Input>
          </FormItem>
          <FormItem :label="item.label" class="list-item" v-else-if="item.type === 'select'">
            <Select v-model="deviceModelForm[item.key]">
              <Option v-for="(sItem, sIndex) in item.option" :value="sItem.key" :key="sIndex">{{sItem.name}}</Option>
            </Select>
          </FormItem>
          <FormItem :label="item.label" class="timepicker-item" v-else-if="item.type==='timepicker'">
            <TimePicker format="HH:mm" placeholder="请选择时间" @on-change="timepickerChange($event, item.key)" style="width: 80px" :value="deviceModelForm[item.key]"></TimePicker>
          </FormItem>
        </ListItem>
      </List>
    </Form>
  </my-card>
</template>

<script>
import MyCard from '_c/MyCard'
import { getDeviceModel, editDeviceModel } from '@/api/user'
import { editServerDeviceModel } from '@/api/server'
import { debounce } from '@/libs/tools'

export default {
  name: 'DeviceDetail',
  data () {
    return {
      deviceModel: [
        { key: 'deviceId', label: '设备ID', value: '', isHidden: true },
        { key: 'masterToggle', label: '总开关', value: '', type: 'select', option: [{ name: '开', key: '1' }, { name: '关', key: '0' }] },
        { key: 'cmOpenMode', label: '冷机开机模式', value: '', type: 'select', option: [{ name: '先开冷机再开风机', key: '1' }, { name: '同时开冷机和风机', key: '2' }] },
        { key: 'fanOpenMode', label: '风机开机模式', value: '', type: 'select', option: [{ name: '受控开', key: '1' }, { name: '一直开', key: '2' }] },
        { key: 'powerMode', label: '峰谷电模式', value: '', type: 'select', option: [{ name: '无效', key: '0' }, { name: '有效', key: '1' }] },
        { key: 'defrostMode', label: '化霜模式', value: '', type: 'select', option: [{ name: '固定周期化霜', key: '1' }, { name: '固定北京时间化霜', key: '0' }] },
        { key: 'cmStartTemp', label: '冷机开机温度', vlaue: '', append: '°C' },
        { key: 'cmStopTemp', label: '冷机停机温度', value: '', append: '°C' },
        { key: 'highTempAlarm', label: '高温告警温度', value: '', append: '°C' },
        { key: 'lowTempAlarm', label: '低温告警温度', value: '', append: '°C' },
        { key: 'defrostStopTemp', label: '化霜终止温度', value: '', append: '°C' },
        { key: 'fanStartTemp', label: '风机启动温度', value: '', append: '°C' },
        { key: 'defrostDrip', label: '化霜滴水时间', value: '', append: '秒' },
        { key: 'defrostDuring', label: '化霜持续时间', value: '', append: '秒' },
        { key: 'defrostCycle', label: '化霜周期时间', value: '', append: '秒' },
        { key: 'defrostBJT1', label: '化霜北京时间1', value: '', type: 'timepicker' },
        { key: 'defrostBJT2', label: '化霜北京时间2', value: '', type: 'timepicker' },
        { key: 'defrostBJT3', label: '化霜北京时间3', value: '', type: 'timepicker' },
        { key: 'cmStopIntv', label: '压机停机保护时间', value: '', append: '秒' },
        { key: 'cmOnOffIntv', label: '压机启停间隔时间', value: '', append: '秒' },
        { key: 'cmRunMax', label: '压机最长运行时间', value: '', append: '分钟' },
        { key: 'alarmDelay', label: '超温告警延时时间', value: '', append: '秒' },
        { key: 'fanStopDelay', label: '风机停机延时时间', value: '', append: '秒' },
        { key: 'fanStartDelay', label: '风机开机延时时间', value: '', append: '秒' },
        { key: 'defrostDetectorFix', label: '化霜温度探头修正', value: '' },
        { key: 'enviDetectorFix', label: '环境温度探头修正', value: '' },
        { key: 'storageDetectorFix', label: '库温探头修正', value: '' }
      ],
      isShowModal: false,
      deviceModelForm: {}
    }
  },
  props: ['deviceId'],
  components: {
    MyCard
  },
  computed: {
    socketMsg () {
      return this.computedSocketMsg()
    }
  },
  watch: {
    deviceModelForm: {
      handler (newVal, oldVal) {
        console.log(oldVal)
        if (Object.keys(oldVal).length !== 0) {
          this.debounced()
        }
      },
      deep: true
    },
    socketMsg (val) {
      console.log(val)
      if (val.result && val.result === 'succeed') {
        if (val.order === 'timer') {
        } else if (val.order === 'pingpong') {
        } else if (val.order === 'reset') {
        } else if (val.order === 'param') {
        } else if (val.order === 'update') {
          this.modal1 = true
          this.progress = val.count / val.total
        }
      } else if (val.result && val.result !== 'succeed') {
      } else {}
    }
  },
  methods: {
    computedSocketMsg () {
      if (!this.$store.state.app.socketMsg) return
      return JSON.parse(this.$store.state.app.socketMsg)
    },
    async getDeviceModel (params) {
      const res = await getDeviceModel(params)
      if (res.data.code === 0 && res.data.data.list.length !== 0) {
        this.initDeviceModel(res.data.data.list[0], this.deviceModel)
        this.deviceModelForm = res.data.data.list[0]
      } else {
        this.$Message.warning({ background: true, content: res.data.message })
      }
    },
    async editDeviceModel () {
      const res = await editServerDeviceModel(this.deviceModelForm)
      if (res.data.code === 0) {
        this.$Notice.info({
          background: true,
          title: '正在修改设备参数，请稍等...'
        })
        // this.$Message.success({ background: true, content: '修改成功！' })
      } else {
        this.$Message.success({ background: true, content: res.data.message })
      }
    },
    initDeviceModel (reqDeviceModel, dataDeviceModel) {
      dataDeviceModel.forEach((item, index) => {
        if (reqDeviceModel[item.key]) {
          const { [item.key]: value } = reqDeviceModel
          this.$set(this.deviceModel[index], 'value', value)
        }
      })
    },
    timepickerChange (e, k) {
      this.$set(this.deviceModelForm, k, e)
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
.list-item, .timepicker-item {
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
    width: 100px;
  }
}
.timepicker-item {
  label {
    flex: 1;
  }
}
</style>

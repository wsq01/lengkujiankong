<template>
  <my-card :isShowTitle="false" class="detail-container">
    <div>
      参数设置：
      <Select v-model="selectedItem" style="width:120px" @on-change="handleSelectedChange">
        <Option v-for="item in selectList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </div>
    <Form ref="formDynamic" :model="deviceModelForm" :inline="true" label-position="left" :rules="ruleValidate">
      <List>
        <div v-for="(item, index) in deviceModel" :key="index">
          <ListItem v-if="item.model === selectedItem">
          <FormItem :prop="item.key" :label="item.label" class="list-item" v-if="(item.type === 'input' && selectedItem === item.model) || (item.type === undefined &&  selectedItem === item.model)">
            <Input v-model="deviceModelForm[item.key]" type="number">
              <span v-if="item.append" slot="append">{{item.append}}</span>
            </Input>
          </FormItem>
          <FormItem :prop="item.key" :label="item.label" class="list-item" v-else-if="item.type === 'select' && item.model === selectedItem">
            <Select v-model="deviceModelForm[item.key]">
              <Option v-for="(sItem, sIndex) in item.option" :value="sItem.key" :key="sIndex">{{sItem.name}}</Option>
            </Select>
          </FormItem>
          <FormItem :prop="item.key" :label="item.label" class="timepicker-item" v-else-if="item.type==='timepicker' && item.model === selectedItem">
            <TimePicker format="HH:mm" placeholder="请选择时间" @on-change="timepickerChange($event, item.key)" style="width: 80px" :value="deviceModelForm[item.key]"></TimePicker>
          </FormItem>
        </ListItem>
        </div>
      </List>
    </Form>
  </my-card>
</template>

<script>
import MyCard from '_c/MyCard'
import { getDeviceModel } from '@/api/user'
import { editServerDeviceModel } from '@/api/server'
import { debounce } from '@/libs/tools'

export default {
  name: 'DeviceDetail',
  data () {
    const validateRange1 = (rule, value, callback) => {
      if (value < -500 || value > 500) {
        callback(new Error('取值范围从-500到500'))
      } else {
        callback()
      }
    }
    return {
      deviceModel: [
        { key: 'deviceId', label: '设备ID', value: '', model: 'xxxx' },
        { key: 'masterToggle', label: '总开关', value: '', type: 'select', option: [{ name: '开', key: '1' }, { name: '关', key: '0' }], model: 'off' },
        { key: 'cmOpenMode', label: '冷机开机模式', value: '', type: 'select', option: [{ name: '先开冷机再开风机', key: '1' }, { name: '同时开冷机和风机', key: '2' }], model: 'lj' },
        { key: 'fanOpenMode', label: '风机开机模式', value: '', type: 'select', option: [{ name: '受控开', key: '1' }, { name: '一直开', key: '2' }], model: 'off' },
        { key: 'powerMode', label: '峰谷电模式', value: '', type: 'select', option: [{ name: '无效', key: '0' }, { name: '有效', key: '1' }], model: 'off' },
        { key: 'defrostMode', label: '化霜模式', value: '', type: 'select', option: [{ name: '固定周期化霜', key: '1' }, { name: '固定北京时间化霜', key: '0' }], model: 'off' },
        { key: 'cmStartTemp', label: '冷机开机温度', vlaue: '', append: '°C', model: 'lj' },
        { key: 'cmStopTemp', label: '冷机停机温度', value: '', append: '°C', model: 'lj' },
        { key: 'highTempAlarm', label: '高温告警温度', value: '', append: '°C', model: 'temp' },
        { key: 'lowTempAlarm', label: '低温告警温度', value: '', append: '°C', model: 'temp' },
        { key: 'defrostStopTemp', label: '化霜终止温度', value: '', append: '°C', model: 'defrost' },
        { key: 'fanStartTemp', label: '风机启动温度', value: '', append: '°C', model: 'fan' },
        { key: 'defrostDrip', label: '化霜滴水时间', value: '', append: '秒', model: 'fan' },
        { key: 'defrostDuring', label: '化霜持续时间', value: '', append: '秒', model: 'defrost' },
        { key: 'defrostCycle', label: '化霜周期时间', value: '', append: '秒', model: 'defrost' },
        { key: 'defrostBJT1', label: '化霜北京时间1', value: '', type: 'timepicker', model: 'defrost' },
        { key: 'defrostBJT2', label: '化霜北京时间2', value: '', type: 'timepicker', model: 'defrost' },
        { key: 'defrostBJT3', label: '化霜北京时间3', value: '', type: 'timepicker', model: 'defrost' },
        { key: 'cmStopIntv', label: '压机停机保护时间', value: '', append: '秒', model: 'cm' },
        { key: 'cmOnOffIntv', label: '压机启停间隔时间', value: '', append: '秒', model: 'cm' },
        { key: 'cmRunMax', label: '压机最长运行时间', value: '', append: '分钟', model: 'cm' },
        { key: 'alarmDelay', label: '超温告警延时时间', value: '', append: '秒', model: 'temp' },
        { key: 'fanStopDelay', label: '风机停机延时时间', value: '', append: '秒', model: 'fan' },
        { key: 'fanStartDelay', label: '风机开机延时时间', value: '', append: '秒', model: 'fan' },
        { key: 'defrostDetectorFix', label: '化霜温度探头修正', value: '', model: 'defrost' },
        { key: 'enviDetectorFix', label: '环境温度探头修正', value: '', model: 'temp' },
        { key: 'storageDetectorFix', label: '库温探头修正', value: '', model: 'temp' }
      ],
      ruleValidate: {
        storageDetectorFix: [
          { validator: validateRange1, trigger: 'blur' }
        ],
        enviDetectorFix: [
          { validator: validateRange1, trigger: 'blur' }
        ],
        defrostDetectorFix: [
          { validator: validateRange1, trigger: 'blur' }
        ],
        cmStartTemp: [
          { validator: validateRange1, trigger: 'blur' }
        ],
        cmStopTemp: [
          { validator: validateRange1, trigger: 'blur' }
        ],
        highTempAlarm: [
          { validator: validateRange1, trigger: 'blur' }
        ],
        lowTempAlarm: [
          { validator: validateRange1, trigger: 'blur' }
        ],
        cmOnOffIntv: [
          { min: 10, max: 36000, message: '取值范围，从10到36000，其他为非法', trigger: 'blur' }
        ],
        defrostCycle: [
          { min: 1800, max: 64800, message: '取值范围，从1800到64800，其他为非法', trigger: 'blur' }
        ],
        defrostDuring: [
          { min: 10, max: 7200, message: '取值范围，从10到7200，其他为非法', trigger: 'blur' }
        ],
        defrostStopTemp: [
          { validator: validateRange1, trigger: 'blur' }
        ],
        fanStopDelay: [
          { min: 0, max: 65535, message: '取值范围，从0到65535，其他为非法', trigger: 'blur' }
        ],
        fanStartDelay: [
          { min: 0, max: 65535, message: '取值范围，从0到65535，其他为非法', trigger: 'blur' }
        ],
        fanStartTemp: [
          { validator: validateRange1, trigger: 'blur' }
        ]
      },
      isShowModal: false,
      deviceModelForm: {},
      selectedItem: 'temp',
      selectList: [{
        label: '温度类',
        value: 'temp'
      }, {
        label: '开关机类',
        value: 'off'
      }, {
        label: '风机类',
        value: 'fan'
      }, {
        label: '压机类',
        value: 'cm'
      }, {
        label: '冷机类',
        value: 'lj'
      }, {
        label: '化霜类',
        value: 'defrost'
      }]
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
        this.$refs.formDynamic.validate((valid) => {
          console.log(valid)
          if (valid) {
            if (Object.keys(oldVal).length !== 0) {
              this.debounced()
            }
          }
        })
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
        }
      } else if (val.result && val.result !== 'succeed') {
      } else {}
    }
  },
  methods: {
    handleSelectedChange () {
      this.deviceModel = JSON.parse(JSON.stringify(this.deviceModel))
    },
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
        this.$Message.error({ background: true, content: res.data.message })
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

<style lang="less">
.detail-container {
  .ivu-list-split .ivu-list-item {
    border-bottom: 1px solid #3527B1;
  }
}
</style>
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
  }
}
.timepicker-item {
  label {
    flex: 1;
  }
}
</style>

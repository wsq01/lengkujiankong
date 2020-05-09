<template>
  <Row :gutter="20" type="flex" justify="end" align="middle" class="top-menu">
    <i-col :span="23">
      <RadioGroup v-model="switchBtn" type="button" style="float: right">
        <Radio label="关机"></Radio>
        <Radio label="开机"></Radio>
      </RadioGroup>
      <Select v-model="selectedItem" style="width:110px;margin: 0 10px 0;float: right" @on-change="bindMenuChange">
        <Option v-for="item in menuList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </i-col>
    <i-col :span="1"></i-col>
  </Row>
</template>

<script>
export default {
  data () {
    return {
      switchBtn: '开机',
      menuList: [
        { label: '设备信息', value: 'device' },
        // { label: '常用设置', value: 'deviceSetting' },
        { label: '参数设置', value: 'deviceDetail' },
        { label: '报警信息', value: 'deviceAlarm' },
        // { label: '参数设置', value: 'deviceModel' },
        { label: '历史数据', value: 'deviceHistory' }
      ],
      selectedItem: 'device'
    }
  },
  props: {
    selectedMenu: {
      type: String,
      default: 'device'
    }
  },
  watch: {
    'selectedMenu' (newVal) {
      this.selectedItem = newVal
    }
  },
  methods: {
    bindMenuChange (e) {
      this.$router.push({
        name: e,
        params: { deviceId: this.$store.state.app.deviceId }
      })
    }
  }
}
</script>

<style lang="less">
.top-menu {
  margin: 20px auto 0;
  .ivu-select-selection {
    background: rgba(24, 46, 132, 1);
    border: none;
  }
  .ivu-select-dropdown {
    background: rgba(24, 46, 132, 1);
    max-height: fit-content;
  }
}
</style>

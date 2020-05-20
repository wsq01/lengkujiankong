<template>
  <Row :gutter="20" type="flex" justify="end" align="middle" class="top-menu">
    <i-col :span="23">
      <RadioGroup v-model="switchBtn" type="button" class="my-radio-group" style="float: right">
        <Radio label="关机"></Radio>
        <Radio label="开机"></Radio>
      </RadioGroup>
      <Select v-model="selectedItem" style="width:110px;float: right" @on-change="bindMenuChange">
        <Option v-for="item in menuList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </i-col>
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
        { label: '报警管理', value: 'deviceAlarm' },
        // { label: '参数设置', value: 'deviceModel' },
        { label: '数据管理', value: 'deviceHistory' }
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
  padding-right: 30px;
  .ivu-select-selection {
    background: rgba(24, 46, 132, 1);
    border: none;
  }
  // .topright{
  //   margin-right: 20px;
  // }
  .ivu-select-dropdown {
    background: rgba(24, 46, 132, 1);
    max-height: fit-content;
  }
}
.my-radio-group {
  label.ivu-radio-wrapper {
    background: transparent;
    border-color: #2d8cf0;
    border-left: 1px solid #2d8cf0 !important;
  }
  label.ivu-radio-wrapper-checked {
    background: rgba(24, 46, 132, 1);
    color: rgba(241, 184, 31, 1);
  }
}
</style>

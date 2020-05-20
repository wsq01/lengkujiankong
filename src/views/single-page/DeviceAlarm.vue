<template>
  <my-card>
    <Row>
      <i-col :span="24">
        <Form :model="searchForm" inline :label-width="0">
          <FormItem>
            <Select v-model="searchForm.key">
              <template v-for="item in columns">
                <Option v-if="item.key && item.key === 'deviceId'" :value="item.key" :key="`search-${item.key}`">{{item.title}}</Option>
              </template>
            </Select>
          </FormItem>
          <FormItem>
            <Input @on-change="handleClear" clearable placeholder="请输入关键字" v-model="searchForm.value" />
          </FormItem>
          <FormItem label="时间范围:" :label-width="80">
            <DatePicker v-model="searchForm.time" type="datetimerange" placeholder="请选择范围" transfer></DatePicker>
          </FormItem>
          <FormItem>
            <Button @click="handleSearch" type="primary" icon="md-search">搜索</Button>
          </FormItem>
          <span v-for="(bItem, bIndex) in btnList" :key="bIndex">
            <FormItem v-if="bItem === 'DELETEBATCH'">
              <Poptip confirm title="确定要删除吗？" transfer @on-ok="handleDeleteBatch">
                <Button type="primary" icon="md-trash">批量删除</Button>
              </Poptip>
            </FormItem>
            <FormItem v-if="bItem === 'ADD'">
              <Button @click="addItem" type="primary" icon="md-add">新增</Button>
            </FormItem>
          </span>
        </Form>
      </i-col>
    </Row>
    <Row>
      <i-col :span="24">
        <Table :loading="loading" border :columns="columns" :data="tableData" @on-select-change="handleSelectTableItem" :disabled-hover="true">
          <template slot-scope="{row, index}" slot="action">
            <div v-for="(bItem, bIndex) in btnList" :key="bIndex" style="display: inline-block;margin-right: 5px">
              <Poptip v-if="bItem === 'DELETE'" confirm title="确定要删除吗？" transfer @on-ok="deleteItem(row, index)">
                <Button type="error" size="small">删除</Button>
              </Poptip>
              <Button v-if="bItem === 'EDIT'" type="primary" size="small" style="" @click="editItem(row, index)">编辑</Button>
            </div>
          </template>
        </Table>
        <Page :total="total" show-sizer show-total show-elevator @on-change="handleChangePage" @on-page-size-change="handlePageSizeChange" style="margin: 10px 0 0"></Page>
      </i-col>
    </Row>
  </my-card>
</template>

<script>
import MyCard from '_c/MyCard'
import { getDeviceAlarm } from '@/api/hd'
export default {
  components: {
    MyCard
  },
  data () {
    return {
      columns: [
        // {
        //   title: 'ID',
        //   key: 'id',
        //   width: 150,
        //   align: 'center'
        // },
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
      total: 0,
      tableData: [],
      searchForm: {},
      selection: [],
      deviceId: ''
    }
  },
  methods: {
    // 获取列表
    async getItems (params) {
      const res = await getDeviceAlarm(params)
      if (res.data && res.data.code === 0) {
        let arrs=res.data.data.list
        let that=this
        arrs.forEach(function(currentValue, index, arr){ 
          console.log(currentValue,index)
           console.log(arr)
        let shijianchu=currentValue.dateTime/1000;
        let times=that.timeConvert(shijianchu,1); 

         that.$set(arr[index],"dateTime", times)
		  	})
        this.tableData = res.data.data.list
        this.total = res.data.data.total
      }
    },
    timeConvert(timestamp,num){
      //num:0 YYYY-MM-DD  num:1  YYYY-MM-DD hh:mm:ss // timestamp:时间戳 
        timestamp = timestamp+'';
        timestamp = timestamp.length==10?timestamp*1000:timestamp;
        var date = new Date(timestamp);
        var y = date.getFullYear();  
        var m = date.getMonth() + 1;  
        m = m < 10 ? ('0' + m) : m;  
        var d = date.getDate();  
        d = d < 10 ? ('0' + d) : d;  
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        var second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;  
        second = second < 10 ? ('0' + second) : second; 
        if(num==0){
            return y + '-' + m + '-' + d;  
        }else{
            return y + '-' + m + '-' + d +' '+ h +':'+ minute +':' + second;  
        }
    },
    // 删除
    deleteItem (row, index) {
    },
    addItem () {
    },
    editItem (row, index) {
    },
    // 批量删除
    handleDeleteBatch () {
      deleteSceneList(this.selection).then(res => {
        this.deleteBatchSuccess(res)
      })
    },
    // 分页
    handleChangePage (e) {
      const obj = { size: this.size, index: e }
      if (this.searchForm.value) {
        Object.assign(obj, { [this.searchForm.key]: this.searchForm.value })
      }
      if (this.searchForm.time[0]) {
        this.searchForm.time = this.searchForm.time.map((item, index) => new Date(item).getTime())
        obj.startTime = this.searchForm.time[0]
        obj.stopTime = this.searchForm.time[1]
      }
      this.getItems(obj)
    },
    // 搜索清除
    handleClear (e) {
      if (e.target.value === '') this.getItems({ size: this.size })
    },
    // 多选
    handleSelectTableItem (selection, row) {
      this.selection = selection
    },
    // 设置默认的搜索key
    setDefaultSearchKey () {
      this.$set(this.searchForm, 'key', this.columns[0].key ? this.columns[0].key : this.columns[1].key)
      this.$set(this.searchForm, 'value', this.deviceId)
    },
    // 分页改变事件
    handlePageSizeChange (e) {
      this.size = e
      const obj = { size: this.size, [this.searchForm.key]: this.searchForm.value }
      if (this.searchForm.time[0]) {
        this.searchForm.time = this.searchForm.time.map((item, index) => new Date(item).getTime())
        obj.startTime = this.searchForm.time[0]
        obj.stopTime = this.searchForm.time[1]
      }
      this.getItems(obj)
    },
    // 搜索
    handleSearch () {
      const obj = {}
      obj[this.searchForm.key] = this.searchForm.value
      if (this.searchForm.time[0]) {
        this.searchForm.time = this.searchForm.time.map((item, index) => new Date(item).getTime())
        obj.startTime = this.searchForm.time[0]
        obj.stopTime = this.searchForm.time[1]
      }
      this.getItems(obj)
    }
  },
  mounted () {
    this.deviceId = this.$route.params.deviceId
    this.getItems()
    this.setDefaultSearchKey()
  }
}
</script>

<style>

</style>

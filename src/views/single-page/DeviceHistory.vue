<template>
  <my-card>
    <Row>
      <i-col :span="24">
        <Tabs :value="tabOption[0].name">
          <TabPane v-for="item in tabOption" :label="item.label" :key="item.name" :name="item.name">
            <Row v-if="item.name === 'realdata'">
              <i-col :span="24">
                <Form :model="realSearchForm" inline :label-width="0">
                  <FormItem>
                    <Select v-model="realSearchForm.key" @on-change="handleChangeRealSearchKey">
                      <template v-for="item in searchKeyList">
                        <Option :value="item.key" :key="`search-${item.key}`">{{item.name}}</Option>
                      </template>
                    </Select>
                  </FormItem>
                  <FormItem>
                    <Select v-model="realSearchForm.value"  v-if="isShowScene">
                      <template v-for="item in sceneList">
                        <Option :value="item.id" :key="`search-${item.id}`">{{item.name}}</Option>
                      </template>
                    </Select>
                    <Input v-else @on-clear="handleClearRealInput" clearable placeholder="请输入关键字" v-model="realSearchForm.value" />
                  </FormItem>
                  <FormItem label="时间范围:" :label-width="80">
                    <DatePicker v-model="realSearchForm.time" type="datetimerange" placeholder="请选择范围" transfer></DatePicker>
                  </FormItem>
                  <Button @click="handleSearchReal" type="primary" icon="md-search">搜索</Button>
                </Form>

                <Table :loading="loading" stripe border :columns="columns" :data="tableData"></Table>

                <Page :total="total" show-sizer show-total show-elevator @on-change="handleChangeRealPage" @on-page-size-change="handleChangeRealPageSize" style="margin: 10px 0 0"></Page>
              </i-col>
            </Row>
            <Row v-else>
              <i-col :span="24">
                <Form ref="traceForm" :model="historySearchForm" inline :label-width="70">
                  <FormItem label="设备编码:">
                    <Input clearable placeholder="请输入关键字" v-model="historySearchForm.deviceNum" class="search-item" />
                  </FormItem>
                  <FormItem label="场景:">
                    <Select v-model="historySearchForm.sceneId" class="search-item">
                      <template v-for="item in sceneList">
                        <Option :value="item.id" :key="`search-${item.id}`">{{item.name}}</Option>
                      </template>
                    </Select>
                  </FormItem>
                  <FormItem label="时间范围:">
                    <DatePicker v-model="historySearchForm.time" type="datetimerange" placeholder="请选择范围" class="search-item" transfer></DatePicker>
                  </FormItem>
                  <Button @click="handleSearchHistory" type="primary" icon="md-search">搜索</Button>
                </Form>
                <Table :loading="loading" stripe border :columns="columns" :data="historyTableData"></Table>
                <Page :total="historyTotal" show-sizer show-total show-elevator @on-change="handleChangeHistoryPage" @on-page-size-change="handleChangePageSizeHistory" style="margin: 10px 0 0"></Page>
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
export default {
  data () {
    return {
      tabOption: [
        {
          label: '实时数据',
          name: 'realdata'
        },
        {
          label: '历史数据',
          name: 'historydata'
        }
      ],
      loading: false,
      total: 0,
      size: 10,
      historyTotal: 0,
      historySize: 10,
      realSearchForm: {},
      historySearchForm: {},
      searchKeyList: [
        { key: 'sceneId', name: '场景' },
        { key: 'receiverNum', name: '接收器编号' },
        { key: 'deviceNum', name: '设备编号' }
      ],
      columns: [
        {
          title: '设备编号',
          key: 'device_num'
        },
        {
          title: '接收器编号',
          key: 'receiver_num'
        },
        {
          title: '时间',
          key: 'time'
        },
        {
          title: '场景名称',
          key: 'scene_name'
        }
      ],
      tableData: [],
      historyTableData: [],
      isShowScene: true,
      sceneList: []
    }
  },
  methods: {
    handleChangeRealSearchKey () {},
    handleClearRealInput () {},
    handleChangeRealPage () {},
    handleChangeRealPageSize () {},
    handleSearchReal () {},
    handleSearchHistory () {},
    handleChangePageSizeHistory () {},
    handleChangeHistoryPage () {}
  },
  components: {
    MyCard
  }
}
</script>

<style>

</style>

<template>
  <my-card>
    <Row>
      <i-col :span="24">
        <Form :model="searchForm" inline :label-width="0">
          <FormItem>
            <Select v-model="searchForm.key">
              <template v-for="item in columns">
                <Option v-if="item.key" :value="item.key" :key="`search-${item.key}`">{{item.title}}</Option>
              </template>
            </Select>
          </FormItem>
          <FormItem>
            <Input @on-change="handleClear" clearable placeholder="请输入关键字" v-model="searchForm.value" />
          </FormItem>
          <FormItem>
            <Button @click="handleSearch" type="primary" icon="md-search">搜索</Button>
          </FormItem>
          <FormItem>
            <Button @click="addItem" type="primary" icon="md-add">新增</Button>
          </FormItem>
        </Form>
      </i-col>
    </Row>
    <Row>
      <i-col :span="24">
        <Table :loading="loading" border :columns="columns" :data="tableData"  :disabled-hover="true" @on-select-change="handleSelectTableItem">
          <template slot-scope="{row, index}" slot="action">
            <Button type="primary" size="small" style="margin-right: 5px" @click="editItem(row, index)">编辑</Button>
            <Poptip confirm title="确定要删除吗？" transfer @on-ok="deleteItem(row, index)">
              <Button type="error" size="small">删除</Button>
            </Poptip>
          </template>
        </Table>
        <Page :total="total" show-sizer show-total show-elevator @on-change="handleChangePage" @on-page-size-change="handlePageSizeChange" style="margin: 10px 0 0"></Page>
      </i-col>
    </Row>
    <Modal v-model="modal" :mask-closable="false" :transfer="true" title=" " @on-ok="submit">
      <Row type="flex" justify="center">
        <i-col span="24">
          <Form :model="formItem" :label-width="80">
            <FormItem :label="formItemLabel[0]">
              <Input v-model="formItem.id" />
            </FormItem>
            <FormItem :label="formItemLabel[1]">
              <Input v-model="formItem.name" />
            </FormItem>
            <FormItem :label="formItemLabel[2]">
              <Input v-model="formItem.type" />
            </FormItem>
            <FormItem :label="formItemLabel[3]">
              <Input v-model="formItem.model" />
            </FormItem>
            <FormItem :label="formItemLabel[4]">
              <Select v-model="formItem.storageId">
                <Option v-for="(item, index) in storageList" :key="index" :value="item.id">{{item.name}}</Option>
              </Select>
            </FormItem>
            <FormItem :label="formItemLabel[5]">
              <Input v-model="formItem.sn" />
            </FormItem>
            <FormItem :label="formItemLabel[6]">
              <Input v-model="formItem.remark" type="textarea"/>
            </FormItem>
          </Form>
        </i-col>
      </Row>
    </Modal>
  </my-card>
</template>

<script>
import { getStorageBySid, deleteStorage, editStorage, addStorage } from '@/api/user'
import minxin from '@/assets/js/mixin'
import MyCard from '_c/MyCard'

export default {
  name: 'Device',
  mixins: [minxin],
  components: {
    MyCard
  },
  data () {
    return {
      columns: [
        {
          title: '角色ID',
          key: 'id'
        },
        {
          title: '角色名称',
          key: 'name'
        },
        {
          title: '机构ID',
          key: 'organizationId'
        },
        {
          title: '备注',
          key: 'remark'
        },
        {
          title: '操作',
          slot: 'action',
          width: 130,
          align: 'center'
        }
      ],
      formItemLabel: ['设备ID', '设备名称', '设备类型', '设备模式', '所属仓库', 'SN码', '备注'],
      storageList: []
    }
  },
  methods: {
    async getStorages () {
      const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
      const sid = userInfo.userId
      const res = await getStorageBySid({ sid })
      if (res.data.code === 0) {
        this.storageList = res.data.data.list
      }
    },
    // 查
    async getItems (params) {
      const res = await getStorageBySid(params)
      this.getSuccess(res)
    },
    // 删
    async deleteItem (row, index) {
      const res = await deleteStorage(row.id)
      this.deleteSuccess(res, index)
    },
    // 增 改
    async submit () {
      if (this.submitType === 'add') {
        const res = await addStorage(this.formItem)
        this.modal = !this.modal
        if (res.data.code === 0) {
          this.$Message.success('添加成功！')
          this.getItems()
        } else {
          this.$Message.warning(res.data.message)
        }
      } else {
        const res = await editStorage(this.formItem)
        this.modal = !this.modal
        if (res.data.code === 0) {
          this.$Message.success('修改成功！')
        } else {
          this.$Message.warning(res.data.message)
        }
      }
    }
  },
  mounted () {
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    const userId = userInfo.userId
    this.getItems({ sid: userId })
    this.getStorageBySid(userId)
  }
}
</script>

<style lang="less" scoped>

</style>

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
          <FormItem>
            <Button type="primary" @click="allotStorage">分配</Button>
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
    <Modal v-model="modal" :loading="modalLoading" :mask-closable="false" :transfer="true" title=" " @on-ok="submit">
      <Row type="flex" justify="center">
        <i-col span="24">
          <Form :model="formItem" :label-width="80">
            <FormItem :label="formItemLabel[0]">
              <Input v-model="formItem.storageName" />
            </FormItem>
            <FormItem :label="formItemLabel[1]">
              <Input v-model="formItem.storageAddress" />
            </FormItem>
            <FormItem :label="formItemLabel[2]" v-if="submitType === 'add'">
              <Input v-model="formItem.sn" />
            </FormItem>
          </Form>
        </i-col>
      </Row>
    </Modal>
    <Modal v-model="isShowAllotModal" :loading="allotModalLoading" :mask-closable="false" :transfer="true" title=" " @on-ok="allotSubmit">
      <Form :model="allotForm" :label-width="100">
        <FormItem label="仓库">
          <Select v-model="allotForm.storageId" label-in-value>
            <Option v-for="(item, index) in storageList" :key="index" :value="item.id">{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="用户">
          <Select v-model="allotForm.userId" label-in-value>
            <Option v-for="(item, index) in userList" :key="index" :value="item.id">{{item.name}}</Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>
  </my-card>
</template>

<script>
import { getStorage, deleteStorage, editStorage, addStorage, getUListByCreateUser, getSListByCreateUser, addUserRelStorage } from '@/api/user'
import minxin from '@/assets/js/mixin'
import MyCard from '_c/MyCard'

export default {
  name: 'Storage',
  mixins: [minxin],
  components: {
    MyCard
  },
  data () {
    return {
      columns: [
        {
          title: '仓库ID',
          key: 'storageId',
          minWidth: 130,
          align: 'center'
        },
        {
          title: '仓库名称',
          key: 'storageName',
          minWidth: 130,
          align: 'center'
        },
        {
          title: '仓库地址',
          key: 'storageAddress',
          minWidth: 200,
          align: 'center'
        },
        {
          title: '操作',
          slot: 'action',
          width: 130,
          fixed: 'right',
          align: 'center'
        }
      ],
      formItemLabel: ['仓库名称', '仓库地址', 'SN码'],
      isShowAllotModal: false,
      allotModalLoading: true,
      allotForm: {},
      userList: [],
      storageList: []
    }
  },
  methods: {
    // 查
    async getItems (params) {
      const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
      const userId = userInfo.userId
      const res = await getStorage({ userId })
      this.getSuccess(res)
    },
    // 删
    async deleteItem (row, index) {
      const res = await deleteStorage(row.id)
      this.deleteSuccess(res, index)
    },
    // 增 改
    async submit () {
      const obj = {
        name: this.formItem.storageName || '',
        address: this.formItem.storageAddress || ''
      }
      if (this.submitType === 'add') {
        if (this.formItem.storageAddress) {
          obj.sn = this.formItem.sn
        }
        const res = await addStorage(obj)
        if (res.data.code === 0) {
          this.modal = false
          const storageId = res.data.data.id
          const userId = JSON.parse(sessionStorage.getItem('userInfo')).userId
          const res2 = await addUserRelStorage({ storageId, userId })
          if (res2.data.code === 0) {
            this.getItems()
            this.$Message.success({ background: true, content: '添加成功！' })
          } else {
            this.modalLoading = false
            this.$nextTick(() => {
              this.modalLoading = true
            })
            this.$Message.warning({ background: true, content: res.data.message })
          }
        } else {
          this.modalLoading = false
          this.$nextTick(() => {
            this.modalLoading = true
          })
          this.$Message.warning({ background: true, content: res.data.message })
        }
      } else {
        obj.id = this.formItem.storageId
        const res = await editStorage(obj)
        this.editSuccess(res)
      }
    },
    allotStorage () {
      this.isShowAllotModal = !this.isShowAllotModal
      this.getStorageList()
      this.getUserList()
    },
    async getStorageList () {
      const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
      const userId = userInfo.userId
      const res = await getSListByCreateUser(userId)
      if (res.data.code === 0) {
        this.storageList = res.data.data.list
      }
    },
    async getUserList () {
      const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
      const userId = userInfo.userId
      const res = await getUListByCreateUser(userId)
      if (res.data.code === 0) {
        this.userList = res.data.data.list
      }
    },
    // 分配
    async allotSubmit () {
      const res = await addUserRelStorage(this.allotForm)
      if (res.data.code === 0) {
        const res2 = await editStorage({ isUse: '1', id: this.allotForm.storageId })
        console.log(res2)
        if (res2.data.code === 0) {
          this.isShowAllotModal = !this.isShowAllotModal
          this.$Message.success({ background: true, content: '分配成功！' })
        }
      } else {
        this.allotModalLoading = false
        this.$nextTick(() => {
          this.allotModalLoading = true
        })
        this.$Message.warning({ background: true, content: res.data.message })
      }
    }
  },
  mounted () {
    this.getItems()
  }
}
</script>

<style lang="less" scoped>

</style>

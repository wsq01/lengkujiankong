<template>
  <my-card>
    <!-- <Row>
      <i-col :span="24">
        <Form :model="searchForm" inline :label-width="0">
          <FormItem>
            <Button @click="addItem" type="primary" icon="md-add">新增</Button>
          </FormItem>
        </Form>
      </i-col>
    </Row> -->
    <Row>
      <i-col :span="24">
        <Table :loading="loading" border :columns="columns" :data="tableData"  :disabled-hover="true" @on-select-change="handleSelectTableItem">
          <template slot-scope="{row, index}" slot="action">
            <Poptip confirm title="确定要删除吗？" transfer @on-ok="deleteAllot(row, index)">
              <Button type="error" size="small">删除</Button>
            </Poptip>
          </template>
        </Table>
        <Page :total="total" show-sizer show-total show-elevator @on-change="handleChangePage" @on-page-size-change="handlePageSizeChange" style="margin: 10px 0 0"></Page>
      </i-col>
    </Row>
  </my-card>
</template>

<script>
import { getAllocatedByCreateUser, deleteUserRelStorage, editStorage } from '@/api/user'
import minxin from '@/assets/js/mixin'
import MyCard from '_c/MyCard'

export default {
  name: 'Allot',
  mixins: [minxin],
  components: {
    MyCard
  },
  data () {
    return {
      columns: [
        {
          title: '用户ID',
          key: 'userId',
          minWidth: 120,
          align: 'center'
        },
        {
          title: '用户名',
          key: 'userName',
          minWidth: 120,
          align: 'center'
        },
        {
          title: '角色ID',
          key: 'roleId',
          minWidth: 120,
          align: 'center'
        },
        {
          title: '角色名称',
          key: 'roleName',
          minWidth: 120,
          align: 'center'
        },
        {
          title: '仓库ID',
          key: 'storageId',
          minWidth: 120,
          align: 'center'
        },
        {
          title: '仓库名',
          key: 'storageName',
          minWidth: 150,
          align: 'center'
        },
        {
          title: '操作',
          slot: 'action',
          width: 100,
          fixed: 'right',
          align: 'center'
        }
      ]
    }
  },
  methods: {
    async getItems (params) {
      const res = await getAllocatedByCreateUser(params)
      this.getSuccess(res)
    },
    async deleteAllot (row, index) {
      const res = await deleteUserRelStorage(row.userId || '', row.storageId || '')
      if (res.data.code === 0) {
        const res2 = await editStorage({ isUse: '0', id: row.storageId })
        if (res2.data.code === 0) {
          this.isShowAllotModal = !this.isShowAllotModal
          this.$Message.success({ background: true, content: '删除成功！' })
        }
      }
    }
  },
  mounted () {
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    const userId = userInfo.userId
    this.getItems(userId)
  }
}
</script>

<style lang="less" scoped>

</style>

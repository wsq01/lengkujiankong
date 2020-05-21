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
  </my-card>
</template>

<script>
import { deleteUserRelRole, getUserRelRole } from '@/api/user'
import minxin from '@/assets/js/mixin'
import MyCard from '_c/MyCard'

export default {
  name: 'Role',
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
      roleList: [],
      submitType: ''
    }
  },
  methods: {
    async getItems (params) {
      const res = await getUserRelRole(params)
      this.loading = false
      if (res.data.code === 0) {
        this.tableData = res.data.data.list
        this.total = res.data.data.total
      } else {
        this.$Message.warning(res.data.message)
      }
    },
    async deleteItem (row, index) {
      const res = await deleteUserRelRole(row.id)
      if (res.data.code === 0) {
        this.tableData.splice(index, 1)
        this.$Message.success('删除成功！')
      } else {
        this.$Message.warning(res.data.message)
      }
    },
    addItem () {
      this.submitType = 'add'
      this.formItem = {}
      this.modal = !this.modal
    },
    editItem (row, index) {
      this.submitType = 'edit'
      this.formItem = row
      this.modal = !this.modal
    }
  }
}
</script>

<style lang="less" scoped>

</style>

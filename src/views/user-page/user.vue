<template>
  <my-card>
    <Row>
      <i-col :span="24">
        <Form :model="searchForm" inline :label-width="0">
          <FormItem>
            <Select v-model="searchForm.key" class="search-item">
              <template v-for="item in columns">
                <Option v-if="item.key && (item.key === 'userId' || item.key === 'roleId' || item.key === 'organizationId')" :value="item.key" :key="`search-${item.key}`">{{item.title}}</Option>
              </template>
            </Select>
          </FormItem>
          <FormItem>
            <Input @on-change="handleClear" clearable placeholder="请输入关键字" v-model="searchForm.value" class="search-item" />
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
import { getUser, deleteUser } from '@/api/user'
import minxin from '@/assets/js/mixin'
import MyCard from '_c/MyCard'

export default {
  name: 'UserManager',
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
          align: 'center',
          width: 150
        },
        {
          title: '用户名',
          key: 'userName',
          align: 'center',
          width: 100
        },
        {
          title: '英文名',
          key: 'nameEn',
          align: 'center',
          width: 100
        },
        {
          title: '角色ID',
          key: 'roleId',
          align: 'center',
          width: 150
        },
        {
          title: '角色名',
          key: 'roleName',
          align: 'center',
          width: 120
        },
        {
          title: '手机号',
          key: 'mobile',
          align: 'center',
          width: 100
        },
        {
          title: '邮箱',
          key: 'mail',
          align: 'center',
          width: 100
        },
        {
          title: '登录时间',
          key: 'loginTime',
          align: 'center',
          width: 200
        },
        {
          title: '创建时间',
          key: 'createTime',
          align: 'center',
          width: 200
        },
        {
          title: '操作',
          slot: 'action',
          width: 130,
          align: 'center',
          fixed: 'right'
        }
      ]
    }
  },
  methods: {
    // 获取列表
    getItems (params) {
      getUser(params).then(res => {
        this.loading = false
        if (res.data.code === 0) {
          this.tableData = res.data.data.list
          this.total = res.data.data.total
        }
      })
    },
    // 删除
    deleteItem (row, index) {
      deleteUser(row.userId).then(res => {
        if (res.data.code === 0) {
          this.tableData.splice(index, 1)
        }
      })
    },
    addItem () {
      this.$router.push({
        name: 'add-user'
      })
    },
    editItem (row, index) {
      this.$router.push({
        name: 'edit-user',
        params: row
      })
    }
  },
  mounted () {
  }
}
</script>

<style lang="less" scoped>
.search-item {
  display: inline-block;
  width: 200px;
}
</style>

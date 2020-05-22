<template>
  <my-card>
    <Row>
      <i-col :span="24">
        <Form :model="searchForm" inline :label-width="0">
          <FormItem>
            <Select v-model="searchForm.key">
              <template v-for="item in columns">
                <Option v-if="item.key && (item.key === 'userId' || item.key === 'roleId' || item.key === 'organizationId')" :value="item.key" :key="`search-${item.key}`">{{item.title}}</Option>
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
    <Modal v-model="modal" :loading="modalLoading" :mask-closable="false" :transfer="true" title=" " @on-ok="submit">
        <Row type="flex" justify="center">
          <i-col span="24">
            <Form :model="formItem" :label-width="100">
              <FormItem :label="formItemLabel[0]">
                <Input v-model="formItem.name" />
              </FormItem>
              <FormItem :label="formItemLabel[1]">
                <Input v-model="formItem.nameEn" />
              </FormItem>
              <FormItem :label="formItemLabel[2]">
                <Input v-model="formItem.password" />
              </FormItem>
              <FormItem :label="formItemLabel[3]">
                <Select v-model="formItem.roleId" label-in-value @on-change="handleSelectRole">
                  <Option v-for="(item, index) in roleList" :key="index" :value="item.id">{{item.name}}</Option>
                </Select>
              </FormItem>
              <FormItem :label="formItemLabel[4]">
                <Input v-model="formItem.mobile" />
              </FormItem>
              <FormItem :label="formItemLabel[5]">
                <Input v-model="formItem.mail" />
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
import { getUser, deleteUser, addUser, editUser, getRole, deleteUserRelRole, addUserRelRole } from '@/api/user'
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
          key: 'name',
          align: 'center',
          width: 140
        },
        {
          title: '手机号',
          key: 'mobile',
          align: 'center',
          width: 130
        },
        {
          title: '邮箱',
          key: 'mail',
          align: 'center',
          width: 130
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
      ],
      formItemLabel: ['用户名', '用户名(英文)', '密码', '角色', '手机号', '邮箱', '备注'],
      roleList: [],
      oldFormItem: {}
    }
  },
  methods: {
    async getItems (params) {
      const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
      const userId = userInfo.userId
      const obj = { createUser: userId }
      if (params) {
        Object.assign(obj, params)
      }
      const res = await getUser(obj)
      this.getSuccess(res)
    },
    async deleteItem (row, index) {
      const res = await deleteUser(row.userId)
      this.deleteSuccess(res, index)
    },
    handleSelectRole (e) {
      this.formItem.roleName = e.label || ''
    },
    async submit () {
      if (this.submitType === 'add') {
        const res = await addUser(this.formItem)
        this.addSuccess(res)
      } else {
        if (this.formItem.roleName) {
          this.deleteUserRelRole()
          this.addUserRelRole()
        }
        const res = await editUser(this.formItem)
        this.editSuccess(res)
      }
    },
    async addUserRelRole () {
      const res = await addUserRelRole({ userId: this.formItem.userId, roleId: this.formItem.roleId })
      if (res.data.code !== 0) {
        this.$Message.warning({ background: true, content: res.data.message })
      }
    },
    async deleteUserRelRole () {
      const res = await deleteUserRelRole({ uid: this.oldFormItem.userId, rid: this.oldFormItem.roleId })
      if (res.data.code !== 0) {
        this.$Message.warning({ background: true, content: res.data.message })
      }
    },
    async getRoleList () {
      const res = await getRole()
      this.roleList = res.data.data.list
    },
    editItem (row, index) {
      console.log(row)
      this.submitType = 'edit'
      this.formItem = row
      this.modal = !this.modal
      this.oldFormItem = row
    }
  },
  mounted () {
    this.oldFormItem = this.formItem
    this.getItems()
    this.getRoleList()
  }
}
</script>

<style lang="less" scoped>

</style>

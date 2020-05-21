<template>
  <div class="user-avatar-dropdown">
    <Dropdown @on-click="handleClick">
      <Avatar :src="userAvatar" />
      <span class="username">{{userName}}</span>
      <Icon :size="18" type="md-arrow-dropdown"></Icon>

      <DropdownMenu slot="list">
        <DropdownItem v-if="!off && isAuth" name="authority">个人中心</DropdownItem>
        <DropdownItem v-if="off && isAuth" name="storage">我的仓库</DropdownItem>
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'User',
  data () {
    return {
      userName: '',
      off: false,
      isAuth: false
    }
  },
  props: {
    userAvatar: {
      type: String,
      default: ''
    }
  },
  mounted () {
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    this.userName = userInfo.role[0].roleName
    if (this.userName === '普通用户') {
      this.isAuth = true
    }
  },
  methods: {
    ...mapActions(['handleLogOut']),
    handleSelect (name) { // 选择菜单（MenuItem）时触发
      this.off = !this.off
      this.$emit('on-select-top', name)
    },
    logout () {
      this.$Modal.confirm({
        title: '提示',
        content: '<p>请确定是否要注销登录</p>',
        loading: true,
        onOk: () => {
          setTimeout(() => {
            this.handleLogOut().then(() => {
              this.$router.push({
                name: 'login'
              })
            })
            this.$Modal.remove()
            this.$Message.info('注销成功')
          }, 2000)
        }
      })
    },
    handleClick (name) {
      switch (name) {
        case 'authority':
          this.handleSelect(name)
          break
        case 'storage':
          this.handleSelect(name)
          break
        case 'logout':
          this.logout()
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
.user {
  &-avatar-dropdown {
    cursor: pointer;
    display: inline-block;
    vertical-align: middle;
    .ivu-badge-dot {
      top: 16px;
    }
    .ivu-icon {
      margin-left: 10px;
    }
    .username {
      margin-left: 5px;
    }
  }
}
</style>

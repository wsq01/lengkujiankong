<template>
  <div class="user-avatar-dropdown">
    <Dropdown @on-click="handleClick">
      <Avatar :src="userAvatar" />
      <span class="username">admin</span>
      <Icon :size="18" type="md-arrow-dropdown"></Icon>

      <!-- <DropdownMenu slot="list">
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>-->
      <Icon type="md-notifications" size="20" />
      <Icon type="md-power" size="20" @click="logout" />
    </Dropdown>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'User',
  props: {
    userAvatar: {
      type: String,
      default: ''
    }
  },
  methods: {
    ...mapActions(['handleLogOut']),
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
    // height: 64px;
    vertical-align: middle;
    // line-height: 64px;
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

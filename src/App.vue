<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'App',
  data () {
    return {
      socketUrl: 'ws://114.64.253.136:8015/websocket/',
      socket: null
    }
  },
  mounted () {
    const userId = JSON.parse(sessionStorage.getItem('userInfo')).userId
    this.socketUrl = this.socketUrl + userId
    this.initScoket()
  },
  methods: {
    ...mapActions(['reqSocketMsg']),
    initScoket () {
      if (typeof WebSocket === 'undefined') {
        alert('您的浏览器不支持socket')
      } else {
        // 实例化socket
        console.log(this.socketUrl)
        this.socket = new WebSocket(this.socketUrl)
        // 监听socket连接
        this.socket.onopen = this.open
        // 监听socket错误信息
        this.socket.onerror = this.error
        // 监听socket消息
        this.socket.onmessage = this.getMessage
      }
    },
    open () {
      console.log('socket连接成功')
    },
    error () {
      this.$Notice.info({
        title: '提示',
        desc: 'socket连接失败！'
      })
    },
    getMessage (msg) {
      this.reqSocketMsg(msg.data)
    },
    send () {
      this.socket.send('params')
    },
    close () {
      console.log('socket已经关闭')
    }
  },
  beforeDestroy () {
    // 销毁监听
    if (this.socket) this.socket.onclose = this.close
  }
}
</script>

<style lang="less">
.size{
  width: 100%;
  height: 100%;
  background: #200853;
}
html,body{
  .size;
  overflow: hidden;
  margin: 0;
  padding: 0;
  background: #200853;
  letter-spacing: 1px;
}
#app {
  .size;
}
</style>

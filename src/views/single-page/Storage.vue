<template>
  <Scroll ref="scrollDom" class="scroll-container" :on-reach-bottom="handleReachBottom" :height="800" :distance-to-edge="[1, 1]">
    <Row :gutter="20" style="margin: 0">
      <i-col :xxl="6" :md="24" :lg="8" v-for="(item, index) in storageList" :key="index" >
          <div style="cursor: pointer" @click="toDeviceDetail(item.deviceId)">
            <my-card class="box">
              <div class="box-name">{{item.storageName}}</div>
              <div class="box-desc">
                <div class="desc-item">
                  <img :src="item.online === 0 ? require('../../assets/images/device-online@2x.png') : require('../../assets/images/device-offline@2x.png')" alt="">
                  <div>
                    <p>{{item.online === 0 ? '在线': '离线'}}</p>
                    <span></span>
                    <p>系统状态</p>
                  </div>
                </div>
                <div class="desc-item">
                  <img style="width: 15px" :src="item.storageTemp < 60 ? require('../../assets/images/device-temp@2x.png') : require('../../assets/images/device-temp-err@2x.png')" alt="">
                  <div>
                    <p>{{item.storageTemp}}°C</p>
                    <span></span>
                    <p>冷库温度</p>
                  </div>
                </div>
                <div class="desc-item">
                  <p style="width: 20px" v-if="item.state === 0 || item.state === 4">--</p>
                  <img v-else :src="item.state === 1 ? require('../../assets/images/device-zl@2x.png') : item.state === 2 ? require('../../assets/images/device-hs@2x.png') : require('../../assets/images/device-ds@2x.png')" alt="">
                  <div>
                    <p>{{item.state === 0 ? '空闲' : item.state === 1 ? '制冷' : item.state === 2 ? '化霜' : item.state === 3 ? '滴水' : '异常'}}</p>
                    <span></span>
                    <p>启用状态</p>
                  </div>
                </div>
              </div>
            </my-card>
          </div>
      </i-col>
    </Row>
  </Scroll>
</template>

<script>
import MyCard from '_c/MyCard'
import { getDeviceById } from '@/api/user'
import { getRTDeviceInfo } from '@/api/hd'
import { mapMutations } from 'vuex'
export default {
  name: 'Storage',
  data () {
    return {
      storageId: '',
      deviceList: [],
      storageList: [],
      scrollHeight: 0,
      size: 10,
      pageIndex: 1
    }
  },
  components: {
    MyCard
  },
  methods: {
    ...mapMutations([
      'setDeviceId'
    ]),
    handleReachBottom () {
      return new Promise(resolve => {
        setTimeout(() => {
          this.getStorage({ index: ++this.pageIndex })
          resolve()
        }, 2000)
      })
    },
    async getStorage (params) {
      const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
      const userId = userInfo.userId
      const obj = { userId }
      if (params) {
        Object.assign(obj, params)
      }
      const res = await getRTDeviceInfo(obj)
      if (res.data.code === 0) {
        this.storageList.push(...res.data.data.list)
      }
    },
    async getDevice (deviceId) {
      const res = await getDeviceById(deviceId)
      if (res.data.code === 0) {
        if (!res.data.data) {
          this.$Message.warning({ background: true, content: '该仓库下无设备' })
          return false
        }
        this.setDeviceId(res.data.data.deviceId)
        this.$router.push({
          name: 'device',
          params: { deviceId: res.data.data.deviceId }
        })
      }
    },
    toDeviceDetail (deviceId) {
      this.getDevice(deviceId)
    }
  },
  created () {
    this.getStorage()
  },
  mounted () {
    this.scrollHeight = this.$refs.scrollDom.$parent.$parent.$el.offsetHeight
  }
}
</script>

<style lang="less" scoped>
.box {
  max-width: 600px;
  cursor: pointer;
  .box-name {
    text-align: center;
    margin: 80px auto;
    font-size: 42px;
    background: linear-gradient(to top, rgba(62, 54, 216, 1), rgba(65, 252, 230, 1));
    background-clip: text;
    color: transparent;
  }
  .box-desc {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
    align-items: center;
    margin: 20px auto;
    .desc-item {
      display: flex;
      align-items: center;
      img {
        display: block;
        width: 30px;
        height: 30px;
      }
    }
    p {
      text-align: center;
      width: 70px;
    }
    span {
      display: block;
      margin: 3px auto;
      padding: 0 6px;
      height: 1px;
      width: 50px;
      background: rgba(65, 252, 230, 1)
    }
  }
}
</style>

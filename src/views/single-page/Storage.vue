<template>
  <div>
    <Row :gutter="20">
      <i-col :xxl="6" :md="24" :lg="8" v-for="(item, index) in storageList" :key="index" >
        <div style="cursor: pointer" @click="toDeviceDetail(item.storageId)">
          <my-card>
            <div class="box">
              <!-- <div class="box-id">仓库ID：{{item.storageId}}</div> -->
              <div class="box-name">{{item.storageName}}</div>
              <div class="box-desc">
                <p>{{item.storageAddress}}</p>
              </div>
            </div>
          </my-card>
        </div>
      </i-col>
    </Row>
  </div>
</template>

<script>
import MyCard from '_c/MyCard'
import { getDevice, getStorage } from '@/api/user'
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'Storage',
  data () {
    return {
      storageId: '',
      deviceList: [],
      storageList: []
    }
  },
  components: {
    MyCard
  },
  computed: {
    ...mapState(['storages'])
  },
  methods: {
    ...mapMutations([
      'setDeviceId'
    ]),
    async getStorage () {
      const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
      const userId = userInfo.userId
      const res = await getStorage({ userId })
      console.log(res)
      if (res.data.code === 0) {
        this.storageList = res.data.data.list
      }
    },
    async getDevice (storageId) {
      const params = { storageId }
      const res = await getDevice(params)
      if (res.data.code === 0) {
        if (res.data.data.list.length === 0) {
          this.$Message.warning({ background: true, content: '该仓库下无设备' })
          return false
        }
        this.setDeviceId(res.data.data.list[0].deviceId)
        this.$router.push({
          name: 'device',
          params: { deviceId: res.data.data.list[0].deviceId }
        })
        // this.deviceList = res.data.data.list
      }
    },
    toDeviceDetail (storageId) {
      this.getDevice(storageId)
    }
  },
  created () {
    // console.log(this.$store)
    // this.storageId = this.$route.path.split('/')[2]
    this.getStorage()
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
    justify-content: center;
    align-items: center;
    p {
      padding: 0 10px;
    }
  }
}
</style>

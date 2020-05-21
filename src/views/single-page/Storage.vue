<template>
  <div>
    <Row :gutter="20">
      <i-col :xxl="4" :md="24" :lg="8" v-for="(item, index) in deviceList" :key="index" >
        <my-card>
          <div class="box" @click="toDeviceDetail(item.deviceId)">
            <div class="box-id">设备ID：{{item.deviceId}}</div>
            <div class="box-name">{{item.name}}</div>
            <div class="box-desc">
              <p>{{item.model}}</p>
              <p>{{item.type}}</p>
              <p>{{item.SN}}</p>
            </div>
          </div>
        </my-card>
      </i-col>
    </Row>
  </div>
</template>

<script>
import MyCard from '_c/MyCard'
import { getDevice } from '@/api/user'
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'Storage',
  data () {
    return {
      storageId: '',
      deviceList: []
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
    async getDevice () {
      const params = { storageId: this.storageId }
      const res = await getDevice(params)
      console.log(res)
      if (res.data.code === 0) {
        this.deviceList = res.data.data.list
      }
    },
    toDeviceDetail (deviceId) {
      this.setDeviceId(deviceId)
      this.$router.push({
        name: 'device',
        params: { deviceId }
      })
    }
  },
  created () {
    // console.log(this.$store)
    // this.storageId = this.$route.path.split('/')[2]
    this.getDevice()
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

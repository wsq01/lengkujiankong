<template>
  <div class="home">
    <Row :gutter="20">
      <i-col :lg="12" :md="24">
        <Card :bordered="false" class="card">
          <p slot="title" class="title">冷库温度统计</p>
        </Card>
      </i-col>
      <i-col :lg="12" :md="24">
        <Card :bordered="false" class="card">
          <p class="title" slot="title">设备信息</p>
          <ul class="detail-list">
            <li v-for="(val, key) in deviceDesc" :key="key">
              <span>{{key}}</span>
              <span>{{val}}</span>
            </li>
          </ul>
        </Card>
      </i-col>
    </Row>
    <Row>
      <i-col span="24">
        <Card :bordered="false" class="card">
          <charts :option="lineChartOption" style="height: 350px"></charts>
        </Card>
      </i-col>
    </Row>
  </div>
</template>

<script>
import Charts from '_c/Charts'
export default {
  name: 'Home',
  data () {
    return {
      lineChartOption: {},
      deviceDesc: {
        num: '123',
        name: 'xxxx',
        receiver: 'qqqq',
        type: 'a',
        time: 'aaaa'
      }
    }
  },
  components: {
    Charts
  },
  methods: {
    initLineChart () {
      this.lineChartOption = {
        title: {
          text: '温度变化统计(单位°C)',
          textStyle: {
            color: '#A3FFFE'
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          right: '2%',
          top: '2%',
          textStyle: {
            color: '#A3FFFE'
          },
          data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          splitLine: {
            show: false
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#A3FFFE',
              fontSize: 14
            }
          },
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#A3FFFE',
              fontSize: 14
            }
          }
        },
        series: [
          {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            symbol: 'none',
            smooth: true,
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            symbol: 'none',
            smooth: true,
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            symbol: 'none',
            smooth: true,
            data: [150, 232, 201, 154, 190, 330, 410]
          }
        ]
      }
    }
  },
  mounted () {
    this.initLineChart()
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/styles/color.less";
.title {
  color: @my-text-color;
}
.card {
  background: @sidebar-menu-bg-color;
  margin: 0 auto 20px;
}
.detail-list {
  color: #fff;
  font-size: 18px;
    padding: 0 20px;
  li {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    line-height: 40px;
    margin: 0 auto 10px;
  }
}
</style>

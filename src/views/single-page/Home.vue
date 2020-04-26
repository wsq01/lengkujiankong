<template>
  <div class="home">
    <Row :gutter="20" class="titletop">
      <i-col :lg="8" :md="24" class="topleft">
        <span class="cur-title">中集冷云</span>
        <span>到期时间:2020-02-13</span>
      </i-col>
      <i-col :lg="16" :md="24">
        <div class="topright">
          <Dropdown>
            <Button type="primary">
              基本信息
              <Icon type="ios-arrow-down"></Icon>
            </Button>
            <DropdownMenu slot="list">
              <DropdownItem>常用设置</DropdownItem>
              <DropdownItem>报警信息</DropdownItem>
              <DropdownItem>详细状态</DropdownItem>
              <DropdownItem>参数设置</DropdownItem>
              <DropdownItem>历史数据</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <RadioGroup v-model="button1" type="button">
            <Radio label="关机"></Radio>
            <Radio label="开机"></Radio>
          </RadioGroup>
        </div>
      </i-col>
    </Row>
    <Row :gutter="20" class="lkstatistics">
      <i-col :lg="12" :md="24">
        <my-card>
          <p slot="title" class="title">
            <span>冷库温度统计</span> <span>2020-05-03</span>
          </p>
          <div class="modelbg">
            <img src="../../assets/images/model@2x.png" class="modelimg" />
          </div>
            <div class="showtotal">
            <div class="item">
              <i-circle :percent="80" stroke-color="#FFE167">
                <span class="demo-Circle-inner cricleborder" style="font-size:24px">25℃</span>
              </i-circle>
              <span class="itemdesc">冷库温度</span>
            </div>
            <div class="item">
              <i-circle :percent="80" stroke-color="#67E4FF">
                <span class="demo-Circle-inner cricleborder" style="font-size:24px">85W</span>
              </i-circle>
              <span class="itemdesc">实时功率</span>
            </div>
            <div class="item">
              <i-circle :percent="80" stroke-color="#67FF95">
                <span class="demo-Circle-inner cricleborder" style="font-size:24px">无</span>
              </i-circle>
              <span class="itemdesc">报警情况</span>
            </div>
          </div>
        </my-card>
      </i-col>
      <i-col :lg="12" :md="24">
        <my-card :bordered="false" class="card">
          <p class="title" slot="title">设备信息</p>
          <ul class="detail-list">
            <li v-for="(val, key) in deviceDesc" :key="key">
              <div>{{ key }}</div>
              <div>{{ val }}</div>
            </li>
          </ul>
        </my-card>
      </i-col>
    </Row>
    <Row :gutter="20">
      <i-col :lg="12" :md="24">
        <my-card>
          <charts :option="lineChartOption" style="height: 350px"></charts>
        </my-card>
      </i-col>
      <i-col :lg="12" :md="24">
        <my-card>
          <charts :option="BarChartOption" style="height: 350px"></charts>
        </my-card>
      </i-col>
    </Row>
  </div>
</template>

<script>
import Charts from '_c/Charts'
import MyCard from '_c/MyCard'

export default {
  name: 'Home',
  data () {
    return {
      lineChartOption: {},
      BarChartOption: {},
      deviceDesc: {
        num: '1234',
        name: 'xxxx',
        receiver: 'qqqq',
        type: 'a666',
        time: 'aaaa'
      },
      button1: '关机'
    }
  },
  components: {
    Charts,
    MyCard
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
          data: ['冷库', '风机', '报警']
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
            name: '冷库',
            type: 'line',
            stack: '总量',
            symbol: 'none',
            smooth: true,
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '风机',
            type: 'line',
            stack: '总量',
            symbol: 'none',
            smooth: true,
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '报警',
            type: 'line',
            stack: '总量',
            symbol: 'none',
            smooth: true,
            data: [150, 232, 201, 154, 190, 330, 410]
          }
        ]
      }
    },
    barinit () {
      this.BarChartOption = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
        }]
      }
    }
  },
  mounted () {
    this.initLineChart()
    this.barinit()
  }
}
</script>

<style  lang="less">
@import "../../assets/styles/color.less";
.home .topright .ivu-dropdown-item {
  background: #182E84;
  color: @yellow-text-color;

}
.home .topright .ivu-dropdown-item:hover {
  color: @yellow-text-color;
}
.topright .ivu-select-dropdown{
  width: inherit;
    max-height: 200px;
    overflow: auto;
    margin: 5px 0;
    background:#182E84;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: absolute;
      color: @white-color;
    z-index: 900;
    .ivu-dropdown-item{
       color: @white-color;
    }
}
</style>
<style lang="less" scoped>
@import "../../assets/styles/color.less";
.titletop {
  display: flex;
  justify-items: center;
  height: 40px;
}
.cur-title {
  margin-right: 30px;
  font-size: 16px;
}
.topleft {
  display: flex;
  height: 40px;
  align-items: center;
  justify-content: flex-start;
}
.topright {
  display: flex;
  height: 40px;
  align-items: center;
  justify-content: flex-end;
  .ivu-btn-primary {
    color: @yellow-text-color;
    background-color: #182e84;
    border-color: #182e84;
  }
  .ivu-dropdown{
  .ivu-dropdown-item {
    margin: 0;
    line-height: normal;
    padding: 7px 16px;
    clear: both;
    color: #a2e9fd;
    font-size: 14px !important;
    white-space: nowrap;
    list-style: none;
    cursor: pointer;
    -webkit-transition: background 0.2s ease-in-out;
    transition: background 0.2s ease-in-out;
  }
   }
  .ivu-radio-wrapper {
    background: #182e84;
    color: @yellow-text-color;
    border: none;
  }
  .ivu-radio-wrapper-checked {
    border: none;
    color: #a3fffe;
  }
}
.topright .ivu-btn {
  margin: 0 15px;
}
.lkstatistics {
  .title {
    color: @my-text-color;
    display: flex;
    justify-content: space-between;
  }
  .modelbg {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modelbg .modelimg {
    height: 273px;
    width: auto;
  }
  .showtotal {
    display: flex;
    justify-content: space-around;
    align-items: center;
    .cricleborder {
      font-size: 24px;
      display: inline-block;
      width: 80px;
      height: 80px;
      line-height: 80px;
      border: 2px solid #ccc;
      border-radius: 50%;
      color: @white-color;
    }
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      .itemdesc {
        margin-top: 15px;
        color: @white-color;
      }
    }
  }
}
.title {
  color: @my-text-color;
}

.detail-list {
  color: #fff;
  font-size: 18px;
  padding: 0 20px;
  li {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    line-height: 73px;
    margin: 0 auto 10px;
  }
}
</style>

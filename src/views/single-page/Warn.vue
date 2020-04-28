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
    <Row :gutter="20" class="warnsinfo">
      <i-col :lg="8" :md="8" class="item">
        <my-card>
          <div class="tittle">双库温探头偏差告警</div>
          <div class="time">2020-06-14</div>
          <div class="content">
            <div class="left">
              <img src="../../assets/images/warning-temp.png" class="tempimg" />
              <span>报警</span>
            </div>
            <div class="right">
              <div class="top">
                <span>今日告警</span>
                <span class="num">
                  <b>329</b>次
                </span>
              </div>
              <div class="bottom">
                <span>本月告警</span>
                <span class="num">
                  <b>329</b>次
                </span>
              </div>
            </div>
          </div>
          <div class="footer">
            <div class="footeritem">
              <p>告警所占总故障比例：</p>
              <Progress :percent="25" :stroke-width="5" :stroke-color="['#54FEF1', '#4733F8']" />
            </div>
          </div>
        </my-card>
      </i-col>
      <i-col :lg="8" :md="8" class="item">
        <my-card>
          <div class="tittle">后台数据连接错误</div>
          <div class="time">2020-06-14</div>
          <div class="content">
            <div class="left">
              <img src="../../assets/images/warning-error.png" alt class="errorimg" />
              <span>报警</span>
            </div>
            <div class="right">
              <div class="top">
                <span>今日错误</span>
                <span class="num">
                  <b>29</b>次
                </span>
              </div>
              <div class="bottom">
                <span>本月错误</span>
                <span class="num">
                  <b>224</b>次
                </span>
              </div>
            </div>
          </div>
          <div class="footer">
            <div class="footeritem">
              <p>错误所占总故障比例：</p>
              <Progress :percent="85" :stroke-width="5" :stroke-color="['#54FEF1', '#4733F8']" />
            </div>
          </div>
        </my-card>
      </i-col>
      <i-col :lg="8" :md="8" class="item">
        <my-card>
          <div class="tittle">数据接收信号差</div>
          <div class="time">2020-06-14</div>
          <div class="content">
            <div class="left">
              <img src="../../assets/images/warning-sign.png" alt class="wifiimg" />
              <span>报警</span>
            </div>
            <div class="right">
              <div class="top">
                <span>今日信号</span>
                <span class="num">
                  <b>329</b>次
                </span>
              </div>
              <div class="bottom">
                <span>本月信号</span>
                <span class="num">
                  <b>329</b>次
                </span>
              </div>
            </div>
          </div>
          <div class="footer">
            <div class="footeritem">
              <p>信号所占总故障比例：</p>
              <Progress :percent="25" :stroke-width="5" :stroke-color="['#54FEF1', '#4733F8']" />
            </div>
          </div>
        </my-card>
      </i-col>
    </Row>
    <Row :gutter="20" class="warnlists">
      <my-card>
         <div class="tittle">详细信息：</div>
         <ul class="content">
             <li>
                 <span>报警</span>
                 <span>双库温探头偏差告警</span>
                 <span>2020-04-16 17:11:58</span>
             </li>
             <li>
                 <span>报警</span>
                 <span>双库温探头偏差告警</span>
                 <span>2020-04-16 17:11:58</span>
             </li>
             <li>
                 <span>报警</span>
                 <span>双库温探头偏差告警</span>
                 <span>2020-04-16 17:11:58</span>
             </li>
             <li>
                 <span>报警</span>
                 <span>双库温探头偏差告警</span>
                 <span>2020-04-16 17:11:58</span>
             </li>
         </ul>
      </my-card>
    </Row>
  </div>
</template>

<script>
import Charts from "_c/Charts";
import MyCard from "_c/MyCard";

export default {
  name: "Home",
  data() {
    return {
      button1: "关机",
    };
  },
  components: {
    Charts,
    MyCard
  },
  methods: {},
  mounted() {}
};
</script>

<style  lang="less">
@import "../../assets/styles/color.less";
.home .topright .ivu-dropdown-item {
  background: #182e84;
  color: @yellow-text-color;
}
.home .topright .ivu-dropdown-item:hover {
  color: @yellow-text-color;
}
.topright .ivu-select-dropdown {
  width: inherit;
  max-height: 200px;
  overflow: auto;
  margin: 5px 0;
  background: #182e84;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  position: absolute;
  color: @white-color;
  z-index: 900;
  .ivu-dropdown-item {
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
  .ivu-dropdown {
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
.warnsinfo {
  .item {
    .tittle {
      font-size: 16px;
    }
    .time {
      font-size: 12px;
      height: 30px;
      line-height: 30px;
    }
    .content {
      display: flex;
      justify-content: center;
      .left {
        width: 120px;
        height: 100px;
        background: url("../../assets/images/warining-cricle.png") no-repeat;
        background-size: cover;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .tempimg {
          width: 43px;
          height: 45px;
        }
        .errorimg {
          width: 38px;
          height: 39px;
          margin-top: 4px;
        }
        .wifiimg {
          width: 46px;
          height: 39px;
          margin-top: 4px;
        }
        span {
          font-size: 14px;
          margin-top: 10px;
          color: @white-color;
        }
      }
      .right {
        margin-left: 30px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        .top {
          display: flex;
          flex-direction: column;
          span {
            height: 20px;
            line-height: 20px;
            b {
              border-bottom: 1px solid @card-boder-color;
            }
          }
        }
        .bottom {
          display: flex;
          flex-direction: column;
          span {
            height: 20px;
            line-height: 20px;
            b {
              border-bottom: 1px solid @card-boder-color;
            }
          }
        }
        .num {
          color: @card-boder-color;
        }
      }
    }
    .footer {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 30px;
      .footeritem {
        p {
          font-size: 12px;
          color: @white-color;
          height: 20px;
          line-height: 20px;
        }
      }
    }
  }
}
.warnlists{
    .tittle{
        font-size: 16px;
        margin: 30px 0;
    }
    .content{
        li{
            margin: 15px 0;
            height: 40px;
            line-height: 40px;
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #3627B1;
        }
    }
}
</style>

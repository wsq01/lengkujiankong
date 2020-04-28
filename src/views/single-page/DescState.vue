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
    <Row :gutter="20" class="warnlists">
      <my-card>
         <div class="tittle">详细信息：   
           <Dropdown>
               <a href="javascript:void(0)">
                  <Icon type="ios-arrow-down"></Icon>
              </a>
                <DropdownMenu slot="list">
                    <DropdownItem>电流</DropdownItem>
                    <DropdownItem>压机类</DropdownItem>
                    <DropdownItem>告警信息</DropdownItem>
                    <DropdownItem>故障锁定类</DropdownItem>
                    <DropdownItem>温度</DropdownItem>
                    <DropdownItem>湿度类</DropdownItem>                  
                </DropdownMenu>
            </Dropdown>
         </div>
         <ul class="content">
             <li>
                 <span>电压A</span>
                 <span>231.1V</span>
                 <span>电压B</span>
                 <span>227.0V</span>
             </li>
             <li>
                <span>电压A</span>
                 <span>231.1V</span>
                 <span>电压B</span>
                 <span>227.0V</span>
             </li>
             <li>
                <span>电压A</span>
                 <span>231.1V</span>
                 <span>电压B</span>
                 <span>227.0V</span>
             </li>
             <li>
                <span>电压A</span>
                 <span>231.1V</span>
                 <span>电压B</span>
                 <span>227.0V</span>
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

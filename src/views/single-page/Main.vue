<template>
  <div class="main">
    <Row :gutter="20" class="titletop">
      <i-col :lg="24" :md="24" class="topleft">
        <span class="cur-title">中集智冷温度监控平台</span>
      </i-col>
    </Row>
    <Row :gutter="20" class="devicecontent">
      <i-col :lg="8" :md="8" class="item">
        <my-card>
          <div>
            <div>到期时间：2022-12-29</div>
            <div class="beizhucontent">
              <span class="beizhu">中集冷云</span>
            </div>
            <div class="footer">
              <div class="info">
                <img src="../../assets/images/main-online.png" alt class="stateimg stateonline" />
                <p>
                  <span class="tip">在线</span>
                  <span>系统状态</span>
                </p>
              </div>
              <div class="info">
                <img src="../../assets/images/main-tempok.png" alt class="stateimg tempok" />
                <p>
                  <span class="tip">18℃</span>
                  <span>冷库温度</span>
                </p>
              </div>
              <div class="info">
                <img src="../../assets/images/main-leng.png" alt class="stateimg zhileng" />
                <p>
                  <span class="tip">制冷</span>
                  <span>启用状态</span>
                </p>
              </div>
            </div>
          </div>
        </my-card>
      </i-col>
      <i-col :lg="8" :md="8" class="item">
        <my-card>
          <div>
            <div>到期时间：2022-12-29</div>
            <div class="beizhucontent">
              <span class="beizhu">国药物流</span>
            </div>
            <div class="footer">
              <div class="info">
                <img src="../../assets/images/main-outline.png" alt class="stateimg stateonline" />
                <p>
                  <span class="tip">在线</span>
                  <span>系统状态</span>
                </p>
              </div>
              <div class="info">
                <img src="../../assets/images/main-tempok.png" alt class="stateimg tempok" />
                <p>
                  <span class="tip">18℃</span>
                  <span>冷库温度</span>
                </p>
              </div>
              <div class="info">
                <img src="../../assets/images/main-leng.png" alt class="stateimg zhileng" />
                <p>
                  <span class="tip">制冷</span>
                  <span>启用状态</span>
                </p>
              </div>
            </div>
          </div>
        </my-card>
      </i-col>
      <i-col :lg="8" :md="8" class="item">
        <my-card>
          <div>
            <div>到期时间：2022-12-29</div>
            <div class="beizhucontent">
              <span class="beizhu">精新相能</span>
            </div>
            <div class="footer">
              <div class="info">
                <img src="../../assets/images/main-online.png" alt class="stateimg stateonline" />
                <p>
                  <span class="tip">在线</span>
                  <span>系统状态</span>
                </p>
              </div>
              <div class="info">
                <img src="../../assets/images/main-tempok.png" alt class="stateimg tempok" />
                <p>
                  <span class="tip">18℃</span>
                  <span>冷库温度</span>
                </p>
              </div>
              <div class="info">
                <img src="../../assets/images/main-leng.png" alt class="stateimg zhileng" />
                <p>
                  <span class="tip">制冷</span>
                  <span>启用状态</span>
                </p>
              </div>
            </div>
          </div>
        </my-card>
      </i-col>
      <i-col :lg="8" :md="8" class="item">
        <my-card>
          <div>
            <div>到期时间：2022-12-29</div>
            <div class="beizhucontent">
              <span class="beizhu">中集冷云</span>
            </div>
            <div class="footer">
              <div class="info">
                <img src="../../assets/images/main-online.png" alt class="stateimg stateonline" />
                <p>
                  <span class="tip">在线</span>
                  <span>系统状态</span>
                </p>
              </div>
              <div class="info">
                <img src="../../assets/images/main-tempok.png" alt class="stateimg tempok" />
                <p>
                  <span class="tip">18℃</span>
                  <span>冷库温度</span>
                </p>
              </div>
              <div class="info">
                <img src="../../assets/images/main-leng.png" alt class="stateimg zhileng" />
                <p>
                  <span class="tip">制冷</span>
                  <span>启用状态</span>
                </p>
              </div>
            </div>
          </div>
        </my-card>
      </i-col>
    </Row>
  </div>
</template>

<script>
import Charts from "_c/Charts";
import MyCard from "_c/MyCard";
export default {
  name: "Main",
  data() {
    return {};
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
</style>
<style lang="less" scoped>
.titletop {
    display: flex;
    justify-items: center;
    height: 40px;
}
.topleft {
  display: flex;
  height: 40px;
  align-items: center;
  justify-content: flex-start;
}
.devicecontent {
  // margin: 18px 0;
  .item {
    cursor: pointer;
    .beizhucontent {
      display: inline-block;
      height: 200px;
      line-height: 200px;
      width: 100%;
      text-align: center;
      .beizhu {
        font-weight: 600;
        font-size: 30px;
        cursor: pointer;
        margin-bottom: 0px;
        background-image: -webkit-linear-gradient(bottom, #4650f6, #41fce6);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
    .footer {
      display: flex;
      width: 100%;
      height: auto;
      padding: 15px 15px;
      box-sizing: border-box;
      .info {
        display: flex;
        height: 60px;
        width: 33%;
        justify-content: center;
        align-items: center;
        .stateimg {
          margin-right: 10px;
        }
        .stateonline {
          display: inline-block;
          width: 30px;
          height: 30px;
        }
        .tempok {
          display: inline-block;
          width: 14px;
          height: 34px;
        }
        .zhileng {
          display: inline-block;
          width: 29px;
          height: 31px;
        }
        span {
          display: inline-block;
          height: 30px;
          line-height: 30px;
        }
        .tip {
          width: 30px;
          border-bottom: 1px solid #41fce6;
        }
        p {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
      }
    }
  }
}
</style>

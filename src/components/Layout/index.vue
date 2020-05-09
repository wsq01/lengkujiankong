<template>
  <Layout style="height: 100%" class="main">
    <div id="particles"></div>
    <Sider hide-trigger collapsible :width="256" :collapsed-width="64" v-model="collapsed" class="left-sider" :style="{ overflow: 'hidden' }">
      <side-menu accordion ref="sideMenu" :active-name="$route.name" :collapsed="collapsed" @on-select="turnToPage" :menu-list="menuList">
        <!-- 需要放在菜单上面的内容，如Logo，写在side-menu标签内部，如下 -->
        <div class="logo-con">
          <img v-if="!collapsed" :src="maxLogo" key="max-logo"/>
          <span v-else class="logozi">CIMC</span>
        </div>
        <div class="choosemenu">
            <RadioGroup v-model="devicestate">
                <Radio label="all">
                    <span class="muneblack"><b class="allnum">3</b>全部</span>
                </Radio>
                <Radio label="online">
                    <span class="muneblack"><b class="onlinenum">3</b>在线</span>
                </Radio>
                <Radio label="outline">
                    <span class="muneblack"><b class="outlinenum">0</b>离线</span>
                </Radio>
            </RadioGroup>
        </div>
      </side-menu>
    </Sider>
    <Layout>
      <Header class="header-con">
        <header-bar :collapsed="collapsed" @on-coll-change="handleCollapsedChange">
          <user :user-avatar="userAvatar"/>
          <fullscreen v-model="isFullscreen" style="margin-right: 10px;"/>
        </header-bar>
      </Header>
      <Content class="main-content-con">
        <Layout class="main-layout-con">
          <div class="tag-nav-wrapper" v-show="false">
            <tags-nav :value="$route" @input="handleClick" :list="tagNavList" @on-close="handleCloseTag"/>
          </div>
          <top-menu :selectedMenu="selectedMenu" v-if="isShowTopMenu"></top-menu>
          <Content class="content-wrapper">
            <keep-alive :include="cacheList">
              <router-view/>
            </keep-alive>
            <ABackTop :height="100" :bottom="80" :right="50" container=".content-wrapper"></ABackTop>
          </Content>
        </Layout>
      </Content>
    </Layout>
  </Layout>
</template>
<script>
import SideMenu from './components/SideMenu/SideMenu'
import HeaderBar from './components/HeadBar/HeadBar'
import TagsNav from './components/TagsNav'
import User from './components/User'
import ABackTop from './components/BackTop'
import Fullscreen from './components/FullScreen'
import TopMenu from './components/TopMenu'
import { mapMutations, mapActions } from 'vuex'
import { getNewTagList, routeEqual } from '@/libs/util'
import { defaultRoutes } from '@/router/routers'
// import minLogo from '@/assets/images/logo@2x.png'
import maxLogo from '@/assets/images/logo@2x.png'
import minLogo from '@/assets/images/logozhedie.png'
import '@/libs/particles.min.js'
// import particlesConfig from '@/libs/particles.config.js'
import './index.less'
export default {
  name: 'Main',
  components: {
    SideMenu,
    HeaderBar,
    TagsNav,
    Fullscreen,
    User,
    ABackTop,
    TopMenu
  },
  data () {
    return {
      devicestate: 'all',
      collapsed: false,
      sdierBgColor: '#001529',
      minLogo,
      maxLogo,
      isFullscreen: false,
      isShowTopMenu: false,
      selectedMenu: 'device'
    }
  },
  computed: {
    tagNavList () {
      return this.$store.state.app.tagNavList
    },
    tagRouter () {
      return this.$store.state.app.tagRouter
    },
    userAvatar () {
      return this.$store.state.user.avatarImgPath
    },
    cacheList () {
      const list = ['ParentView', ...this.tagNavList.length ? this.tagNavList.filter(item => !(item.meta && item.meta.notCache)).map(item => item.name) : []]
      return list
    },
    menuList () {
      return this.$store.getters.menuList
    }
  },
  methods: {
    ...mapMutations([
      'setBreadCrumb',
      'setTagNavList',
      'addTag',
      'setHomeRoute',
      'closeTag'
    ]),
    ...mapActions([
      'handleLogin'
    ]),
    turnToPage (route) {
      let { name, params, query } = {}
      if (typeof route === 'string') name = route
      else {
        name = route.name
        params = route.params
        query = route.query
      }
      if (name.indexOf('isTurnByHref_') > -1) {
        window.open(name.split('_')[1])
        return
      }
      this.$router.push({
        name,
        params,
        query
      })
    },
    handleCollapsedChange (state) {
      this.collapsed = state
    },
    handleCloseTag (res, type, route) {
      if (type !== 'others') {
        if (type === 'all') {
          this.turnToPage(this.$config.homeName)
        } else {
          if (routeEqual(this.$route, route)) {
            this.closeTag(route)
          }
        }
      }
      this.setTagNavList(res)
    },
    handleClick (item) {
      this.turnToPage(item)
    },
    handleShowTopMenu (name) {
      this.isShowTopMenu = name === 'device' || name === 'deviceSetting' || name === 'deviceAlarm' || name === 'deviceDetail' || name === 'deviceModel' || name === 'deviceHistory'
      this.selectedMenu = name
    }
  },
  watch: {
    '$route' (newRoute) {
      console.log(newRoute)
      const { name, query, params, meta } = newRoute
      this.addTag({
        route: { name, query, params, meta },
        type: 'push'
      })
      this.handleShowTopMenu(name)
      // this.setBreadCrumb(newRoute)
      this.setTagNavList(getNewTagList(this.tagNavList, newRoute))
      this.$refs.sideMenu.updateOpenName(newRoute.name)
    }
  },
  mounted () {
    /**
     * @description 初始化设置面包屑导航和标签导航
     */
    this.setTagNavList()
    this.setHomeRoute(defaultRoutes)
    const { name, params, query, meta } = this.$route
    this.handleShowTopMenu(name)
    this.addTag({
      route: { name, params, query, meta }
    })
    // this.setBreadCrumb(this.$route)
    // 如果当前打开页面不在标签栏中，跳到homeName页
    if (!this.tagNavList.find(item => item.name === this.$route.name)) {
      this.$router.push({
        name: this.$config.homeName
      })
    }
    // particlesJS('particles', particlesConfig) //背景动画
  }
}
</script>

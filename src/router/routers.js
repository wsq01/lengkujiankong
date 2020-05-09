import Main from '@/components/Layout/index.vue'

/**
 * meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由，没有该字段默认显示
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 * }
 */

export const defaultRoutes = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          // hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/views/single-page/Home.vue')
      },
      {
        path: '/device/:deviceId',
        name: 'device',
        props: true,
        meta: {
          hideInMenu: true,
          title: '基本信息',
          notCache: true
        },
        component: () => import('@/views/single-page/Device.vue')
      },
      {
        path: '/deviceSetting',
        name: 'deviceSetting',
        props: true,
        meta: {
          hideInMenu: true,
          title: '常用设置',
          notCache: true
        },
        component: () => import('@/views/single-page/DeviceSetting.vue')
      },
      {
        path: '/deviceAlarm',
        name: 'deviceAlarm',
        props: true,
        meta: {
          hideInMenu: true,
          title: '报警信息',
          notCache: true
        },
        component: () => import('@/views/single-page/DeviceAlarm.vue')
      },
      {
        path: '/deviceDetail',
        name: 'deviceDetail',
        props: true,
        meta: {
          hideInMenu: true,
          title: '详细状态',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/views/single-page/DeviceDetail.vue')
      },
      {
        path: '/deviceModel',
        name: 'deviceModel',
        props: true,
        meta: {
          hideInMenu: true,
          title: '参数设置',
          notCache: true
        },
        component: () => import('@/views/single-page/DeviceModel.vue')
      },
      {
        path: '/deviceHistory',
        name: 'deviceHistory',
        props: true,
        meta: {
          hideInMenu: true,
          title: '历史数据',
          notCache: true
        },
        component: () => import('@/views/single-page/DeviceHistory.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/views/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/views/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/views/error-page/404.vue')
  }
]
export const asyncRoutes = [
  {
    path: '/monitor',
    name: '_monitor',
    component: Main,
    redirect: 'storage',
    meta: {
      title: '仓库管理',
      icon: 'md-home'
    },
    children: [
      {
        path: '/storage',
        name: 'storage',
        props: true,
        meta: {
          hideInMenu: true
        },
        component: () => import('@/views/single-page/Storage.vue')
      }
    ]
  }
]

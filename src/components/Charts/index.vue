<template>
  <div ref="dom" class="charts" style="width: 100%;"></div>
</template>

<script>
import echarts from 'echarts'
import tdTheme from './theme.json'
import { on, off } from '@/libs/tools'
echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: 'Charts',
  props: {
    option: {
      type: Object
    }
  },
  data () {
    return {
      dom: null
    }
  },
  watch: {
    option () {
      this.initChart()
    }
  },
  methods: {
    resize () {
      this.dom.resize()
    },
    initChart () {
      this.$nextTick(() => {
        this.dom = echarts.init(this.$refs.dom, 'tdTheme')
        this.dom.setOption(this.option, true)
        on(window, 'resize', this.resize)
      })
    }
  },
  beforeDestory () {
    off(window, 'resize', this.resize)
  }
}
</script>

<template>
  <Card :bordered="false" class="card">
    <i></i>
    <i></i>
    <i></i>
    <i></i>
    <div slot="title" v-if="isShowTitle">
      <slot name="title"></slot>
    </div>
    <slot></slot>
  </Card>
</template>

<script>
export default {
  props: {
    isShowTitle: {
      type: Boolean,
      defalut: false
    }
  }
}
</script>

<style lang="less" scoped>
@import "../assets/styles/color.less";

.card {
  background: @sidebar-menu-bg-color;
  margin: 10px auto 10px;
  position: relative;
}
.card i:nth-of-type(1) {
  position: absolute;
  left: -2px;
  top: -2px;
  padding: 8px;
  border-style: solid;
  border-color: @card-boder-color;
  border-width: 1px 0 0 1px;
}
.card i:nth-of-type(2) {
  position: absolute;
  right: -2px;
  top: -2px;
  padding: 8px;
  border-style: solid;
  border-color: @card-boder-color;
  border-width: 1px 1px 0 0;
}
.card i:nth-of-type(3) {
  position: absolute;
  right: -2px;
  bottom: -2px;
  padding: 8px;
  border-style: solid;
  border-color: @card-boder-color;
  border-width: 0 1px 1px 0;
}
.card i:nth-of-type(4) {
  position: absolute;
  left: -2px;
  bottom: -2px;
  padding: 8px;
  border-style: solid;
  border-color: @card-boder-color;
  border-width: 0 0 1px 1px;
}
</style>

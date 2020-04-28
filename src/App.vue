<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
.size{
  width: 100%;
  height: 100%;
  background: #200853;
}
html,body{
  .size;
  overflow: hidden;
  margin: 0;
  padding: 0;
  background: #200853;
  letter-spacing: 1px;
}
#app {
  .size;
  background: #200853; 
}
</style>

<template>
  <div class="bell-vi">
    <svg-icon icon-class="bell" class="bell" @click="click" />
    <div v-if="newMsg" class="red"></div>
  </div>
</template>

<script>

export default {
  name: 'Bell',
  data() {
    return {
      newMsg: true
    }
  },
  mounted() {
  },
  beforeDestroy() {
  },
  methods: {
    click() {
      // this.$router.push("")
    }
  }
}
</script>

<style scoped>
.bell {
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;;
  width: 20px;
  height: 20px;
  vertical-align: 10px;
}
.bell-vi{
  position: relative;
}
.bell{
  min-width: 22px;
  min-height: 22px;
}
.red{
  position: absolute;
  top: 30%;
  left: 20%;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #f4516c;
}
</style>

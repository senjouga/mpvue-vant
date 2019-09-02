<template>
  <block>
    <div class="weui-cells__title" v-if="title">{{title}}</div>
    <div class="weui-cells" :class="{'weui-cells_after-title': title}">
      <slot></slot>
    </div>
  </block>
</template>

<script>
  export default {
    props: {
      title: String
    }
  }
</script>
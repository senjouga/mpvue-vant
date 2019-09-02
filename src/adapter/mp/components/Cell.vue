<template>
  <div class="weui-cell">
    <!-- <div class="weui-cell__hd">
      <image :src="icon" style="margin-right: 5px;vertical-align: middle;width:20px; height: 20px;"></image>
    </div> -->
    <div class="weui-cell__bd">{{title}}</div>
    <div class="weui-cell__ft" :class="{'weui-cell__ft_in-access': isLink}">{{value}}</div>
  </div>
</template>

<script>
  export default {
    props: {
      title: String,
      value: String,
      isLink: Boolean
    }
  }
</script>
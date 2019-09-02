<template>
  <div class="s-input">
    <input @focus="focusAction" @blur="blurAction" v-model="currentValue"/>
    <span class="b-line" :class="{'input_focus': isFocus}"></span>
    <label class="c-title" :class="{'c-value':currentValue,'c-focus': isFocus}">{{title}}</label>
    <span>{{isFocus}}</span>
    <span>{{currentValue}}</span>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        isFocus: false,
        title: '邮箱',
        placeholder: '请输入',
        currentValue: ''
      }
    },
    methods: {
      focusAction () {
        this.isFocus = true
      },
      blurAction () {
        this.isFocus = false
      }
    }
  }
</script>

<style lang="less">
  .s-input {
    width: 120px;
    position: relative;
    padding: 20px 0;
    input {
      min-width: 80px;
      border: 0;
      border-bottom: 1px solid rgba(0,0,0,.12);
      /*background: #306cc5;*/
      /*color: #fff;*/
    }
    .b-line {
      display: block;
      position: relative;
      height: 2px;
      width: 100%;
      &:before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        /*width: 50%;*/
        width: 0;
        left: 50%;
        height: 2px;
        background-color: #ccc;
        transition: width .2s linear;
      }
      &:after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        /*width: 50%;*/
        width: 0;
        right: 50%;
        height: 2px;
        background-color: #ccc;
        transition: width .2s ease-in-out;
      }
    }
    .input_focus.b-line {
      &:before {
        width: 50%;
        background: #3f51b5;
      }
      &:after {
        width: 50%;
        background: #3f51b5;
      }
    }
    .c-title {
      position: absolute;
      top: 20px;
      font-size: 16px;
      left: 0;
      color: #ccc;
      transition-property: top,font-size,color;
      transition-timing-function: ease-in-out;
      transition-duration: .35s;
      &.c-value {
        top: 0;
        font-size: 13px;
        color: #ccc;
      }
      &.c-focus {
        top: 0;
        font-size: 13px;
        color: #3f51b5;
      }
    }
  }
</style>
